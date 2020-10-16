<script>
  import GridClock from "./clocks/GridClock.svelte";
  import NumberClock from "./clocks/NumberClock.svelte";
  import CircleClock from "./clocks/CircleClock.svelte";
  import InterClassicClock from "./clocks/InterClassicClock.svelte";
  import SunClock from "./clocks/SunClock.svelte";
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

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 3rem;
  }
</style>

<svelte:head>
  <title>Svelte Clocks</title>
</svelte:head>

<h1 class="svelte-clocks-logo">Svelte Clocks</h1>

<div class="grid">
  <a href="clocks/SunClock">
    <SunClock />
  </a>
  <a href="clocks/InterClassicClock">
    <InterClassicClock />
  </a>
  <a href="clocks/CircleClock">
    <CircleClock />
  </a>
  <a href="clocks/NumberClock">
    <NumberClock />
  </a>
  <a href="clocks/GridClock">
    <GridClock />
  </a>
  <!-- <a href="clocks/SvelteClock">
    <SvelteClock />
  </a> -->
</div>
