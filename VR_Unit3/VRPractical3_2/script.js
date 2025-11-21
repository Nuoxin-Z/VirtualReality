let scene,car;


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene")

  car = document.getElementById("car");
  car.r = 0;
  car.dr = 1;
//Make the car from Practical 1.1 drive when use clicks on the car.
  car.addEventListener("mouseenter",function(){
    car.rotate =true;
  });
  car.addEventListener("mouseleave",function(){
    car.rotate =false;
  });
 
      
  loop();
})

function loop(){
  if(car.rotate){
    car.r += car.dr;
    car.setAttribute("rotation",{x:car.r, y:0, z:0});
  };
    
  window.requestAnimationFrame(loop);
}