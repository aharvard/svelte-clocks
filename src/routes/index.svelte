<script>
  import SvelteClock from "./SvelteClock.svelte";
  import MyClock from "./MyClock.svelte";
  import NumberClock from "./NumberClock.svelte";
  import CircleClock from "./CircleClock.svelte";
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Rancho&display=swap");

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
    font-family: "Rancho", sans-serif;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 3rem;
    color: #ff3e00;
  }
</style>

<svelte:head>
  <title>Svelte Clocks</title>
</svelte:head>

<h1>Svelte Clocks</h1>

<div class="grid">
  <a href="CircleClock">
    <CircleClock />
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
