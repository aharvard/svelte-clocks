<script>
  import { onMount } from "svelte";

  import { time } from "../../stores.js";

  const C_W = 1000,
    C_H = 1000;

  $: CURRENT = {
    hour: $time.h,
    min: $time.m,
    sec: $time.s,
    now: $time.now,
  };

  let fakeSunrise = Math.round(Date.parse("14 Oct 2020 07:00:00 CST") / 1000);
  let fakeSunriseB = Math.round(Date.parse("15 Oct 2020 07:00:00 CST") / 1000);
  let fakeSunset = Math.round(Date.parse("14 Oct 2020 19:00:00 CST") / 1000);

  let data = {
    daily: [
      {
        sunrise: fakeSunrise,
        sunset: fakeSunset,
      },
      {
        sunrise: fakeSunriseB,
        sunset: fakeSunset,
      },
    ],
  };

  let sunset = data.daily[0].sunset;
  let sunrise = data.daily[1].sunrise;

  let canvas;
  onMount(() => {
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
        ctx.rotate(Math.PI / -12);
        ctx.save();
        ctx.translate(ORB_RADIUS * NUMBERS_OFFSET, 0);
        ctx.rotate(Math.PI / 2);
        let twelveNum = num > 12 ? num - 12 : num;
        ctx.fillText(twelveNum, 0, 0);
        ctx.restore();
      }
      ctx.restore();
    };

    const makeDayOrb = (dayStartAngle, dayEndAngle) => {
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
      let totalSecsInADay = 60 * 60 * 24;
      let timeofDayAngle = (secsSoFar / totalSecsInADay) * 360;
      ctx.rotate((Math.PI / 180) * 90);
      ctx.rotate((Math.PI / 180) * timeofDayAngle);
      console.log(timeofDayAngle);
    };

    function motion() {
      ctx.save();
      ctx.clearRect(C_W * -0.5, C_H * -0.5, C_W, C_H);
      spin();
      makeNightOrb();
      makeDayOrb(-78, 94);
      makeNumbers();
      highlight();
      ctx.restore();
      //   window.requestAnimationFrame(motion);
    }

    setInterval(motion, 1000);
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
  }
  .line {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    background: red;
    width: 2px;
    z-index: -1;
    height: 40%;
    margin: auto;
  }

  svg {
    display: block;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    height: 100%;
    width: 100%;
    margin: 0 auto;
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
