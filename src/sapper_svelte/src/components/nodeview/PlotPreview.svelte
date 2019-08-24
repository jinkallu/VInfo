<script>
    export let data;
    export let initial;
    export let left;
    export let top;
</script>

<style>
        span {
                display: inline-block;
                padding: 0.2em 0.5em;
                margin: 0 0.2em 0.2em 0;
                width: 4em;
                text-align: center;
                border-radius: 0.2em;
                color: white;
        }
</style>

<span style="background-color: {initial} left: {left} top: {top}">initial</span>
