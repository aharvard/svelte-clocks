<script>
  import { time } from "../../stores.js";

  let hours = new Array(24);
  let mins = new Array(60);
  let secs = new Array(60);
</script>

<style>
  .clock {
    display: flex;
    height: 100%;
  }
  .hours,
  .minutes,
  .seconds {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
  .block {
    background: #ddd;
    border: 1px solid white;
    flex: 1 1 10px;
  }
  .block--current {
    background: #444;
  }
</style>

<div class="clock">
  <div class="hours">
    {#each hours as hourBlock, i}
      <div class={$time.h === i ? 'block block--current' : 'block'} />
    {/each}
  </div>
  <div class="minutes">
    {#each mins as minsBlock, i}
      <div class={$time.m === i ? 'block block--current' : 'block'} />
    {/each}
  </div>
  <div class="seconds">
    {#each secs as secondBlocks, i}
      <div class={$time.s === i ? 'block block--current' : 'block'} />
    {/each}
  </div>
</div>
