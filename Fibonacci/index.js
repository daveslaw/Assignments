// Input
const fibonacciInput = document.getElementById("fibonacciInput");
const inputButton = document.getElementById("inputButton");


//Button functionality
const onInput = (event) => {
    if (fibonacciInput.value) {
      inputButton.disabled = false;      
    } else {
      inputButton.disabled = true;
    }
};

fibonacciInput.addEventListener("input", onInput);

const spinner = document.getElementById("spinner");
//console.log(spinner);
const errorMessage = document.createElement("div");
errorMessage.classList.add("error-message");



let fibCalc = document.getElementById("fib-calc")


//Function on submitting input to my own calculation
let fibArray = [0, 1]; 
for (let i = 1; i <= 50; i++) {
  let fibArrayItem = fibArray[i-1] + fibArray[i];
  fibArray.push(fibArrayItem);
}


//Function for sumbitting to internal calculations without saving
const submitInputNoSave = () => {
let indexValue = parseInt(fibonacciInput.value) + 1;
console.log("The fib of " + fibonacciInput.value + " is " + fibArray[indexValue]);
document.getElementById("fibonacciOutput").innerHTML = fibArray[indexValue];
}

//Function for submitting Input to server
const submitInputSave = () => {   
  
  if (fibonacciInput.value > 50) {
    document.getElementById("fibonacciOutput").innerHTML = ""
    fibonacciInput.style.color = "red";
    fibonacciInput.style.border = "red 1px solid";
    errorMessage.textContent = "Can't be over 50";
    fibCalc.appendChild(errorMessage);
    
  }
  else if (fibonacciInput.value <= 50 && fibonacciInput.value > -1 ) {
    spinner.removeAttribute("hidden");
   
    const url = "http://localhost:5050/fibonacci/" + fibonacciInput.value;
      
    fetch(url)
    .then((response) => {
      //console.log(response); 
      if (response.ok) {
        response.json()
        .then((data) => {
          //console.log(data);
          spinner.setAttribute('hidden', '');      
          document.getElementById("fibonacciOutput").innerHTML = data.result;
        });
      } else {
        response.text()
        .then((error) => {
          spinner.setAttribute('hidden', '');  
          document.getElementById("fibonacciOutput").innerHTML = error;
        });
      }
      
    })
    

  }
  else if (fibonacciInput.value < 0) {
    fibonacciInput.style.color = "red";
    fibonacciInput.style.border = "red 1px solid";
    errorMessage.textContent = "Can't be less than 1";
    fibCalc.appendChild(errorMessage);
  }  

  
};

//Function for the log of results
const fibLog = () => {
  
  urlFibResults = "http://localhost:5050/getFibonacciResults";

  fetch(urlFibResults)  
  .then((response) => response.json())
  .then((data) => {
    const dataResults = data.results;  
    
    dataResults.sort(function(a,b){
    return b.createdDate - a.createdDate
    })
    
    dataResults.forEach((fibResult) => {
    
    const inputNumber = (fibResult["number"]);     
    const outputNumber = (fibResult["result"]);     
    const rawDate = (fibResult["createdDate"]);     
    const formattedDate = new Date(rawDate);

    const resultTable = document.getElementById("resultTable");
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    
    resultItem.innerHTML = `The fibonacci of ${inputNumber} is ${outputNumber}. Calculated at: ${formattedDate}`;  
    resultTable.appendChild(resultItem);
    })   
  })
}   

fibLog();

const doubleFunction = () => {
  submitInputSave();
  fibLog();
}   

let saveResults = document.getElementById("saveResults");

inputButton.addEventListener("click", function() {
  if (saveResults.checked) {
    doubleFunction();
  } else {
    submitInputNoSave();
  }
})


  

//inputButton.addEventListener("click", doubleFunction)


