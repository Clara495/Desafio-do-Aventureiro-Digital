// VARIAVEL etapa atual do jogo. 
//Se houver um valor armazenado no localStorage com a chave "currentStep", ele será recuperado, convertido para número (parseInt()) e usado.
//Se não houver valor armazenado, currentStep será inicializado com 0.
export let etapaAtual = localStorage.getItem("etapaAtual") ? parseInt(localStorage.getItem("etapaAtual")) : 0;
// VARIAVEL número de vidas
export let vidas = 3;
// array vazio, representa o inventário do jogador.
export let inventory = [];

// array de etapas do jogo
const historia = [
    {
        text: "Você não consegue enxergar nada além da escuridão. O cheiro de mofo e umidade impregna o ar, e o silêncio é perturbador.Seu coração acelera. Há apenas dois caminhos: seguir em frente ou recuar.",

        choices: ["Seguir", "Recuar"],
        outcomes: [1, 2]
    },
    {
        // opção 1 - SEGUIR
        text: " Com passos cautelosos, você avança. O chão range sob seus pés, e um arrepio percorre sua espinha. De repente, uma luz fraca surge ao final do túnel. Conforme se aproxima, percebe que as paredes estão cobertas de lodo, e o cheiro de podridão se intensifica. O local parece um hospital ou um prédio abandonado. Um barulho distante ecoa. Passos? Algo se move na escuridão atrás de você. Seus instintos gritam para correr, mas para onde?",

        choices: ["Investigar o som", "Correr na direção da luz"],
        outcomes: [3, 5]
    },
    {
        // opção 2 - RECUAR
        text: "Você hesita e decide dar um passo para trás. O chão some sob seus pés, e uma sensação de queda toma conta do seu corpo. Você tenta gritar, mas o som é abafado. Seu corpo despenca em um vazio sem fim... até que de repente, desperta. Está de volta ao necrotério, ofegante. Seu jaleco está suado, e sua mesa de anotações está desorganizada. Foi apenas um pesadelo? O relógio marca exatamente o mesmo horário de antes. Algo parece errado. De repente, um som metálico ecoa da sala ao lado. Você realmente acordou... ou ainda está presa em um pesadelo.",

        choices: ["Investigar o barulho", "Ignorar e tentar sair do necrotério"],
        outcomes: [3, 4]
    },
    {
        // opção 3 - INVESTIGAR
        text: "Você reúne coragem e caminha na direção do som. Seus passos ecoam no corredor úmido. O cheiro de podridão se intensifica. Quando vira a esquina, encontra uma porta entreaberta. Lá dentro, um homem está sentado, de costas para você. Suas roupas parecem antigas e empoeiradas. Seu corpo está rígido, como se estivesse petrificado. Você se aproxima cautelosamente.",

        choices: ["Chamá-lo", "Fugir dali e seguir pelo corredor"],
        outcomes: [7, 4]
    },
    {
        // opção 4 - IGNORAR
        text: "Seu instinto diz para sair dali. Você corre pelo corredor sem olhar para trás. A luz fraca se torna mais intensa, e você encontra uma porta enferrujada. Ao empurrá-la, se vê do lado de fora. O céu é escuro, mas o ar não parece tão pesado. Você escapou... por enquanto.",
        choices: ["Finalizar jogo"],
        outcomes: ["home"]
    },
    {
        // opção 5 - CORRE LUZ
        text: "Você ignora o som e dispara em direção à luz. Seus pés escorregam no chão úmido, mas você se mantém firme.A luz vem de uma sala com janelas quebradas. O vento gélido entra, trazendo um cheiro estranho. Você vê uma porta ao fundo.",
        choices: ["Abrir a porta rapidamente e sair", "Observar melhor antes de sair"],
        outcomes: [8, 6]
    },
    {
        // opção 6 - OBSERVAR
        text: "Você hesita. Algo parece errado. Ao olhar pela fresta da porta, percebe que há um abismo lá fora. Se tivesse saído correndo, teria caído. Ao invés disso, você segue pelo canto da sala e encontra outra saída. Um corredor iluminado leva para fora do prédio. Quando sai, O céu está nublado, mas o ar não parece tão pesado. Você escapou...",
        choices: ["Finalizar jogo"],
        outcomes: ["home"]
    },

 {
        // opção 7 - MORTE MONSTRO
        text: "Senhor, você está bem? você pergunta. A figura se move lentamente. Seu pescoço vira em um ângulo impossível, revelando um rosto desfigurado, olhos vazios e um sorriso macabro. Antes que possa reagir, a coisa se lança sobre você, suas mãos podres agarram seu rosto e a escuridão toma conta. Você não consegue gritar. Você foi tomada por SeteAlém.",
        choices: ["X"],
        outcomes: ["loseLife"]
    },

 {
        // opção 8 - MORTE PORTA
        text: "Você gira a maçaneta e empurra a porta com força. Mas, assim que pisa para fora, o chão desaparece sob seus pés. Você cai em um vazio infinito. Gritos e sussurros invadem sua mente enquanto a escuridão a consome. Você nunca saiu de SeteAlém.",
        choices: ["X"],
        outcomes: ["loseLife"]
    },

];

// Atualiza a história 
export function update() {
    // elementos HTML onde serão exibidos a história, as escolhas e a contagem de vidas.
    const historiaDiv = document.getElementById("historia");
    const escDiv = document.getElementById("escolha");
    const vidaSpan = document.getElementById("vidas");

    // Atualiza o texto da história
    historiaDiv.textContent = historia[etapaAtual].text;
    escDiv.innerHTML = "";  // Limpa as escolhas antigas
    vidaSpan.textContent = vidas; // Exibe as vidas atuais

    // Cria botões para as escolhas
    historia[etapaAtual].choices.forEach((esc, index) => {
        const button = document.createElement("button");
        button.textContent = esc;
        button.onclick = () => handleEscolha(index);
        escDiv.appendChild(button);
    });
}

// Lida com a escolha feita pelo jogador
function handleEscolha(escIndex) {
    const outcome = historia[etapaAtual].outcomes[escIndex];

    // verifica de a escolha feita pelo jogador é morte, se for ele perde -1 vida
    if (outcome === "loseLife") {
        vidas--; // Perde 1 vida
        localStorage.setItem("vidas", vidas); // Salva no localStorage
        // verifica se as vidas acabaram, se sim então é gamer over e o jogo reinicia com as vidas completa
        if (vidas <= 0) {
            gameOver(); 
            return;
        }

        // alerta para informar que o jogador perdeu 1 vida
        alert("Você caiu na armadilha de SeteAlém. Você perdeu 1 vida!");
        etapaAtual = 0;  // Volta para o início

    // verifica se a opção selecionada é para voltar ao inicio do jogo. Opção que aparece quando o jogador ganha
    } else if (outcome === "home") {
        window.location.href = "inicio.html"; // direciona ao inicio
        return;
    } else {
        etapaAtual = outcome; // Avança para a próxima etapa
        localStorage.setItem("etapaAtual", etapaAtual); // Salva progresso
    }

    update();  
}

// Função de game over
function gameOver() {
    // elemento HTML onde o texto da história e opções de escolha será exibido
    const historiaDiv = document.getElementById("historia");
    const escDiv = document.getElementById("escolha");

    historiaDiv.textContent = "GAME OVER! Você perdeu todas as suas vidas! 💀"; // Define o texto da história para exibir a mensagem de "GAME OVER"
    escDiv.innerHTML = ""; // Remove as opções anteriores

    const restartButton = document.createElement("button"); // Cria um novo botão para reiniciar o jogo
    restartButton.textContent = "Reiniciar Jogo"; // Define o texto do botão
    restartButton.onclick = resetGame; // Adiciona um evento ao botão: quando clicado, ele chamará a função resetGame
    escDiv.appendChild(restartButton); // Adiciona o botão de reiniciar ao elemento que exibe as escolhas do jogador
    
}

// Função de reiniciar o jogo
function resetGame() {
    etapaAtual = 0; // Reinicia para a primeira etapa
    vidas = 3; // Restaura as 3 vidas
    inventory = []; // Limpa o inventário do jogador
    update();  // Atualiza a interface com o início do jogo
}
