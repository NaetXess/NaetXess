<script>
</script>

<div class="page container-fluid px-0">
  <slot />
</div>

<style>
  .page {
    height: 100vh;
    overflow-x: hidden;
    transition: all ease 150ms;
  }
  :global(body[data-theme="dark"]) .page {
    background-color: #2b2b2b;
  }
  :global(body[data-theme="light"]) .page {
    background-color: rgb(172, 172, 172);
  }
</style>
