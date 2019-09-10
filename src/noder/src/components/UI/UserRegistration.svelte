<script>
     export let registration;
</script>

<style>
     .regemail{
          width: 15em;
     }
     .regpassword{
          width: 15em;
     }
     .repassword{
          width: 15em;
     }
     .submit {
          width: 15em;
     }
     .nomatch{
          color: red;
     }
</style>

<form class = "registrationform" on:submit|preventDefault>
    <input id = "regemail" class = "regemail" type="text" placeholder="Email" ><br>
    <input id = "regpassword" class = "regpassword" type="password" placeholder="Password"><br>
    <input id = "repassword" class = "repassword" type="password" placeholder="Retype Password"><br>
    <input class = "submit" type="submit" value="Register">
    {#if registration === 1}
          <div class = "nomatch">
               Password retype no match
          </div>
    {/if}
</form>