const para = document.querySelector(".para")
const generateBtn = document.getElementById("generateBtn")
const API = 'https://api.quotable.io/random'


generateBtn.addEventListener("click",()=>{
    fetch(API).then(res => res.json()).then(data =>{
        para.innerText = data.content;
    }).catch(() => alert('Error fatching quote'));
})