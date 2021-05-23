const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
// const resultItem = document.getElementsByClassName("result-item");
// const resultWrapper = document.getElementsByClassName("result-wrapper");





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
            
            
            data.forEach((result) => {
                const companyResult = `${result.name} (${result.symbol})`;  
                const resultWrapper = document.getElementById("resultWrapper");                 
                const resultItem = document.createElement("div");                
                resultItem.classList.add("result-item");
                resultItem.innerHTML = companyResult;
                resultWrapper.appendChild(resultItem);

            })
           
            //console.log(resultItem.innerHTML);
            
           
        
        })
}

searchButton.addEventListener("click", sendSearchRequest);
searchInput.addEventListener("input", onInput);