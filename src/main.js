import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router"




import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/lara-dark-teal/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css';                           //icons


import './style.css';

import { inicializarFirebase } from "../src/services/firebase"

 /* import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";

 import { firebaseConfig } from './firebaseConfig';

 import PrimeVue from 'primevue/config'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
 
appInstance.component('Column', Column)
appInstance.component('Dialog', Dialog)
appInstance.component('Datatable', DataTable)


// Initialize Firebase

const fireapp = initializeApp(firebaseConfig);

const db = getFirestore(fireapp); */

inicializarFirebase();

const pinia = createPinia();

if (localStorage.getItem("state")){
    pinia.state.value = JSON.parse(localStorage.getItem("state"));
}
  


const app = createApp(App);



app.use(router);
app.use(PrimeVue);



import DataTable from 'primevue/dataTable';
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import ConfirmationService from 'primevue/confirmationservice';


app.component('Column', Column)
app.component('Dialog', Dialog)
app.component('DataTable', DataTable)



app.use(pinia)
app.use(ConfirmationService)



app.mount('#app')





