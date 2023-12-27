<script>
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let snowFlakes2 = [];
  let snowFlakes3 = [];
  let snowFlakes4 = [];

  function createSnowFlake() {
    const parent = document.getElementById("switch");
    let div1 = document.createElement("div");
    parent.appendChild(div1);
    let snowPosition = Math.floor(Math.random() * 98);
    let snowFlakeSize = Math.floor(Math.random() * 9);
    let animNumb = Math.floor(Math.random() * 3) + 1;
    animNumb = checkNumber(animNumb);
    let color = checkColor(snowFlakeSize);
    div1.className = `snowflake1-${animNumb}`;
    div1.style.left = `${snowPosition}%`;
    div1.style.width = `${snowFlakeSize}px`;
    div1.style.height = `${snowFlakeSize}px`;
    div1.style.backgroundColor = color;
    div1.style.userSelect = "none";
    div1.style.cursor = "pointer";
    if (animNumb === 2) {
      snowFlakes2.push(div1);
    } else if (animNumb === 3) {
      snowFlakes3.push(div1);
    } else if (animNumb === 4) {
      snowFlakes4.push(div1);
    }
  }

  function checkColor(num) {
    let opa = Math.floor(Math.random() * 4 + 1);
    if (num < 16) {
      return `rgba(241, 241, 241, .${opa})`;
    }
    return `rgba(241, 241, 241, .${opa + 4})`;
  }
  function sizeChecker(num) {
    if (num < 9) {
      return 10;
    } else {
      return num;
    }
  }

  function checkNumber(num) {
    let count = 0;
    if (num === 2) {
      snowFlakes2.forEach((x) => {
        count++;
      });
      if (count < 1) {
        return 2;
      } else {
        return 1;
      }
    } else if (num === 3) {
      snowFlakes3.forEach((x) => {
        count++;
      });
      if (count < 1) {
        return 3;
      } else {
        return 1;
      }
    } else if (num === 1) {
      snowFlakes4.forEach((x) => {
        count++;
      });
      if (count < 1) {
        return 4;
      } else {
        return 1;
      }
    }
  }

  onMount(() => {
    for (let i = 0; i < 30; i++) {
      let animTime = Math.floor(Math.random() * 9000);
      setTimeout(createSnowFlake, animTime);
    }

    const themeToggle = document.getElementById("theme-switch");
    let theme = localStorage.getItem("theme");
    if (theme) {
      document.body.setAttribute("data-theme", theme);
      if (theme === "light") {
        themeToggle.checked = true;
      } else {
        themeToggle.checked = false;
      }
    }
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        dispatch("themeChange", { value: "light" });
      } else {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        dispatch("themeChange", { value: "dark" });
      }
    });
  });
</script>

<label id="switch" class="switch">
  <input type="checkbox" id="theme-switch" checked />
  <span class="slider round"></span>
</label>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    border-radius: 30px;
    overflow: hidden;
    transform: scale(1.3);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(54, 58, 95);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "✨";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: rgb(27, 32, 71);
    border-radius: 50%;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
  }

  input:checked + .slider {
    background-color: rgb(206, 206, 206);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    content: "❄️";
    background-color: rgb(238, 238, 234);
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    z-index: 3;
  }

  :global(.snowflake1-1) {
    user-select: none;
    position: absolute;
    border-radius: 50%;
    animation: 7s infinite snow-1;
    z-index: 1;
  }
  :global(.snowflake1-2) {
    user-select: none;
    position: absolute;
    left: 10%;
    border-radius: 50%;
    animation: 2s infinite snow-2;
  }
  :global(.snowflake1-3) {
    user-select: none;
    position: absolute;
    left: 10%;
    border-radius: 50%;
    animation: 2s infinite snow-3;
  }
  :global(.snowflake1-4) {
    user-select: none;
    position: absolute;
    left: 10%;
    border-radius: 50%;
    animation: 4s infinite snow-4;
  }

  @keyframes snow-1 {
    0% {
      top: -5%;
    }

    80% {
      opacity: 1;
    }
    84% {
      opacity: 0;
      display: none;
    }
    100% {
      display: none;
      opacity: 0;
      top: 120%;
    }
  }

  @keyframes snow-2 {
    0% {
      top: -5%;
    }

    80% {
      opacity: 1;
    }
    84% {
      opacity: 0;
      display: none;
    }
    100% {
      display: none;
      opacity: 0;
      top: 120%;
      left: 60%;
    }
  }
  @keyframes snow-3 {
    0% {
      top: -5%;
    }

    80% {
      opacity: 1;
    }
    84% {
      opacity: 0;
      display: none;
    }
    100% {
      display: none;
      opacity: 0;
      top: 120%;
      left: 100%;
    }
  }
  @keyframes snow-4 {
    0% {
      top: -5%;
    }

    80% {
      opacity: 1;
    }
    84% {
      opacity: 0;
      display: none;
    }
    100% {
      display: none;
      opacity: 0;
      top: 120%;
      left: 0%;
    }
  }
</style>
