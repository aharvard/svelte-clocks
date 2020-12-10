<script>
  import { onMount } from "svelte";
  import { time } from "../stores.js";

  $: CURRENT = {
    hour: $time.h,
    min: $time.m,
    sec: $time.s,
    now: $time.now,
  };

  $: console.log(CURRENT);

  console.log(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  $: secsSoFar = CURRENT.hour * 60 * 60 + CURRENT.min * 60 + CURRENT.sec;

  const TOTAL_SEC_IN_A_DAY = 60 * 60 * 24;
  const CANVAS_W = 1000;
  const CANVAS_H = 1000;
  const ORB_RADIUS = 300;
  const NUMBERS_OFFSET = 1.1;

  let lat = 36.119791;
  let lon = -85.511413;

  function getRelativeSec(unix_timestamp) {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return hours * 60 * 60 + minutes * 60 + seconds;
  }

  async function getWeatherData() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${
        import.meta.env.SNOWPACK_PUBLIC_OPEN_WEATHER_MAP_API_KEY
      }`
    );
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
    console.log(sunData);
    return sunData;
  }

  let canvas,
    CONTAINER_WIDTH,
    isDay,
    isNight,
    dayStart = 0,
    dayEnd = 0;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    ctx.translate(CANVAS_W * 0.5, CANVAS_H * 0.64); // center orgin

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

    const makeNightOrb = () => {
      ctx.save();
      ctx.arc(0, 0, ORB_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#461979";
      ctx.fill();
      ctx.restore();
    };

    const makeDayOrb = () => {
      const getAngle = (sunEventTime) => {
        // -180 deg = Midnight
        // -90 deg = 6am
        // 0 deg = Noon
        // 90 deg = 6pm
        // 180 deg = Midnight
        //   New day starts at 180 deg
        return (sunEventTime / TOTAL_SEC_IN_A_DAY) * 360 - 180;
      };

      let dayStartAngle = getAngle(dayStart),
        dayEndAngle = getAngle(dayEnd);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const startAngle = (Math.PI / 180) * dayStartAngle;
      const endAngle = (Math.PI / 180) * dayEndAngle;
      ctx.arc(0, 0, ORB_RADIUS, startAngle, endAngle);
      ctx.moveTo(0, 0);
      ctx.fillStyle = "#FFE800";
      ctx.fill();
      ctx.restore();
    };

    function highlight() {
      ctx.save();
      var radGrad = ctx.createRadialGradient(
        ORB_RADIUS / 10,
        ORB_RADIUS / 10,
        ORB_RADIUS,
        ORB_RADIUS / 10,
        ORB_RADIUS / 10,
        10
      );
      radGrad.addColorStop(0, "#000000");
      radGrad.addColorStop(1, "#ffffff");
      ctx.fillStyle = radGrad;
      ctx.arc(0, 0, ORB_RADIUS, 0, Math.PI * 2);
      ctx.globalCompositeOperation = "overlay";
      ctx.fill();
      ctx.restore();
    }
    const strokeOrb = () => {
      const THICKNESS = 3;
      const OFFSET = 1;
      ctx.save();
      ctx.beginPath();
      // Outer Circle
      ctx.arc(0, 0, ORB_RADIUS + THICKNESS - OFFSET, 0, 2 * Math.PI, false);
      // Innerr Circle
      ctx.arc(0, 0, ORB_RADIUS - OFFSET, 0, 2 * Math.PI, true);
      var radialGradient = ctx.createRadialGradient(
        0,
        0,
        ORB_RADIUS + THICKNESS - OFFSET, // outer
        0,
        0,
        ORB_RADIUS - OFFSET // inner
      );
      radialGradient.addColorStop(0, "#ddd"); // outer
      radialGradient.addColorStop(1, "#ddd");
      ctx.fillStyle = radialGradient;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    const spin = () => {
      let timeofDayAngle = (secsSoFar / TOTAL_SEC_IN_A_DAY) * -360;
      ctx.rotate((Math.PI / 180) * 90);
      ctx.rotate((Math.PI / 180) * timeofDayAngle);
    };

    function draw() {
      ctx.save();
      ctx.clearRect(CANVAS_W * -0.5, CANVAS_H * -0.5, CANVAS_W, CANVAS_H);
      spin();
      makeNumbers();
      makeNightOrb();
      makeDayOrb();
      highlight();
      strokeOrb();
      ctx.restore();

      // console.log("dayStart", dayStart);
      // console.log("dayEnd", dayEnd);
      // console.log("secsSoFar", secsSoFar);

      isDay = secsSoFar >= dayStart && secsSoFar <= dayEnd ? true : false;
      isNight = !isDay;
    }

    getWeatherData()
      .then((data) => {
        dayStart = data.today.sunrise;
        dayEnd = data.today.sunset;
      })
      .then(() => {
        draw();
        window.setInterval(draw, 30000);
      });
  });
</script>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    overflow: hidden;
    width: 100%;
    height: 100%;
    place-content: center;
  }
  .container {
    background: #f7f7f7;
    position: relative;
  }
  .scaler {
    transform: scale(calc(var(--scale-value) * 0.0009));
    overflow: visible;
    clip-path: url(#forgroundSVG);
  }
  canvas {
    display: block;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  .line {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    transform: translateY(-2%) scaleY(1.15);
    margin: auto;
    z-index: 1;
  }
  svg {
    display: block;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    height: 100%;
    width: 100%;
  }

  .day {
    background: linear-gradient(180deg, #5ba6ff 40%, #0068ab 70%);
  }

  .night {
    background: linear-gradient(180deg, #2b2344 40%, #481675 70%);
  }

  :global(#myLocationButton) {
    position: absolute;
    display: block;
    bottom: 5%;
    left: 0;
    right: 0;
    margin: auto;
    /* margin-left: -25%; */
    text-align: center;
  }
</style>

<div class="container" bind:clientWidth={CONTAINER_WIDTH}>
  <p id="myLocationButton">Local to Cookeville, TN</p>
  <div class="scaler" style={`--scale-value: ${CONTAINER_WIDTH}`}>
    <canvas
      bind:this={canvas}
      width={CANVAS_W}
      height={CANVAS_H}
      class:day={isDay}
      class:night={isNight} />

    <div class="line">
      <svg
        width="1000px"
        height="1000px"
        viewBox="0 0 1000 1000"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
        <path
          d="M500.5,387 C501.333687,387 502.014587,387.666154 502.032839,388.49964 L508,661 L508,661 L493,661 L498.967161,388.49964 C498.985413,387.666154 499.666313,387 500.5,387 Z"
          id="Needle"
          fill="#FF0000" />
      </svg>
    </div>

    <svg
      width="1000px"
      height="1000px"
      viewBox="0 0 1000 1000"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <clipPath id="forgroundSVG">
          <path
            d="M500.080308,562.032471 C710.77694,562.032471 882,854.708493 882,644.185535 C882,433.662577 711.196632,263 500.5,263 C289.803368,263 119,433.662577 119,644.185535 C119,854.708493 289.383676,562.032471 500.080308,562.032471 Z" />
        </clipPath>
      </defs>
    </svg>
  </div>
</div>
