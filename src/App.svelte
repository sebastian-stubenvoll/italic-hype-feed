<script>
    //Data imports
    import { infoVisible, statsVisible } from "./stores.js";
    import public_data from "./assets/public_data.json";

    //Component imports
    import Book from "./components/Book.svelte";
    import Separator from "./components/Separator.svelte";
    import Stats from "./components/Stats.svelte";
    import BackToTop from "./components/BackToTop.svelte";
    import ShowInfo from "./components/ShowInfo.svelte";
    import Info from "./components/Info.svelte";
    import InfiniteLoading from "svelte-infinite-loading";

    //Svelte functions
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let init = false;
    let display = [...public_data.current];

    function infiniteHandler({ detail: { loaded, complete } }) {
        const start = display.length - public_data.current.length;
        const new_books = public_data.completed.slice(start, start + 10);
        if (new_books.length > 0) {
            display = [...display, ...new_books];
            loaded();
        } else {
            complete();
        }
    }

    function toggleStats() {
        statsVisible.update((b) => !b);
    }

    infoVisible.subscribe((b) => {
        document.body.style.overflowY = b ? "hidden" : "visible";
    });

    if (public_data.background) {
        const root = document.querySelector(":root");
        root.style.backgroundColor = public_data.background;
    }

    onMount(() => {
        init = true;
    });
</script>

<main>
    <button class="info-container stats-button" on:click={toggleStats}>
        <div>
            <img class="avatar" src={public_data.avatar} alt="avatar" />
        </div>
        <div class="rhs">
            <div class="name">
                {#if !public_data.name}
                    An avid reader's recent reads
                {:else}
                    {public_data.name}'{public_data.name.slice(-1) == "s"
                        ? ""
                        : "s"} recent reads
                {/if}
            </div>
            <div class="more">
                    click to show {$statsVisible ? 'less' : 'more'}
            </div>
        </div>
    </button>
    <Stats />
    {#if init}
        {#each display as book}
            {#if book.separator}
                <div class="card">
                    <Separator label={book.label} />
                </div>
            {:else}
                <div
                    in:fly={{ x: -50, duration: 1800, easing: cubicOut }}
                    class="card"
                >
                    <Book {...book} />
                </div>
            {/if}
        {/each}
    {/if}
</main>

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
    main {
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
        align-items: center;
    }

    .rhs {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        text-align: left;
        padding-left: 15px;
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px white;
        box-shadow: 0 0 20px 1px rgba(43, 36, 13, 0.18);
        object-fit: cover;
        grid-row: 1;
        margin-left: 22px;
    }

    .card {
        /* the stats page adds a 8px div that is needed to not break
           box shadow transitions. hence the margin can be applied to bottom */
        margin-bottom: 8px;
    }

    .name {
        font-family: normal Lora, Times New Roman, Georgia, serif;
        font-size: 150%;
        align-self: center;
        grid-row: 1;
    }

    .more {
        font-family: normal Lora, Times New Roman, Georgia, serif;
        color: #8e8e8e;
        font-weight: 400;
        font-size: 0.7rem;
    }

    .stats-button {
        border: none;
        box-shadow: none;
        color: #000;
        font: inherit;
        background: none;
        cursor: pointer;
    }
</style>
