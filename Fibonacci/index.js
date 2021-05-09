// Fibonacci array generator
let fibArray = [0, 1,]; 
console.log("This is original array: " + fibArray);
for (let i = 1; i <= 50; i++) {
  let fibArrayItem = fibArray[i-1] + fibArray[i];
  fibArray.push(fibArrayItem);
}

// Input
const fibonacciInput = document.getElementById("fibonacciInput");
const inputButton = document.getElementById("inputButton");
console.log(fibonacciInput);
console.log(inputButton);

//Button functionality
const onInput = (event) => {
    if (fibonacciInput.value) {
      inputButton.disabled = false;      
    } else {
      inputButton.disabled = true;
    }
};

//Function for submitting Output 
const submitInput = () => {
  document.getElementById("fibonacciOutput").innerHTML = fibArray[fibonacciInput.value];
};


fibonacciInput.addEventListener("input", onInput);
inputButton.addEventListener("click", submitInput);


