<script>
  import { infoVisible } from "../stores.js";
  import { fade } from "svelte/transition";

  export let showOnPx = 150;
  let hidden = true;

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollContainer() {
    return document.documentElement || document.body;
  }

  function handleOnScroll() {
    if (!scrollContainer()) {
      return;
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }
  }
</script>

<svelte:window on:scroll={handleOnScroll} />
{#if !$infoVisible}
<div class="container">
  <button
    transition:fade={{ duration: 250 }}
    class="back-to-top"
    on:click={goTop}
    class:hidden>↑</button
  >
</div>
{/if}

<style>
  .container {
    position: fixed;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 40px;
    width: 40px;
    right: 30px;
    bottom: 20px;
  }

  .back-to-top {
    font: inherit;
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    user-select: none;
    color: #fdfcfb;
    background-color: #bb6a3e;
    width: inherit;
    height: inherit;
    font-size: 1rem;
    font-weight: 800;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    text-align: center;
    /* needed because iPhone Safari is a very funny browser */
    padding: 0; 
    margin: 0;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
