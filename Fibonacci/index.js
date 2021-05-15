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

//Function on submitting input to my own calculation
let fibArray = [0, 1]; 
for (let i = 1; i <= 50; i++) {
  let fibArrayItem = fibArray[i-1] + fibArray[i];
  fibArray.push(fibArrayItem);
}


//Function for sumbitting to internal calculations without saving
const submitInputNoSave = () => {
  let indexValue = parseInt(fibonacciInput.value) + 1;

  if (fibonacciInput.value > 50) {
    document.getElementById("fibonacciOutput").innerHTML = ""
    fibonacciInput.style.color = "red";
    fibonacciInput.style.border = "red 1px solid";
    const alertMessage = document.getElementById("alert-message");
    alertMessage.removeAttribute("hidden");
    console.log(alertMessage);
    alertMessage.innerHTML = "Can't be over 50";
       
  } 
    else if (fibonacciInput.value <= 50 && fibonacciInput.value > -1 ) {
    fibonacciInput.style = "";
    document.getElementById("fibonacciOutput").innerHTML = fibArray[indexValue];
  } 
    else if (fibonacciInput.value < 0) {
    fibonacciInput.style.color = "red";
    fibonacciInput.style.border = "red 1px solid";
    alert("Can't be less than 0");
    
  }  
  
}

//Function for submitting Input to server
const submitInputSave = () => {   
  
  if (fibonacciInput.value > 50) {
    document.getElementById("fibonacciOutput").innerHTML = ""
    fibonacciInput.style.color = "red";
    fibonacciInput.style.border = "red 1px solid";
    const alertMessage = document.getElementById("alert-message");
    alertMessage.removeAttribute("hidden");
    console.log(alertMessage);
    alertMessage.innerHTML = "Can't be over 50";
    
  }
  else if (fibonacciInput.value <= 50 && fibonacciInput.value > -1 ) {
    spinner.removeAttribute("hidden");
   
    const url = "http://localhost:5050/fibonacci/" + fibonacciInput.value;
      
    fetch(url)
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((data) => {
          spinner.setAttribute('hidden', '');      
          document.getElementById("fibonacciOutput").style.color = "#373A3C";
          document.getElementById("fibonacciOutput").innerHTML = data.result;
        });
      } else {
        response.text()
        .then((error) => {
          spinner.setAttribute('hidden', '');  
          document.getElementById("fibonacciOutput").style.color = "red";
          document.getElementById("fibonacciOutput").style.textDecoration = "";
          document.getElementById("fibonacciOutput").innerHTML = "Server error: " + error;
        });
      }
      
    })
    

  }
  else if (fibonacciInput.value < 0) {
    fibonacciInput.style.color = "red";
    fibonacciInput.style.border = "red 1px solid";
    alert("Can't be less than 0");
    
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
    
    resultItem.innerHTML = `The Fibonacci of ${inputNumber} is ${outputNumber}. Calculated at: ${formattedDate}`;  
    resultTable.appendChild(resultItem);
    })   
  })
}   

fibLog();

const doubleFunction = () => {
  fibLog();
  submitInputSave();
}   

let saveResults = document.getElementById("saveResults");

inputButton.addEventListener("click", function() {
  if (saveResults.checked) {
    doubleFunction();
  } else {
    submitInputNoSave();
  }
})


  



