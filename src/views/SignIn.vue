<template>
    <!-- <h1>Entre</h1>

    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Senha" v-model="password" /></p>
    <p><button @click="register">Entrar</button></p>

 -->
    <div >
        <Card class="inscricao" >
            <template #header>
                <img src="../assets/fifa_world_cup_2022_official_cartoon_poster.png" />
                
            </template>
           <!--  <template #title>
                Entre
            </template> -->
            <!-- <template #subtitle>
                Conclua o cadastro para participar do bolão
            </template> -->
            <template #content>
                <div class="formularioDiv">
                    <InputText class="formulario" id="email" type="text" v-model="email" placeholder="E-mail" />
                    <p></p>
                    <Password class="formulario" v-model="password" toggleMask  placeholder="Senha" :feedback="false" />
                    <p v-if="errMsg"></p>
                    <InlineMessage class="formulario" severity="error" v-if="errMsg">{{errMsg}}</InlineMessage >
                </div>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Entrar" @click="register" />
            </template>
        </Card>
    </div>



</template>

<script setup>

import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import InlineMessage  from 'primevue/inlinemessage ';
import {ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref() // ERROR MESSSAGE
const router = useRouter()

const register = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Logado com Sucesso")
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
            case "auth/user-disabled":
                errMsg.value = "Usuário desabilitado";
                break;
            default:
                errMsg.value = "Não foi possivel fazer o login";
                break;
        }
    })
};


</script>