import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { addDoc, collection,  getDocs, getDoc, doc, updateDoc } from "firebase/firestore"; 
import { db } from "../services/firebase"

//import { inicializarFirebase, auth, db, fs } from "../services/firebase";

//import { collection, doc, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
//import { useFirestore } from '@vueuse/firebase/useFirestore'



// import { db } from "../services/firebase"

// const usuarios = useFirestore(collection(db, 'usuarios'))

export const useUserStore = defineStore ("user" ,{
        state: () => {
            const idCadastro = ''
            const authuser = ref()
            const user = ref({
                valido:false,
                loading:true,
                id:'nulo',
                email: "email",
                nome: "nan",
            });

        //    const website = computed(() => user.value.email.substring(user.value.email.lastIndexOf("@") +1 ));

        const setAuthUser = (au) => {
            authuser.value = au;
        }
            
            const changeId = (newid) => {
                user.value.id = newid;
            }
            
            return {
                user,
                changeId,
                authuser,
                setAuthUser
            
            }
        },
        actions:{
            
            async cadastraEmail(u){
                try{
                    const usuarioref = doc(db, "usuarios", this.user.id);
                     await updateDoc(usuarioref, {
                        email: u.email,
                        uid: u.uid,
                        isAdmin: false
                    }); 
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
                    
            },
            
            async fetchUsuarioById(id){
                const docRef = doc(db, "usuarios", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    this.user = {...docSnap.data(), id: id, valido: true, loading: false}
                    console.log(this.user)
                    return true
                  } else {
                    this.user.loading = false
                   // this.user.valido = false
                    // doc.data() will be undefined in this case
                    console.log("nao existe usuario com esse id:"+id);
                    return false
                  }
            }
        }
    });

