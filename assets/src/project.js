// DOM Renderer Function

function renderOnePoem(poem){
let mainDiv = document.createElement('div')
mainDiv.className = 'grid-container'
mainDiv.innerHTML = `
<div id="bigger-container">
<div id="poet-key">
  <img
    src="https://pbs.twimg.com/profile_images/1518574167444144130/gbxEiBIy_400x400.jpg"
    alt="poet image"
    id="poet-image"
  />
  <div id="poets-details">
    <h2 id="poet-name">Author's Name: Martin Kamau</h2>
    <br />
    <a href="#" target="blank" id="poet-url">Link Up With Author</a>
  </div>
</div>

<div id="poem-container">
  <h2 id="poetry-title">Hello</h2>
  <p id="poetry-content">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
    alias quam
  </p>
  <a href="" id="poetry-url">Read more on the poem</a>
</div>
</div>

`

//Add poem to DOM

document.querySelector('#grid-container').appendChild(mainDiv)
}

//Fetch Requests
//Get Fetch for all my poems

function getAllPoems(){
    fetch(url).then(res=>res.json())
    .then(poemObject=>poemObject.forEach(poem=>renderOnePoem(poem)))
}

//Initial Render
function initialize(){
    getAllPoems()
}

initialize()