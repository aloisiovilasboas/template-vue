<template>
    <!-- <h1>Entre {{ $route.params.id }} </h1> -->

    
    <h1>Inscreva-se</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Senha" v-model="password" /></p>
    <p><input type="password" placeholder="Confirme a senha" v-model="password" /></p>

    <p><button @click="register">Confirmar</button></p>
    <!-- <p><button @click="signInWithGoogle">Entrar com o google</button></p> -->

</template>

<script setup>


    import { ref, onMounted } from 'vue'
    import { useUserStore } from "../stores/user";

        
    import { 
            getAuth,
            createUserWithEmailAndPassword,
            GoogleAuthProvider,
            signInWithPopup,
        } from "firebase/auth";
    import { useRouter } from "vue-router";

    const email = ref("");
    const password = ref("");
    const passwordConfirmation = ref("");
    const router = useRouter()

    const register = () => {
        if(password.value = passwordConfirmation.value && useUserStore ){
          createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            .then((data) => {
            console.log("Registrado com Sucesso")
            router.push('/perfil')
        })}
        else {
          console.log('senhas diferentes')
        } 
        
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


    //import { defineProps, reactive } from "vue";

    /* const props = defineProps({
      id: String,
    }); */
    

    /* const docRef = doc(db, "usuarios", this.$route.params.id);
    const docSnap = await getDoc(docRef);

    

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    } */

    onMounted(() => {
        //const userStore = useUserStore();
        userStore.fetchUsuarioById(userStore.user.id)
        //console.log(userStore.user.id)
    })
</script>