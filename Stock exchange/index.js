const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultWrapper = document.getElementById("resultWrapper");
const clearButton = document.getElementById("clearButton")

const onInput = (event) => {
    if (searchInput.value) {
      searchButton.disabled = false;      
    } else {
      searchButton.disabled = true;
    }
    onInput;
};

// const searchArrayFunction = () => {}

const clearResultsFunction = () => {
  window.location.reload();
  searchInput.value="";
}

const sendSearchRequest = () => {

  resultWrapper.removeAttribute("hidden");
  

    
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`;
    fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let symbolArray = data.map(x => x["symbol"]);
          symbolArray.sort();

          
          

         
             let urlArray = [];
             for (i=0; i < symbolArray.length; i++) {
              let newUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbolArray[i]}`;
              urlArray.push(newUrl);
            }
           console.log(urlArray);

           
            async function fetchAll() {
              const data = await Promise.all(urlArray.map((url) => fetch(url).then((r) => r.json())));
              
              data.forEach((result) => {
                const resultElement = document.createElement("a");
                resultElement.classList.add("result-element");
                resultElement.href = `http://127.0.0.1:5500/Assignments/Stock%20exchange/company.html?symbol=${result.symbol}`;
                resultElement.target = "_blank";
                

                const logo = document.createElement("img");
                logo.src = result.profile.image;
                

                const companyName = document.createElement("div");
                companyName.innerHTML = result.profile.companyName;
                companyName.classList.add("company-name-home")
                
                const companySymbol = document.createElement("div");
                companySymbol.innerHTML = result.symbol;
                companySymbol.classList.add("company-symbol-home");
                
                const percMovement = document.createElement("div");
                percMovement.innerHTML = result.profile.changesPercentage;
                percMovement.classList.add("percentage-movement-home");

                if (result.profile.changes > 0) {                  
                  percMovement.style.color = "green";                                    
                } 
                else if (result.profile.changes < 0) {                  
                  percMovement.style.color = "red";                  
                } 
                
                resultElement.appendChild(logo);
                resultElement.appendChild(companyName);
                resultElement.appendChild(companySymbol);
                resultElement.appendChild(percMovement)
                resultWrapper.appendChild(resultElement);


              })
              
            }

            fetchAll();


       
            
        }) 
          

      
}

searchButton.addEventListener("click", sendSearchRequest);
searchInput.addEventListener("input", onInput);
clearButton.addEventListener('click', clearResultsFunction)
