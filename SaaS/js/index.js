const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


const toggleFormButton = (e) => {
    console.log(e.target.value);
    console.log(searchInput);
    console.log(searchButton.disabled);
  
    if (searchInput.value) {
      searchButton.disabled = false;
    } else {
      searchButton.disabled = true;
    }
  };
  const submitForm = () => {};

searchInput.addEventListener("input", toggleFormButton);
searchButton.addEventListener("click", submitForm);

const twentyThree = document.getElementById("23");
const twentyFour = document.getElementById("24");
const twentyFive = document.getElementById("25");
const twentySix = document.getElementById("26");
const twentySeven = document.getElementById("27");
const twentyEight = document.getElementById("28");
const twentyNine = document.getElementById("29");

const arrayOfDates = [
    twentyThree,
    twentyFour,
    twentyFive,
    twentySix,
    twentySeven,
    twentyEight,
    twentyNine,
];

const changeSelected = (e) => {
    for (let i = 0; i < arrayOfDates.length; i++) {
      if (e.target.id === arrayOfDates[i].id) {
        arrayOfDates[i].classList.add("circle");
        arrayOfDates[i].classList.add("white-text");
      } else {
        arrayOfDates[i].classList.remove("circle");
        arrayOfDates[i].classList.remove("white-text");
      }
    }
  };

for (let i = 0; i < arrayOfDates.length; i ++) {
    arrayOfDates[i].addEventListener("click", changeSelected);
}

//   twentyThree.addEventListener("click", changeSelected);
//   twentyFour.addEventListener("click", changeSelected);
//   twentyFive.addEventListener("click", changeSelected);
//   twentySix.addEventListener("click", changeSelected);
//   twentySeven.addEventListener("click", changeSelected);
//   twentyEight.addEventListener("click", changeSelected);
//   twentyNine.addEventListener("click", changeSelected);
  