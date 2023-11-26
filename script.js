let parallex_el = document.querySelectorAll(".parallax")
let text_el = document.querySelector(".text")

let xValue=0,yValue =0;

function update(){
  parallex_el.forEach((el)=>{
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    el.style.transform = `translateX(calc( -50% + ${-xValue * speedx}px)) translateY(calc( -50% + ${yValue * speedy}px))`
  })
}

update();

window.addEventListener("mousemove",(e)=>{
  let lastScrollTop = 0;
  xValue = e.clientX - window.innerWidth/2;
  yValue = e.clientY - window.innerHeight/2;

  window.addEventListener("scroll",(e)=>{
    const scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) {
      // Scrolling down
        text_el.style.transform = `translate(-50%,150%)`;
    } else {

        text_el.style.transform = "translate(-50%, -50%)";
    }
  })

update();
})

let timeline = gsap.timeline();

Array.from(parallex_el)
.filter((el)=>!el.classList.contains("text"))
.forEach((el)=>{
  timeline.from(
    el,
    {
    top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
    duration: 1.5,
    },
    "0"
  );
})

timeline.from(
  ".text h1",
  {
    y:"500px",
    opacity:0,
    duration:2,
  },
  "1"
).from(
  ".text h2",
  {
    y:"-300px",
    opacity:0,
    duration:1.5,
  },
  "1"
)