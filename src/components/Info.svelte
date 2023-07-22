<script>
    import { fade } from 'svelte/transition';
    import public_data from '../assets/public_data.json'
</script>

<main transition:fade={{duration:750}}>
    <h1>About</h1>
    <p>
        Whilst not officially affiliated with Italic Type, this web-display was made with their help and support. So first of all a big <b><i>thank you</i></b> to their team!
    </p>
    <p>
        Their book-tracker is awesome and they're absolutely lovely folks, so if you haven't checked them out already, please do.
    </p>
    <p>Hopefully, this little project will eventually become obsolete when Italic Type integrates this functionality into their product natively.
    </p>
    <p>Meanwhile feel free to swing by here every now and then and check out what literary adventures <i>{public_data.name}</i> has been up to recently.
    </p>
    <h1>Contribute</h1>
    <p>
        This web-display was put together as a hobby project, so naturally there's lots of room for improvement!
    </p>
    <p>If you're looking to suggest any changes, report a bug or even contribute some changes of your own, check out the source-code on github.
    </p>
    <h1>Get set up</h1>
    <p>
        On the github page you'll also find instructions on how to set this display page up for yourself. It's fairly simple, so no worries!
    </p>
    <br>
    <br>
    <br>
</main>


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
</style>
