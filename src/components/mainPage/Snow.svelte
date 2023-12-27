<script>
  import { onMount } from "svelte";

  let snowFlakes2 = [];
  let snowFlakes3 = [];
  let snowFlakes4 = [];

  function createSnowFlake() {
    const parent = document.getElementById("my-col");
    let div1 = document.createElement("div");
    parent.appendChild(div1);
    let snowPosition = Math.floor(Math.random() * 99);
    let snowFlakeSize = Math.floor(Math.random() * 18);
    snowFlakeSize = sizeChecker(snowFlakeSize);
    let animNumb = Math.floor(Math.random() * 3) + 1;
    animNumb = checkNumber(animNumb);
    let color = checkColor(snowFlakeSize);
    div1.className = `snowflake-${animNumb}`;
    div1.style.left = `${snowPosition}%`;
    div1.style.width = `${snowFlakeSize}px`;
    div1.style.height = `${snowFlakeSize}px`;
    div1.style.backgroundColor = color;
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
    for (let i = 0; i < 110; i++) {
      let animTime = Math.floor(Math.random() * 24000);
      setTimeout(createSnowFlake, animTime);
    }
  });
</script>

<div class="snowflake-2"></div>

<style>
  :global(.snowflake-1) {
    user-select: none;
    position: absolute;
    border-radius: 50%;
    animation: 24s infinite snow-1;
    z-index: 0;
  }
  :global(.snowflake-2) {
    user-select: none;
    position: absolute;
    left: 10%;
    border-radius: 50%;
    animation: 24s infinite snow-2;
  }
  :global(.snowflake-3) {
    user-select: none;
    position: absolute;
    left: 10%;
    border-radius: 50%;
    animation: 24s infinite snow-3;
  }
  :global(.snowflake-4) {
    user-select: none;
    position: absolute;
    left: 10%;
    border-radius: 50%;
    animation: 24s infinite snow-4;
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
