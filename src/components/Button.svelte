<script>
  export let id;
</script>

<style>
  button {
    padding: 1rem 2rem;
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

<button {id}>
  <slot>Button Slot</slot>
</button>
