// function fibonacci(num)
// {
//     let num1 = 0;
//     let num2 = 1;
//     let sum;
//     let i = 0;
    
//     for (i = 0; i < num; i++) 
//     {
//         sum = num1 + num2;
//         //console.log("Sum: " + sum);
//         num1 = num2;
//         //console.log("num1: " + num1);        
//         num2 = sum;
//         //console.log("num2: " + num2);

//     }
//     return num2;
// }

const fibonacciInput = document.getElementById("fibonacciInput");
const inputButton = document.getElementById("inputButton");
console.log(fibonacciInput);
console.log(inputButton);

const onInput = (event) => {
    //console.log(fibonacciInput.value);  
  
    if (fibonacciInput.value) {
      inputButton.disabled = false;
      //console.log(event.target.value);
      //console.log("inputButton disabled attribute: ", inputButton.disabled);
    } else {
      inputButton.disabled = true;
    }
  };

  
const submitInput = () => {
    console.log("input value: " + fibonacciInput.value);
  };

  fibonacciInput.addEventListener("input", onInput);
  inputButton.addEventListener("click", submitInput);

// This is the fib generator
let i;
let fibArray = []; 
  
fibArray[0] = 0;
//console.log("Fib of 0: " + fibArray[0])
fibArray[1] = 1;
//console.log("Fib of 1: " + fibArray[1])  
for (i = 2; i <= 50; i++) {
    fibArray[i] = fibArray[i - 2] + fibArray[i - 1];
    //console.log(fibArray[i]);
}
  
//console.log("The fib of " + fibonacciInput.value + " is " + fibArray[fibonacciInput.value]);