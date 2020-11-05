<script>
  import { time } from "../stores.js";

  let hours = Array.from(Array(24), (h, i) => {
    h = i;
    return h + i;
  });

  let mins = Array.from(Array(60), (m, i) => {
    m = i;
    return m + i;
  });

  let secs = Array.from(Array(60), (s, i) => {
    s = i;
    return s + i;
  });
</script>

<style>
  .clock-wrapper {
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

<div class="clock-wrapper">
  <div class="hours">
    {#each hours as hourBlock, i}
      <div
        id={'hour-' + hourBlock}
        class={$time.h === i ? 'block block--current' : 'block'} />
    {/each}
  </div>
  <div class="minutes">
    {#each mins as minBlock, i}
      <div
        id={'min-' + minBlock}
        class={$time.m === i ? 'block block--current' : 'block'} />
    {/each}
  </div>
  <div class="seconds">
    {#each secs as secBlocks, i}
      <div
        id={'sec-' + secBlocks}
        class={$time.s === i ? 'block block--current' : 'block'} />
    {/each}
  </div>
</div>
