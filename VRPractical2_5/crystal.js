class Rock{
  constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = y;

    this.obj = document.createElement("a-dodecahedron");
    this.obj.setAttribute("color","cyan");
    this.obj.setAttribute("radius",1);
    this.obj.setAttribute("position",{x:x,y:-1,z:z});
    scene.append(this.obj);

  }
}