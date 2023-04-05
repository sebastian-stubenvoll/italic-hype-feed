<script>
	export let openAbout;
</script>

<button class="about" on:click={()=>{openAbout = !openAbout}}>{openAbout ? '!' : '?'}</button>


<style>
    .about {
        z-index: 99;
        position: fixed;
        top: 10px;
        left: 10px;
        user-select: none;
        color: #fdfcfb;
        background-color: #bb6a3e;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
        border: none;
        border-radius: 50%;
    }

</style>
