// Thanks for Visiting, Here is the JS code containing Ajax call using fetch and promises

// Selecting the countryList container, button and input.
const countryList = document.querySelector(".cards");
const country = document.querySelector("#searchInput");
const getInfobtn = document.querySelector("#btn");

// // Adding Event listener to the Get Info button
getInfobtn.addEventListener("click", getCountryInfo);

// On click getCountryInfo function will get triggered which will fetch data and call displayCountryData function with data as its argument
async function getCountryInfo() {
  // Removing the Note and Disappearing the selection box value
  const countryName = country.value;
  document.querySelector("#note").style.display = "none";
  document.querySelector("#searchInput").value = "";
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  await fetch(url)
  .then(async (response) => {
      if (response.ok === false) {
        throw new Error(
          "Please select a country before pressing Get Info button."
        );
      }
      return await response.json(); // returns response body in the form of a promise with status and data
    })
    .then((data) => {
      displayCountryData(data[0], countryName);
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

function displayCountryData(data, country) {
  // Since API has data in Nested objects from, converting it in Array form
  const flag = Object.values(data.flags);
  const lang = Object.values(data.languages);
  const currency = Object.values(data.currencies);

  // Writing html so that it can be inserted when user hits the Get Info button
  const html = `
    <div class="card">
      <div class="flag">
        <img src="${flag[0]}" alt="" id="flag">
      </div>
      <div class="country">
        <h2 id="countryName">${data.name.official}</h2>
        <h3 id="capital">Capital - ${data.capital}</h3>
        <h3 id="region">${data.region}</h3>
      </div>
      <div class="facts">
        <img src="group.png" class="icons" alt=""> <b>~</b>
        <p class="data"  id="population">${(data.population / 1000000).toFixed(
          1
        )} Million People</p>
      </div>
      <div class="facts">
        <img src="languages.png" class="icons" alt=""><b>:</b>
        <p class="data" id="language">${lang[0]} ${
    lang[1] == undefined ? " " : ", " + lang[1]
  }</p>
      </div>
      <div class="facts">
        <img src="give-money.png" class="icons" alt=""><b>:</b>
        <p class="data" id="currency"> ${currency[0].name}('${
    currency[0].symbol
  }')</p>
      </div>
      <div id="readMore">
        <a href="https://www.worlddata.info/${country}/index.php"> Read More... </a>
      </div>
    </div>`;

  // Inserting elements adjacent to each other
  countryList.insertAdjacentHTML("beforeEnd", html);
}
