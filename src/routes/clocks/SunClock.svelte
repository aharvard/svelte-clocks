<script>
  import { onMount } from "svelte";
  import { time } from "../../stores.js";

  $: CURRENT = {
    hour: $time.h,
    min: $time.m,
    sec: $time.s,
    now: $time.now,
  };

  const totalSecsInADay = 60 * 60 * 24;

  //   GET Sun Data

  const lat = 36.119791;
  const lon = -85.511413;

  let dayStart = 0;
  let dayEnd = 0;

  const APIkey = "bd31cab92f48dd58c302c64f5e50c593";
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${APIkey}`;

  function getRelativeSec(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  async function getWeatherData() {
    const response = await fetch(URL);
    const data = await response.json();
    const today = data.daily[0];
    const tomorrow = data.daily[1];
    const sunData = {
      today: {
        sunrise: getRelativeSec(today.sunrise),
        sunset: getRelativeSec(today.sunset),
      },
      tomorrow: {
        sunrise: getRelativeSec(tomorrow.sunrise),
        sunset: getRelativeSec(tomorrow.sunset),
      },
    };
    return sunData;
  }

  // CANVAS

  const C_W = 1000,
    C_H = 1000;

  let canvas;
  onMount(() => {
    let sunriseA = 0;
    let sunset = 0;

    getWeatherData()
      .then((data) => {
        dayStart = data.today.sunrise;
        dayEnd = data.today.sunset;
        console.table(data);
        console.log("🌞" + dayStart, "🌘" + dayEnd);
      })
      .then(() => {
        canvas.style.cssText = "opacity: 1; transform: scale(1) translateY(0)";
        motion();
        window.setInterval(motion, 1000);
      });

    const ctx = canvas.getContext("2d");
    const ORB_RADIUS = 300;
    const NUMBERS_OFFSET = 1.1;

    // CANVAS CONFIG
    ctx.translate(C_W * 0.5, C_H * 0.64); // center orgin

    const makeNightOrb = () => {
      ctx.arc(0, 0, ORB_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#461979";
      ctx.fill();
    };

    const makeNumbers = () => {
      ctx.save();
      ctx.textAlign = "center";
      ctx.font = "30px sans-serif";
      ctx.fillStyle = "#ffffff";

      //  Numbers
      for (var num = 1; num < 25; num++) {
        ctx.rotate(Math.PI / 12);
        ctx.save();
        ctx.translate(ORB_RADIUS * NUMBERS_OFFSET, 0);
        ctx.rotate(Math.PI / 2);
        let twelveNum = num > 12 ? num - 12 : num;
        ctx.fillText(twelveNum, 0, 0);
        ctx.restore();
      }
      ctx.restore();
    };

    const makeDayOrb = () => {
      // -180 deg = Midnight
      // -90 deg = 6am
      // 0 deg = Noon
      // 90 deg = 6pm
      // 180 deg = Midnight

      const getAngle = (sunEventTime) => {
        //   New day starts at 180 deg
        return (sunEventTime / totalSecsInADay) * 360 - 180;
      };

      let dayStartAngle = getAngle(dayStart),
        dayEndAngle = getAngle(dayEnd);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const startAngle = (Math.PI / 180) * dayStartAngle;
      const endAngle = (Math.PI / 180) * dayEndAngle;
      ctx.arc(0, 0, ORB_RADIUS, startAngle, endAngle);
      ctx.lineTo(0, 0);
      ctx.fillStyle = "#FFE800";
      ctx.fill();
      ctx.restore();
    };

    function highlight() {
      ctx.save();
      var radgrad4 = ctx.createRadialGradient(
        ORB_RADIUS / 10,
        ORB_RADIUS / 10,
        ORB_RADIUS,
        ORB_RADIUS / 10,
        ORB_RADIUS / 10,
        10
      );
      radgrad4.addColorStop(0, "#000000");
      radgrad4.addColorStop(1, "#ffffff");
      ctx.fillStyle = radgrad4;
      ctx.arc(0, 0, ORB_RADIUS, 0, Math.PI * 2);
      ctx.globalCompositeOperation = "overlay";
      ctx.fill();
      ctx.restore();
    }

    const spin = () => {
      let secsSoFar = CURRENT.hour * 60 * 60 + CURRENT.min * 60 + CURRENT.sec;
      let timeofDayAngle = (secsSoFar / totalSecsInADay) * -360;
      ctx.rotate((Math.PI / 180) * 90);
      ctx.rotate((Math.PI / 180) * timeofDayAngle);
    };

    function motion() {
      ctx.save();
      ctx.clearRect(C_W * -0.5, C_H * -0.5, C_W, C_H);
      spin();
      makeNightOrb();
      makeDayOrb();
      makeNumbers();
      highlight();
      ctx.restore();
      console.log("motion");
    }
  });
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    position: relative;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr;
    background: #222222;
    z-index: -1;
    overflow: hidden;
  }

  canvas {
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: block;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    object-fit: contain;
    z-index: -1;
    opacity: 0;
    transform: scale(0.8) translateY(10%);
    transition: all 3000ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .line {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    background: red;
    width: 2px;
    z-index: -1;
    height: 28%;
    margin: auto;
  }

  svg {
    display: block;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    /* opacity: 0.1; */
  }

  .background {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    z-index: -1;
    /* max-height: 1000px; */
    /* max-width: 1000px; */
    margin: auto;
  }

  .background--day {
    background-image: linear-gradient(180deg, #5ba6ff 0%, #0068ab 99%);
  }
  .background--night {
    background-image: linear-gradient(180deg, #170946 0%, #130b1d 100%);
  }
</style>

<div>
  <canvas bind:this={canvas} width={C_W} height={C_H} />

  <svg
    id="forgroundSVG"
    width="1000px"
    height="1000px"
    viewBox="0 0 1000 1000"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <path
      fill="#222"
      d="M1000,0 L1000,1000 L0,1000 L0,0 L1000,0 Z M507.10262,230.654254 C504.729718,230.654254 502.361772,230.673922 499.998923,230.713102 C497.638897,230.673927 495.270617,230.654254 492.89738,230.654254 C484.141591,230.654254 475.709573,231.278382 467.609125,232.472139 L467.619733,232.487419 C290.511464,249.026765 147.055549,375.765982 99.8244629,542.722512 C35.537592,769.969305 268.943582,561.388351 500.000874,558.088664 C731.057091,561.388953 964.462315,769.968977 900.175537,542.722512 C852.944451,375.765982 709.488536,249.026765 532.380267,232.487419 L532.390875,232.472139 C524.290427,231.278382 515.858409,230.654254 507.10262,230.654254 Z" />
  </svg>

  <div class="line" />
</div>
