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
        border: 0;
        outline: none;
        box-shadow: none;
    }
    .fa.fa-search{
        color: black; 
        border: 0;
        outline: none;
        box-shadow: none;
        padding-right: 1em;
    }
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<form class = "searchform" action="/search">
    <i class="fa fa-search"></i>
    <input class = "search" type="text" name="search" placeholder="Search.."><br>
    <i class="fa fa-caret-down"></i>
</form>
