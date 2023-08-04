<script>
    import { infoVisible } from "../stores.js";

    function toggleInfo() {
        infoVisible.update((b) => !b);
    }
</script>

<div class="container">
  <button class="info-button" on:click={toggleInfo}>
      {$infoVisible ? "✕" : "?"}
  </button>
</div>

<style>
  .container {
    position: fixed;
    z-index: 98;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 40px;
    width: 40px;
    left: 30px;
    bottom: 20px;
  }

  .info-button {
      font: inherit;
      opacity: 1;
      transition: transform 0.2s ease;
      user-select: none;
      color: #fdfcfb;
      background-color: #bb6a3e;
      width: inherit;
      height: inherit;
      font-size: 1rem;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      text-align: center;
      /* needed because iPhone Safari is a very funny browser */
      padding: 0;
      margin: 0;
  }
</style>
