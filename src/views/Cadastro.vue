<template>
    <!-- <h1>Entre {{ $route.params.id }} </h1> -->
    <div class="container col-12" >

        <div class="flex flex-wrap align-items-center justify-content-center card-container yellow-container">
            
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">1</div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">2</div>
                <div class="flex align-items-center justify-content-center w-4rem h-4rem bg-yellow-500 font-bold text-gray-900 border-round m-2">3</div>
            
        </div>

        <div c >
                <h5>Scrollable</h5>
           
                <!-- //para o tabview v-model:activeIndex="active2"  -->
                <TabView  :scrollable="true">
                    <TabPanel v-for="tab in scrollableTabs" :key="tab.title" :header="tab.title">
                        <p>{{tab.content}}</p>
                    </TabPanel>
                </TabView>
            </div>

        
        
                <div class="card min-width">
                    <h5>Default</h5>
                    <TabView ref="tabview1">
                        <TabPanel header="Grupo A">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum.
                            </p>
                        </TabPanel>
                        <TabPanel header="Grupo B">
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                        <TabPanel header="Grupo C">
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                                culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                            </p>
                        </TabPanel>
                    </TabView>
                </div>
        
    </div>

    <!-- <p><button @click="signInWithGoogle">Entrar com o google</button></p> -->

</template>

<script setup>
    import 'primeflex/primeflex.scss';

    import TabView from 'primevue/TabView'
    import TabPanel from 'primevue/TabPanel'
    import { ref, onMounted } from 'vue'
    import { useUserStore } from "../stores/user";

        
    import { 
            getAuth,
            createUserWithEmailAndPassword,
            GoogleAuthProvider,
            signInWithPopup,
        } from "firebase/auth";
    import { useRouter } from "vue-router";
    const tabs = ref([
                {
                    title: 'Header I',
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                },
                {
                    title: 'Header II',
                    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi."
                },
                {
                    title: 'Header III',
                    content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus."
                }
            ])
    const scrollableTabs = ref(
            Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }))
        )

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
        const userStore = useUserStore();
        userStore.fetchUsuarioById(userStore.user.id)
        //console.log(userStore.user.id)
    })
</script>