<script>
  import { onMount } from "svelte";
  export let theme;

  let lines = [];

  function calculatePos(pos) {
    let box = document.querySelector(".logo-section").getBoundingClientRect();
    return Number(pos - box.left);
  }

  function calculateLinePosition(img1, img2, isBottom, isRight) {
    let lineLeftS;
    let lineTopS;

    let lineLeftE;
    let lineTopE;

    if (!isBottom && !isRight) {
      lineLeftS = calculatePos(img1.left) + img1.width;
      lineTopS = img1.top + img1.height;
      lineLeftE = calculatePos(img2.left);
      lineTopE = img2.top;
    } else if (isBottom && !isRight) {
      lineLeftS = calculatePos(img1.left) + img1.width;
      lineTopS = img1.top;
      lineLeftE = calculatePos(img2.left);
      lineTopE = img2.top + img2.height;
    } else if (isBottom && isRight) {
      lineLeftS = calculatePos(img2.left) + img2.width;
      lineTopS = img2.top + img2.height;
      lineLeftE = calculatePos(img1.left);
      lineTopE = img1.top;
    } else if (!isBottom && isRight) {
      lineLeftS = calculatePos(img2.left) + img2.width;
      lineTopS = img2.top;
      lineLeftE = calculatePos(img1.left);
      lineTopE = img1.top + img1.height;
    }

    let deltaX = lineLeftE - lineLeftS;
    let deltaY = lineTopE - lineTopS;

    const rotateDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    return {
      sLeft: lineLeftS,
      sTop: lineTopS,
      eLeft: lineLeftE,
      eTop: lineTopE,
      rotate: rotateDeg,
    };
  }

  function createLine(name, isBottom, isRight) {
    let box = document.querySelector(".logo-section");
    let elem = document.querySelector(`.${name}`).getBoundingClientRect();
    let gHub = document.querySelector(".git").getBoundingClientRect();

    let position = calculateLinePosition(elem, gHub, isBottom, isRight);
    let div = document.createElement("div");

    div.className = "line";
    div.style.position = "absolute";

    div.style.top = position.sTop + "px";
    div.style.left = position.sLeft + "px";
    div.style.transform = `rotate(${position.rotate}deg)`;
    let span = document.createElement("span");

    div.appendChild(span);

    if (!isBottom && !isRight) {
      div.style.width = `${
        position.eLeft - position.sLeft + (position.eTop - position.sTop)
      }px`;
      span.className = "jsLine";
    } else if (isBottom && !isRight) {
      div.style.width = `${
        position.eLeft - position.sLeft + (position.sTop - position.eTop)
      }px`;
      span.className = "cssLine";
    } else if (!isBottom && isRight) {
      div.style.width = `${
        position.eLeft - position.sLeft + (position.sTop - position.eTop)
      }px`;
    } else {
      div.style.width = `${
        position.eLeft - position.sLeft + (position.eTop - position.sTop)
      }px`;
    }
    box.appendChild(div);
    return div;
  }

  function draw() {
    if (lines.length) {
      lines.forEach((x) => {
        x.remove();
      });
    }
    let js = createLine("js", false, false);
    let css = createLine("css", true, false);
    let go = createLine("go", false, true);
    let html = createLine("html", true, true);

    lines.push(js);
    lines.push(css);
    lines.push(go);
    lines.push(html);
  }
  onMount(() => {
    let git = document.querySelector(".git");
    //Javascript Line
    setInterval(() => {
      git.style.transform = "scale(1.02) translate(-50%, -50%)";
      setTimeout(() => {
        git.style.transform = "scale(1) translate(-50%, -50%)";
      }, 150);
    }, 15000);
    //Css Line
    setInterval(() => {
      git.style.transform = "scale(1.02) translate(-50%, -50%)";
      setTimeout(() => {
        git.style.transform = "scale(1) translate(-50%, -50%)";
      }, 150);
    }, 20000);

    let js = createLine("js", false, false);
    let css = createLine("css", true, false);
    let go = createLine("go", false, true);
    let html = createLine("html", true, true);

    lines.push(js);
    lines.push(css);
    lines.push(go);
    lines.push(html);

    window.addEventListener("resize", () => {
      draw();
    });
  });
</script>

<div class="logo-section">
  <div class="js">
    <img class="img-fluid" src="/src/assets/img/logo/js.png" alt="" />
    <span class="jsS-1"></span>
    <span class="jsS-2"></span>
  </div>
  <div class="go">
    <img class="img-fluid" src="/src/assets/img/logo/go.png" alt="" />
    <span class="go-1"></span>
    <span class="go-2"></span>
  </div>
  <div class="html"
    ><img class="img-fluid" src="/src/assets/img/logo/html5.png" alt="" /></div
  >
  <div class="css">
    <img class="img-fluid" src="/src/assets/img/logo/css3.png" alt="" />
    <span class="cssS-1"></span>
    <span class="cssS-2"></span>
  </div>
  <div class="git">
    <div>
      <img
        class="img-fluid"
        src="/src/assets/img/logo/{theme === 'light'
          ? 'gitCatB.png'
          : 'gitCatW.png'}"
        alt=""
      />
    </div>
    <img
      class="img-fluid"
      src="/src/assets/img/logo/{theme === 'light' ? 'gitB.png' : 'gitW.png'}"
      alt=""
    />
  </div>
</div>

<style>
  :global(.line) {
    height: 1px;
    background-color: black;
    transform-origin: left;
  }
  .js,
  .html,
  .go,
  .css {
    /* background-color: rgb(255, 238, 0); */
    width: 130px;
    height: 130px;
    z-index: 4;
    padding: 10px;
    box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.11);
    overflow: hidden;
  }

  :global(body[data-theme="dark"]) .js {
    background-color: rgb(27, 26, 3);
  }
  :global(body[data-theme="light"]) .js {
    background-color: rgb(173, 162, 9);
  }
  .jsS-1 {
    background-color: rgb(252, 175, 255);
    z-index: 5;
    position: absolute;
    box-shadow: 0 0 50px 20px rgba(4, 255, 159, 0.856);
    animation: linear 15s js-1 infinite;
  }
  .jsS-2 {
    background-color: rgb(239, 177, 255);
    box-shadow: 0 0 50px 20px rgba(255, 7, 201, 0.856);
    z-index: 5;
    position: absolute;
    animation: linear 15s js-2 infinite;
  }
  :global(.jsLine) {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: blue;
    border-radius: 50%;
    animation: linear 15s jsL-1 infinite;
  }
  .css {
    position: absolute;
    top: 85%;
    left: 20%;
    transform: translate(-50%, -50%);
    z-index: 5;
    border-bottom-right-radius: 22px;
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
    animation: decreaseSize2 20s linear infinite;
  }
  :global(body[data-theme="dark"]) .css {
    background-color: rgb(9, 3, 27);
  }
  :global(body[data-theme="light"]) .css {
    background-color: rgb(17, 17, 199);
  }

  .cssS-1 {
    position: absolute;
    border-radius: 50%;
    animation: linear css-1 20s infinite;
    z-index: 5;
    box-shadow: 0 0 30px 16px rgba(4, 255, 234, 0.856);
  }
  .cssS-2 {
    position: absolute;
    border-radius: 50%;
    animation: linear css-2 20s infinite;
    z-index: 5;
    box-shadow: 0 0 30px 16px rgba(166, 12, 255, 0.856);
  }

  :global(.cssLine) {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: blue;
    border-radius: 50%;
    animation: linear 20s cssL-1 infinite;
  }

  :global(body[data-theme="light"]) .git {
    background-color: rgb(216, 216, 216);
  }
  :global(body[data-theme="dark"]) .git {
    background-color: #1b1b1b;
  }
  .logo-section {
    position: relative;
    transition: all ease 150ms;
    height: 100vh;
  }

  :global(body[data-theme="dark"]) .logo-section {
    background-color: #f8000063;
  }
  :global(body[data-theme="light"]) .logo-section {
    background-color: #f7000081;
  }

  .git {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    width: 130px;
    height: 170px;
    z-index: 4;
    padding: 10px;
    transition: all ease 150ms;
    box-shadow: 0 0 6px 4px rgba(0, 0, 0, 0.11);
    animation:
      shine1 15s linear infinite,
      shine2 20s linear infinite;
  }
  .js {
    position: absolute;
    top: 22%;
    left: 20%;
    transform: translate(-50%, -50%);
    z-index: 5;
    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    border-bottom-left-radius: 22px;
    animation: decreaseSize 15s linear infinite;
  }
  .html {
    position: absolute;
    top: 75%;
    left: 77%;
    transform: translate(-50%, -50%);
    z-index: 5;
    background-color: rgb(255, 123, 47);
    border-bottom-right-radius: 22px;
    border-top-right-radius: 22px;
    border-bottom-left-radius: 22px;
  }

  .go {
    position: absolute;
    top: 15%;
    left: 75%;
    transform: translate(-50%, -50%);
    z-index: 5;

    border-top-left-radius: 22px;
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
  }

  :global(body[data-theme="dark"]) .go {
    background-color: rgb(3, 14, 27);
  }
  :global(body[data-theme="light"]) .go {
    background-color: rgb(74, 243, 255);
  }

  @keyframes js-1 {
    0% {
      top: -50%;
      left: 0%;
      width: 1px;
      height: 60px;
    }
    20% {
      top: 100%;
      left: 0%;
      width: 1px;
      height: 60px;
    }
    40% {
      top: 100%;
      left: 10%;
      width: 30px;
      height: 1px;
    }
    45% {
      top: 99%;
      width: 60px;
      height: 1px;
    }
    60% {
      opacity: 1;
      top: 100%;
      left: 95%;
      width: 60px;
      height: 1px;
    }
    61% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes js-2 {
    0% {
      top: 0%;
      left: -50%;
      width: 60px;
      height: 1px;
    }
    20% {
      top: 0%;
      left: 99%;
      width: 60px;
      height: 1px;
    }
    40% {
      top: 10%;
      left: 99%;
      width: 1px;
      height: 60px;
    }
    45% {
      left: 99%;
      width: 1px;
      height: 60px;
    }
    60% {
      opacity: 1;
      top: 100%;
      left: 99%;
      width: 1px;
      height: 60px;
    }
    61% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes jsL-1 {
    0% {
      opacity: 0;
    }
    59% {
      opacity: 0;
      top: 0%;
    }
    60% {
      opacity: 1;
      top: 50%;
      left: 0%;
      transform: scale(1.6) translate(0, -50%);
    }
    65% {
      transform: scale(1) translate(0, -50%);
    }
    70% {
      transform: scale(1.6) translate(0, -50%);
    }
    80% {
      transform: scale(1) translate(0, -50%);
    }
    85% {
      transform: scale(1.6) translate(0, -50%);
    }
    90% {
      transform: scale(1) translate(0, -50%);
    }
    95% {
      transform: scale(1.6) translate(0, -50%);
    }
    100% {
      top: 50%;
      left: 95%;
      transform: scale(1) translate(0, -50%);
    }
  }

  @keyframes css-1 {
    0% {
      left: 20%;
      top: 15%;
    }
    5% {
      left: 20%;
      top: 90%;
    }
    10% {
      left: 80%;
      top: 90%;
    }
    15% {
      left: 80%;
      top: 15%;
    }
    /* Baş. Kon. */
    20% {
      left: 20%;
      top: 15%;
    }
    22% {
      left: 25%;
      top: 90%;
    }
    24% {
      left: 80%;
      top: 80%;
    }
    26% {
      left: 80%;
      top: 15%;
    }
    /* Baş. Kon. */
    28% {
      left: 20%;
      top: 15%;
    }
    30% {
      left: 25%;
      top: 90%;
    }
    32% {
      left: 80%;
      top: 80%;
    }
    34% {
      left: 80%;
      top: 15%;
    } /* Baş. Kon. */
    36% {
      left: 20%;
      top: 15%;
    }
    38% {
      left: 25%;
      top: 90%;
    }
    40% {
      left: 80%;
      top: 80%;
    }
    42% {
      left: 80%;
      top: 5%;
    }
    70% {
      left: 20%;
      top: 15%;
    }
    75% {
      left: 50%;
      top: 50%;
    }
    76% {
      left: 48%;
      top: 52%;
    }
    77% {
      left: 52%;
      top: 52%;
    }
    79% {
      left: 70%;
      top: 60%;
    }
    80% {
      opacity: 1;
      left: 100%;
      top: 0%;
    }
    81% {
      opacity: 0;
    }
    90% {
      opacity: 0;
      left: 20%;
      top: 15%;
    }
    91% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
      left: 20%;
      top: 15%;
    }
  }
  @keyframes css-2 {
    0% {
      left: 80%;
      top: 90%;
    }
    5% {
      left: 80%;
      top: 15%;
    }
    10% {
      left: 20%;
      top: 15%;
    }
    15% {
      left: 20%;
      top: 90%;
    }
    /* Baş. Kon. */
    20% {
      left: 80%;
      top: 90%;
    }
    22% {
      left: 80%;
      top: 15%;
    }
    24% {
      left: 20%;
      top: 15%;
    }
    26% {
      left: 20%;
      top: 90%;
    }
    /* Baş. Kon. */
    28% {
      left: 80%;
      top: 90%;
    }
    30% {
      left: 80%;
      top: 15%;
    }
    32% {
      left: 20%;
      top: 15%;
    }
    34% {
      left: 20%;
      top: 90%;
    }
    /* Baş. Kon. */
    36% {
      left: 80%;
      top: 90%;
    }
    38% {
      left: 80%;
      top: 15%;
    }
    40% {
      left: 20%;
      top: 15%;
    }
    42% {
      left: 20%;
      top: 90%;
    }
    70% {
      left: 90%;
      top: 95%;
    }
    75% {
      left: 50%;
      top: 50%;
    }
    76% {
      left: 52%;
      top: 48%;
    }
    77% {
      left: 48%;
      top: 48%;
    }
    79% {
      left: 50%;
      top: 20%;
    }
    80% {
      opacity: 1;
      left: 100%;
      top: 0%;
    }
    81% {
      opacity: 0;
    }
    90% {
      opacity: 0;
      left: 80%;
      top: 90%;
    }
    91% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
      left: 80%;
      top: 90%;
    }
  }

  @keyframes cssL-1 {
    0% {
      opacity: 0;
    }
    79% {
      opacity: 0;
    }
    80% {
      opacity: 1;
      left: 0;
    }
    100% {
      opacity: 1;
      left: 100%;
    }
  }
  @keyframes decreaseSize {
    0% {
      transform: scale(1) translate(-50%, -50%);
    }
    59% {
      transform: scale(1) translate(-50%, -50%);
    }
    60% {
      transform: scale(0.95) translate(-50%, -50%);
    }
    61% {
      transform: scale(1) translate(-50%, -50%);
    }
  }
  @keyframes decreaseSize2 {
    0% {
      transform: scale(1) translate(-50%, -50%);
    }
    79% {
      transform: scale(1) translate(-50%, -50%);
    }
    80% {
      transform: scale(0.99) translate(-50%, -50%);
    }
    81% {
      transform: scale(1) translate(-50%, -50%);
    }
  }
</style>
