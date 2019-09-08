<script>

</script>

<style>
    .searchform {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.1em;
        position: absolute;
        left: 40%;
        width: 20%;
        height: 40%;
        background-color: white;
    }
    .search {
        padding: 1px;
        border: 0;
        outline: none;
        box-shadow: none;
    }
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<form class = "searchform" action="/search">
    <i style = "color: black; padding-top: 1em; padding-right: 1em" class="fa fa-search"></i>
  <input class = "search" type="text" name="search" placeholder="Search.."><br>
</form>
