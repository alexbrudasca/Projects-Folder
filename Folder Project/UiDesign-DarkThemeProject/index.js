const mainCtn = document.querySelector(".main-container");
const secondCtn = document.querySelector(".second-container");
const viewBtn = document.getElementById("view")


viewBtn.addEventListener("click",()=>{
    secondCtn.classList.toggle("hidden");
})


const cancelBtn = document.getElementById("cancel")
const message = document.querySelector(".message")


cancelBtn.addEventListener("click", () => {
    message.classList.toggle("hidden");
 });