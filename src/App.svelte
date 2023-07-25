<script>
    import InfiniteLoading from 'svelte-infinite-loading';
    import { infoVisible, statsVisible } from './stores.js';
    import Card from './components/Card.svelte';
    import BackToTop from './components/BackToTop.svelte';
    import ShowInfo from './components/ShowInfo.svelte';
    import Info from './components/Info.svelte';
    import public_data from './assets/public_data.json';
    import { onMount } from 'svelte';
    import { fly, slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import Stats from './components/Stats.svelte';

    let init = false;

    let display = [...public_data.current];
    
    function infiniteHandler( { detail : { loaded, complete } }) {
        const start = display.length - public_data.current.length;
        const new_books = public_data.completed.slice(start, start+10);
        if (new_books.length > 0) {
            display = [...display, ...new_books];
            loaded();
        } else {
            complete();
        }
    }

    onMount( () => { init = true });

    infoVisible.subscribe((b) => {
        document.body.style.overflowY = b ? 'hidden' : 'visible';
    });

    function toggleStats() {
        statsVisible.update((b) => !b);
    }


</script>

<div class="container" id="feed">
    <button class="info-container stats-button" on:click={toggleStats}>
        <div>
            <img class="avatar" src="{public_data.avatar}" alt="avatar">
        </div>
        <div class="name">
            {public_data.name}'{public_data.name.slice(-1) == 's' ? '' : 's'} recent reads
        </div>
    </button>
    {#if $statsVisible}
            <Stats />
    {/if}
    {#if init}
        {#each display as book}
            <div in:fly="{{ x: -50, duration: 1800, easing: cubicOut }}" class="card">
                <Card {...book}/>
            </div>
        {/each}
    {/if}
</div>

{#if $infoVisible}
    <Info />
{/if}

<ShowInfo />
<BackToTop />


<InfiniteLoading on:infinite={infiniteHandler}>
    <span slot="noMore" />
    <span slot="noResults" />
</InfiniteLoading>


<style>
    .container {
        margin: 0 auto;
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .info-container {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 63vw;
        min-width: 320px;
        max-width: 600px;
    }
    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px white;
        box-shadow: 0 0 20px 1px rgba(43,36,13,.18);
        object-fit: cover;
        grid-row: 1;
        margin-left: 22px;
    }

    .card {
        margin-top: 8px;
    }

    .name {
        font-family: normal Lora,Times New Roman,Georgia,serif;
        font-size: 150%;
        align-self: center;
        grid-row: 1;
        padding-left: 15px;
        text-align: left;
    }

    .stats-button {
        border: none;
        box-shadow: none;
        font: inherit;
        background: none;
        cursor: pointer;
    }
</style>
