import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore ("loading" ,{
    state: () => {
        
        const loading = ref(false)
        
        const setLoading = (newvalue) => {
            loading.value = newvalue;
        }
        return {
            loading,
            setLoading
        }
    }
});
