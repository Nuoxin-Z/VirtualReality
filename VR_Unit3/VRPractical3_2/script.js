let scene,car;


window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  car = document.getElementById("car");
  car.z = 5;
  car.dz = -0.1;
  car.move = false;
  car.addEventListener("click",function(){
    car.move = true;
  });

  rocket = document.getElementById("rocket");
  rocket.y = 3
  rocket.dy = 0.03;
  rocket.addEventListener("click",function(){
    rocket.fly = true;
  });
      
  loop();
});

function loop(){
  if(car.move){
    car.z += car.dz;
    car.setAttribute("position",{x:-2, y:0.2, z:car.z});
  };
  
  if(rocket.fly){
    rocket.y += rocket.dy; 
    rocket.setAttribute("position",{x:-8, y:rocket.y, z: -2});
  };
  window.requestAnimationFrame(loop);
};