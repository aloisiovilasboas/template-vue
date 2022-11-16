
<template>
    <div >
        <Card class="regras" >
            <template #header>
                <img src="../assets/fifa_world_cup_2022_official_cartoon_poster.png" />
                
            </template>
            <template #title>
          <!--       Bem vindo, {{ userStore.user.nome}} -->
                
            </template>
            
            <template #subtitle>
                Conclua o cadastro para participar do bolão
            </template>
            
            <template #content>
            <div class="about"><h2>Regras do Bolão</h2> <span style="display: inline-block; margin-top: 20px;"></span> <p class="paragrafo">
                Para participar do Bolão do AFC 2022, entre em contato com algum membro da organização. Em seguida, 
                clique no link fornecido pela organização e realize o seu cadastro. Atenção, o link é individual e intransferível 
                e funciona para um único cadastro. Preencha os dados das suas apostas e submeta os seus palpites até 
                as 13h do dia 20 de novembro de 2022, quando será dado o pontapé inicial da Copa do Mundo FIFA 2022. 
                Lembre que para garantir a sua inscrição, é preciso também, até a mesma data e horário,
                confirmar o pagamento da sua cota de R$50,00. Depois disso, é só aguardar os resultados dos jogos e 
                torcer pelas seleções que você apostou.
                </p> <p>
                  A pontuação do bolão se dará da seguinte forma:
                </p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Fase de Grupos</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>Acerto do vencedor com erro do placar – 1 Ponto
            </p> <p>Acerto do placar – 5 pontos
            </p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Oitavas de Final</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>Acerto de seleção classificada – 8 pontos (Independentemente da posição) </p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Quartas de Final</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>Acerto de seleção classificada – 10 pontos</p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Semifinais</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>Acerto de seleção classificada – 15 pontos</p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Final</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>Acerto de seleção classificada – 20 pontos</p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Campeão</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>Acerto da seleção campeã – 30 pontos</p> <span style="display: inline-block; margin-top: 20px;"></span> <h4>Premiação</h4> <span style="display: inline-block; margin-top: 20px;"></span> <p>O vencedor do bolão será aquele que fizer mais pontos e leva todo o valor arrecadado. Em caso de empate, o prêmio será dividido.</p> <span style="display: inline-block; margin-top: 20px;"></span></div>
        </template>
        </Card>
    </div>
</template>

<script setup>
    import Card from 'primevue/card';
</script>