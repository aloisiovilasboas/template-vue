

<template>

    <div>



        <Card class="inscricao">
            <template #header>
                <img src="https://cf.shopee.com.br/file/35c7f1f5f0de28f54931c406432540ba" />
                <!--     <img src="../assets/imgs/rascunho.png"  /> -->
            </template>
            <template #title>
                Bolão do AFC - 2022
            </template>
            <!-- <template #subtitle>
                Bem vindo
            </template> -->
            <template #content>

                <div class="col-12 card_home">
                    <!--   <Button label="Primary" class="p-button-outlined" /> -->
                    <div class="botao_home" v-if="userStore.authuser != null && apostasStore.apostasRAW.grupos != null">
                        <Button class="col-8 p-button-warning" @click="irParaApostasCadastradas" >
                            <span class="p-button-icon p-button-icon-left">⚽</span>
                            <span class="p-button-label">Ver Suas Apostas</span>
                            
                        </Button>
                    </div>
                   
                    <div class="botao_home" v-if="userStore.authuser != null">
                        <Button class="col-8" @click="irParaCadastrarApostas" >
                            <span class="p-button-icon p-button-icon-left">⚽</span>
                            <span class="p-button-label">Cadastrar Apostas</span>
                        
                        </Button>
                    </div>
                   
                    <div class="botao_home" >
                        <Button  @click="irParaRegras" icon="pi pi-book" label="Regras" class="col-8 p-button-secondary"/>
                    </div>
                   
                    <div class="botao_home" >
                        <Button @click="irParaSobre" icon="pi pi-info-circle" label="Sobre" class="col-8 p-button-secondary"/>
                    </div>
                </div>

            </template>
            <template #footer>
                <!-- <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
        -->
            </template>
        </Card>
    </div>







</template>

<script setup>

import Card from 'primevue/card';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { useApostasStore } from '../stores/apostas';
import { onMounted } from 'vue';

onMounted( ()=>{
    console.log('apstore '+apostasStore.apostasRAW);
}) 

const router = useRouter();

const userStore = useUserStore();
const apostasStore = useApostasStore();

const irParaRegras = () => {
    router.push("/Regras");
}
const irParaSobre = () => {
    router.push("/Sobre");
}
const irParaCadastrarApostas = () => {
    router.push("/CadastrarApostas");
}
const irParaApostasCadastradas = () => {
    router.push("/ApostasCadastradas");
}

</script>