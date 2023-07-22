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
    export let url = 'https://www.italictype.com/';

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
        <a href="{url}" target="_blank" class="cover-link">
            <img class="cover" src="{cover}" alt="{title} cover">
        </a>
        <div class="container-inner">
            <div class="info">
                <a href="{url}" target="_blank">
                    <div class="title" title="{title}">{title}</div>
                </a>
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
    a {
        all: unset;
        cursor: pointer;
    }
    main {
        height: 156px;
        margin: 0;
        top: 50%;
        background-color: #fff;
        box-shadow: 0 0 20px 1px rgba(43,36,13,.08);
        width: 63vw;
        min-width: 320px;
        max-width: 700px;
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
        flex-shrink: 4;
        flex-grow: 1;
        width: calc(100% - 195px);
    }

    .cover-link {
        align-self: center;
        height: 195px;
    }

    .cover {
        align-self: center;
        height: inherit;
        scale: 75%;
        object-fit: cover;
        object-position: center;
        margin-left: -9px;
        width: 120px;
    }


    .info {
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
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: normal;
        padding-top: 8px;
        margin-bottom: 6px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .authors {
        padding-bottom: 4px;
        font-size: 70%;
        font-weight: 400;
        line-height: 120%;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .pages {
        font-size: 66%;
        font-weight: 400;
        color: #8e8e8e;
    }

    .info-footer {
        font-size: 60%;
        font-weight: 400;
        color: #8e8e8e;
        padding-bottom: 8px;
    }

    .label {
        overflow-x: hidden;
        text-align: center;
        font-size: 60%;
        font-weight: 400;
        color: #78403e;
        width: 63vw;
        display: block;
        min-width: 320px;
        max-width: 700px;
        line-height: 100%;
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
        line-height: 1px;
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
