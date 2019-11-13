class MenuBar{
    constructor(){
        this.fileMenu = new Menu('File', ['Open', 'Save', 'Save as']);
    }

    create(menuBarDiv){
        this.div = menuBarDiv;
        this.div.style.display = "flex";
        this.div.appendChild(this.fileMenu.get());
        //this.body.innerHTML = Date();        
    }
}