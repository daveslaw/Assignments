const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultWrapper = document.getElementById("resultWrapper");

const resultElement = document.getElementById("resultElement")

const logo = document.getElementById("company-logo");
const companyName = document.getElementById("company-name");
const companySymbol = document.getElementById("company-symbol")
const percMovement = document.getElementById("percentage-movement");   


const onInput = (event) => {
    if (searchInput.value) {
      searchButton.disabled = false;      
    } else {
      searchButton.disabled = true;
    }
    onInput;
};


const sendSearchRequest = () => {

  resultWrapper.removeAttribute("hidden");
    
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`;
    fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          //); make an array of the symbols and commit to session storage
          let symbolArray = data.map(x => x["symbol"]);
          console.log(symbolArray);
          //sessionStorage.setItem('Symbol', symbolArray);
          data.forEach((result) => {        
              
                companyName.innerHTML = `${result.name}`;                                  
                resultElement.href = `http://127.0.0.1:5500/Assignments/Stock%20exchange/company.html?symbol=${result.symbol}`;
                resultElement.target = "_blank";
                resultWrapper.appendChild(resultElement);
                
                //resultElement.addEventListener("click", function() {console.log(result.symbol)})
            })
          

         
             urlArray = [];
             for (i=0; i < symbolArray.length; i++) {
              let newUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbolArray[i]}?serietype=line`
              urlArray.push(newUrl);
            }
          
            //created an array of urls to run multiple fetches
          
           
            // return fetch(newUrl)
            //   .then((response) => response.json())
            //   .then((data) => {
            //       console.log(data);
                  //data.forEach((result) => {}
            // })
            
        }) 
          

      
}

searchButton.addEventListener("click", sendSearchRequest);
searchInput.addEventListener("input", onInput);
