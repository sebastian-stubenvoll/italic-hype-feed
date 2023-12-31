<script>
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { quadOut, quintOut } from "svelte/easing";
    import Rainbow from "rainbowvis.js";

    export let monthArray;
    export let animationOffset = 0;

    let init = false;

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    let gradient = new Rainbow();
    gradient.setSpectrum("#e6e3e3", "#f25a30");
    gradient.setNumberRange(0, Math.max(...monthArray));

    function grad(count) {
        return "#" + gradient.colourAt(count);
    }

    function flip(id) {
        const el = document.getElementById(id);
        el.classList.toggle("clicked");
    }

    onMount(() => {
        init = true;
    });
</script>

<main>
    {#each monthArray as count, i (i)}
        <div class="div{i + 1} item" style="z-index:2">
            {#if init}
                <div
                    in:fly={{
                        y: 15,
                        delay: 20 * i + animationOffset,
                        duration: 900,
                        easing: quadOut,
                    }}
                >
                    <button
                        class="rect"
                        id="r{i + 1}"
                        title="{count} book{count == 1 ? 's' : ''}"
                        on:click={() => flip(["r", i + 1].join(""))}
                    >
                        <div class="front" style="background:{grad(count)}" />
                        <div class="back" style="color:{grad(count)}">
                            <b>{count}</b>
                        </div>
                    </button>
                </div>
            {/if}
        </div>
    {/each}
    {#each monthArray as _, i (i)}
        {#if init}
            <div
                class="div{i + 1} item"
                style="z-index:1"
                in:fade={{
                    delay: 20 * i + animationOffset + 400,
                    duration: 900,
                    easing: quintOut,
                }}
            >
                <div class="month">{months[i]}</div>
            </div>
        {/if}
    {/each}
</main>

<style>
    main {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        color: black;
        justify-content: center;
        padding-top: 9px;
        width: inherit;
        min-width: 320px;
        max-width: 470px;
    }

    .item {
        justify-self: center;
    }

    .div1 {grid-area: 1 / 1 / 2 / 2;}
    .div2 {grid-area: 1 / 2 / 2 / 3;}
    .div3 {grid-area: 1 / 3 / 2 / 4;}
    .div4 {grid-area: 1 / 4 / 2 / 5;}
    .div5 {grid-area: 1 / 5 / 2 / 6;}
    .div6 {grid-area: 1 / 6 / 2 / 7;}
    .div7 {grid-area: 2 / 1 / 3 / 2;}
    .div8 {grid-area: 2 / 2 / 3 / 3;}
    .div9 {grid-area: 2 / 3 / 3 / 4;}
    .div10 {grid-area: 2 / 4 / 3 / 5;}
    .div11 {grid-area: 2 / 5 / 3 / 6;}
    .div12 {grid-area: 2 / 6 / 3 / 7;}

    .rect {
        width: 35px;
        height: 35px;
        margin-left: 9px;
        margin-right: 9px;
        margin-bottom: 30px;
        padding: 0;
        border: none;
        cursor: pointer;
        perspective: 1000px;
        transform-style: preserve-3d;
        transition: transform 0.4s;
        background: transparent;
    }

    .rect.clicked {
        transform: rotateY(180deg);
    }

    .front,
    .back {
        position: absolute;
        /* there's probably a more elegant way to do this */
        margin-top: -18px;
        width: inherit;
        height: inherit;
        backface-visibility: hidden;
    }

    .back {
        transform: rotateY(180deg);
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        padding-top: 2px;
        font: inherit;
        font-size: 1.2em;
        font-weight: 600;
    }

    .month {
        position: relative;
        top: 40px;
        width: 30px;
        height: 20px;
        margin-left: 12px;
        margin-right: 12px;
        margin-bottom: 3px;
        text-align: center;
        color: black;
        font: inherit;
        font-weight: 300;
        font-size: 0.7em;
    }
</style>
