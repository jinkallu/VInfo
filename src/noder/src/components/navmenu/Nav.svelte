<script>
    import SideNav from './Sidenav.svelte';
    import Search from './Search.svelte';

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

	
</style>

<nav>
	<ul>
          <li> <SideNav /> </li>
          <li> <Search /> </li>
	</ul>
</nav>
