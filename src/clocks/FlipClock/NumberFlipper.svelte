<script>
  export let currentNumber = 0;
  export let numberArray = [0, 1, 2, 3];
  export let debugFlipper = false;

  const axelAngle = 360 / numberArray.length;
  const axelStartPosition = -90;

  $: currentNumberAccumulator = currentNumberAccumulator + 1 || currentNumber;

  $: axelRotation = axelStartPosition - axelAngle * currentNumberAccumulator;

  $: console.log({
    currentNumber,
    axelAngle,
    axelStartPosition,
    currentNumberAccumulator,
    axelRotation,
    currentNumber,
    numberArrayLength: numberArray.length,
  });

  // make tile 9 side-b be the currnet bottom tile when number equals 0
  // make the side-b of last tile in the array the current bottom wen the number is the first item in the array

  $: isNextTopTile = (number) => number === currentNumber + 1;
  $: isCurrentTopTile = (number) => number === currentNumber;
  $: isCurrentBottomTile = (number) =>
    number === currentNumber - 1
      ? true
      : number === numberArray.length - 1 && currentNumber === numberArray[0]
      ? true
      : false;
  $: isPreviousBottomTile = (number) => number === currentNumber - 2;
</script>

<style>
  .axel {
    height: 5em;
    font-size: 20px;
    transform-style: preserve-3d;
    transform: rotateY(90deg) rotateZ(var(--axel-rotation));
    transition: all 750ms ease;
    outline: 1px solid;
  }

  .tile--placement {
    transform-style: preserve-3d;
    /* outline: 20px solid rgba(255, 0, 0, 0.2); */
  }

  .tile--placement:first-of-type .tile-side--a,
  .tile--placement:first-of-type .tile-side--b {
    background: red;
  }

  .tile {
    transform-origin: bottom center;
    transform-style: preserve-3d;
    position: relative;
    transition: transform 500ms ease-out;
    opacity: 0;
    /* --tile-flip-angle: 300deg; */
    /* This sets up the radial tile orientation */
    --tile-flip-angle: 180deg;
  }

  .tile--next-top {
    opacity: 1;
    /* --tile-flip-angle: calc(230deg); */
    /* This tile needs to be reoriented from the push back position */
    /* - 1 axel angle */
    --tile-flip-angle: calc(180deg - var(--axel-angle));
  }
  .tile--current-top {
    opacity: 1;
    /* --tile-flip-angle: calc(260deg); */
    /* This tile is already at the right posiiton */
    /* --tile-flip-angle: calc(var(--axel-angle)); */
  }
  .tile--current-bottom {
    transition-duration: 200ms;
    opacity: 1;
    /* --tile-flip-angle: calc(120deg); */
    /* This tile needs to flip X axels down to be 180 from current top */
    /* 180 deg - 1 axel axel angle */
    /* --tile-flip-angle: calc(180deg - var(--axel-angle)); */
    --tile-flip-angle: calc(1deg + var(--axel-angle));
  }
  .tile--previous-bottom {
    opacity: 1;
    transition-duration: 10ms;
    /* --tile-flip-angle: calc(100deg); */
    /* This tile needs to move back before it's into the pushed back position */
    /* 180 deg - 2 axel axel angle */
    --tile-flip-angle: calc(1deg + var(--axel-angle));
  }
  .tile--debug {
    opacity: 1;
    --tile-flip-angle: 180deg;
  }
  .tile-side {
    width: 5em;
    height: 2.5em;
    position: absolute;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    overflow: hidden;
    text-align: center;
    --tile-background: #333;
  }
  .tile-side--a {
    background: var(--tile-background);
    /* color: black; */
    transform: translateZ(-2px) rotateX(180deg);
  }
  .tile-side--b {
    transform: translateZ(2px);
    color: #fff;
    background: var(--tile-background);
    /* background: blue; */
  }

  .number {
    font-size: 4em;
    color: white;
  }

  .tile-side--a .number {
    margin-top: -0.15em;
    display: inline-block;
  }
  .tile-side--b .number {
    margin-top: -0.8em;
    display: inline-block;
  }
</style>

<div
  class="axel"
  style="--axel-rotation:{axelRotation}deg; --axel-angle:{axelAngle}deg">
  {#each numberArray as number, i}
    <div
      class="tile--placement"
      style="transform: translateY(2.5em) rotateX(90deg) rotateY({axelAngle * i}deg) translateX(.125em)">
      <div
        class="tile tile--{number}"
        class:tile--debug={debugFlipper}
        class:tile--next-top={isNextTopTile(number)}
        class:tile--current-top={isCurrentTopTile(number)}
        class:tile--current-bottom={isCurrentBottomTile(number)}
        class:tile--previous-bottom={isPreviousBottomTile(number)}
        style="transform: rotateZ(90deg) rotateX(var(--tile-flip-angle))">
        <div class="tile-side tile-side--a">
          <span class="number"> {number} </span>
        </div>
        <div class="tile-side tile-side--b">
          <span class="number">
            {number === numberArray.length - 1 ? 0 : number + 1}
          </span>
        </div>
      </div>
    </div>
  {/each}
</div>
