//EventListener

document.querySelector('#poetry-form').addEventListener('submit',handleSubmit)

//Event handlers

function handleSubmit(event){
  event.preventDefault()
  let postPoemObject = {
    poetryTitle:event.target.title.value,
    poetryContent:event.target.content.value,
    url:event.target.url.value,
    poetname: event.target.poet.name.value,
    poetImage:event.target.poet.photo_avatar_url.value,
    poetWebsite:event.target.poet.url.value




  }
  renderOnePoem(poem)
  postPoem(postPoemObject)

}





// DOM Renderer Function

function renderOnePoem(poem){
let mainDiv = document.createElement('div')
mainDiv.className = 'grid-container'
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
  <a href="${poem.url}" id="poetry-url">Read more on the poem</a>
</div>
</div>

`

//Add poem to DOM

document.querySelector('#grid-container').appendChild(mainDiv)
}

//Fetch Requests
//Get Fetch for all my poems
const url = 'https://www.poemist.com/api/v1/randompoems'

function getAllPoems(){
    fetch(url).then(res=>res.json())
    .then(poemObject=>poemObject.forEach(poem=>renderOnePoem(poem)))
}

function postPoem(postPoemObject){
fetch('http://localhost:3000/poetry',{
  method: 'POST',
  headers:{
    'Content-Type' : 'application/json'
  },
  body: JSON.stringify(postPoemObject)
}).then(response=>response.json()).then(poemss=>console.log(poemss))

  
}

//Initial Render
function initialize(){
    getAllPoems()
}

initialize()