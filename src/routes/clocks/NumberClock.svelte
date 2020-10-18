<script>
  import { time } from "../../stores.js";

  $: hour = $time.h > 12 ? $time.h - 12 : $time.h;
  $: min = $time.m < 10 ? `0${$time.m}` : $time.s;
  $: sec = $time.s < 10 ? `0${$time.s}` : $time.s;
  $: apm = $time.h > 12 ? "PM" : "AM";

  let w;
</script>

<style>
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "VT323", monospace;
    background: #111;
  }

  p {
    font-size: var(--sizer);
    text-align: center;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: -0.03em -0.035em 0.02em rgba(255, 0, 0, 0.8),
      0.03em 0.035em 0.02em cyan;
    filter: blur(0.008em);
  }
</style>

<div bind:clientWidth={w}>
  <p style="--sizer: {w * 0.01}rem;">{hour}:{min}:{sec} {apm}</p>
</div>
