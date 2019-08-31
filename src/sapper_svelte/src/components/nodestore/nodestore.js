import { writable } from 'svelte/store';

const nstore = writable([]);

const nodestore = {
  subscribe: nstore.subscribe,
  // get full nodeview. It is useful:
  //    1. when we load first time
  //    2. When we search
  getFull: item => {
    nstore.update(items => {
        let data;
        let url = "http://0.0.0.0:5000/listnodes?session=ss&nodetype=FOCUS&nodeid"+item.nodeid;//db4b740e-c3cf-406f-ab70-78e0929ece80";

        return firstAsync();

        async function firstAsync()  {
            const response = await fetch(url, {method: 'POST'});
            const json = await response.json();
            data = json;
            console.log(data);
            nstore.set(data);
        }
    });
  },
  //
  removeItem: id => {
    nstore.update(items => {
      return items.filter(i => i.id !== id);
    });
  }
};

export default nodestore;
