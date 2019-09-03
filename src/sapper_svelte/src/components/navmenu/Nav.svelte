<script>
    import SideNav from './Sidenav.svelte';
    import Search from './Search.svelte';

	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
                font-weight: 300;
                padding: 0em;
                background-color: #0f7fff;
                top: 0; /* Position the navbar at the top of the page */
                width: 100%; /* Full width */
                z-index: 1;
                position: fixed;
	}

	ul {
		margin: 0;
                padding: 0em 0em 0em 0em;
                width: 100%;
        }

	/* clearfix */
	ul::after {
		content: '';
		display: block;
                clear: both;
	}

	li {
		display: block;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
                <li> <SideNav /> </li>
                <li> <Search /> </li>
	</ul>
</nav>
