import { writable, get } from 'svelte/store';
//import {tweened} from 'svelte/motion';

const self = writable([]);
const parent = writable([]);
const sibblings = writable([]);
const children = writable([]);
const preview = writable([]);

let loadedsibblingforupdate;
let loadedchildrenforupdate;


function ontopclickedapi(node) {
    let postdata = { nodeid: node, nodetype: "TOP", session: "kdfdkf" };
    return fetch("http://localhost:5000/listnodes", {
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
            if (fetchdata.sibblings) {
                sibblings.set(fetchdata.sibblings);
            } else {
                sibblings.set([]);
            }
            if (fetchdata.parent) {
                parent.set(fetchdata.parent);
            }

            if (fetchdata.preview) {
                preview.set(fetchdata.preview);
            }
            else {
                parent.set([]);
            }

            children.set(loadedsibblingforupdate);

            // return res.json();
        })
        .catch(err => {
            isLoading = false;
            console.log(err);
        });
}


function onbottonclickedapi(node) {
    let postdata = { nodeid: node, nodetype: "BOTTOM", session: "kdfdkf" };
    return fetch("http://localhost:5000/listnodes", {
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
            }
            if (fetchdata.preview) {
                preview.set(fetchdata.preview);
            }

            else {
                children.set([]);
            }
            sibblings.set(loadedchildrenforupdate);
        })
        .catch(err => {
            isLoading = false;
            console.log(err);
        });
}


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
            }

            if (fetchdata.preview) {
                preview.set(fetchdata.preview);
            }
            else {
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
            preview.set(data.preview);


            return {
                fetchedSelf: data.self,
                fetchedParent: data.parent,
                fetchedChildren: data.children,
                fetchedSibblings: data.sibblings,
                fetchedPreview: data.preview
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
    subscribePreview: preview.subscribe,
    fetchInitData: async () => {
        console.log("fetchinitdata api clicked");
        const fetchData = fetchInitDataApi();
        console.log(fetchData);
    },
    onSideClicked: (clickedSelf, prevSibblings) => {
        console.log(clickedSelf + "clicked self");
        console.log("onsideclicked called");
        loadedsibblingforupdate = prevSibblings;
        console.log(loadedsibblingforupdate + "sibblings for update");
        self.set(clickedSelf);
        sibblings.set([]);
        children.set([]);
        preview.set([]);
        const apichildren = onsideclickedapi(clickedSelf.nodeid);
    },
    onBottomClicked: (newParent, clickedSelf, prevchildren) => {
        parent.set(newParent);
        self.set(clickedSelf);
        sibblings.set([]);
        loadedchildrenforupdate = prevchildren;
        children.set([]);
        preview.set([]);

        const apichildren = onbottonclickedapi(clickedSelf.nodeid);
    },
    onTopClicked: (loadedParent, loadedSibblings, clickedNodeid) => {


        self.set(loadedParent);
        loadedsibblingforupdate = loadedSibblings;

        children.set([]);
        parent.set([]);
        sibblings.set([]);
        preview.set([]);


        const apisibblings = ontopclickedapi(clickedNodeid);

        // let clickedSelf = loadedsibblings.find(node => node.nodeid == event.detail);
        // console.log(clickedSelf.nodename);
        // // self.set([]);
        // self.set(clickedSelf);

        // sibblings.set([]);
        // children.set([]);

        // const apichildren = ontopclickedapi(event.detail);
        // console.log(res.children);

        // console.log(apidata.children);
    }

}




export default nodestore;
