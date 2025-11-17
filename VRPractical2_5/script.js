let maze = [
  "xxxxxx--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "x----T--------TTTTTTxx------------xxxxxx",
  "x----xx--------------x-----xxxxxx------x",
  "x--------xx--xx--T---x----TT---xxxx----xxxx",
  "x---------x-T--------xx-----oo------x-----x",
  "x--T---xx-x--oo-T----x----------xx---x---xx",
  "x---------x-------xx-x-------xxx-------o--x",
  "x--xxxxxxxx---T-xx---x--TT--o---xx------xx",
  "x-----T-------xxxx---x----xxxxxxx-----xxxx",
  "x------ox----x---x---x-------xxxxxxx------x",
  "xxxxx---TT----xx-----x--TTTxxxx------xxxxxx",
  "x-------TT-xxxxx-----------xx-----xxxxx--x",
  "x----xxxxx----xx-----TT----xxx-----xxxxxxx",
  "x-xxxxxTTTT---xx-----x---TTT--ooooooxx--x",
  "x---xx-----------------x----------xxxx--x",
  "x---xx------------xxx--x----xx----xxxx--x",
  "x---xx-----------------x----xx----xxxx--x",
  "x--------xxxxxx--------x----xx----xxxx--x",
  "x-------------x--------xx--xxx----xxxx--x",
  "x-------------x--------x----xx----xxxx--x",
  "x-------------x--------x----xx----xxxx--x",
  "x-----xxxxxxxxx--------x----xx----xxxx--x",
  "x----xx----------------x----xx----xxxx--xx",
  "x---xxx----TTTTTTTT-----x----xx----xxxx--x",
  "x----------------------x----xx----xxxx--xx",
  "x---xxxxx--------xxxxx-x----xx----xxxx--x",
  "x---------------xx-----x----xx---------xx",
  "x---------------xx-----x----xx----xxxxxx",
  "x--xxxxxxx--xxxxxx--x----xx----xxxx----xxx",
  "x-------------------xxxx----xx------xxx--x",
  "x----------------------x----xx----xxxx--xx",
  "x------xxxxxxx---------x----xx----xxxx--x",
  "x--------------xxx---------xx----------xx",
  "xxxxxxxxxxx--xxxxxxxxxxxxxxxxxxxxxxxxxxx",
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