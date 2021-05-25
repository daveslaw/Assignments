const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const onInput = (event) => {
    if (searchInput.value) {
      searchButton.disabled = false;      
    } else {
      searchButton.disabled = true;
    }
    onInput;
};


const sendSearchRequest = () => {
    
    const searchUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ`;
    fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
            
            console.log(data);
            data.forEach((result) => {
                
                localStorage.setItem("results", JSON.stringify(data));
                
                const companyResult = `${result.name} (${result.symbol})`;  
                const resultWrapper = document.getElementById("resultWrapper");                 
                const resultElement = document.createElement("a");                
                resultElement.classList.add("result-element");
                resultElement.href = `http://127.0.0.1:5500/Assignments/Stock%20exchange/company.html?symbol=${result.symbol}`;
                resultElement.target = "_blank";
                console.log(resultElement);
                resultElement.innerHTML = companyResult;
                resultWrapper.appendChild(resultElement);
                //resultElement.addEventListener("click", function() {console.log(result.symbol)})
            })        
        })
}

// function refreshPage(){
//   window.location.reload();
// } 

searchButton.addEventListener("click", sendSearchRequest);
// searchButton.addEventListener("click", refreshPage);
searchInput.addEventListener("input", onInput);
