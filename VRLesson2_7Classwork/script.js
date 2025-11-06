let rnd = (l,u) => Math.floor(Math.random()*(u-l) + l);
let scene, dudeTemplate;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  dudeTemplate = document.querySelector("#dudeTemplate");

  //Challenge 4: Create an array of dudes at random locations.
  let dudes = [];
    const numDudes = 10;
    for (let i = 0; i < numDudes; i++) {
        let randomX = rnd(-5, 5);
        let randomZ = rnd(-10, 0);
        dudes.push(new Dude(randomX, 0, randomZ)); 
}

  loop();  

function loop(){
  //Challenge 5: Make all the dudes jump.
  for (let dude of dudes) {
            dude.jump();
        }
  window.requestAnimationFrame( loop );
}
});
