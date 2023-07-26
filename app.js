const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateText = document.getElementById("rate");
const swap = document.getElementById("swap");

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);

function calculate() {
    const currency1 = currencyEl_one.value;
    const currency2 = currencyEl_two.value;
    fetch(
        `https://v6.exchangerate-api.com/v6/e5f909bff4b1d7c29e93d329/latest/${currency1}`
    ).then((res) =>
        res.json().then((data) => {
            let convValue = data["conversion_rates"][currency2];
            rateText.innerHTML = `1 ${currency1} = ${convValue} ${currency2}`;
            amountEl_two.value = (amountEl_one.value * convValue).toFixed(2);
        })
    );
}

swap.addEventListener("click", () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();

});

calculate();