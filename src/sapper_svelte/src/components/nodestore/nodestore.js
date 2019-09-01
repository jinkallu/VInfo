import { writable } from 'svelte/store';
//import {tweened} from 'svelte/motion';

const nstore = writable([]);
//const nstore = tweened([]);

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
    nstore.set(data);
}

const nodestore = {
  subscribe: nstore.subscribe,
  // get full nodeview. It is useful:
  //    1. when we load first time
  //    2. When we search

  getFull: item => {
    nstore.update(items => {
        let inp = {
                       session: 's',
                       nodetype: item.op,
                       nodeid: item.nodeid
                  }

        let url = "http://0.0.0.0:5000/listnodes";
        console.log(item.nodeid, item.op);
        firstAsync(url, inp);
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
