let scene, camera;

let enemies = [];
let ammoBoxes = [];
let bullets = [];

let ammo = 3;
let score = 0;
let timeLeft = 60;
let gameOver = false;

const ENEMY_COUNT = 6;
const AMMO_BOX_COUNT = 6;

const AMMO_PER_BOX = 3;
const SCORE_PER_KILL = 100;
const SCORE_PER_PICKUP = 20;

const HIT_DIST = 1.1;
const PICKUP_DIST = 1.6;
const WORLD_LIMIT = 120;

let lastShot = 0;
const COOLDOWN = 250;

window.addEventListener("DOMContentLoaded", () => {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("#player");

  spawnEnemies();
  spawnAmmoBoxes();

  window.addEventListener("keydown", shoot);

  updateHUD();
  requestAnimationFrame(loop);
  setTimeout(countdown, 1000);
});

function shoot(e) {
  if (gameOver) return;
  if (e.key !== " ") return;

  const now = Date.now();
  if (now - lastShot < COOLDOWN) return;
  if (ammo <= 0) return;

  lastShot = now;
  ammo--;

  bullets.push(new Bullet(scene, camera));
  updateHUD();
}

function spawnEnemies() {
  for (let i = 0; i < ENEMY_COUNT; i++) {
    const e = document.createElement("a-sphere");
    e.setAttribute("radius", 0.9);
    e.setAttribute("color", "#c43c3c");
    e.setAttribute("position", {
      x: Math.random() * 30 - 15,
      y: 1,
      z: -(Math.random() * 25 + 8)
    });
    scene.append(e);
    enemies.push(e);
  }
}

function spawnAmmoBoxes() {
  for (let i = 0; i < AMMO_BOX_COUNT; i++) {
    const b = document.createElement("a-box");
    b.setAttribute("color", "#2f5bff");
    b.setAttribute("depth", 1);
    b.setAttribute("width", 1);
    b.setAttribute("height", 1);

    const x = Math.random() * 30 - 15;
    const z = -(Math.random() * 25 + 6);
    b.setAttribute("position", { x, y: 0.6, z });

    b.setAttribute("animation", `
      property: position;
      dir: alternate;
      dur: 900;
      loop: true;
      to: ${x} 1.2 ${z};
      easing: easeInOutSine
    `);

    scene.append(b);
    ammoBoxes.push(b);
  }
}

function loop() {
  if (gameOver) return;

  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.step();

    const p = b.obj.object3D.position;
    if (Math.abs(p.x) > WORLD_LIMIT || Math.abs(p.z) > WORLD_LIMIT || b.life > 240) {
      b.obj.remove();
      bullets.splice(i, 1);
      continue;
    }

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (dist(b.obj, enemies[j]) < HIT_DIST) {
        enemies[j].remove();
        enemies.splice(j, 1);
        b.obj.remove();
        bullets.splice(i, 1);

        score += SCORE_PER_KILL;
        updateHUD();

        if (enemies.length === 0) endGame(true);
        break;
      }
    }
  }

  for (let i = ammoBoxes.length - 1; i >= 0; i--) {
    if (dist(camera, ammoBoxes[i]) < PICKUP_DIST) {
      ammoBoxes[i].remove();
      ammoBoxes.splice(i, 1);

      ammo += AMMO_PER_BOX;
      score += SCORE_PER_PICKUP;
      updateHUD();
    }
  }

  requestAnimationFrame(loop);
}

function countdown() {
  if (gameOver) return;

  timeLeft--;
  updateHUD();

  if (timeLeft <= 0) endGame(false);
  else setTimeout(countdown, 1000);
}

function endGame(win) {
  gameOver = true;

  const msg = document.createElement("a-entity");
  msg.setAttribute("position", { x: 0, y: 3, z: -4 });
  msg.setAttribute("text", {
    value: win ? `YOU WIN! Score: ${score}` : `YOU LOSE! Score: ${score}`,
    color: "black",
    width: 8,
    align: "center",
    font: "mozillavr"
  });
  scene.append(msg);
}

function updateHUD() {
  document.querySelector("#hudScore")
    .setAttribute("text", "value", `Score: ${score}`);
  document.querySelector("#hudAmmo")
    .setAttribute("text", "value", `Ammo: ${ammo}`);
  document.querySelector("#hudTime")
    .setAttribute("text", "value", `Time: ${timeLeft}`);
  document.querySelector("#hudEnemies")
    .setAttribute("text", "value", `Enemies left: ${enemies.length}`);
}

function dist(a, b) {
  const p1 = a.object3D.position;
  const p2 = b.object3D.position;
  return Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
}