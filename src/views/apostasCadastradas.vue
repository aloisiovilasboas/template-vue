<template>
    <!-- <div v-if="!apostasStore.apostaCadastrada">
        <h1>erro ao carregar apostas</h1>
    </div>
-->
    <div v-if="apostasStore.apostasRAW.grupos === null">
        <h3>Carregando...</h3>
        <ProgressSpinner />
    </div>
    <div v-else style="display: flex ; flex-direction: column ;">
        <div>
            <TabView :scrollable="true">
                <TabPanel v-for="tab in apostasStore.grupos" :key="tab.letra" :header="tab.completo">
                    <div class="painelDeApostas">
                        <div class="agenda">
                            <div v-for="jogo in tab.jogos" :key="jogo.matchNumber" class="agenda__game">
                                <div class="nomeDoJogo">
                                    <span>{{ jogo.stadium }}</span>
                                </div>
                                <div class="agenda__game__container">
                                    <div class="agenda__game__team--left col-4">

                                        <div v-html="'<img src =' + jogo.homeFlagurl +  ' class=bandeirinha >'" layout="responsive"
                                            class="agenda__game__team__shield">
                                        </div>
                                        <div class="agenda__game__team__name">
                                            {{ jogo.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="agenda__game__info2 col-4">
                                        <div>
                                            {{ jogo.resultA }}
                                        </div>
                                        X
                                        <div>
                                            {{ jogo.resultB }}
                                        </div>
                                    </div>
                                    <div class="agenda__game__team--right col-4">
                                        <div class="agenda__game__team__shield">

                                            <div v-html="'<img src =' + jogo.awayFlagurl + ' class=bandeirinha >'" layout="responsive"
                                                class="agenda__game__team__shield">
                                            </div>
                                        </div>
                                        <div class="agenda__game__team__name"> {{ jogo.awayTeam }}
                                        </div>
                                    </div>
                                </div>
                                <div class="agenda__game__info__time">{{ jogo.date }}</div>
                                <div class="col-10">
                                    <hr>
                                </div>
                            </div>
                        </div>
                    </div>


                    <DataTable :value="tab.classificacao" class="p-datatable-sm" responsiveLayout="scroll">
                        <Column header="">
                            <template #body="{ data }">
                                {{ data.colocacao }}
                            </template>
                        </Column>

                        <Column header="Classificação" style="min-width:12rem">
                            <template #body="{ data }">
                                <div class="nomeEbandeira">
                                    <div v-html="'<img src = ' + data.bandeira +  ' class=bandeirinha >'" layout="responsive"
                                        class="agenda__game__team__shield">
                                    </div>
                                    <span class="image-text agenda__game__team__name">{{ data.nome }}</span>
                                </div>
                            </template>
                        </Column>
                        <Column field="p" header="P"></Column>
                        <Column field="v" header="V"></Column>
                        <Column field="sg" header="SG"></Column>
                        <Column field="gp" header="GP"></Column>
                    </DataTable>
                    <!--  </div> -->
                </TabPanel>
                <TabPanel v-for="tab in apostasStore.mataMata" :key="tab.fase" :header="tab.completo">
                    <div class="painelDeApostas">
                        <div class="agenda">
                            <div v-for="jogo, indexj in tab.jogos" :key="jogo.matchNumber" class="agenda__game">
                                <div class="nomeDoJogo">
                                    <span>{{ jogo.stadium }}</span>
                                </div>


                                <div class="agenda__game__container">
                                    <div class="agenda__game__team--left col-4">
                                        

                                        <div v-if="jogo.homeFlagurl != null"
                                            v-html="'<img src =' + jogo.homeFlagurl + ' class=bandeirinha >'" layout="responsive"
                                            class="agenda__game__team__shield">
                                        </div>
                                        <div class="agenda__game__team__name">
                                            {{ jogo.homeTeam }}
                                        </div>
                                    </div>
                                    <div class="agenda__game__info2 col-4">
                                        <RadioButton inputId=jogo.inputidhome name=jogo.matchNumber value=home
                                            :disabled="true"
                                            @change="updatePartidaMatamata(jogo, tab.fase)" v-model="jogo.winner" />
                                        <div>X</div>
                                        <RadioButton inputId=jogo.inputidaway name=jogo.matchNumber value=away
                                            :disabled="true"
                                            @change="updatePartidaMatamata(jogo, tab.fase)" v-model=jogo.winner />
                                    </div>
                                    <div class="agenda__game__team--right col-4">
                                        <div class="agenda__game__team__shield">

                                            <div v-if="jogo.awayFlagurl != null"
                                                v-html="'<img src =' + jogo.awayFlagurl + ' class=bandeirinha >'" layout="responsive"
                                                class="agenda__game__team__shield">
                                            </div>
                                        </div>
                                        <div class="agenda__game__team__name"> {{ jogo.awayTeam }}
                                        </div>
                                    </div>
                                </div>



                                <div class="agenda__game__info__time">{{ jogo.date }}</div>
                                <div class="col-10">
                                    <hr v-if="indexj != tab.jogos.length - 1">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="(tab.fase === 'Final')">
                        <Panel>
                            <template #header>
                                Campeão
                            </template>
                            <div class="campeao">
                                <div class="agenda__game__team__shield__center">
                                    <div v-html="'<img src =' + apostasStore.campeao[0].flagurl + ' class=bandeirinha >'"
                                        layout="responsive" class="agenda__game__team__shield">
                                    </div>
                                </div>
                                <div class="agenda__game__team__name"> {{ apostasStore.campeao[0].team }}
                                </div>
                            </div>
                        </Panel>
                    </div>
                </TabPanel>

            </TabView>

        </div>

    </div>
</template>
<script setup>

import { getStorage, getDownloadURL } from "firebase/storage";
import ProgressSpinner from 'primevue/progressspinner';
import { ref as ref2 } from "firebase/storage"
import { onBeforeMount, ref, onServerPrefetch, onMounted, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Image from "primevue/image";
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton'
import TabPanel from 'primevue/TabPanel';
import Panel from 'primevue/panel'
import TabView from 'primevue/TabView';
import jogos from '../assets/jogosdacopa.json';
import paises from '../assets/nomepaises.json';
import bandeiras from '../assets/linksBandeiras.json';
import { useApostasStore } from "../stores/apostas";
import { useUserStore } from "../stores/user";


const todosOsJogos = jogos.jogos;
const todosOsPaises = paises.paises
const todasAsBandeiras = bandeiras.bandeiras
const loading = ref(true)
const gruposTabs = reactive([])
const matamataTabs = reactive([])
const campeao = reactive([])
const completo = ref(false)
//const bandeiras = ref([])
const userStore = useUserStore()
const apostasStore = useApostasStore();
const storage = getStorage();


onMounted(async () => {
    //   console.log(apostasStore);

    mostraGrupos()


})


function retira_acentos(str) {
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
}

const mostraGrupos = () => {

    let letrasGrupos = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
    let nomefases = ['Oitavas', 'Quartas', 'Semifinais', 'Final']

    let jogosPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
    let timesPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
    let jogosmataMata = { 'Oitavas': [], 'Quartas': [], 'Semifinais': [], 'Final': [] }
    //console.log(todosOsJogos)   
    todosOsJogos.forEach(element => {
        element.homeFlag = retira_acentos(element.homeTeam);
        element.homeFlag = element.homeFlag.replace(/\s/g, '').toLowerCase();
        element.awayFlag = retira_acentos(element.awayTeam);
        element.awayFlag = element.awayFlag.replace(/\s/g, '').toLowerCase();
        if (element.group) {
            element.homeFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === element.homeFlag).bandeira
            element.awayFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === element.awayFlag).bandeira
            jogosPorGrupo[element.group].push(element)
            if (!timesPorGrupo[element.group].includes(element.homeTeam)) {
                timesPorGrupo[element.group].push(element.homeTeam)
            }
        } else if (element.roundNumber != 'Terceiro') {
            element.inputidhome = element.homeTeam
            element.inputidaway = element.awayTeam
            jogosmataMata[element.roundNumber].push(element)

        }
    });
    gruposTabs.value = letrasGrupos.map((nomeGrupo) => {
        return { letra: nomeGrupo, jogos: {}, classificacao: [] }
    })
    matamataTabs.value = nomefases.map((nomeFase) => {
        return { fase: nomeFase, jogos: {} }
    })

    gruposTabs.value.forEach((grupo) => {
        grupo.jogos = jogosPorGrupo[grupo.letra]
        grupo.completo = grupo.letra

        grupo.classificacao = timesPorGrupo[grupo.letra].map((nometime, index) => {
            let b = nometime.replace(/\s/g, '')
            return { nome: nometime, colocacao: index + 1 + 'º', bandeira: todasAsBandeiras.find(bandeira => bandeira.pais === retira_acentos(b).replace(/\s/g, '').toLowerCase()).bandeira, p: 0, v: 0, e: 0, d: 0, s: 0, gp: 0, gc: 0 }
        })
    })
    matamataTabs.value.forEach((etapa) => {
        etapa.jogos = jogosmataMata[etapa.fase]
        etapa.completo = etapa.fase
    })
    campeao.value = [{ flagurl: null }]



    apostasStore.setGrupos(gruposTabs.value)
    apostasStore.setMatamata(matamataTabs.value)
    apostasStore.setCampeao(campeao.value)

    console.log(apostasStore.apostasRAW);
    if (apostasStore.apostasRAW.grupos !== null) {
         apostasStore.apostasRAW.grupos.forEach(grupo => {
            let grupoIndex = gruposTabs.value.findIndex(g => g.letra === grupo.letra)
            gruposTabs.value[grupoIndex].jogos.forEach(jogo =>{
                let jogoIndex = grupo.jogos.findIndex(j => j.matchNumber === jogo.matchNumber)
                jogo.resultA = grupo.jogos[jogoIndex].resultA
                jogo.resultB = grupo.jogos[jogoIndex].resultB
                
            })
            calculaPontuacaoGrupo(grupoIndex)
            ordenaTabela(grupoIndex)
            //console.log(gruposTabs.value[grupoIndex].jogos);
        }); 
        apostasStore.apostasRAW.mataMata.forEach(fase => {
            let faseIndex = matamataTabs.value.findIndex(f => f.fase === fase.fase)
            matamataTabs.value[faseIndex].jogos.forEach(jogo =>{
                let jogoIndex = fase.jogos.findIndex(j => j.matchNumber === jogo.matchNumber)
                jogo.homeTeam = fase.jogos[jogoIndex].homeTeam
                jogo.awayTeam = fase.jogos[jogoIndex].awayTeam
                jogo.winner = fase.jogos[jogoIndex].winner
        
                jogo.homeFlag = retira_acentos(jogo.homeTeam);
                jogo.homeFlag = jogo.homeFlag.replace(/\s/g, '').toLowerCase();
                jogo.awayFlag = retira_acentos(jogo.awayTeam);
                jogo.awayFlag = jogo.awayFlag.replace(/\s/g, '').toLowerCase();
                jogo.homeFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === jogo.homeFlag).bandeira
                jogo.awayFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === jogo.awayFlag).bandeira
            
            })
        })
        let finaltab = matamataTabs.value[matamataTabs.value.length-1].jogos[0]
        let final = apostasStore.apostasRAW.mataMata[apostasStore.apostasRAW.mataMata.length - 1].jogos[0]
        if (final.winner =='home'){
            apostasStore.campeao[0].flagurl = finaltab.homeFlagurl
            apostasStore.campeao[0].team = finaltab.homeTeam
        } else {
            apostasStore.campeao[0].flagurl = finaltab.awayFlagurl
            apostasStore.campeao[0].team = finaltab.awayTeam
        }   
    }
}

const geraGrupos = () => {
    let letrasGrupos = ['Grupo A', 'Grupo B', 'Grupo C', 'Grupo D', 'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H']
    let nomefases = ['Oitavas', 'Quartas', 'Semifinais', 'Final']

    let jogosPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
    let timesPorGrupo = { 'Grupo A': [], 'Grupo B': [], 'Grupo C': [], 'Grupo D': [], 'Grupo E': [], 'Grupo F': [], 'Grupo G': [], 'Grupo H': [] }
    let jogosmataMata = { 'Oitavas': [], 'Quartas': [], 'Semifinais': [], 'Final': [] }
    //console.log(todosOsJogos)   
    todosOsJogos.forEach(element => {
        element.homeFlag = retira_acentos(element.homeTeam);
        element.homeFlag = element.homeFlag.replace(/\s/g, '').toLowerCase();
        element.awayFlag = retira_acentos(element.awayTeam);
        element.awayFlag = element.awayFlag.replace(/\s/g, '').toLowerCase();
        if (element.group) {
            element.homeFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === element.homeFlag).bandeira
            element.awayFlagurl = todasAsBandeiras.find(bandeira => bandeira.pais === element.awayFlag).bandeira
            jogosPorGrupo[element.group].push(element)
            if (!timesPorGrupo[element.group].includes(element.homeTeam)) {
                timesPorGrupo[element.group].push(element.homeTeam)
            }
        } else if (element.roundNumber != 'Terceiro') {
            element.inputidhome = element.homeTeam
            element.inputidaway = element.awayTeam
            jogosmataMata[element.roundNumber].push(element)

        }
    });
    gruposTabs.value = letrasGrupos.map((nomeGrupo) => {
        return { letra: nomeGrupo, jogos: {}, classificacao: [] }
    })
    matamataTabs.value = nomefases.map((nomeFase) => {
        return { fase: nomeFase, jogos: {} }
    })

    gruposTabs.value.forEach((grupo) => {
        grupo.jogos = jogosPorGrupo[grupo.letra]
        grupo.completo = grupo.letra

        grupo.classificacao = timesPorGrupo[grupo.letra].map((nometime, index) => {
            let b = nometime.replace(/\s/g, '')
            return { nome: nometime, colocacao: index + 1 + 'º', bandeira: todasAsBandeiras.find(bandeira => bandeira.pais === retira_acentos(b).replace(/\s/g, '').toLowerCase()).bandeira, p: 0, v: 0, e: 0, d: 0, sg: 0, gp: 0, gc: 0 }
        })
    })
    matamataTabs.value.forEach((etapa) => {
        etapa.jogos = jogosmataMata[etapa.fase]
        etapa.completo = etapa.fase
    })
    campeao.value = [{ flagurl: null }]
    apostasStore.setGrupos(gruposTabs.value)
    apostasStore.setMatamata(matamataTabs.value)
    apostasStore.setCampeao(campeao.value)

    console.log(campeao.value);


}


const updatePartida = ((nometime1, nometime2, nomegrupo) => {
    // console.log(bandeiras.value)


    let grupoIndex = gruposTabs.value.findIndex(grupo => grupo.letra === nomegrupo)
    let timeIndex1 = gruposTabs.value[grupoIndex].classificacao.findIndex(time => time.nome === nometime1)
    let timeIndex2 = gruposTabs.value[grupoIndex].classificacao.findIndex(time => time.nome === nometime2)
    calculaPontuacao(timeIndex1, grupoIndex)
    calculaPontuacao(timeIndex2, grupoIndex)
    ordenaTabela(grupoIndex)

    let completo = true;
    gruposTabs.value[grupoIndex].classificacao.forEach((time) => {
        if (time.v + time.e + time.d !== 3) {
            completo = false
        }
    })
    if (completo) {
        updateOitavas(grupoIndex)
        gruposTabs.value[grupoIndex].completo = '✓ ' + gruposTabs.value[grupoIndex].letra
    } else {
        desmarcaOitavas(grupoIndex)
        gruposTabs.value[grupoIndex].completo = gruposTabs.value[grupoIndex].letra
    }
})

const updatePartidaMatamata = ((jogo, fase) => {
    let matchNumber = jogo.matchNumber
    let numFase = -1
    if (fase === 'Oitavas') {
        numFase = 0
    }
    else if (fase === 'Quartas') {
        numFase = 1
    }
    else if (fase === 'Semifinais') {
        numFase = 2
    } else if (fase === 'Final') {
        numFase = 3
    }
    if (numFase <= 3 && numFase >= 0) {
        //pega o vencedor
        let winner = null
        if (jogo.winner === 'home') {
            winner = { 'team': jogo.homeTeam, 'flagurl': jogo.homeFlagurl }
        } else if (jogo.winner === 'away') {
            winner = { 'team': jogo.awayTeam, 'flagurl': jogo.awayFlagurl }
        }
        //calcula completo
        let completo = true
        matamataTabs.value[numFase].jogos.forEach((jogofase) => {
            if (jogofase.winner === null) {
                completo = false
            }
        })
        if (completo) {
            matamataTabs.value[numFase].completo = '✓ ' + matamataTabs.value[numFase].fase
        } else {
            matamataTabs.value[numFase].completo = matamataTabs.value[numFase].fase
        }
        if (numFase <= 2) {
            //ve se o ganhador eh home ou away na prox fase
            let home = true
            let jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((jogo) => jogo.inputidhome.slice(-1) === matchNumber.toString().slice(-1));
            if (jogoindex === -1) {
                home = false
                jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((jogo) => jogo.inputidaway.slice(-1) === matchNumber.toString().slice(-1));
            }
            if (home) {
                matamataTabs.value[numFase + 1].jogos[jogoindex].homeTeam = winner.team
                matamataTabs.value[numFase + 1].jogos[jogoindex].homeFlagurl = winner.flagurl
                matamataTabs.value[numFase + 1].jogos[jogoindex].winner = null
            } else {
                matamataTabs.value[numFase + 1].jogos[jogoindex].awayTeam = winner.team
                matamataTabs.value[numFase + 1].jogos[jogoindex].awayFlagurl = winner.flagurl
                matamataTabs.value[numFase + 1].jogos[jogoindex].winner = null
            }
            //desmarca prox fase como completo e chama pra as proximas
            matamataTabs.value[numFase + 1].completo = matamataTabs.value[numFase + 1].fase
            desmarcaFasesSeguintes(matamataTabs.value[numFase + 1].jogos[jogoindex], numFase + 1)
        } else {
            console.log('final decidida')
            console.log(winner)

            apostasStore.setCompleto(true)
            campeao.value[0].team = winner.team
            campeao.value[0].flagurl = winner.flagurl
        }
    }
})

const desmarcaFasesSeguintes = ((jogo, numFase) => {
    // todo campeao
    let matchNumber = jogo.matchNumber
    if (numFase <= 2) {
        //ve se o ganhador eh home ou away na prox fase
        let home = true
        let jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((j) => j.inputidhome.slice(-1) === matchNumber.toString().slice(-1));
        if (jogoindex === -1) {
            home = false
            jogoindex = matamataTabs.value[numFase + 1].jogos.findIndex((j) => j.inputidaway.slice(-1) === matchNumber.toString().slice(-1));
        }

        //desmarca jogo e fasecompleto da seguinte
        let jogoSeguinte = matamataTabs.value[numFase + 1].jogos[jogoindex]
        jogoSeguinte.winner = null
        //desmarca home ou away da fase seguinte
        if (home) {
            jogoSeguinte.homeTeam = jogoSeguinte.inputidhome
            jogoSeguinte.homeFlagurl = null
        } else {
            jogoSeguinte.awayTeam = jogoSeguinte.inputidaway
            jogoSeguinte.awayFlagurl = null
        }
        matamataTabs.value[numFase + 1].completo = matamataTabs.value[numFase + 1].fase
        desmarcaFasesSeguintes(matamataTabs.value[numFase + 1].jogos[jogoindex], numFase + 1)

    } else if (numFase === 3) {
        apostasStore.setCompleto(false)
        campeao.value[0].team = null
        campeao.value[0].flagurl = null
    }

})



const updateOitavas = ((grupoIndex) => {
    let grupo = gruposTabs.value[grupoIndex]
    let letra = grupo.letra

    //console.log(letra.slice(-1))

    let jogoindex1 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidhome.slice(-1) === letra.slice(-1));
    //console.log(grupo.classificacao);
    matamataTabs.value[0].jogos[jogoindex1].homeTeam = grupo.classificacao[0].nome
    matamataTabs.value[0].jogos[jogoindex1].homeFlagurl = grupo.classificacao[0].bandeira
    matamataTabs.value[0].jogos[jogoindex1].winner = null

    let jogoindex2 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidaway.slice(-1) === letra.slice(-1));
    matamataTabs.value[0].jogos[jogoindex2].awayTeam = grupo.classificacao[1].nome
    matamataTabs.value[0].jogos[jogoindex2].awayFlagurl = grupo.classificacao[1].bandeira
    matamataTabs.value[0].jogos[jogoindex2].winner = null

    matamataTabs.value[0].completo = matamataTabs.value[0].fase
    desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex1], 0)
    desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex2], 0)

    //matamataTabs.value.findIndex(grupo => grupo.letra === nomegrupo.slice(-1))

})
const desmarcaOitavas = ((grupoIndex) => {
    let grupo = gruposTabs.value[grupoIndex]
    let letra = grupo.letra

    let jogoindex1 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidhome.slice(-1) === letra.slice(-1));
    matamataTabs.value[0].jogos[jogoindex1].homeTeam = matamataTabs.value[0].jogos[jogoindex1].inputidhome
    matamataTabs.value[0].jogos[jogoindex1].winner = null
    matamataTabs.value[0].jogos[jogoindex1].homeFlagurl = null

    let jogoindex2 = matamataTabs.value[0].jogos.findIndex((jogo) => jogo.inputidaway.slice(-1) === letra.slice(-1));
    matamataTabs.value[0].jogos[jogoindex2].awayTeam = matamataTabs.value[0].jogos[jogoindex2].inputidaway
    matamataTabs.value[0].jogos[jogoindex2].awayFlagurl = null
    matamataTabs.value[0].jogos[jogoindex2].winner = null

    matamataTabs.value[0].completo = matamataTabs.value[0].fase
    desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex1], 0)
    //   desmarcaFasesSeguintes(matamataTabs.value[0].jogos[jogoindex2],0)

})


const ordenaTabela = ((grupoIndex) => {
    let partidas = gruposTabs.value[grupoIndex].jogos
    let tabela = gruposTabs.value[grupoIndex].classificacao
    tabela.sort((timea, timeb) => {
        // console.log(timea.p - timeb.p)
        if (timeb.p - timea.p !== 0) {
            return timeb.p - timea.p
        } else {
            if (timeb.sg - timea.sg !== 0) {
                return timeb.sg - timea.sg
            } else {
                if (timeb.gp - timea.gp !== 0) {
                    return timeb.gp - timea.gp
                } else {
                    //confronto direto
                    var pindex = partidas.findIndex((partida) => {
                        return ((partida.homeTeam === timea.nome && partida.awayTeam === timeb.nome) || (partida.homeTeam === timeb.nome && partida.awayTeam === timea.nome))
                    })
                    var partida = partidas[pindex]
                    if (partida.homeTeam === timea.nome && partida.awayTeam === timeb.nome) {
                        return partida.resultB - partida.resultA
                    } else {
                        return partida.resultA - partida.resultB
                    }
                }
            }
        }
    })
    tabela.forEach((time, index) => {
        time.colocacao = index + 1 + 'º'
    })


})

const calculaPontuacaoGrupo = ((grupoIndex) => {
    let jogos = gruposTabs.value[grupoIndex].jogos
    //let time = gruposTabs.value[grupoIndex].classificacao[timeIndex]
    gruposTabs.value[grupoIndex].classificacao.forEach(time => {
    time.p = 0
    time.v = 0
    time.e = 0
    time.d = 0
    time.gp = 0
    time.gc = 0
    time.sg = 0
    jogos.forEach(partida => {
        if (((partida.resultA !== '' && partida.resultB !== '') && (partida.resultA !== null && partida.resultB !== null)) && (!isNaN(partida.resultA) && !isNaN(partida.resultB))) {
            if (time.nome === partida.homeTeam) {
                time.gp += Number(partida.resultA)
                time.gc += Number(partida.resultB)
                if (Number(partida.resultA) > Number(partida.resultB)) {
                    time.p += 3
                    time.v += 1
                } else if (partida.resultA === partida.resultB) {
                    time.p += 1
                    time.e += 1
                } else {
                    time.d += 1
                }
            } else if (time.nome === partida.awayTeam) {
                time.gp += Number(partida.resultB)
                time.gc += Number(partida.resultA)
                if (Number(partida.resultA) < Number(partida.resultB)) {
                    time.p += 3
                    time.v += 1
                } else if (partida.resultA === partida.resultB) {
                    time.p += 1
                    time.e += 1
                } else {
                    time.d += 1
                }
            }
        } else {
            if (isNaN(partida.resultA)) {
                partida.resultA = ''
            } else if (isNaN(partida.resultB)) {
                partida.resultB = ''
            }
        }
    })
    time.sg = Number(time.gp) - Number(time.gc)
    //gruposTabs.value[grupoIndex].classificacao[timeIndex] = time
    })
})

const calculaPontuacao = ((timeIndex, grupoIndex) => {
    let jogos = gruposTabs.value[grupoIndex].jogos
    let time = gruposTabs.value[grupoIndex].classificacao[timeIndex]

    // console.log(jogos)

    time.p = 0
    time.v = 0
    time.e = 0
    time.d = 0
    time.gp = 0
    time.gc = 0
    time.sg = 0
    jogos.forEach(partida => {
        if (((partida.resultA !== '' && partida.resultB !== '') && (partida.resultA !== null && partida.resultB !== null)) && (!isNaN(partida.resultA) && !isNaN(partida.resultB))) {
            if (time.nome === partida.homeTeam) {
                time.gp += Number(partida.resultA)
                time.gc += Number(partida.resultB)
                if (Number(partida.resultA) > Number(partida.resultB)) {
                    time.p += 3
                    time.v += 1
                } else if (partida.resultA === partida.resultB) {
                    time.p += 1
                    time.e += 1
                } else {
                    time.d += 1
                }
            } else if (time.nome === partida.awayTeam) {
                time.gp += Number(partida.resultB)
                time.gc += Number(partida.resultA)
                if (Number(partida.resultA) < Number(partida.resultB)) {
                    time.p += 3
                    time.v += 1
                } else if (partida.resultA === partida.resultB) {
                    time.p += 1
                    time.e += 1
                } else {
                    time.d += 1
                }
            }
        } else {
            if (isNaN(partida.resultA)) {
                partida.resultA = ''
            } else if (isNaN(partida.resultB)) {
                partida.resultB = ''
            }
        }
    })
    time.sg = Number(time.gp) - Number(time.gc)
    gruposTabs.value[grupoIndex].classificacao[timeIndex] = time
})

const podeCadastrar = (() => {
    return apostasStore.completo
});

const cadastraApostas = () => {
    //  console.log(userStore.authuser.uid);
    let grupos = []
    apostasStore.grupos.forEach((grupo) => {
        let jogos = []
        let letra = grupo.letra
        grupo.jogos.forEach(jogo => {
            jogos.push({ matchNumber: jogo.matchNumber, resultA: jogo.resultA, resultB: jogo.resultB })
        });
        grupos.push({ letra: letra, jogos: jogos })
    });
    let matamata = []

    apostasStore.mataMata.forEach((f) => {
        let jogos = []
        let fase = f.fase
        f.jogos.forEach((jogo) => {
            jogos.push({ matchNumber: jogo.matchNumber, homeTeam: jogo.homeTeam, awayTeam: jogo.awayTeam, winner: jogo.winner })
        })
        matamata.push({ fase: fase, jogos: jogos })
    });



    apostasStore.cadastraApostas(userStore.authuser.uid, grupos, matamata)
}

const carregarApostas = (() => {
    apostasStore.fetchApostaById(userStore.authuser.uid);


});


</script>