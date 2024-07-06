/* Global variables */

button_images = [
  "images/comida_image.png",
  "images/felicidad_image.png",
  "images/limpieza_image.png",
];
button_names = ["Comida", "Felicidad", "Limpieza"];
button_events = [comidaIncrease, felicidadIncrease, limpiezaIncrease];

const pet_img = document.getElementById("pet");
let comida_health = 100;
let felicidad_health = 100;
let limpieza_health = 100;
const bar = document.getElementById("bar");
const bar_2 = document.getElementById("bar-2");
const bar_3 = document.getElementById("bar-3");
let game_finished = false;

function updateComida() {
  comida_health -= 2;
  if (comida_health < 0) {
    comida_health = 0;
  }
  bar.innerHTML = comida_health;
  bar.style.width = `${comida_health}%`;
  updateColor(comida_health, bar);

  /* Update pet image */

  updatePetImage();
}

function updateFelicidad() {
  felicidad_health -= 2;

  if (felicidad_health < 0) {
    felicidad_health = 0;
  }
  bar_2.innerHTML = felicidad_health;
  bar_2.style.width = `${felicidad_health}%`;
  updateColor(felicidad_health, bar_2);

  updatePetImage();
}

function updateLimpieza() {
  limpieza_health -= 2;

  if (limpieza_health < 0) {
    limpieza_health = 0;
  }
  bar_3.innerHTML = limpieza_health;
  bar_3.style.width = `${limpieza_health}%`;
  updateColor(limpieza_health, bar_3);

  updatePetImage();
}

function checkHealth() {
  if (
    game_finished === false &&
    (comida_health <= 0 || felicidad_health <= 0 || limpieza_health <= 0)
  ) {
    game_finished = true;
    setTimeout(() => {
      alert("Juego terminado");
      location.reload();
    }, 1000);
  }
}

function updatePetImage() {
  if (comida_health <= 30 || felicidad_health <= 30 || limpieza_health <= 30) {
    pet_img.src = "images/angry-cat.gif";
  } else if (
    comida_health > 60 &&
    felicidad_health > 60 &&
    limpieza_health > 60
  ) {
    pet_img.src = "images/cat-cartoon.gif";
  } else {
    pet_img.src = "images/cat-serious.gif";
  }
}

function updateColor(healt, bar_id) {
  if (healt <= 30) {
    bar_id.style.backgroundColor = "red";
  } else if (healt <= 60) {
    bar_id.style.backgroundColor = "yellow";
  } else {
    bar_id.style.backgroundColor = "#03fa03fd";
  }
}

function comidaIncrease() {
  comida_health += 1;

  if (comida_health > 100) {
    comida_health = 100;
  }
  bar.innerHTML = comida_health;
  bar.style.width = `${comida_health}%`;
  updateColor(comida_health, bar);

  updatePetImage(comida_health);

  updatePetImage();
}

function felicidadIncrease() {
  felicidad_health += 1;

  if (felicidad_health > 100) {
    felicidad_health = 100;
  }
  bar_2.innerHTML = felicidad_health;
  bar_2.style.width = `${felicidad_health}%`;
  updateColor(felicidad_health, bar_2);

  updatePetImage();
}

function limpiezaIncrease() {
  limpieza_health += 1;

  if (limpieza_health > 100) {
    limpieza_health = 100;
  }
  bar_3.innerHTML = limpieza_health;
  bar_3.style.width = `${limpieza_health}%`;
  updateColor(limpieza_health, bar_3);

  updatePetImage();
}

function changeName(event) {
  event.preventDefault();

  /* Get input value and change */
  const input = document.getElementById("name");

  const input_name = input.value;

  const mensaje_page = document.getElementById("mensaje-bienvenida");

  mensaje_page.innerText = input_name;

  /* Remove the form */

  const form_container = document.getElementsByClassName("form-container")[0];

  if (form_container) {
    form_container.remove();
  }

  /* Add buttons for taking care of the pet */

  const button_container = document.createElement("div");
  button_container.classList.add("button-container");

  for (let i = 0; i < button_images.length; i++) {
    const each_button_container = document.createElement("div");
    each_button_container.classList.add("each-button-container");

    const mensaje_button = document.createElement("div");
    mensaje_button.innerText = button_names[i];
    each_button_container.appendChild(mensaje_button);

    const game_button = document.createElement("button");
    const button_image = document.createElement("img");
    button_image.src = button_images[i];
    button_image.alt = button_names[i];
    game_button.addEventListener("click", button_events[i]);

    game_button.appendChild(button_image);
    each_button_container.appendChild(game_button);

    button_container.appendChild(each_button_container);
  }

  const game_section = document.getElementsByClassName("game-section")[0];
  game_section.appendChild(button_container);

  /* Start the game */

  /* Start healths bars */
  setInterval(() => {
    if (comida_health > 0) {
      updateComida();
    }
  }, 1000);

  setInterval(() => {
    if (felicidad_health > 0) {
      updateFelicidad();
    }
  }, 1000);

  setInterval(() => {
    if (limpieza_health > 0) {
      updateLimpieza();
    }
  }, 1000);

  setInterval(checkHealth, 1000);
}
