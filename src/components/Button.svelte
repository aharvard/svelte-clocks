<script>
  export let id;
  export let click;
</script>

<style>
  button {
    padding: 0.5rem 1rem;
    background: white;
    border: 2px solid #ff3e00;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 250ms ease;
  }

  button:hover,
  button:focus {
    transform: scale(1.05);
  }
  button:active {
    transform: scale(1);
  }
</style>

<button {id} on:click={click}>
  <slot>Button Slot</slot>
</button>
