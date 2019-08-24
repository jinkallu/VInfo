<script>
    export let svg;
    export let data;

    const rect = document .createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", data.rx );
    rect.setAttribute("y", data.ry );
    rect.setAttribute("width", data.width);
    rect.setAttribute("height", data.height);
    rect.setAttribute("fill", data.color);

    svg.appendChild ( rect );


    const text = document .createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", data.rx + data.width / 6 );
    text.setAttribute("y", data.ry + data.height / 2);
    text.setAttribute("fill", "red");
    text.textContent = data.nodename;

    svg.appendChild ( text );
</script>

<style>

</style>
