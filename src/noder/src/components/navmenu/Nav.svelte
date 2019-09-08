<script>
    import SideNav from './Sidenav.svelte';
    import Search from './Search.svelte';
    import Login from './usrmgmt/Login.svelte';

	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
          font-weight: 300;
          padding: 0.2em;
          background-color: #0f7fff;
          top: 0; /* Position the navbar at the top of the page */
          width: 100%; /* Full width */
		height: 8%;
          z-index: 1;
          position: fixed;
	}

	ul {
        }

	li {
		display: block;
	}

     .login{
          float: right;
          padding-right: 1em;
     }

     .sidenav{
          float: left;
          top: 0;
     }

     .search{
     }

	
</style>

<nav>
	<ul>
          <li class = "sidenav"> <SideNav /> </li>
          <li class = "search"> <Search /> </li>
          <li class = "login"> <Login /> </li>
	</ul>
</nav>
