<script>
    export let title = null;
    export let authors = null;
    export let cover = null;
    export let completed = null;
    export let rating = null;
    export let at_page = null;
    export let pages = null;
    export let separator = false;
    export let label = null;

    function joinAuthors(arr) {
       if (arr.length < 4) {
            return arr.join('<br>');
        } else {
            return arr.slice(0,2).join('<br>') + `<br><i>and ${arr.length - 2} others</i>`;
        }
    }

    function humanDate(date) {
        const event = new Date(date);
        const day = event.getDate();
        const month = event.getMonth() + 1;
        const yearStr = event.getFullYear();
        const dayStr = day < 10 ? '0' + day : day.toString();
        const monthStr = month < 10 ? '0' + month : month.toString();

        return `${dayStr}.${monthStr}.${yearStr}`;
    }

</script>

{#if separator}
    <div class="label">{label}</div>
{:else}
<main>
    <div class="container-outer">
        <img class="cover" src="{cover}">
        <div class="container-inner">
            <div class="info">
                <div class="title" title="{title}">{title}</div>
                <div class="authors">{@html joinAuthors(authors)}</div>
                {#if !completed && pages}
                    <div class="pages">{pages} pages</div>
                {/if}
            </div>
            <div class="info-footer">
                {#if completed}
                    finished on <i>{humanDate(completed)}</i><br>
                {/if}
                {#if rating}
                    rated <i>{rating}</i>
                {:else if at_page}
                    currently on page <i>{at_page}</i>
                {/if}
            </div>
        </div>
    </div>
</main>
{/if}

<style>
    main {
        height: 156px;
        margin: 0;
        top: 50%;
        background-color: #fff;
        box-shadow: 0 0 20px 1px rgba(43,36,13,.08);
        width: 304px;
        min-width: 240px;
    }

    .container-outer {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: flex-start;
        width: 100%;
        height: 100%;
        top: 50%;
        position: relative;
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .container-inner {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: flex-start;
        align-content: center;
        width: 100%;
        max-width: 195;
        flex-shrink: 4;
        flex-grow: 1;
    }

    .cover {
        flex-shrink: 1;
        align-self: center;
        justify-self: center;
        width: 132px;
        min-width: 128px;
        height: 195px;
        scale: 75%;
        margin-left: -3.75%;
        object-fit: cover;
        object-position: center;
    }


    .info {
        margin-top: 5%;
        max-width: inherit;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 90%;
        width: 98%;
    }

    .title {
        font-size: inherit;
        max-width: inherit;
        text-overflow: inherit;
        overflow: inherit;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .authors {
        margin-top: 2%;
        font-size: 70%;
        font-weight: 400;
        line-height: 120%;
    }

    .pages {
        font-size: 66%;
        font-weight: 400;
        color: #8e8e8e;
        margin-top: 6px;
    }

    .info-footer {
        margin-bottom: 5%;
        font-size: 60%;
        font-weight: 400;
        color: #8e8e8e;
    }

    .label {
        overflow: hidden;
        text-align: center;
        width: 304px;
        min-width: 240px;
        font-size: 60%;
        font-weight: 400;
        color: #78403e;
    }

    .label:before,
    .label:after {
        background-color: #78403e;
        content: "";
        display: inline-block;
        height: 1px;
        position: relative;
        vertical-align: middle;
        width: 50%;
    }


    .label:before {
        right: 0.5em;
        margin-left: -50%;
    }

    .label:after {
        left: 0.5em;
        margin-right: -50%;
    }

</style>
