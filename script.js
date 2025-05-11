// Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")

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
function expenseAdd(newExpense){
  try {
    // Cria o elemento para adicionar o item (li) na lista (ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")
  
    //Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", 'img/${newExpense.category_id}.svg')
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add(expense-info)

    // Cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despensa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    //Adiciona name e category na div das informações da despesa.
    expenseInfo.append(expenseName, expenseCategory)

    // adiciona o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUppercase()
      .replace("R$","")}`

    // Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")
    
    
    
    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    // Adiciona o item na lista
    expenseList.append(expenseItem)

    //Atualiza os totais
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

function updateTotals () {
  try {
    //Recupera todos os itens (li) da lista (ul)
    const item = expenseList.children

    //atualiza a quantidade de itens na lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }



}