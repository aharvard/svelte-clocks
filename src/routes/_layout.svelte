<style>
  main {
    padding: 1em;
    min-height: calc(100vh - 2em);
  }
  footer {
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console",
      "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono",
      "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier,
      monospace;
    text-align: center;
    padding: 1.25rem 1rem 5rem;
  }

  footer .svelte-clocks-logo {
    font-size: 2.5rem;
    text-decoration: none;
  }

  p + p {
    margin-top: 0.75rem;
  }
</style>

<main>
  <slot />
</main>

<footer>
  <p><a class="svelte-clocks-logo" href="/">Svelte Clocks</a></p>

  <p>by <a href="https://twitter.com/aharvard">Andrew Harvard</a></p>

  <p>
    Made with
    <a href="https://svelte.dev/">Svelte</a>
    &
    <a href="https://sapper.svelte.dev/">Sapper</a>. Hosted on
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
