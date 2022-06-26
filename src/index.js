//EventListener

document.addEventListener("DOMContentLoaded", function myDom() {
  document
    .querySelector("#poetry-form")
    .addEventListener("submit", handleSubmit);

  // document
  //   .getElementById("poetry-form")
  //   .addEventListener("submit", handleSubmit);

  //Event handlers

  function handleSubmit(event) {
    event.preventDefault();
    let form = new FormData(event.target);
    let postPoemObject = {
      title: form.get("title"),
      content: form.get("content"),
      url: form.get("poetry-link"),
      poet: {
        name: form.get("name"),
        url: form.get("site"),
        photo_avatar_url: form.get("image"),
      },
    };

    let baseUrl = "http://localhost:3000/poems";

    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
      },

      body: JSON.stringify(postPoemObject),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }


  function renderOnePoem(poem) {
    let mainDiv = document.createElement("div");
    mainDiv.className = "grid-container";
    mainDiv.innerHTML = `
<div id="bigger-container">
<div id="poet-key">
  <img
    src="${poem.poet.photo_avatar_url}"
    alt="poet image"
    id="poet-image"
  />
  <div id="poets-details">
    <h2 id="poet-name">Author's Name: ${poem.poet.name}</h2>
    <br />
    <a href="${poem.poet.url}" target="blank" id="poet-url">Link Up With Author</a>
  </div>
</div>

<div id="poem-container">
  <h2 id="poetry-title">${poem.title}</h2>
  <p id="poetry-content">${poem.content}

  </p>
  <a href="${poem.url}" id="poetry-url" target="blank">Read more on the poem</a>
</div>
</div>

`;

    //Add poem to DOM

    document.querySelector("#grid-container").appendChild(mainDiv);
  }

  //Fetch Requests
  //Get Fetch for all my poems
  const url = "https://www.poemist.com/api/v1/random432244444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444poems";

  function getAllPoems() {
    fetch(url)
      .then((res) => res.json())
      .then((poemObject) => poemObject.forEach((poem) => renderOnePoem(poem)));
  }

  function postPoem(postPoemObject) {
    fetch("http://localhost:3000/poetry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPoemObject),
    })
      .then((response) => response.json())
      .then((poemz) => console.log(poemz));
  }

  getAllPoems();
});

//Initial Render



