// Váriaveis de estado do jogo

let flippedCards = [] // Array que armazena as cartas viradas (Sempre terá no máximo duas )
let matchedPairs = 0 // Contador de pares encontrados.
let attempts = 0 // Contador de tentativas.
let isCheckingPair = false // Trava o jogo enquanto verifica o par ou escondes as cartas. 

// Array com todas as cartas do jogo

const cardItems = [
    {id: 1, content: "🐶", matched: false},
    {id: 2, content: "🐶", matched: false},
    {id: 3, content: "🐱", matched: false},
    {id: 4, content: "🐱", matched: false},
    {id: 5, content: "🦁", matched: false},
    {id: 6, content: "🦁", matched: false},
    {id: 7, content: "🐰", matched: false},
    {id: 8, content: "🐰", matched: false},
    {id: 9, content: "🐷", matched: false},
    {id: 10, content: "🐷", matched: false},
    {id: 11, content: "🐧", matched: false},
    {id: 12, content: "🐧", matched: false},
    {id: 13, content: "🐭", matched: false},
    {id: 14, content: "🐭", matched: false},
    {id: 15, content: "🐯", matched: false},
    {id: 16, content: "🐯", matched: false},
]

// Função shufflecards tem a função de embaralhar as cartas

function shuffleCards (array) {
 
    const shuffled = array.sort(() => (Math.random () > 0.5 ? 1 : -1)) // Valores positivos vem depois, valores negativos vem antes
    return shuffled
}

function createCard (card) {
    // Criar elemento principal da carta.

    const cardElement = document.createElement ("div")
    cardElement.className = "card" 

    // Criar elemento do emoji

    const emoji = document.createElement ("span")
    emoji.className = "card-emoji"
    emoji.textContent = card.content

    // Adiciona o emoji ao card
    cardElement.appendChild(emoji)

    // Adciona o evento de clique na carta.
    cardElement.addEventListener ("click", () => handleCardsClick (cardElement, card) )

    return cardElement


}

function renderCards () {
    const deck = document.getElementById ("deck")
    deck.innerHTML = ""


    const cards = shuffleCards (cardItems)

    cards.forEach ((item) => {
        const cardElement = createCard (item)
        deck.appendChild (cardElement)

    })
  
}

function handleCardsClick (cardElement, card) {
    if (isCheckingPair || // Ignora o clique enquanto verifica o par.
        cardElement.classList.contains ("revealed") // Ignora o clique se a carta já está virada.
    ) {
        return
    } 
     // Revela a carta
    cardElement.classList.add ("revealed")

    // Adciona no Array as cartas que estão viradas.
    flippedCards.push ({cardElement, card})

    // Verifica se é a segunda carta virada.
    if (flippedCards.length === 2) {
    // Atualiza para verdadeiro para sinalizar que vamos verificar o par.
        isCheckingPair = true
    // Incrementa o contador de tentativas.
        attempts++

        // Selecionar as cartas
        const [firstCard, secondCard] = flippedCards

        // Verifica se as cartas formam um par.
        if (firstCard.card.content === secondCard.card.content) {
        // Incrementa os pares encontrados.
            matchedPairs++
            

        // Marcar as cartas como encontradas.
        cardItems.forEach ((item) => {
            if (item.content === firstCard.card.content) {
                item.matched = true
            }

            
        })
        // Limpa Arrays de cartas viradas.
            flippedCards = []

        // Libera a próxima rodada.
            isCheckingPair = false
            
        // Atualiza o placar.
            updateStats ()

        // Verifica se tem itens para encontrar.
        const toFind = cardItems.find( item => item.matched === false)
        if (!toFind) {
            alert ("Parabéns, você encontrou todos os animais! 😊")
        }
        
        } else {
            setTimeout(() => {
            firstCard.cardElement.classList.remove("revealed")
            secondCard.cardElement.classList.remove("revealed")
            flippedCards = []
            isCheckingPair = false
            updateStats ()

            }, 1000)
           
        }

    } 
}

function updateStats () {
    document.getElementById ("stats").textContent = `${matchedPairs} acertos de ${attempts} tentativas`
}

// Função que reinicia o jogo.
function resetGame () {
flippedCards = []
matchedPairs = 0
attempts = 0
isCheckingPair = false

// Desmarcar todas as cartas.
cardItems.forEach ((card) => (card.matched = false) )

// Renderiza novamente e atualiza o placar.
renderCards ()
updateStats ()

}

renderCards ()

function initGame () {
    renderCards ()

    // Adciona o evento de reiniciar o jogo
    document.getElementById("restart").addEventListener ("click", resetGame)
}

initGame ()




