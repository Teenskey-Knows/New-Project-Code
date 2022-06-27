//EventListener

document.addEventListener("DOMContentLoaded", function myDom() {
  const refreshBtn = document.querySelector("#refresh");

  const url = "https://www.poemist.com/api/v1/randompoems";

  let baseUrl = "http://localhost:3000/poems";

  //Event handlers

  function handleSubmit(event) {
    event.preventDefault();

    let form = new FormData(event.target);

    let poemData = [
      form.get("title").trim(),
      form.get("content").trim(),
      form.get("poetry-link").trim(),
      form.get("name").trim(),
      form.get("site").trim(),
      form.get("image").trim(),
    ];

    if (isValid(poemData)) {
      let postPoemObject = {
        title: poemData[0],
        content: poemData[1],
        url: poemData[2],
        poet: {
          name: poemData[3],
          url: poemData[4],
          photo_avatar_url: poemData[5],
        },
      };

      postPoem(postPoemObject);
    } else {
      alert("Alert all fields are required");
    }

    // console.log(postPoemObject)
  }

  //validating image extension
  function isValidImage(url) {
    let placeholder = "https://www.poemist.com/images/poet-pen.png";
    let isValid = new RegExp("^(https?|ftp)://.*(jpeg|png|gif|bmp)");
    
    return isValid.test(url) ? url : placeholder;
  }

  async function renderOnePoem() {
    let data = [
      ...(await getAllPoems(baseUrl).then((data) => data)),
      ...(await getAllPoems(url).then((data) => data)),
    ];

    let mainDiv = document.createElement("div");

    mainDiv.className = "grid-container";

    data.forEach((poem) => {
      mainDiv.innerHTML += `
    <div id="bigger-container">
    <div id="poet-key">
      <img
        src="${isValidImage(poem.poet.photo_avatar_url)}"
        alt="poet image"
        id="poet-image"
      />
      <div id="poets-details">
        <h2 id="poet-name">Author's Name: ${poem.poet.name}</h2>
        <br />
        <a href="${
          poem.poet.url
        }" target="blank" id="poet-url">Link Up With Author</a>
      </div>
    </div>
    
    <div id="poem-container">
      <h2 id="poetry-title">${poem.title}</h2>
      <p id="poetry-content">${poem.content}
    
      </p>
      <a href="${
        poem.url
      }" id="poetry-url" target="blank">Read more on the poem</a>
    </div>
    </div>
    
    `;
    });

    //Add poem to DOM

    document.querySelector("#grid-container").appendChild(mainDiv);
  }

  function isValid(poemData) {
    for (const data of poemData) {
      if (data.length === 0) {
        return false;
      }
    }
    return true;
  }

  function postPoem(poem) {
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "Application/json",
      },

      body: JSON.stringify(poem),
    })
      .then((res) => res.json())
      .then((data) => renderOnePoem())
      .catch((error) => console.log(error));
  }

  //Fetch Requests
  //Get Fetch for all my poems

  async function getAllPoems(url) {
    try {
      let res = await fetch(url);
      let data = res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  document
    .querySelector("#poetry-form")
    .addEventListener("submit", handleSubmit);

  refreshBtn.addEventListener("click", renderOnePoem);
});

//Initial Render
