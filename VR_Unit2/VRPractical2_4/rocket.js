class rocket{
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");

    let head = document.createElement("a-cone");
    head.setAttribute("color","blue");
    head.setAttribute("position","0 0 -2");
    head.setAttribute("height","1");
    head.setAttribute("radius-top","0");
    head.setAttribute("radius-bottom","0.5");
    this.obj.appendChild( head );
  
    let body = document.createElement("a-cylinder");
    body.setAttribute("position","0 -1.5 -2");
    body.setAttribute("color","red");
    body.setAttribute("radius","0.5");
    body.setAttribute("height","2");
    this.obj.appendChild( body );

    let bottom = document.createElement("a-cone");
    bottom.setAttribute("color","orange");
    bottom.setAttribute("position","0 -3.5 -2");
    bottom.setAttribute("height","2");
    bottom.setAttribute("radius-top","0");
    bottom.setAttribute("radius-bottom","0.25");
    bottom.setAttribute("rotation","-180 0 0");
    this.obj.appendChild( bottom );
  


  
    this.obj.setAttribute("position",{x:x, y:y, z:z});
    scene.append( this.obj )

    this.x = x;
    this.y = y;
    this.z = z;
    this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});

    this.speed = rnd(10,50)/1000;
    scene.appendChild(this.obj);
  }
  
  launch(){
    if(this.speed > 0){
      this.y += this.speed;
      if (this.y > 10){
        this.speed = -this.speed;
        }
      }else if (this.y < 0){  
        this.y = this.speed;
        if(this.y<=0){
          this.y = 0;
          this.speed = 0;
        }
    }
      this.obj.setAttribute("position",{x:this.x, y:this.y, z:this.z});
  }
}