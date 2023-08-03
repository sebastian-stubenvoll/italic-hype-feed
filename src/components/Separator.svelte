<script>
    export let label = null;
</script>

    <div class="label">{label}</div>
    
<style>
    .label {
        overflow-x: hidden;
        text-align: center;
        font-size: 60%;
        font-weight: 400;
        color: #78403e;
        width: 63vw;
        display: block;
        min-width: 320px;
        max-width: 600px;
        line-height: 115%;
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

