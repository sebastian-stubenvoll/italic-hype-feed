<script>
    import InfiniteLoading from 'svelte-infinite-loading';
    import Card from './components/Card.svelte';
    import BackToTop from './components/BackToTop.svelte';
    import public_data from './assets/public_data.json';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

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

</script>

<div class="container">
    <div class="info-container">
        <div class="buffer" />
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
        max-width: 700px;
    }

    .buffer {
        width: 0;
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
        padding-left: 6px;
    }
</style>
