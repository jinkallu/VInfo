class MainUI {
    constructor(body) {
        this.body = body;
        this.menubar = new MenuBar();
    }

    createUI(){
        this.createMenuBar();
    }

    createMenuBar(){
        var menuBarDiv = document.createElement("div");
        this.body.appendChild(menuBarDiv);
        this.menubar.create(menuBarDiv);
    }
}
