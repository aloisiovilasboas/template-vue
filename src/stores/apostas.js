import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { setDoc, collection, getDocs, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase"
import router from "../router";
import jogos from '../assets/jogosdacopa.json';
import bandeiras from '../assets/linksBandeiras.json';

export const useApostasStore = defineStore("apostas", {
    state: () => {


        const completo = ref(false)
        const campeao = ref([])
        const mataMata = ref([])
        const grupos = ref([{ letra: 'a' }])
        const apostasRAW = ref({ grupos: null })

        //const apostas = ref([{letra:'',jogos:[],classificacao:[]}])
        /* 
        grupoTabs = [{letra:'Grupo A', jogos:[-jogosPorGrupoA-], classificacao:[{nome:Qatar,bandeira:qatar,p:0,v:0,s:0,gp:0},{nome...}] }]
        
        
        
        */
        const setApostasRAW = (newvalue) => {
            apostasRAW.value = newvalue;
            // console.log(apostas)
        }

        const setGrupos = (newvalue) => {
            grupos.value = newvalue;
            // console.log(apostas)
        }
        const setMatamata = (newvalue) => {
            mataMata.value = newvalue;
            // console.log(apostas)
        }
        const setCampeao = (newvalue) => {
            campeao.value = newvalue;
            // console.log(apostas)
        }
        const setCompleto = (newvalue) => {
            completo.value = newvalue;
            // console.log(apostas)
        }

        return {
            
            apostasRAW,
            setApostasRAW,

            grupos,
            mataMata,
            campeao,
            completo,
            setGrupos,
            setMatamata,
            setCampeao,
            setCompleto
        }
    },
    actions: {
        async cadastraApostas(uid, grupos, mataMata) {
            try {
                const docRef = await setDoc(doc(db, "apostas", uid), { grupos: grupos, mataMata: mataMata });
                this.setApostasRAW({ grupos: grupos, mataMata: mataMata })
                alert("Apostas cadastradas! Boa Sorte!");
                router.push('/')
                // console.log(doc);
                // console.log("Document written with ID: ", docRef.id);
                // linkCadastro.value = docRef.id
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        async fetchApostaById(id) {
            const docRef = doc(db, "apostas", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let d = { ...docSnap.data(), id: id }
                console.log(d)
                this.setApostasRAW(d)
                //      this.geraGrupos()
                return d
            } else {
                //this.user.loading = false
                // this.user.valido = false
                // doc.data() will be undefined in this case
                console.log("nao existe aposta com esse id:" + id);
                return false
            }
        },
        retira_acentos(str) {
            let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
            let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr".toLocaleLowerCase();
            let novastr = "";
            for (let i = 0; i < str.length; i++) {
                let troca = false;
                for (let a = 0; a < com_acento.length; a++) {
                    if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                        novastr += sem_acento.substr(a, 1);
                        troca = true;
                        break;
                    }
                }
                if (troca == false) {
                    novastr += str.substr(i, 1);
                }
            }
            return novastr;
        },

    }
});
