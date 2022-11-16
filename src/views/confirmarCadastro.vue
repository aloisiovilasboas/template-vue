<template>
    <div v-if="userStore.user.loading">
        <h3>Carregando...</h3>
        <ProgressSpinner />
    </div>
    <div v-else-if="userStore.user.valido == false">
        <h1>Esse link não é válido</h1>
    </div>
    <div v-else-if="userStore.user.email != 'nao cadastrado'">
        <h1>Já cadastrado</h1>
    </div>
    <div v-else>
        <div>
            <Card class="inscricao">
                <template #header>
                    <img src="../assets/fifa_world_cup_2022_official_cartoon_poster.png" />
                </template>
                <template #title>
                    Bem vindo, {{ userStore.user.nome }}
                </template>

                <template #subtitle>
                    Conclua o cadastro para participar do bolão
                </template>

                <template #content>
                    <div class="formularioDiv">

                        <InputText class="formulario" id="email" type="text" v-model="emailCadastro"
                            placeholder="E-mail" />
                        <p></p>
                        <Password class="formulario" v-model="senhaCadastro" toggleMask placeholder="Senha"
                            :feedback="false" />
                        <p v-if="errMsg"></p>
                        <InlineMessage class="formulario" severity="error" v-if="errMsg">{{ errMsg }}</InlineMessage>


                    </div>

                </template>
                <template #footer>
                    <Button icon="pi pi-check" label="Cadastrar" @click="register" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>

import InlineMessage from 'primevue/inlinemessage ';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Card from 'primevue/card';
import Button from 'primevue/button';
import 'primeflex/primeflex.scss';

import { ref, onMounted, onBeforeMount } from 'vue'
import { useUserStore } from "../stores/user";


import {
    getAuth,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';

const errMsg = ref() // ERROR MESSSAGE
const scrollableTabs = ref(
    Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }))
)

const emailCadastro = ref("")
const senhaCadastro = ref("")
// const loading = ref(true)
const router = useRouter()
const userStore = useUserStore();

const register = () => {
    createUserWithEmailAndPassword(getAuth(), emailCadastro.value, senhaCadastro.value)
        .then((data) => {
            console.log("Registrado com Sucesso")
            console.log(data.user.uid)
            userStore.cadastraEmail({ email: emailCadastro.value, uid:data.user.uid })
            router.push('/')
        }).catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Email inválido";
                    break;
                case "auth/user-not-found":
                    errMsg.value = "Não foi encontrada nenhuma conta com esse email";
                    break;
                case "auth/wrong-password":
                    errMsg.value = "Senha incorreta";
                    break;
                case "auth/weak-password":
                    errMsg.value = "A senha deve ter ao menos 6 caracteres";
                    break;
                case "auth/email-already-in-use":
                    errMsg.value = "Esse email já está cadastrado";
                    break;
                case "auth/user-disabled":
                    errMsg.value = "Usuário desabilitado";
                    break;
                default:
                    errMsg.value = "Não foi possivel fazer o cadastro: " + error.code;
                    break;
            }
        })
};
</script>
