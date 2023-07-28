const bgColors = [
  "#0040ff, #00fffb",
  "#1CB5E0, #000851",
  "#00C9FF, #92FE9D",
  "#FC466B, #3F5EFB",
  "#3F2B96, #A8C0FF",
  "#FDBB2D, #22C1C3",
  "#0700b8, #00ff88",
  "#9ebd13, #008552",
  "#d53369, #daae51",
  "#efd5ff, #515ada",
  "#00d2ff, #3a47d5",
  "#f8ff00, #3ad59f",
];

const animationClasses = [
  "zoomInRotateZoomOut",
  "zoomInRotateZoomOut",
  "heartBeat",
  "ZoomOutRightZoomInLeft",
  "heartBeat",
  "heartBeat",
  "heartBeat",
  "heartBeat",
];

function createBalls() {
  for (let index = 0; index < randNum(10, 13); index++) {
    let div = document.createElement("div");
    div.setAttribute("id", "div");

    let rad = randNum(80, 170);
    div.style.width = rad + "px";
    div.style.height = rad + "px";

    div.style.top = randNum(-10, 100) + "%";
    div.style.left = randNum(10, 90) + "%";

    let bg = bgColors[randNum(0, bgColors.length)];
    div.style.backgroundImage = " linear-gradient(95deg," + bg + ")";

    div.style.animation = `div 4s linear infinite,${
      animationClasses[randNum(0, 8)]
    } ${randNum(5, 9)}s linear ${randNum(0, 2)}s infinite ${
      randNum(0, 1) ? "alternate" : "alternate-reverse"
    }`;

    document.getElementById("BG-Container").appendChild(div);
  }
}
createBalls();
let div = document.querySelectorAll("#div");

function isTouch() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch {
    return false;
  }
}

function moveDiv(e) {
  try {
    var x = !isTouch() ? e.pageX : e.touches[0].pageX;
    var y = !isTouch() ? e.pageY : e.touches[0].pageY;
  } catch {}

  let mouseX = parseInt(Math.round((x / window.innerWidth) * 100));
  let mouseY = parseInt(Math.round((y / window.innerHeight) * 100)) % 100;

  div.forEach((d) => {
    d.setAttribute("data-Xvalue", randNum(-30, 28));
    d.setAttribute("data-Yvalue", randNum(-30, 28));

    let minXDistance = parseInt(d.getAttribute("data-Xvalue"));
    let minYDistance = parseInt(d.getAttribute("data-Yvalue"));

    d.style.left = mouseX + minXDistance + "%";
    d.style.top = mouseY + minYDistance + "%";
  });
}

document.addEventListener("mousemove", (e) => {
  moveDiv(e);
  eyeBallFunction(e);
});

document.addEventListener("touchmove", (e) => {
  moveDiv(e);
});

function eyeBallFunction(e) {
  let eye = document.getElementById("eye");
  let Ex = eye.getBoundingClientRect().left + eye.clientWidth / 2;
  let Ey = eye.getBoundingClientRect().top + eye.clientHeight / 2;

  let radian = Math.atan2(e.pageX - Ex, e.pageY - Ey);
  let rotation = radian * (180 / Math.PI) * -1 + 270;
  eye.style.transform = "rotate(" + rotation + "deg)";
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Splash Screen Functions

const splashScreen = document.getElementById("splash-screen");
const textElement = document.getElementById("text-content");
let n = true;
textElement.textContent = "";

function hideSplashScreen() {
  splashScreen.style.opacity = "0";
}

function showLettersOneByOne(index, text) {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    index++;
    setTimeout(() => showLettersOneByOne(index, text), 80);
  } else {
    setTimeout(() => hideLettersOneByOne(text.length), 1000);
  }
}

function hideLettersOneByOne(index) {
  if (index > 0) {
    textElement.textContent = textElement.textContent.substring(0, index);
    index--;
    setTimeout(() => hideLettersOneByOne(index), 80);
  } else {
    textElement.textContent = "";
    if (n) {
      if (window.innerWidth <= 1023) {
        showLettersOneByOne(0, "Touch and drag on your screen to see the magic:)");
        n = false;
      } else {
        showLettersOneByOne(0, "Move your mouse to see the magic:)");
        n = false;
      }
    } else {
      hideSplashScreen();
    }
  }
}

showLettersOneByOne(0, "Welcome to my personal portfolio");
