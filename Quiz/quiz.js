const perguntas = [
    {
        pergunta: "qual animal tem a mordida mais forte do mundo?",
        alternativa: [
            { id: 1, text: "Crocodilo-de-água-salgada", correto: true },
            { id: 2, text: "Tubarão-branco ", correto: false },
            { id: 3, text: "Crocodilo-do-nilo", correto: false },
            { id: 4, text: "Hipopótamo", correto: false },
            { id: 5, text: "Onça-pintada", correto: false }
        ]
    },

    {
        pergunta: "Quem deu a Bunda?",
        alternativa: [
            { id: 1, text: "Vinicius", correto: true },
            { id: 2, text: "Felipe", correto: false },
            { id: 3, text: "Davi", correto: false },
            { id: 4, text: "Gabriel", correto: false },
            { id: 5, text: "Juan", correto: false }
        ]
    },

    {
        pergunta: "Quem é viciado no Deepwoken?",
        alternativa: [
            { id: 1, text: "Felipe", correto: true },
            { id: 2, text: "Felìpe", correto: false },
            { id: 3, text: "Felípe", correto: false },
            { id: 4, text: "Vinicius", correto: false },
            { id: 5, text: "Cleyton", correto: false }
        ]
    },


    {
        pergunta: "Qual é o melhor jogo do Roblox?",
        alternativa: [
            { id: 1, text: "Blox Fruits", correto: false },
            { id: 2, text: "Shenanigans de Jujutsu ", correto: false },
            { id: 3, text: "99 noites na floresta", correto: false },
            { id: 4, text: "DOORS", correto: false },
            { id: 5, text: "Deepwoken", correto: true }
        ]
    },


    {
        pergunta: "Qual é o pior Jogo do Roblox?",
        alternativa: [
            { id: 1, text: "Blox Fruits", correto: true },
            { id: 2, text: "Shenanigans de Jujutsu", correto: false },
            { id: 3, text: "Roube um Brainrot", correto: false },
            { id: 4, text: "Brookhaven", correto: false },
            { id: 5, text: "Os Campos de Batalha Mais Fortes", correto: false }
        ]
    },


    {
        pergunta: "Melhor jogo indie?",
        alternativa: [
            { id: 1, text: "White Knuckle", correto: false },
            { id: 2, text: "Hollow knight", correto: true },
            { id: 3, text: "Abiotic Factor", correto: false },
            { id: 4, text: "Fear & Hunger", correto: false },
            { id: 5, text: "Hollow Knight: Silksong", correto: false }
        ]
    },

    {
        pergunta: "Qual é Jogo mais Assustador indie?",
        alternativa: [
            { id: 1, text: "Fear & Hunger", correto: false },
            { id: 2, text: "RATSHAKER", correto: false },
            { id: 3, text: "Garten of Banban", correto: false },
            { id: 4, text: "LOOK OUTSIDE", correto: false },
            { id: 5, text: "Darkwood", correto: true }
        ]
    },
]

const questao = document.getElementById("pergunta")

const alternativas = document.getElementById("alternativa")

const proximo = document.getElementById("proximo")

let currentPerguntaIndex = 0;
let score = 0;


function startQuiz() {
    currentPerguntaIndex = 0;
    score = 0;
    proximo.innerHTML = "Proximo";
    showQuestao();
}


function reset() {
    proximo.style.display = "none";

    while (alternativas.firstChild) {
        alternativas.removeChild(alternativas.firstChild)
    };
}

function showQuestao() {
    reset()

    let currentPergunta = perguntas[currentPerguntaIndex];
    let questaoNo = currentPerguntaIndex + 1;
    questao.innerHTML = questaoNo + "." + currentPergunta.pergunta;

    //parte das alternativas
    currentPergunta.alternativa.forEach((al) => {
        const button = document.createElement("button")//cria botao no js;
        button.innerHTML = al.text; //pega as informações e cria os botoes com essas informaçoes da array;
        button.dataset.id = al.id; //ver qual id é
        button.classList.add("btn")
        alternativas.appendChild(button)//faz aparecer os botoes porem fica sem estilo

        button.addEventListener("click", selecionarAlter);
    })
}


function selecionarAlter(e) {
    alternativa = perguntas[currentPerguntaIndex].alternativa;
    const certo = alternativa.filter((alter) => alter.correto == true)[0];

    const selecionarBtn = e.target;

    const isCorreto = selecionarBtn.dataset.id == certo.id;
    if (isCorreto) {
        selecionarBtn.classList.add("correto")
        score++
    } else {
        selecionarBtn.classList.add("incorreto")
    }

    Array.from(alternativas.children).forEach((button) => {
        if (button.dataset.id == certo.id) {
            button.classList.add("correto")
        }
        button.disabled = true;
    })

    proximo.style.display = "block"
}

function showScore() {
    reset();

    questao.innerHTML = `Você Acertou ${score} de ${perguntas.length}`
    proximo.innerHTML = "Jogar de novo."
    proximo.style.display = "block"
}


function proximoBotao() {
    currentPerguntaIndex++
    if (currentPerguntaIndex < perguntas.length) {
        showQuestao();
    } else {
        showScore();
    }
}


proximo.addEventListener("click", () => {
    if (currentPerguntaIndex < perguntas.length) {
        proximoBotao();
    } else {
        startQuiz()
    }
})

startQuiz()
