<script>
    import { infoVisible } from "../stores.js";

    function toggleInfo() {
        infoVisible.update((b) => !b);
    }
</script>

<button class="info-button" on:click={toggleInfo}>
    {$infoVisible ? "✕" : "?"}
</button>

<style>
    .info-button {
        position: fixed;
        opacity: 1;
        transition: transform 0.2s ease;
        z-index: 98;
        left: 30px;
        user-select: none;
        bottom: 20px;
        color: #fdfcfb;
        background-color: #bb6a3e;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
        border: none;
        border-radius: 50%;
        cursor: pointer;
    }
</style>
