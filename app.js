//DOM
const imgEl = document.querySelector(".dog-img");
const button = document.querySelector("button");
const breads = document.getElementById("breads");

const base_url = "https://dog.ceo/api";
const api = {
  list_all_breads: "/breeds/list/all",
  by_breed: "/breed/",
};

button.onclick = () => {
  button.innerText = "Loading..";
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => {
      return response.json();
    })
    .then((dog) => {
      button.innerText = "FETCH";
      console.log("dog: ", dog);
      imgEl.src = dog.message;
    });
};

function getAllDogBreads() {
  fetch(base_url + api.list_all_breads)
    .then((res) => res.json())
    .then((all_breads) => {
      console.log(all_breads);
      const breadlist = Object.keys(all_breads.message);
      console.log("breadlist: ", breadlist);

      breads.innerHTML = breadlist
        .map((name) => {
          return `<button>${name}</button>`;
        })
        .join("");
      document.querySelectorAll("#breads button").forEach((btn) => {
        btn.onclick = () => {
          let url = btn.innerText + "/images/random/1";
          console.log(btn.innerText);
          button.innerText = "Loading..";
          fetch(base_url + api.by_breed + url)
            .then((response) => {
              return response.json();
            })
            .then((dog) => {
              button.innerText = "FETCH";
              console.log("dog: ", dog);
              imgEl.src = dog.message;
            });
        };
      });
    });
}
getAllDogBreads();
