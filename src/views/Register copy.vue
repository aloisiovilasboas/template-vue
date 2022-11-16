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

const email = ref("");
const password = ref("");
const router = useRouter()

const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Registrado com Sucesso")
        router.push('/perfil')
    })

};
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(),provider)
    .then((result) => {
        console.log(result.user);
        router.push("/perfil");
    }).catch((error) => {

    });
};

</script>