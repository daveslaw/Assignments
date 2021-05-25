const companyName = document.getElementById("company-name");
const logo = document.getElementById("company-logo");
const stockPrice = document.getElementById("price");
const priceMovement = document.getElementById("price-movement");
const percMovement = document.getElementById("percentage-movement");
const companyDescription = document.getElementById("company-description");
const priceHistory = document.getElementById("price-history-chart");

const urlPath = window.location.href;
urlArray = urlPath.split("/");
const queryStr = urlArray[urlArray.length - 1]
  .replace("company.html?symbol=", "");
//u could use a pop mehtod here as an alternative
//console.log(queryStr);


const newUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${queryStr}`;
console.log(newUrl);

fetch(newUrl)
.then((response) => response.json())
.then((data) => {
  console.log(data);
  companyName.innerHTML = `${data.profile.companyName} (${data.symbol})`;
  stockPrice.innerHTML = `${data.profile.currency} ${data.profile.price}`;
  
  if (data.profile.changes > 0) {
    priceMovement.style.color = "green";
    percMovement.style.color = "green";
    priceMovement.innerHTML = `+${data.profile.changes}`;
    
  } else if (data.profile.changes < 0) {
    priceMovement.style.color = "red";
    percMovement.style.color = "red";
    priceMovement.innerHTML = `${data.profile.changes}`;
    
  } else if (data.profiles.changes == 0) {
    
    priceMovement.style.color = "black";
    percMovement.style.color = "black";
    priceMovement.innerHTML = `${data.profile.changes}`;
    
  }  
  
  percMovement.innerHTML = `${data.profile.changesPercentage}`;
  companyDescription.innerHTML = `${data.profile.description}`;
  logo.src = `${data.profile.image}`;


  

  //console.log(companyName.innerHTML);
  

})



//console.log(usp.toString());

// url=`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol} `
// console.log(url)
// fetch(url)
//     .then((response) => response.json())
//     .then((data) => {


  //  })