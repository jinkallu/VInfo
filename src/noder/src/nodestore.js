import { writable, get } from 'svelte/store';
//import {tweened} from 'svelte/motion';

const self = writable([]);
const parent = writable([]);
const sibblings = writable([]);
const children = writable([]);

let loadedsibblingforupdate;


function onsideclickedapi(node) {
    console.log(node + " node is ");
    let postdata = { nodeid: node, nodetype: "SIDE", session: "kdfdkf" };
    return fetch("http://127.0.0.1:5000/listnodes", {
        method: "POST",
        body: JSON.stringify(postdata),
        headers: { "Content-Type": "application/json" }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("An error occurred, please try again!");
            }
            return res.json();
        })
        .then(fetchdata => {
            if (fetchdata.children) {
                children.set(fetchdata.children);
            } else {
                children.set([]);
            }
            sibblings.set(loadedsibblingforupdate);

        })
        .catch(err => {
            console.log(err);
        });
}

async function fetchInitDataApi() {
    console.log("fetchinitdata api called");
    let postdata = { nodeid: null, nodetype: "FOCUS", session: "kdkfkdf" };

    return fetch("http://127.0.0.1:5000/listnodes", {
        method: "POST",
        body: JSON.stringify(postdata),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Fetching nodes failed, please try again later!");
            }

            return res.json();
        })
        .then(data => {
            console.log(data);

            self.set(data.self);
            parent.set(data.parent);
            children.set(data.children);
            sibblings.set(data.sibblings);


            return {
                fetchedSelf: data.self,
                fetchedParent: data.parent,
                fetchedChildren: data.children,
                fetchedSibblings: data.sibblings
            };
        })
        .catch(err => {
            console.log(err);
            // this.error(500, "Could not fetch nodes!");
        });
}

const nodestore = {
    subscribeSelf: self.subscribe,
    subscribeParent: parent.subscribe,
    subscribeSibblings: sibblings.subscribe,
    subscribeChildren: children.subscribe,
    fetchInitData: async () => {
        console.log("fetchinitdata api clicked");
        const fetchData = fetchInitDataApi();
        console.log(fetchData);
    },
    onSideClicked: (clickedSelf, prevSibblings) => {
        console.log("onsideclicked called");
        loadedsibblingforupdate = prevSibblings;
        console.log(loadedsibblingforupdate + "sibblings for update");
        self.set(clickedSelf);
        sibblings.set([]);
        children.set([]);
        const apichildren = onsideclickedapi(clickedSelf.nodeid);
    }
}




export default nodestore;
