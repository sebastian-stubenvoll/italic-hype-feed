<script>
    export let name;

</script>

<main>
    <h1>About</h1>
    <div class="text">
        This webpage displays {name}'{name.slice(-1) == 's' ? '' : 's'} recently read books 
        as tracked by <a href="https://www.italictype.com/">italictype</a> – an awesome booktracker!<br><br>
            Please note that this page is in no way, shape, or form affiliated with 
        <a href="https://www.italictype.com/">italictype</a>.<br><br>
            This is a hobby project built for fun with the sole purpose of sharing an overview
            of your reads with friends. If you wish to report an issue, make a contribution, have
            a look at the inner workings of this page, or maybe even set it up for yourself, feel free
            to check out the project on <a href="https://github.com/sebastian-stubenvoll/italic-hype-feed">github</a>!
    </div>
</main>

<style>
    main {
        max-width: 400px;
        margin-left: 15px;
        margin-top: 55px;
        background-color: beige;
    }

    h1 {
        font-family: normal Lora,Times New Roman,Georgia,serif;
        font-size: 150%;
    }

    .text {

    }

    a {
        color: #78403e
    }

    a:visited {
        color: #965532
    }


</style>
