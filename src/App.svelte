<script>
    import InfiniteLoading from 'svelte-infinite-loading';
    import Card from './components/Card.svelte';
    import BackToTop from './components/BackToTop.svelte';
    import public_data from './assets/public_data.json';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import ToggleAbout from './components/ToggleAbout.svelte';
    import AboutSection from './components/AboutSection.svelte';

    let init = false;
    let openAbout = false;

    let display = [...public_data.current];
    
    function infiniteHandler( { detail : { loaded, complete } }) {
        const start = display.length - public_data.current.length;
        const new_books = public_data.completed.slice(start, start+4);
        if (new_books.length > 0) {
            display = [...display, ...new_books];
            loaded();
        } else {
            complete();
        }
    }

    onMount( () => { init = true });

</script>

<div class="about-container" style="z-index:99">
<ToggleAbout bind:openAbout />
</div>

{#if openAbout}
    <div class="about-container" transition:fade>
        <AboutSection name={public_data.name} />
    </div>
{:else}

<div class="feed-container" transition:fade>
    <div class="grid">
        <div>
            <img class="avatar" src="{public_data.avatar}">
        </div>
        <div class="name">
            {public_data.name}'{public_data.name.slice(-1) == 's' ? '' : 's'} recent reads
        </div>
    </div>

    {#if init}
        {#each display as book}
            <div in:fly="{{ x: -50, duration: 1800, easing: cubicOut }}" class="card">
                <Card {...book}/>
            </div>
        {/each}
    {/if}
</div>

<BackToTop />

<InfiniteLoading on:infinite={infiniteHandler}>
    <span slot="noMore" />
    <span slot="noResults" />
</InfiniteLoading>

{/if}


<style>
    .about-container {
        position: fixed;
        z-index: 98;
    }

    @media (min-width: 600px) {
        .feed-container {
            margin-left: 19% !important;
            width: 81% !important;
            align-items: flex-start !important;
        }
    }

    .feed-container {
        margin: 0 auto;
        margin-top: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .grid {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-gap: 16px;
        margin-left: 8px;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px white;
        box-shadow: 0 0 20px 1px rgba(43,36,13,.18);
        object-fit: cover;
    }

    .card {
        margin-top: 8px;
        margin-bottom: 8;
    }

    .name {
        font-family: normal Lora,Times New Roman,Georgia,serif;
        font-size: 150%;
        align-self: center;
    }
</style>
