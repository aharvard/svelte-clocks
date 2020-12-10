<script>
  import Logo from "./Logo.svelte";
</script>

<style>
  footer {
    text-align: center;
    padding: 1.25rem 1rem 5rem;
  }

  p {
    margin-top: 1rem;
  }
</style>

<footer>
  <Logo />

  <p>by <a href="https://twitter.com/aharvard">Andrew Harvard</a></p>

  <p>
    Made with
    <a href="https://svelte.dev/">Svelte</a>
    &
    <a href="https://www.snowpack.dev/">SnowPack</a>. Hosted on
    <a href="https://www.netlify.com/">Netlify</a>.
  </p>

  <p>
    Inspired by John Maeda’s classic
    <a href="https://vimeo.com/198494458">12 o'clocks</a>
    & the
    <a href="https://svelte.dev/examples#clock">Svelte Clock</a>.
  </p>

  <p>
    <a href="https://github.com/aharvard/svelte-clocks">View Source</a>
    GitHub
  </p>
</footer>
