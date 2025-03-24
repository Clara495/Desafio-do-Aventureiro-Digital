export let currentStep = localStorage.getItem("currentStep") ? parseInt(localStorage.getItem("currentStep")) : 0;
export let lives = 3;
export let inventory = [];

const story = [
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
        // opção 7 - MORTE PORTA
        text: "Você gira a maçaneta e empurra a porta com força. Mas, assim que pisa para fora, o chão desaparece sob seus pés. Você cai em um vazio infinito. Gritos e sussurros invadem sua mente enquanto a escuridão a consome. Você nunca saiu de SeteAlém.",
        choices: ["X"],
        outcomes: ["loseLife"]
    },

];

// Atualiza a história na interface
export function updateStory() {
    const storyDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");
    const livesSpan = document.getElementById("lives");

    // Atualiza o texto da história
    storyDiv.textContent = story[currentStep].text;
    choicesDiv.innerHTML = "";  // Limpa as escolhas antigas
    livesSpan.textContent = lives; // Exibe as vidas atuais

    // Cria botões para as escolhas
    story[currentStep].choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.onclick = () => handleChoice(index);
        choicesDiv.appendChild(button);
    });
}

// Lida com a escolha feita pelo jogador
function handleChoice(choiceIndex) {
    const outcome = story[currentStep].outcomes[choiceIndex];

    if (outcome === "loseLife") {
        lives--; // Perde 1 vida
        localStorage.setItem("lives", lives); // Salva no localStorage
        if (lives <= 0) {
            gameOver(); 
            return;
        }
        alert("Você caiu na armadilha de SeteAlém. Você perdeu 1 vida!");
        currentStep = 0;  // Volta para o início

    } else if (outcome === "restart") {
        resetGame();
        
        return;
    } else if (outcome === "home") {
        window.location.href = "inicio.html";
        return;
    } else {
        currentStep = outcome;
        localStorage.setItem("currentStep", currentStep); // Salva progresso
    }

    updateStory();  
}
// Função de game over
function gameOver() {
    const storyDiv = document.getElementById("story");
    const choicesDiv = document.getElementById("choices");

    storyDiv.textContent = "GAME OVER! Você perdeu todas as suas vidas! 💀";
    choicesDiv.innerHTML = "";

    const restartButton = document.createElement("button");
    restartButton.textContent = "Reiniciar Jogo";
    restartButton.onclick = resetGame;
    choicesDiv.appendChild(restartButton);
    
}

// Função de reiniciar o jogo
function resetGame() {
    currentStep = 0;
    lives = 3;
    inventory = [];
    updateStory();  // Atualiza a interface com o início do jogo
}