window.addEventListener("DOMContentLoaded",function() {

    loop()    
})


function loop(){
    rocket = document.querySelector("#rocket");
    rocket.setAttribute("position",{y:rocket.getAttribute("position").y+=0.1, x:0,z:0});
    window.requestAnimationFrame(loop);

}