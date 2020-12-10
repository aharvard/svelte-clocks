<script>
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import SunClock from "./clocks/SunClock.svelte";
  import GridClock from "./clocks/GridClock.svelte";
  import NumberClock from "./clocks/NumberClock.svelte";
  import CircleClock from "./clocks/CircleClock.svelte";
  import InterClassicClock from "./clocks/InterClassicClock.svelte";
  import "/global.css";
  let googleFonts = ["Rancho", "Gugi", "VT323"];
</script>

<style>
  main {
    padding: 1em;
    min-height: calc(100vh - 2em);
  }
  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-auto-rows: 300px;
    gap: 1rem;
  }
</style>

<svelte:head>
  <title>Svelte Clocks</title>
  <link
    href="https://fonts.googleapis.com/css2?family={googleFonts.join('&family=')}&display=swap"
    rel="stylesheet" />
</svelte:head>

<Header />

<main>
  <section>
    <SunClock />
    <InterClassicClock />
    <CircleClock />
    <NumberClock />
    <GridClock />
  </section>
</main>

<Footer />
