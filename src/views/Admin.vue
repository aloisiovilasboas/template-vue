<template>
  <div v-if="store.loading">
    <h3>Carregando...</h3>
    <ProgressSpinner />
  </div>
  <div v-else-if="store.isAdmin == false">
    <h1>Você não é admin</h1>
  </div>
  <div v-else>
    <div>

      <DataTable :value=store.usuarios>
        <Column header="#" headerStyle="width:3em">
        <template #body="slotProps">
            {{slotProps.index+1}}
        </template>
    </Column>
        <Column field="nome" header="nome"></Column>
        <Column  header="email / link">
          <template #body="slotProps">
            <span v-if="slotProps.data.email!='nao cadastrado'" >{{ slotProps.data.email }}</span>
            <div v-else>
              <!-- <input  type="text" class="linktext" v-model=slotProps.data.link readonly="true" /> -->
              <InputText class="linktext" type="text" v-model=slotProps.data.link readonly="true" />
              <Button icon="pi pi-copy" class="p-button" @click="copyLink(slotProps.data)" />
            </div>
          </template>
        </Column>
        
        <!-- <Column field="isAdmin" header="Admin">
          <template #body="slotProps">
            <div>
              {{ slotProps.data.isAdmin }}
            </div>
          </template>
        </Column> -->
        <Column header="Pago" :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button v-if="slotProps.data.pago!=true " icon="pi pi-circle" class="p-button-rounded p-button-warning" @click="confirmPagoUsuario(slotProps.data)" />
            <Button v-if="slotProps.data.pago==true " icon="pi pi-circle-fill" class="p-button-rounded p-button-warning" @click="confirmNaoPagoUsuario(slotProps.data)" />
          </template>
        </Column>
        <Column header="Excluir" :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
              @click="confirmDeleteUsuario(slotProps.data)" />
          </template>
        </Column>
        
        
      </DataTable>
    </div>
    <Dialog v-model:visible="pagoUsuarioDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Deseja validar o pagamento de <b>{{ uPago.nome }}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="pagoUsuarioDialog = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="pagoUsuario" />
      </template>
    </Dialog>
    <Dialog v-model:visible="naoPagoUsuarioDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Deseja invalidar o pagamento de <b>{{ uPago.nome }}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="naoPagoUsuarioDialog = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="naoPagoUsuario" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteUsuarioDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Tem certeza que deseja excluir o usuário <b>{{ uDelete.nome }}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteUsuarioDialog = false" />
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteUsuario" />
      </template>
    </Dialog>
    <div>
      <h1> Cadastrar Participante</h1>
    </div>

    <div>
      <InputText type="text" v-model="nameInput" placeholder="Nome" />

    </div>

    <div>
      <h2></h2>
    </div>
    <Button icon="pi pi-check" label="Cadastrar" @click="cadastraPlayer" />
    <!-- <button @click ="cadastraPlayer">Cadastrar</button> -->
    <div></div>
  </div>
  

  <!-- <button @click ="handleFetchUsers">handleFetchUsers</button> -->


</template>

<script setup>

import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Button from 'primevue/button';
import { ref } from 'vue'
import { useUsuariosStore } from "../stores/usuarios"

const store = useUsuariosStore();
const products = ref();
const nameInput = ref("");
const deleteUsuarioDialog = ref(false);
const pagoUsuarioDialog = ref(false)
const naoPagoUsuarioDialog = ref(false)
const uDelete = ref({});
const uPago = ref({});




const copyLink = (u) => {
  console.log(u.link)
  try {
    navigator.clipboard.writeText(u.link).then(() => {
      alert('Copied');
    });
  } catch ($e) {
    alert('Cannot copy');
  }
}

const confirmPagoUsuario = (u) => {
  uPago.value = u;
  pagoUsuarioDialog.value = true;
};
const confirmNaoPagoUsuario = (u) => {
  uPago.value = u;
  naoPagoUsuarioDialog.value = true;
};

const naoPagoUsuario = () => {
  console.log('usuarioPago')
  store.naoPagouUsuario(uPago.value)
  naoPagoUsuarioDialog.value = false


  /*  products.value = products.value.filter(val => val.id !== product.value.id);
   deleteProductDialog.value = false;
   product.value = {};
   toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000}); */
};

const pagoUsuario = () => {
  console.log('usuarioPago')
  store.pagouUsuario(uPago.value)
  pagoUsuarioDialog.value = false


  /*  products.value = products.value.filter(val => val.id !== product.value.id);
   deleteProductDialog.value = false;
   product.value = {};
   toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000}); */
};




const confirmDeleteUsuario = (u) => {
  uDelete.value = u;
  deleteUsuarioDialog.value = true;
};

const deleteUsuario = () => {
  console.log('deleteUsuario')
  store.deleteUsuario(uDelete.value)
  deleteUsuarioDialog.value = false


  /*  products.value = products.value.filter(val => val.id !== product.value.id);
   deleteProductDialog.value = false;
   product.value = {};
   toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000}); */
};

const cadastraPlayer = () => {
  store.cadastraPlayer({ nome: nameInput.value, email: 'nao cadastrado' })
}
const handleFetchUsers = () => {
  store.fetchUsuarios()
}


</script>
  
  
  