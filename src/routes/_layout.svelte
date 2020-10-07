
<style>
  main {
    position: relative;
    background-color: white;
    padding: 1em;
    margin: 0 auto; 
    box-sizing: border-box;
    outline-color: red;
    height: 100vh;
  }
   footer {
    font-family: Consolas, "Andale Mono WT", "Andale Mono", "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco, "Courier New", Courier, monospace;
    text-align: center;
    padding: 1rem 1rem 2rem;
   }
   
   footer .svelte-clocks-logo {
     font-size: 2.5rem;
     text-decoration: none;
   }
 
   p + p {
     margin-top: .75rem;
   }
   
</style>


<main>
  <slot />
</main>

<footer>
<p><a class="svelte-clocks-logo" href="/">Svelte Clocks</a></p>
<p>by Andrew Harvard</p>
<p>Made with <a href="https://svelte.dev/">Svelte</a> & <a href="https://sapper.svelte.dev/">Sapper</a>. Hosted on <a href="https://www.netlify.com/">Netlify</a>. Inspired by the classic <a href="https://svelte.dev/examples#clock">Svelte Clock</a>.</p>
<p><a href="https://github.com/aharvard/svelte-clocks">View Source</a> GitHub</p>
</footer>