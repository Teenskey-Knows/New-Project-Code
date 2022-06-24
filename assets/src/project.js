//EventListener

// document.querySelector('#poetry-form').addEventListener('submit',handleSubmit)
document.addEventListener('DOMContentLoaded',function myDom(){

  document.getElementById('poetry-form').addEventListener('submit',handleSubmit)
})


//Event handlers

function handleSubmit(event){

  event.preventDefault()
  let postPoemObject = {
    poetryTitle:event.target.titleP.value,
    poetryContent:event.target.contentP.value,
    url:event.target.urlP.value,
    poetImage: event.target.urlPp.value,
    poetName:event.target.nameP.value,
    poetWebsite:event.target.webP.value




  }

  postPoem(postPoemObject)

}
//POST DOM Renderer

// function addMorePoem(poetry){
 
//   let secondmainDiv = document.createElement('div')
//   secondmainDiv.className = 'grid-container-One'
//   secondmainDiv.innerHTML = `
//   <div id="bigger-container">
// <div id="poet-key">
//   <img
//     src="${poetry.poet.photo_avatar_url}"
//     alt="poet image"
//     id="poet-image"
//   />
//   <div id="poets-details">
//     <h2 id="poet-name">Author's Name: ${poetry.poet.name}</h2>
//     <br />
//     <a href="${poetry.poet.url}" target="blank" id="poet-url">Link Up With Author</a>
//   </div>
// </div>

// <div id="poem-container">
//   <h2 id="poetry-title">${poetry.title}</h2>
//   <p id="poetry-content">${poetry.content}

//   </p>
//   <a href="${poetry.url}" id="poetry-url">Read more on the poem</a>
// </div>
// </div>

  
  
//   `
//   // Attaching Poem to DOM

//   document.querySelector('#grid-container-One').appendChild(secondmainDiv)

// }





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
}).then(response=>response.json()).then(poemz=>console.log(poemz))

  
}

//Initial Render
function initialize(){
    getAllPoems()
    
}

initialize()