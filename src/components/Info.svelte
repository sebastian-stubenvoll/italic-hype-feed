<script>
    import { fade, fly, scale } from 'svelte/transition';
    import { quadIn, quintIn, quintOut } from 'svelte/easing';
    import public_data from '../assets/public_data.json'

    let heartVisible = false;

    function showHeart() {
        console.log('♥');
        heartVisible = true;
        setTimeout(() => {
            heartVisible = false;
        }, 300);
    }
</script>

    <main in:fly={{duration:1000, x:'-100vw', opacity: 100, easing:quintOut}} out:fly={{duration:500, x:'-100vw', opacity: 100, easing:quadIn, delay:200}}>
    <div in:fade={{delay:300, duration:700}} out:fade={{duration:200}}>
        <h1>About</h1>
        <p>
            Whilst not officially affiliated with <a href="https://www.italictype.com/" target="_blank"><i>Italic Type</i></a>, this web-display was made with their help and support. So first of all a big <button on:click={showHeart}><i>thank you</i></button> to their team!
        </p>
        <p>
            Their book-tracker is awesome and they're absolutely lovely folks, so if you haven't checked them out already, <a href="https://www.italictype.com/" target="_blank"><i>please do</i></a>.
        </p>
        <p>Hopefully, this little project will eventually become obsolete when they make this a native feature of their product.
        </p>
        <p>Meanwhile feel free to swing by here every now and then and check out what literary adventures <b><i>{public_data.name}</i></b> has been up to recently.
        </p>
        <h1>Contribute</h1>
        <p>
            This web-display was put together as a hobby project, so naturally there's lots of room for improvement!
        </p>
        <p>
            It's built with <a href="https://svelte.dev/" target="_blank"><i>svelte</i></a>, <a href="https://vitejs.dev/" target="_blank"><i>vite</i></a>, and love – and you can check out the source code on <a href="https://github.com/sebastian-stubenvoll/italic-hype-feed" target="_blank"><i>github</i></a>.
        </p>
        <p>So if you're looking to suggest any changes, report a bug or even contribute some changes of your own, head on over there!
        </p>
        <h1>Get set up</h1>
        <p>
            On the <a href="https://github.com/sebastian-stubenvoll/italic-hype-feed" target="_blank"><i>github</i></a> page you'll also find instructions on how to set this display page up for your own <a href="https://www.italictype.com/" target="_blank"><i>Italic Type</i></a> account. It's fairly simple, so no worries!
        </p>
        <br>
        <br>
        <br>
    </div>
    </main>
    {#if heartVisible}
        <div class="heart-container"  in:scale={{duration:700}} out:fade={{duration:500}}>
            <svg viewBox="-20 -20 100 100">
                <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" transform=""/>
            </svg>
        </div>
    {/if}

<style>
    main {
        width: 70vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        background: #fff;
        overflow-y: scroll;
        padding-left: 15vw;
        padding-right: 15vw;
    }

    h1 {
        font: inherit;
        font-size: 2rem;
    }

    p {
        font: inherit;
        font-weight: 300;
    }

    button {
        background: none;
        fill: none;
        box-shadow: none;
        text-shadow: none;
        border: none;
        font: inherit;
        padding: 0;
        margin: 0;
        color: #bb6a3e;
        font-weight: 500;
        cursor: pointer;
    }

    .heart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
        font-size: 40vw;
        color: #bb6a3e;
        fill: #bb6a3e;
        z-index: 80;
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        /* css magic to make heart not blurry */
        /* https://slickmedia.io/blog/stop-blurring-jagged-edges-css-transform-transition */
        outline: 1px solid transparent;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        transform: translateZ(0);
        will-change: transform;
        perspective: hidden;
        -webkit-perspective: 1000;
    }

    svg {
        width: auto;
        height: auto;
    }

    a {
        all: unset;
        cursor: pointer;
        color: #bb6a3e;
        font: inherit;
        font-weight: 500;
    }

    b {
        color: #bb6a3e;
        font: inherit;
        font-weight: 500;
    }

</style>
