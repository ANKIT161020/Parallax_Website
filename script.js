let parallex_el = document.querySelectorAll(".parallax");
let text_el = document.querySelector(".text");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let place_name = document.querySelector(".place_name");
let place_desc = document.querySelector(".place_desc");
let place_info = document.querySelector(".palce_info");
let place_img = document.querySelector(".place_img");
let btns = document.querySelector(".btns");

document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".checkbox");
  const body = document.body;
  const navH2 = document.querySelector("header nav h2");


  checkbox.addEventListener("change", function () {
    body.classList.toggle("dark");
    navH2.classList.toggle("dark");
  });
});

let xValue = 0,
  yValue = 0;

function update() {
  parallex_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    el.style.transform = `translateX(calc( -50% + ${
      -xValue * speedx
    }px)) translateY(calc( -50% + ${yValue * speedy}px))`;
  });
}

update();

let lastScrollTop = 0;
window.addEventListener("scroll", (e) => {
  const scrollPosition = window.scrollY;

  // Get the top position of your divs
  const placeInfoTop = place_info.offsetTop;
  const placeImgTop = place_img.offsetTop;

  if (scrollPosition > lastScrollTop) {
    // Scrolling down
    if (scrollPosition > placeInfoTop) {
      place_info.style.transform = `translate(-60%,0)`;
    }

    if (scrollPosition > placeImgTop) {
      place_img.style.transform = `translate(60%,0)`;
      btns.style.bottom = `7vh`;
    }

    text_el.style.transform = `translate(-50%,150%)`;
  } else {
    // Scrolling up
    if (scrollPosition < placeInfoTop) {
      place_info.style.transform = `translate(-200%,0)`;
    }

    if (scrollPosition < placeImgTop) {
      place_img.style.transform = `translate(200%,0)`;
      btns.style.bottom = `-10vh`;
    }

    text_el.style.transform = "translate(-50%, -50%)";
  }

  lastScrollTop = scrollPosition;
});

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  update();
});

let timeline = gsap.timeline();

Array.from(parallex_el)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 1.5,
      },
      "0"
    );
  });

timeline
  .from(
    ".text h1",
    {
      x: "0",
      y: "500px",
      opacity: 0,
      duration: 2,
    },
    "1"
  )
  .from(
    ".text h2",
    {
      x: "0",
      y: "-300px",
      opacity: 0,
      duration: 1.5,
    },
    "1"
  );

let currentindex = 2;
next.addEventListener("click", () => {
  let cards = document.querySelectorAll(".card_img");
  currentindex = (currentindex + 1) % list.length;
  let places = list[currentindex];
  place_name.innerHTML = places[0];
  place_desc.innerHTML = places[1];
  document.querySelector(".place_img").appendChild(cards[0]);
});

prev.addEventListener("click", () => {
  let cards = document.querySelectorAll(".card_img");
  currentindex = (currentindex - 1 + list.length) % list.length;
  let place = list[currentindex];
  place_name.innerHTML = place[0];
  place_desc.innerHTML = place[1];
  document.querySelector(".place_img").prepend(cards[cards.length - 1]);
});
