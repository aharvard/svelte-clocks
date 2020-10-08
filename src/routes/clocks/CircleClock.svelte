<script>
  import { time } from "../../stores.js";

  let w;

  $: hour = $time.h > 12 ? $time.h - 12 : $time.h;
  $: apm = $time.h > 11 ? "PM" : "AM";

  $: min = $time.m;
  $: sec = $time.s;

  let width = 22;
  let height = width;

  let x = width / 2;
  let y = height / 2;

  let strokeColor = "white";

  let secStrokeWidth = 1;
  let secRadius = 8;
  let secPathLength = 2 * Math.PI * secRadius;
  $: secProgress =
    sec === 0
      ? secPathLength - 0.001
      : secPathLength - (sec / 60) * secPathLength;

  let minStrokeWidth = 2.5;
  let minRadius = 8;
  let minPathLength = 2 * Math.PI * minRadius;
  $: minProgress =
    min === 0
      ? minPathLength - 0.001
      : minPathLength - (min / 60) * minPathLength;

  let hourStrokeWidth = 4;
  let hourRadius = 8;
  let hourPathLength = 2 * Math.PI * hourRadius;
  $: hourProgress =
    hour === 0
      ? hourPathLength - 0.001
      : hourPathLength - (hour / 12) * hourPathLength;

  const backgrounds = {
    sunrise: ["#0C2C5C", "#BE7C39"],
    day: ["#0B7CEE", "#7ABEE5"],
    sunset: ["#0661E8", "#FFC286"],
    night: ["#051226", "#0E0A55"],
  };

  $: backgrounGradient =
    $time.h >= 6 && $time.h < 7
      ? backgrounds.sunrise
      : $time.h >= 7 && $time.h < 18
      ? backgrounds.day
      : $time.h >= 18 && $time.h < 19
      ? backgrounds.sunset
      : backgrounds.night;
</script>

<style>
  div {
    height: 100%;
    background: black;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
  }
  span {
    display: block;
    text-align: center;
    font-family: "Gugi", sans-serif;
    color: white;
  }
  div > * {
    grid-column: 1 / 2;
    grid-row: 1 /2;
  }
  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  circle {
    stroke-linecap: round;
    fill: none;
    transition: all 500ms cubic-bezier(0.16, 1, 0.3, 1);
    filter: brightness(150%);
  }
  .rewind {
    animation: rewind 750ms ease;
  }
  @keyframes rewind {
    from {
      stroke-dashoffset: var(--rewind-value);
    }
  }
</style>

<svelte:head>
  <title>Circle Clock</title>
</svelte:head>

<div
  style="background-image:linear-gradient( {backgrounGradient[0]}, {backgrounGradient[1]} )">
  <span bind:clientWidth={w} style="font-size: {w * 0.005}rem">
    {apm}
    {$time.h}
  </span>

  <svg viewBox="0 0 {width} {height}">
    <circle
      class:rewind={sec === 0}
      style="--rewind-value: {secPathLength / 60}"
      cx={x}
      cy={y}
      fill="none"
      stroke={strokeColor}
      stroke-opacity=".7"
      r={secRadius}
      stroke-width={secStrokeWidth}
      stroke-dasharray={secPathLength}
      stroke-dashoffset={secProgress} />
    <circle
      class:rewind={min === 59 && sec === 59}
      style="--rewind-value: {minPathLength / 60}"
      cx={x}
      cy={y}
      fill="none"
      stroke={strokeColor}
      stroke-opacity=".5"
      r={minRadius}
      stroke-width={minStrokeWidth}
      stroke-dasharray={minPathLength}
      stroke-dashoffset={minProgress} />
    <circle
      class:rewind={hour === 12}
      style="--rewind-value: {hourPathLength / 12}"
      cx={x}
      cy={y}
      fill="none"
      stroke={strokeColor}
      stroke-opacity=".3"
      r={hourRadius}
      stroke-width={hourStrokeWidth}
      stroke-dasharray={hourPathLength}
      stroke-dashoffset={hourProgress} />
  </svg>
</div>
