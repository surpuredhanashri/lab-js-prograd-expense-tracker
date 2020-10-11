// All DOM elements
const addTransaction = document.querySelector("#form .btn");
const textElement = document.getElementById("text");
const amountElement = document.getElementById("amount");
let id = 0;
const totalBalance = document.getElementById("balance");
const income = document.getElementById("money-plus");
const expense = document.getElementById("money-minus");
const list = document.getElementById("list");

let inc = 0;
let exp = 0;
// console.log(text, amount);
// console.log(addTransaction);

//Adding the transactions to local storage
addTransaction.addEventListener("click", (event) => {
  event.preventDefault();
  let text, amount, tranObj;
  text = textElement.value;
  amount = parseInt(amountElement.value);

  if (text !== "" && typeof amount !== NaN && amount !== 0) {
    amount > 0 ? (inc = inc + amount) : (exp = exp + amount);
    tranObj = {
      id: id++,
      text: text,
      amount: amount,
      inc: inc,
      exp: exp,
    };
    localStorage.setItem(id - 1, JSON.stringify(tranObj));
    console.log("stored");
    income.textContent = inc;
    expense.textContent = exp;
    calculateTotal(inc, exp);
    render(tranObj);
  } else {
    alert("Please update correctly");
  }
});

//Function to retreive all items stored  in local storage
function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  let temp = 0;

  while (temp < i) {
    values.push(localStorage.getItem(keys[temp++]));
    console.log(values);
  }

  return values;
}

//Function to calculate TotalBudget
const calculateTotal = (income, expenses) => {
  income > expenses
    ? (totalBalance.textContent = `$${(income + expenses).toFixed(2)}`)
    : (totalBalance.textContent = `$${expenses}`);
};

//Function to render element to Ui
const render = (obj) => {
  let Html;
  obj.amount > 0
    ? (Html = `<li class="plus"><span>${obj.text}</span> +${obj.amount}</li>`)
    : (Html = `<li class="minus"><span>${obj.text}</span> -${Math.abs(
        obj.amount
      )}</li>`);
  list.insertAdjacentHTML("beforeEnd", Html);
};

renderOnload = (allValues) => {
  list.innerHTML = "";
  if (allValues.length > 0) {
    allValues.forEach((obj) => {
      let Html;
      let parsedObj = JSON.parse(obj);
      parsedObj.amount > 0
        ? (Html = `<li class="plus"><span>${
            parsedObj.text
          }</span>+${parsedObj.amount.toFixed(2)}</li>`)
        : (Html = `<li class="minus"><span>${parsedObj.text}</span>-${Math.abs(
            parsedObj.amount
          )}</li>`);
      list.insertAdjacentHTML("beforeEnd", Html);
    });
  }
};

window.onload = () => {
  allValues = allStorage();

  if (allValues.length > 0) {
    id = JSON.parse(allValues[allValues.length - 1]).id;
    console.log(id);

    let parsedObj = JSON.parse(localStorage.getItem(allValues.length - 1));
    console.log(parsedObj);
    calculateTotal(parsedObj.inc, parsedObj.exp);
    income.textContent = `+$${parsedObj.inc.toFixed(2)}`;
    expense.textContent = `-$${Math.abs(parsedObj.exp).toFixed(2)}`;
    console.log(allValues);
    renderOnload(allValues);
  }
};
