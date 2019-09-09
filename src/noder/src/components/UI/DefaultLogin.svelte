<script>

</script>

<style>
     .email{
          width: 15em;
     }
     .password{
          width: 15em;
     }
     .submit {
          width: 15em;
     }
</style>

<form class = "loginform" on:submit|preventDefault>
    <input id = "email" class = "email" type="text" placeholder="Email"><br>
    <input id = "password" class = "password" type="text" placeholder="Password"><br>
    <input class = "submit" type="submit" value="Sign in">
</form>