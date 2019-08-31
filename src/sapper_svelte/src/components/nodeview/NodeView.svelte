<script>
    import Parent from './Parent.svelte';
    import Children from './Children.svelte';
    import SelfAndSibblings from './SelfAndSibblings.svelte';

    let parent_view_data = [{
        rx: 300,
        ry: 100,
        width: 150,
        height: 50,
        color: "steelblue",
        name: ""
    }];

    let selfAndSibblings_view_data = [{
        rx: 300,
        ry: 200,
        width: 150,
        height: 50,
        color: "grey",
        name: ''
    }];

    let children_view_data = [{
        rx: 300,
        ry: 500,
        width: 150,
        height: 50,
        color: "blue",
        name: ""
    }];
</script>

<Parent size_data = {parent_view_data} />
<SelfAndSibblings size_data = {selfAndSibblings_view_data} />
<Children size_data = {children_view_data} />
