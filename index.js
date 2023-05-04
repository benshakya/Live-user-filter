const resultEl = document.getElementById("result");
const filterEl = document.getElementById("filter");

const listItems = [];

getData();

async function getData() {
  const response = await fetch("https://randomuser.me/api?results=20");
  const data = await response.json();

  //clear results initially
  resultEl.innerHTML = "";

  //inserting each users
  const users = data.results;
  users.forEach((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
          <img src="${user.picture.large}" alt="${user.name.first}" />
          <div class= "user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
          </div>
      `;
    resultEl.appendChild(li);
  });
}

//filtering users
filterEl.addEventListener("input", (e) => {
  let input = e.target.value;
  filterData(input);
});

function filterData(searchTerms) {
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerms.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}

//dark mode toggle
const toggleEl = document.querySelector(".toggle-mode");
const containerEL = document.querySelector(".container");
const bodyEl = document.querySelector("body");

toggleEl.checked = false;

toggleEl.addEventListener("input", toggleDark);

function toggleDark() {
  if (toggleEl.checked) {
    containerEL.classList.add("active");
    resultEl.classList.add("active");
    filterEl.classList.add("active");
    bodyEl.style.backgroundColor = "#3F403D";
  } else {
    containerEL.classList.remove("active");
    resultEl.classList.remove("active");
    filterEl.classList.remove("active");
    bodyEl.style.backgroundColor = "white";
  }
}
