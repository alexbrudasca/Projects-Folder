const input = document.getElementById("input");
const button = document.getElementById("subscribeBtn");
const error = document.querySelector(".error");
const wrapper = document.querySelector(".after-container")
const mainCtn = document.querySelector(".container");
const emailName = document.getElementById("emailName")

button.addEventListener("click", (e) => {
    e.preventDefault();
  const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value.trim() === "" || !emailRegx.test(input.value)) {
    input.classList.add("error"); 
} else {
      input.classList.remove("error"); 
    wrapper.classList.remove("hidden")
    mainCtn.classList.add("hidden")
    setTimeout(function() {
        wrapper.classList.add("hidden");
        mainCtn.classList.remove("hidden")
        input.value = "";
    }, 3000);
    
    emailName.textContent = input.value;

    
    function sendmail(){
        var test = {
            input: document.getElementById("input").value,
        };
    
        const serviceId = "service_9x50xwj";
        const templeteId = "template_l9eccrn";
        
        emailjs
        .send(serviceId,templeteId,test)
        .then(
            res => {
                document.getElementById("input").value = "";
                console.log("email has been sent");
            }
            )
            .catch((err)=> console.log(err));
    
      }
    }   
    
    sendmail();
});


