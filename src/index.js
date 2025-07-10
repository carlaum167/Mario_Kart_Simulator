const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
     NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

//função para rolar dado
async function rollDice(){
   return Math.floor(Math.random() * 6) + 1;
}

//função para sortear o tipo de pista
async function getRandomBlock(){
    let random = Math.random()
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break; 
        default:
            result = "CONFRONTO"
    }

    return result
}

//função para exibir informações de rolagem na tela
async function logRollResult(characterName, block, diceResult, attribute){
    
    console.log(`${characterName} 🎲 Rolou um dado de ${block} 
        ${diceResult} + ${attribute} = ${diceResult + attribute} `);
      

}

// motor para o jogo funcionar
async function playRaceEngine(character1, character2) {

    for(let round = 1; round <=5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco (tipo depista)
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // teste de habilidade

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if(block === "RETA"){
        totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
        totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

        await logRollResult(
            character1.NOME,
            "velocidade",
            diceResult1, 
            character1.VELOCIDADE
        );
        await logRollResult(
            character2.NOME,
            "velocidade",
            diceResult2, 
            character2.VELOCIDADE
        );
    }

    if(block === "CURVA"){
        totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
        totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

         await logRollResult(
            character1.NOME,
            "manobrabilidade",
            diceResult1, 
            character1.MANOBRABILIDADE
        );
        await logRollResult(
            character2.NOME,
            "manobrabilidade",
            diceResult2, 
            character2.MANOBRABILIDADE
        );
        

    }
    if(block === "CONFRONTO"){
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;

        console.log(`${character1.NOME} confrontou o ${character2.NOME}!`);

        await logRollResult(
            character1.NOME,
            "poder",
            diceResult1, 
            character1.PODER
        );
        await logRollResult(
            character2.NOME,
            "poder",
            diceResult2, 
            character2.PODER
        );

        character2.PONTOS -= 
          powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1: 0;

        character1.PONTOS -=
          powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1: 0;

          console.log(powerResult2 === powerResult1
             ? "Houve um empate no confronto, nenhum ponto descontado" 
             : " "
          );
       
    }

    //verificação de vencedor
    if(totalTestSkill1 > totalTestSkill2){
        console.log(`${character1.NOME} marcou um ponto!`);
        character1.PONTOS++;
    } else if(totalTestSkill2 > totalTestSkill1){
        console.log(`${character2.NOME} marcou um ponto!`);
        character2.PONTOS++;
    }


    console.log("-------------------------------------------");
    }
    
}

(async function main(){
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`      
    );

   await playRaceEngine(player1, player2);
})();

