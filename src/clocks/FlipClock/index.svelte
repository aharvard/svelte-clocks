<script>
  import NummberFlipper from "./NumberFlipper.svelte";
  import { time } from "../../stores.js";

  $: sec = $time.s < 10 ? `0${$time.s}` : $time.s;
  $: min = $time.m < 10 ? `0${$time.m}` : $time.m;

  $: secDigitOnes = parseInt(sec.toString()[1]);
  $: secDigitTens = parseInt(sec.toString()[0]);

  $: minDigitOnes = parseInt(min.toString()[1]);
  $: minDigitTens = parseInt(min.toString()[0]);

  let zeroToNineArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let zeroToFiveArray = [0, 1, 2, 3, 4, 5];
  let hoursArray = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ];
</script>

<style>
  .container {
    height: 50vh;
    background: #f7f7f7;
    margin: 2rem;
    perspective: 2000px;
  }

  .flip-clock {
    outline: 2px solid green;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin: auto;
    transform-style: preserve-3d;
    transform: translateY(200px) rotateY(60deg) rotateX(0deg);
  }
  :global(.flip-clock *) {
    flex: 0 0 5em;
    /* outline: 1px solid; */
  }
</style>

<div class="container">
  <div class="flip-clock">
    <NummberFlipper
      currentNumber={minDigitTens}
      numberArray={zeroToFiveArray} />
    <NummberFlipper
      currentNumber={minDigitOnes}
      numberArray={zeroToFiveArray} />
    <NummberFlipper
      currentNumber={secDigitTens}
      numberArray={zeroToFiveArray} />
    <NummberFlipper
      currentNumber={secDigitOnes}
      numberArray={zeroToNineArray} />
    <!-- <NummberFlipper currentNumber={0} numberArray={hoursArray} /> -->
  </div>
  {sec}
  {secDigitOnes}
</div>
