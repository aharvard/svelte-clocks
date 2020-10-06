<script>
  import SvelteClock from "./SvelteClock.svelte";
  import MyClock from "./MyClock.svelte";
  import NumberClock from "./NumberClock.svelte";
  import DotClock from "./DotClock.svelte";
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    gap: 1rem;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>

<svelte:head>
  <title>Svelte Clocks</title>
</svelte:head>

<h1>Svelte Clocks</h1>

<div class="grid">
  <a href="DotClock">
    <DotClock />
  </a>
  <a href="NumberClock">
    <NumberClock />
  </a>
  <a href="MyClock">
    <MyClock />
  </a>
  <a href="SvelteClock">
    <SvelteClock />
  </a>
</div>
