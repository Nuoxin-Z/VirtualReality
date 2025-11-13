let maze = [
  "xxxxxxxxxxxxxxxxxxxxxx",
  "x----T--------TTTTTTxx",
  "x----xx--------------x",
  "x--------xx--xx--T---x",
  "x-----------T--------x",
  "x--T---xx-------T----x",
  "x-----------------xx-x",
  "x--xxxxxxxx---T-xx---x",
  "x-----T--T----xxxx---x",
  "x------xx----x---x---x",
  "x-------TTT---xx-----x",
  "xxxxxxxxxxx-xxxxxxxxxx",
];
let scene;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  for(let r = 0; r < maze.length; r++){
    let row = maze[r];
    let cols = row.split("");
    for(let c = 0; c < cols.length; c++){
      if(cols[c] == "x"){
        new Block(c,1,r)
      }
      else if(cols[c] == "T"){
        new Tree(c,1,r);
      }else if(cols[c]=="o"){
        new Rock(c,1,r)
      }
    }

  }

})