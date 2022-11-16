<template>
    <h1>Inscreva-se</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Senha" v-model="password" /></p>
    <p><button @click="register">Confirmar</button></p>
    <p><button @click="signInWithGoogle">Entrar com o google</button></p>
</template>

<script setup>

import {ref } from "vue";
import { 
        getAuth,
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
    } from "firebase/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { useUsuariosStore } from "../stores/usuarios";

const email = ref("");
const password = ref("");
const router = useRouter()
const errMsg = ref("");

const userStore = useUserStore();
const usuariosStore = useUsuariosStore();

const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("Registrado com Sucesso")
            usuariosStore.cadastraPlayer({ nome: 'registered', email: email.value})
           // userStore.cadastraEmail({email:email.value})
          //  router.push('/perfil')
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
                        errMsg.value = "Não foi possivel fazer o cadastro: "+error.code ;
                        break;
                }
            })
        };
            /* const signInWithGoogle = () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(),provider)
            .then((result) => {
                console.log(result.user);
                router.push("/perfil");
            }).catch((error) => {
                console.log("erro logando com o google");
            });
        }; */

</script>