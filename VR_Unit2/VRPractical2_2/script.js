
window.addEventListener("DOMContentLoaded",function() {

    loop()    
})

function loop(){
    //Make the car move to the left.
    car = document.querySelector("#car");
    car.setAttribute("position",{x:car.getAttribute("position").x+=0.1, y:0,z:-8});
    

    //Make the pokeball rotate on the x axis
    pokemonball = document.querySelector("#pokemonball");
    pokemonball.setAttribute("rotation",{x:pokemonball.getAttribute("rotation").x+=1, y:0,z:0});


    //Make the rocket fly up.
    rocket = document.querySelector("#rocket");
    rocket.setAttribute("position",{y:rocket.getAttribute("position").y+=0.1, x:0,z:0});

    //Make the dude “grow”
    dude = document.querySelector("#dude");
    dude.setAttribute("scale",{x:dude.getAttribute("scale").x+=0.01, y:dude.getAttribute("scale").y+=0.01,z:dude.getAttribute("scale").z+=0.01});

    //Make the sun fade in

    window.requestAnimationFrame(loop);
}
