// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

// Capturando o evento de input para formatar o valor
amount.oninput = () => {
  
  // Obtém o valor atual do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "")
 
  // Transformar o valor em centavos
  value = Number(value) / 100
  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
 
  // Formata o valor para BRL (real brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  // Retorna o valor formatado
  return value
}

// Captura evento de submit para obter os valores
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault()


  // Cria um objeto com os detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }
  // Chama a função que irá adicionar o item na lista.
  expenseAdd(newExpense)
}
//adiciona um novo item na lista
function expenseAdd(newExpense) {
  try {
    // Criar o <li> da despesa
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Criar o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Criar o bloco com nome e categoria
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info") // NOME CORRETO DA CLASSE

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    expenseInfo.append(expenseName, expenseCategory)

    // Criar o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    
    // ATENÇÃO: substituímos .toUpperCase() por .trim() e usamos innerHTML com segurança
    const valorSemRS = newExpense.amount.replace("R$", "").trim()
    expenseAmount.innerHTML = `<small>R$</small>${valorSemRS}`

    // Criar ícone de remoção
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Montar o item <li> final
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Inserir na lista
    expenseList.appendChild(expenseItem)

    // Limpar o formulário
    formClear()

    // Atualizar totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.error("Erro ao adicionar:", error)
  }
}



function updateTotals () {
  try {
    //Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    //atualiza a quantidade de itens na lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    // Variável para incrementar o total.
    let total = 0

    //percorre cada item da lista
    for (let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")
      
      //Remover caracteres não numéricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      //Converte o valor para float
      value = parseFloat(value)

      //Verifica se o número é válido
      if(isNaN(value)){
        return alert("Não foi possível calcular o total. O valor não parecer ser um número.")
      }

      //Incrementar o valor total.
      total += Number(value)
    }
    // Cria a small para adicionar a R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    // Limpa o conteúdo do elemento.
    expenseTotal.innerHTML = `<small>R$</small>${total}`

    // Adiciona o símbolo da moeda e o valor formatado.
    //expenseTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", function (event){
  // Verifica se o elemento clicadl é o ícone de remover
  if(event.target.classList.contains("remove-icon")){
    // Obtém a LI pai do elemento clicado.
    const item = event.target.closest(".expense")
    // Remove o item da lista
    item.remove()
  }

  // Atualiza os totais.
  updateTotals()
})

function formClear(){
// Limpa os inputs
expense.value = ""
category.value = ""
amount.value = ""

// Coloca o focu no input para amount.
expense.focus()
}