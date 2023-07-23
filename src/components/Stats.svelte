<script>
    import Heatmap from './Heatmap.svelte';
    import public_data from '../assets/public_data.json';
    import { fade } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    function fadeBackground(node, {delay, duration}) {
        return {
            delay,
            duration,
            css: (t) => {
                const eased = cubicOut(t);
                return `
background-color: rgba(255, 255, 255, ${eased});
box-shadow: 0 0 20px 1px rgba(43,36,13,${eased * .08});
`
            }
        };
    }
</script>

<div style="padding-top:20px">
    <div class="card" in:fadeBackground={{delay:600, duration:800}}>
        <Heatmap books_array={public_data.thisYear} />
    </div>
</div>
<div style="padding-top: 8px">
    <div class="card" in:fade={{delay: 600}}>
        <div class="stats-text">
            So far {public_data.name} has read <b><i>{public_data.thisYearTotal}</i></b> book{public_data.thisYearTotal === 1 ? '' : 's' } this year.
            {#if public_data.thisYearTotal != public_data.completedTotal}
            <br>
                That puts them at a {public_data.completedTotal > 9 ? 'grand ' : ''}total of <b><i>{public_data.completedTotal}</i></b> book{public_data.completedTotal === 1 ? '' : 's' } since they've started using <a href="https://www.italictype.com/" target="_blank"><i>Italic Type</i></a>!
            {/if}
        </div>
    </div>
</div>


<style>
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
