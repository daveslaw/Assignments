const companyName = document.getElementById("company-name");
const logo = document.getElementById("company-logo");
const stockPrice = document.getElementById("price");
const priceMovement = document.getElementById("price-movement");
const percMovement = document.getElementById("percentage-movement");
const companyDescription = document.getElementById("company-description");
const priceHistoryChart = document.getElementById("price-history-chart");


const urlPath = window.location.href;
urlArray = urlPath.split("/");
const queryStr = urlArray[urlArray.length - 1]
  .replace("company.html?symbol=", "");
//u could use a pop mehtod here as an alternative
//console.log(queryStr);


const newUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${queryStr}`;


fetch(newUrl)
.then((response) => response.json())
.then((data) => {
  //console.log(data);
  companyName.innerHTML = `${data.profile.companyName} (${data.symbol})`;
  companyName.href = `${data.profile.website}`
  stockPrice.innerHTML = `Stock price: ${data.profile.currency} ${data.profile.price}`;
  
  if (data.profile.changes > 0) {
    priceMovement.style.color = "green";
    percMovement.style.color = "green";
    priceMovement.innerHTML = `+${data.profile.changes}`;    
  } else if (data.profile.changes < 0) {
    priceMovement.style.color = "red";
    percMovement.style.color = "red";
    priceMovement.innerHTML = `${data.profile.changes}`;
  } else if (data.profile.changes == 0) {
    
    priceMovement.style.color = "black";
    percMovement.style.color = "black";
    priceMovement.innerHTML = `--`;
    
  }  
  
  percMovement.innerHTML = `${data.profile.changesPercentage}`;
  companyDescription.innerHTML = `${data.profile.description}`;
  logo.src = `${data.profile.image}`;


  

  //console.log(companyName.innerHTML);
  

})

// Chart 

const historyDataURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${queryStr}?serietype=line`
console.log(historyDataURL);


// const priceHistoryArray = [];
// const dateArray = [];
const getChart = () => {
  fetch(historyDataURL)
    .then((response) => response.json())
    .then((historyData) => {
    console.log(historyData);    
    priceHistoryArray = historyData.historical.map(x => x["close"]);
    priceHistoryArray = priceHistoryArray.reverse();
    dateArray = historyData.historical.map(x => x["date"]);
    dateArray = dateArray.reverse();
    

    
const labels = dateArray;

const data = {
  labels: labels,
  datasets: [{
    label: `${historyData.symbol} Stock Price`,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: priceHistoryArray,

    
  }]
};

const config = {
  type: 'line',
  data,
  options: {}
};

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

 
    
    
  })

}

getChart();
