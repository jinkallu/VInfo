<script>
     import DefaultLogin from "../../UI/DefaultLogin.svelte";
     import Logout from "../../UI/Logout.svelte";

     let loginWindow = false;
     let username;
     let loginSuccess = 0; // 0 not logged in, 1 loggedin, 2 auth fail
     function writeCookie(){
          
          loginWindow = !loginWindow;
     }

     function getCookie(name)
     {
          // Split cookie string and get all individual name=value pairs in an array
          var cookieArr = document.cookie.split(";");
    
          // Loop through the array elements
          for(var i = 0; i < cookieArr.length; i++) {
               var cookiePair = cookieArr[i].split("=");
        
               /* Removing whitespace at the beginning of the cookie name
               and compare it with the given string */
               if(name == cookiePair[0].trim()) {
                    // Decode the cookie value and return
                    return cookiePair[1];
               }
          }
    
          // Return null if not found
          return null;
     }

     async function firstAsync(url, inp)  {
          const options = {
               method: 'POST',
               body: JSON.stringify(inp),
               headers: {
                    'Content-Type': 'application/json'
               }
          };

          const response = await fetch(url, options);
          const json = await response.json();
          let data = json;
          console.log(data);
          if(data.message === "Session Created Successfully")
          {
               loginWindow = false;
               loginSuccess = 1;
               document.cookie = "session" + "=" + data.session + ";" ;
               document.cookie = "access_token" + "=" + data.access_token + ";";
               document.cookie = "refresh_token" + "=" + data.refresh_token + ";";
          }
          else{
               loginSuccess = 2;
               console.log("error");
          }

          console.log(getCookie("session"));
          console.log(getCookie("access_token"));
          console.log(getCookie("refresh_token"));
     }

     function login(event)
     {
          console.log(event.target.email.value);
          console.log(event.target.password.value);

          username = event.target.email.value;

          let inp = {
                       username: event.target.email.value,
                       password: event.target.password.value,
                       authtype: "GOOGLE",
                       sessiondata: ""
                  }

          let url = "http://0.0.0.0:5000/login";
          firstAsync(url, inp);
     }
</script>

<style>
     .login{
          color: white;
          width: 20em;
          align-content: center;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
     }
     
     /* Dropdown content (hidden by default) */
     .dropdown-content {
          display: block;
          position: absolute;
          background-color:  whitesmoke;
          min-width: 20em;
          min-height: 20em;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
     }
     /* Show the dropdown menu on hover */
     .dropdown:hover .dropdown-content {
          display: block;
     }
     .authfail{
          color:rgb(109, 10, 10);
     }
</style>

<div class = "login">
     <div on:click = {writeCookie}>
          {#if loginSuccess === 1}
               {username}
          {:else}
               Login
               <i class="fa fa-caret-down"></i>
          {/if}
     </div> 
     {#if loginWindow}
          <div id = "dropdown" class="dropdown">
               <div id = "dropdown-content" class="dropdown-content">
                    {#if loginSuccess === 1}
                         <Logout />
                    {:else}
                         <DefaultLogin on:submit = {login}/>
                         {#if loginSuccess === 2}
                              <div class = "authfail" >
                                   Login failure
                              </div>
                         {/if}
                    {/if}
               </div>
          </div> 
     {/if}
</div>