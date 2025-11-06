let scene;
let mechTemplate;
let mechArmy = [];
const NUM_MECHS = 5;

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
}

class Mech {
    constructor(id, position, rotation) {
        this.id = id;
        this.entity = this.cloneMechModel();
        this.entity.setAttribute('position', position);
        this.entity.setAttribute('rotation', rotation);
        this.entity.setAttribute('id', `mech-${id}`);
        this.color = getRandomColor();
        this.health = 100;

        this.applyColor(this.color);
        this.createHealthBar();

        this.rightArm = this.entity.querySelector('#right_arm1');
        this.leftArm = this.entity.querySelector('#left_arm1');
        this.animationTimer = Math.random() * 360; 
        this.armSwingAngle = 30; 
        this.armSwingSpeed = 3; 
        
        scene.appendChild(this.entity);
    }


  cloneMechModel() {
        const newEntity = mechTemplate.cloneNode(true);
        newEntity.removeAttribute('visible'); 
        return newEntity;
    }


  applyColor(color) {
    const mainMechBody = this.entity.querySelector('#chest_unit a-sphere');
    const cylinders = this.entity.querySelectorAll('a-cylinder[src="#panel6"]');
    if (mainMechBody) {
      mainMechBody.setAttribute('color', color);
    }

    cylinders.forEach(cyl => {
            cyl.setAttribute('color', color);
        });
    }


  createHealthBar() {
    this.healthBar = document.createElement('a-entity');
    this.healthBar.setAttribute('position', '0 8.5 0');

    this.healthBarPlane = document.createElement('a-plane');
    this.healthBarPlane.setAttribute('width', 2);
    this.healthBarPlane.setAttribute('height', 0.2);
    this.healthBarPlane.setAttribute('color', 'green');
    this.healthBarPlane.setAttribute('look-at', '[camera]'); // Keep the bar facing the camera
    
    this.healthBar.appendChild(this.healthBarPlane);

    this.entity.appendChild(this.healthBar);
    }


updateHealth(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
        
        const healthRatio = this.health / 100;
        const newWidth = 2 * healthRatio;
        const newX = -(2 - newWidth) / 2;
        this.healthBarPlane.setAttribute('width', newWidth);
        this.healthBarPlane.setAttribute('position', { x: newX, y: 0, z: 0 });

        let barColor = 'green';
        if (healthRatio < 0.5) barColor = 'yellow';
        if (healthRatio < 0.2) barColor = 'red';
        this.healthBarPlane.setAttribute('color', barColor);
        
        if (this.health <= 0) {
            console.log(`Mech ${this.id} is destroyed!`);
            this.entity.setAttribute('rotation', '0 0 90'); // Fall over
            this.healthBar.setAttribute('visible', false);
            this.entity.removeAttribute('class');
        }
    }

animate() {
        if (this.health <= 0) return;
        
        this.animationTimer += this.armSwingSpeed;
        const swing = Math.sin(this.animationTimer * (Math.PI / 180)) * this.armSwingAngle;

        this.rightArm.setAttribute('rotation', { x: swing, y: 0, z: 0 }); // Simplified rotation attributes
        this.leftArm.setAttribute('rotation', { x: -swing, y: 0, z: 0 });
    }
}




  window.addEventListener("DOMContentLoaded",function() {
    scene = document.querySelector("a-scene");
    
    mechTemplate = document.getElementById("mech-1");
    mechTemplate.setAttribute('visible', 'false');
    populateBattlefield();
    document.addEventListener('click', handleShoot);
    loop();
  })

function populateBattlefield() {
    for (let i = 0; i < NUM_MECHS; i++) {
      const x = (i - (NUM_MECHS - 1) / 2) * 8; 
              const z = -30;
              
              const position = { x: x, y: 13, z: z };
              const rotation = { x: 0, y: 0, z: 0 }; 

              const newMech = new Mech(i + 1, position, rotation);
              mechArmy.push(newMech);
          }
      }


 function handleShoot() {
    const cameraRotation = camera.getAttribute('rotation');
    const cursor = document.querySelector('[cursor]');

    if (cursor && cursor.components.raycaster && cursor.components.raycaster.intersectedEls.length > 0) {
        const hitElement = cursor.components.raycaster.intersectedEls[0];
        
        // Find the parent mech entity
        let targetMechEntity = hitElement;
        while (targetMechEntity && !targetMechEntity.classList.contains('collidable-mech')) {
            targetMechEntity = targetMechEntity.parentNode;
        }

    if (targetMechEntity) {
        const mechId = targetMechEntity.id.split('-')[1]; // Get the number from the ID
            const targetMech = mechArmy.find(m => m.id.toString() === mechId);
            
            if (targetMech && targetMech.health > 0) {
                console.log(`Hit Mech ${targetMech.id}!`);
                targetMech.updateHealth(25); // Apply 25 damage per shot
            }
        }
    }
}

  function loop(){
    for (const mech of mechArmy) {
            mech.animate();
        }

    window.requestAnimationFrame( loop );
  }
