<script>
    import Heatmap from './Heatmap.svelte';
    import public_data from '../assets/public_data.json';
    import { cubicOut, quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

    const slideDuration = 1200;
    const fadeDuration = 800;

    function fadeBackground(node, {delay, duration, fadeBG}) {
        return {
            delay,
            duration,
            css: (t) => {
                const eased = cubicOut(t);
                return `
background-color: rgba(255, 255, 255, ${fadeBG ? eased : 1});
box-shadow: 0 0 20px 1px rgba(43,36,13,${eased * .08});
`
            }
        };
    }
</script>

<main transition:slide={{easing:quintOut, duration:slideDuration}}>
    {#if public_data.thisYearTotal > 0}
            <!--needed so box-shadow doesn't get cut off in transition-->
            <div style="height:15px" />
            <div class="card hmap" in:fadeBackground={{delay:0, duration:fadeDuration, fadeBG:true}}>
                <Heatmap monthArray={public_data.thisYear} animationOffset={fadeDuration-400} />
            </div>
    {/if}
    <div style="padding-top: 8px">
        <div class="card" in:fadeBackground={{delay:0, duration:fadeDuration, fadeBG:false}}>
            <div class="stats-text">
                {#if public_data.thisYearTotal > 0}
                    So far, {public_data.name} has read <b><i>{public_data.thisYearTotal}</i></b> book{public_data.thisYearTotal === 1 ? '' : 's' } this year.
                    {#if public_data.thisYearTotal != public_data.completedTotal}
                        <br>
                        <br>
                            That puts them at a {public_data.completedTotal > 9 ? 'grand ' : ''}total of <b><i>{public_data.completedTotal}</i></b> book{public_data.completedTotal === 1 ? '' : 's' } since they've started using <a href="https://www.italictype.com/" target="_blank"><i>Italic Type</i></a>!
                    {/if}
                {:else}
                    Since they've started using <a href="https://www.italictype.com/" target="_blank"><i>Italic Type</i></a>, {public_data.name} has read <b><i>{public_data.completedTotal}</i></b> book{public_data.completedTotal === 1 ? '' : 's' }.
                {/if}
            </div>
        </div>
    </div>
    <!--needed so box-shadow doesn't get cut off in transition-->
    <div style="height:8px" />
</main>

<style>
    main {
        width: 70vw;
        min-width: 340px;
        display: flex;
        justify-content: center;
        align-content: center;
        justify-items: center;
        align-items: center;
        flex-direction: column;
    }
    .stats-text {
        font: inherit;
        font-weight: 300;
        font-size: 0.84em;
        width: calc(63vw - 20px);
        min-width: 300px;
        max-width: 580px;
        margin: 3px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .card {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 320px;
        max-width: 600px;
        width: 63vw;
        background-color: #fff;
        box-shadow: 0 0 20px 1px rgba(43,36,13,.08);
    }

    .hmap {
        /* the heatmap section needs to have a fixed height
        or the svelte transition won't calculate properly */
        height: 139px;
    }

    b {
        font: inherit;
        font-weight: 600;
        color: #78403e;
    }

    a {
        all: unset;
        cursor: pointer;
        color: #78403e;
        font: inherit;
        font-weight: 500;
    }
</style>
