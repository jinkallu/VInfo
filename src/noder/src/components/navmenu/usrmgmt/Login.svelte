<script>
     import DefaultLogin from "../../UI/DefaultLogin.svelte";
     import Logout from "../../UI/Logout.svelte";
     import GoogleLogin from "../../UI/GoogleLogin.svelte";
     import UserRegistration from "../../UI/UserRegistration.svelte";

     let loginWindow = false;
     let username;
     let loginSuccess = 0; // 0 not logged in, 1 loggedin, 2 auth fail
     let registration = 0; // 0 idle, 1 registration password not matching
     // 2 registered, 3 user name not available 4, registration failure
     function loginWdw(){
          
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
          //console.log(data);
          
          if(data.message === "Session Created Successfully")
          {
               loginWindow = false;
               loginSuccess = 1;

               document.cookie = "username" + "=" + username + ";" 
               document.cookie = "session" + "=" + data.session + ";" ;
               document.cookie = "access_token" + "=" + data.access_token + ";";
               document.cookie = "refresh_token" + "=" + data.refresh_token + ";";
          }
          else{
               loginSuccess = 2;
               console.log("error");
          }

          console.log(getCookie("username"));
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

     function logout(){
          var now = new Date();
          now.setMonth( now.getMonth() - 1 );
          document.cookie = "session" + "=" + "hii" + ";" + "expires=" + now.toUTCString() + ";";
          document.cookie = "access_token" + "=" + "hii" + ";" + "expires=" + now.toUTCString() + ";";
          document.cookie = "refresh_token" + "=" + "hii" + ";" + "expires=" + now.toUTCString() + ";";

          console.log(getCookie("session"));
          console.log(getCookie("access_token"));
          console.log(getCookie("refresh_token"));

          loginWindow = false;
          loginSuccess = 0;
     }

     function register(event){
          if(event.target.password.value !== event.target.repassword.value ||
               event.target.password.value === null
          )
          {
               registration = 1; // password miss match
          }
          else{
               registration = 0; //idle
          }

          let inp = {
                       username: event.target.email.value,
                       password: event.target.password.value,
                       authtype: "GOOGLE",
                  }

          let url = "http://0.0.0.0:5000/register";
          let data = firstAsync(url, inp);
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
     <div on:click = {loginWdw}>
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
                         <Logout on:click = {logout}/>
                    {:else}
                         <DefaultLogin username = {getCookie("username")? getCookie("username"): ""} on:submit = {login}/>
                         <GoogleLogin />
                         
                         {#if loginSuccess === 2}
                              <div class = "authfail" >
                                   Login failure
                              </div>
                         {/if}
                         <br />
                         <br />
                         <br />
                         <UserRegistration {registration} on:submit = {register}/>
                    {/if}
               </div>
          </div> 
     {/if}
</div>