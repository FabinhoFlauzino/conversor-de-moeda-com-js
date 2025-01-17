const USD = 4.87
const EUR = 5.32
const GBP = 6.08

const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")

/**
 * Manipulando o input amount para receber somente números
 */
amount.addEventListener('input', () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Capturando evento de submit do formulário
form.addEventListener('submit', (event) => {
  event.preventDefault()


  switch (currency.value) {
    case 'USD':
      convertCurrency(amount.value, USD, "US$")
      break;
    case 'EUR':
      convertCurrency(amount.value, EUR, "¢")
      break;
    case 'GBP':
      convertCurrency(amount.value, GBP, "£")
      break;

    default:
      alert("Moeda não encontrada.")
      break;
  }
})

//Função para coverter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    let total = amount * price

    if(isNaN(total)) {
      return alert("Digite o valor corretamente")
    }
    
    total = formatCurrencyBRL(total).replace("R$", "")

    result.textContent = `${total} Reais`

    footer.classList.add('show-result')
  } catch (error) {
    footer.classList.remove('show-result')
    alert('Não foi possível converter. Tente novamente mais tarde.')
  }
}

function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })
}