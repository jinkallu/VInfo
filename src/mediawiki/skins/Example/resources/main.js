/* JavaScript for the Example skin */
"use strict";

var parent;
var siblings = [];
var children = [];
var focus = 0;
var focus_page;
var flagPageFullViewToggle = false;

// edit
var multilineInput; 
var page_name;

//file uploads
var fileUpload = $( '<div/>' ).attr( 'class', 'fileupload' );
var fileInput = $( '<input/>' ).attr( 'type', 'file' );
var fileUploadName = $( '<input class = "fileuploadname"/>' ).attr( 'type', 'text' )//Last name: <input type="text" name="lname"><br>
var fileSubmitBtn = $( '<input/>' ).attr( 'type', 'button' ).attr( 'value', 'Upload' );
fileUpload.append( [ fileInput, fileUploadName, fileSubmitBtn ] );

// 

jQuery( document ).ready( function() {
    //$("#content").hide();
    console.log('initial loading');
    initialLoading();
    console.log("Server " + mw.config.get( 'wgServer' ));
    page_name = mw.config.get( 'wgPageName' );
    page_name = page_name.replace('Category:', '');
    if(page_name === "Main_Page"){
        parent = "BigBang";
        jQuery(".parent_holder .parent_root").html(parent);
        getCategoryMembers("siblings", parent, ".siblings_holder", "siblings");
        //jQuery( '.nodeview' ).find('.details').css( "display", "none" );
    }
    else{
        parent = page_name;
        getParentCategory(parent);

        // parent is empty
        if(parent === page_name){
            jQuery( ".parent_root" ).html('Root');
            //jQuery( ".siblings_holder .siblings" ).remove();
            siblings = [];
            siblings.push(parent);
            jQuery(".siblings_holder").append('<div class="siblings" style="background-color: red;">' + siblings[0] + '</div>');
            focus  = 0;
            focus_page = siblings[focus];
            jQuery( ".children_holder .child" ).remove();
            getCategoryMembers("children", siblings[focus], ".children_holder", "child");
            getPreview(page_name);
        }
    }
    //$( '.nodeview' ).find('.details').css( "display", "none" );;
    console.log('Page name ' + page_name + mw.util.getUrl(page_name));
    
    jQuery( '.parent_root' ).on( 'click', function() {
        console.log('clicked parent');
        location.href = mw.config.get( 'wgServer' ) + mw.util.getUrl('Category:' + parent);
        
        //getParentCategory(parent);
    });
    // when clicked on children
	jQuery( '.children_holder' ).on( 'click', '.child', function() {
        focus = jQuery(this).index()
        location.href = mw.config.get( 'wgServer' ) + mw.util.getUrl('Category:' + children[focus]);

        /*
        parent = siblings[focus];
        jQuery( ".parent_root" ).html(parent);
        focus = jQuery(this).index()
        console.log('clicked child');
        siblings = [];
        jQuery( ".siblings_holder .siblings" ).remove();
        for(var i = 0; i < children.length; i++){
            siblings.push(children[i]);
            jQuery(".siblings_holder").append('<div class="siblings">' + siblings[i] + '</div>');
        }
        jQuery( ".children_holder .child" ).remove();
        getCategoryMembers("children", siblings[focus], ".children_holder", "child");
        getPreview(siblings[focus].replace(' ', '_'));
        */
    } );
    // when clicked on siblings
    // very important to keep this format
    jQuery( '.siblings_holder' ).on( 'click', '.siblings', function(event) {
        focus = jQuery(this).index()
        location.href = mw.config.get( 'wgServer' ) + mw.util.getUrl('Category:' + siblings[focus]);
/*
        if(focus === jQuery(this).index())
        {
            console.log('focus');
            return;
        }
        else{
            console.log(focus , jQuery(this).index());
            focus = jQuery(this).index();
        }
        var sib = event.target.innerHTML;
        sib = sib.replace(' ', '_');
        console.log('clicked siblings ' + sib);
        jQuery( ".children_holder .child" ).remove();
        getCategoryMembers("children", sib, ".children_holder", "child");
        //getPreview(siblings[focus].replace(' ', '_'));
        loadPageView();*/
    } );
    
    jQuery( '.edit' ).on( 'click', function() {
        console.log('clicked edit');
        editPage(focus_page);
    });

    jQuery( '.fullview' ).on( 'click', function() {
        console.log('clicked FullView');
        flagPageFullViewToggle = !flagPageFullViewToggle;
        loadPageView();
    });

    jQuery( '.nodeview .pagefullview_holder .editpageview_holder .editpreview' ).on( 'click', function() {
        console.log('clicked EditPreView');
        getEditPreview(multilineInput.getValue());
    });

    jQuery( '.nodeview .pagefullview_holder .editpageview_holder .submitedit' ).on( 'click', function() {
        console.log('clicked SubmitEdit');
        submitEdit(siblings[focus].replace(' ', '_'), multilineInput.getValue());
    });

    $( fileUpload ).on( 'change', function (e) {
        console.log("chaned");
        $( fileUploadName).val(e.target.files[0].name);
    });

    $( fileSubmitBtn ).on( 'click', function () {
        uploadFile();
    });

    jQuery( '.siblings_holder' ).on( 'contextmenu', '.siblings', function(event) {
    //$( ".siblings" ).contextmenu(function(event) {
        event.preventDefault();
        if(focus !== jQuery(this).index()){
            console.log('not focus');
            return false;
        }
        var person = prompt("Please enter the child name", "MatheMatics");

        if (person == null || person == "") {
            //alert("User cancelled the prompt.");
        } else {
            createPage(siblings[jQuery(this).index()].replace(' ', '_'), person.replace(' ', '_'));
        }

        return false;
    });

} );

function uploadFile(){
    console.log("Uploading file ");
    var api = new mw.Api();
    var filen = jQuery( fileUploadName).val();
    var params = {
		action: 'upload',
        filename: filen,//fileInput.getFilename(),
        //url: fileInput.getData(),
        format: 'json',
		ignorewarnings: 1
	};
    api.upload( fileInput[0], params ).done( function ( data ) {
        console.log("Successfully uploaded " + data);
        mw.notify("Successfully uploaded " + data)
    }).fail(function ( data ) {
        console.log( "Error upload " + data );
        mw.notify("Error upload " + data );
	} );
    /*
    api.post( {
        action: 'upload',
        filename: filen,
        file: fileInput[0],
        format: 'json',
        token: "csrf",
		ignorewarnings: 1
    } ).done( function ( data ) {
        console.log( data.upload.filename + ' has sucessfully uploaded.' );
    }).fail(function ( data ) {
		console.log( data );
	} );*/
}

function loadPageView(){
    //$( '.pagefullview_holder .editpageview_holder' ).hide();
    if(flagPageFullViewToggle){
        getFullPageView(focus_page);
        jQuery(".pagetools_holder .fullview").html('Preview');
    }
    else{
        //$( 'div.details' ).hide();
        getPreview(focus_page);
        jQuery(".pagetools_holder .fullview").html('Full View');
    }
}

function initialLoading(){
    // initial loading
    //if(mw.config.get( 'wgPageName' ) === "Special:UserLogin" ||
    //   mw.config.get( 'wgPageName' ) === "Special:UserLogout" ||
    //   mw.config.get( 'wgPageName' ) === "Special:PasswordReset" || 
    //   mw.config.get( 'wgPageName' ) === "Special:CreateAccount"){
    
    // hide talk link in user-tools
    jQuery("#pt-anontalk").hide();

    if(mw.config.get( 'wgPageName' ).startsWith("Special:") ||
       mw.config.get( 'wgPageName' ).startsWith("User_talk:") ||
       mw.config.get( 'wgPageName' ).startsWith("Template:") ||
       mw.config.get( 'wgPageName' ).startsWith("Help:") ||
       mw.config.get( 'wgPageName' ).startsWith("File:")){
        jQuery(".mw-body-content").show();
        return;
    }
    
    console.log("Current page " + mw.config.get( 'wgPageName' ));
    //jQuery(".nodeview").append('<div class="parent_holder"></div>');
    // nodeview
    jQuery(".nodeview").append('<div class="parent_holder"></div>');
    jQuery(".parent_holder").append('<div class="parent_root">' + parent + '</div>');

    // get siblings
    jQuery(".nodeview").append('<div class="siblings_holder"></div>');
    //getCategoryMembers("siblings", parent, ".siblings_holder", "siblings");

    // Fullview, edit
    jQuery(".nodeview").append('<div class="pagetools_holder"></div>');
    jQuery(".pagetools_holder").append('<div class="edit">Edit</div>');
    jQuery(".pagetools_holder .edit" ).hide();
    jQuery(".pagetools_holder").append('<div class="fullview">Full View</div>');

    // preview holder
    jQuery(".nodeview").append('<div class="pagepreview_holder"></div>');
    
    // full page view
    jQuery(".nodeview").append('<div class="pagefullview_holder"></div>'); 
    jQuery( '.pagefullview_holder' ).append('<div class="editpageview_holder"> </div>');
    jQuery( '.pagefullview_holder .editpageview_holder' ).hide();
    jQuery( '.pagefullview_holder .editpageview_holder' ).append( '<div class="editor"></div>' );
    jQuery( '.pagefullview_holder .editpageview_holder .editor' ).append( '<div class="edittoolbar"></div>' );
    jQuery( '.pagefullview_holder .editpageview_holder .editor .edittoolbar' ).append( '<div class="editpreview"> Edit Preview </div>' );
    jQuery( '.pagefullview_holder .editpageview_holder .editor .edittoolbar' ).append( '<div class="submitedit"> Submit Edit </div>' );
    jQuery( '.pagefullview_holder .editpageview_holder .editor .edittoolbar' ).append(fileUpload);




    // children
    jQuery(".nodeview").append('<div class="children_holder"></div>');
}

function getParentCategory(cat){
    var api = new mw.Api();
    api.get( {
        action: 'query',
        prop: 'categories',
        titles: 'Category:' + cat
    } ).done( function ( data ) {
        var pages = data.query.pages;
        for (var p in pages) {
            if(pages[p].categories){
                for (var cat of pages[p].categories) {
                    parent = cat.title.replace('Category:', '');
                    jQuery( ".parent_root" ).html(parent);
                    console.log(parent);
                    focus = 0;
                    jQuery( ".siblings_holder .siblings" ).remove();
                    jQuery( ".children_holder .child" ).remove();
                    getCategoryMembers("siblings", parent, ".siblings_holder", "siblings");
                }
            }
        }
    });
}

function getCategoryMembers(type, cat, holder_div, child_div){
    var api = new mw.Api();
    api.get( {
        action: 'query',
        list: 'categorymembers',
        cmtitle: 'Category:' + cat
    } ).done( function ( data ) {
        let child = data.query.categorymembers;
        jQuery( ".children_holder .child" ).remove();     
        if(type === "siblings")
        {
            siblings = [];
            jQuery( ".siblings_holder .siblings" ).remove(); 
        }
        else if(type === "children")
        {
            children = [];  
        }
        for (var i = 0; i < child.length; i++){
            console.log( child[i].title);
            var flagColor = false;
            if(type === "siblings")
            {
                siblings.push(child[i].title.replace('Category:', ''));
                console.log("Focus page: " + child[i].title.replace('Category:', '') + ' ' + page_name);

                if(child[i].title.replace('Category:', '').replace(' ', '_') === page_name){
                    flagColor = true;
                    focus = i;
                }
                else if(page_name === "Main_Page" && i === 0){
                    flagColor = true;
                    focus = i;
                }
                else if(page_name === "BigBang"){
                    flagColor = true;
                    focus = i;
                }
            }
            if(type === "children")
            {
                children.push(child[i].title.replace('Category:', ''));
            }
            if(flagColor){
                jQuery(holder_div).append('<div class='+ child_div +' style="background-color: red;">' + child[i].title.replace('Category:', '') + '</div>');
            }
            else{
                jQuery(holder_div).append('<div class='+ child_div +'>' + child[i].title.replace('Category:', '') + '</div>');
            }
        }
        if(type === "siblings" && siblings.length > 0)
        {
            focus_page = page_name === "Main_Page" ? siblings[0].replace(' ', '_'): page_name;
            // get children
            //if(siblings.length > focus){
            //    getCategoryMembers("children", siblings[focus].replace(' ', '_'), ".children_holder", "child");
            //    getPreview(siblings[focus].replace(' ', '_'));
            //}
            //editPage('Formal_Science');
            getCategoryMembers("children", focus_page, ".children_holder", "child");
            getPreview(focus_page);
        }
    } );
}

function getPreview(cat){
    jQuery( ".pagepreview_holder .mw-parser-output" ).remove();
    if(multilineInput){
        jQuery(multilineInput.$element).remove();
    }
    multilineInput = null;
    jQuery( ".pagepreview_holder #editform" ).remove();
    var api = new mw.Api();
    api.get( {
        action: 'parse',
        useskin: 'vector',
        page: 'Category:'+ cat,
        format: "json"
    } ).done( function ( data ) {
        jQuery(".pagepreview_holder .mw-parser-output" ).remove();
        jQuery(".pagepreview_holder").append(data.parse.text['*']);
        jQuery( ".pagefullview_holder" ).hide();
        jQuery(".pagetools_holder .edit" ).hide();
        $( '.details' ).hide();
        jQuery( ".pagepreview_holder" ).show();

    });
}

function editPage(cat){
    if(multilineInput){
        jQuery(multilineInput.$element).remove();
    }
    console.log("Edit");
    jQuery( ".pagefullview_holder .mw-parser-output" ).remove();
    
    // test
    var api = new mw.Api();
    api.get( {
        action: 'query',
        //useskin: 'vector',
        titles: 'Category:'+ cat,
        prop: 'revisions',
        rvprop: 'content',
        format: "json",
        formatversion: '2'
        //prop: "text"
    } ).done( function ( data ) {
        $( '.pagefullview_holder .editpageview_holder' ).show();
        // A MultilineTextInput 
        //var multilineInput = new OO.ui.MultilineTextInputWidget( { 
            //value: data.query.pages[0].revisions[0].content
        //} );
        multilineInput = new OO.ui.MultilineTextInputWidget({
            autosize: true,
            maxRows: 10
        });
        multilineInput.setValue(data.query.pages[0].revisions[0].content);
        jQuery(multilineInput.$element).show();
        
        $( '.pagefullview_holder .editpageview_holder .editor' ).append( multilineInput.$element );
        multilineInput.adjustSize();
        getEditPreview(multilineInput.getValue());
        //console.log('Length ', data.query.pages[0].revisions[0].content);
            //jQuery(".pagepreview_holder").append(data.parse.text['*']);
    });

}

function getEditPreview(text){
    var api = new mw.Api();
    api.get( {
        action: 'parse',
        useskin: 'vector',
        text: 'Category:'+ text,
        format: "json"
    } ).done( function ( data ) {
        console.log(data.parse.text['*']);
        $( '.editpageview_holder .mw-parser-output' ).remove();
        $( '.pagefullview_holder .editpageview_holder' ).append(data.parse.text['*']);
        //jQuery(".pagepreview_holder").append(data.parse.text['*']);
    });
}

function createPage(par, cat){
    var api = new mw.Api();
    // check if the page already exists
    api.get( {
        action: 'query',
        titles: 'Category:'+ cat,
        format: "json",
        formatversion: "2"
    } ).done( function ( data ) {
        console.log(data);
        if(data.query.pages !== null){
            if(data.query.pages[0].missing){
                    console.log("Page is not exists");
                    // create page
                    var tmplate = "{{WikiNod \n \
                        | title = " + cat.replace('_', ' ') + " \n \
                        | brief = Brief description of " + cat.replace('_', ' ') + " \n \
                        | image = WikiNodLogo.png \n \
                        | caption = WikiNod caption \n \
                        | video = [[File:WikiNod.mp4 | center]] \n \
                        <!-- {{#evu:https://www.youtube.com/watch?v=pSsYTj9kCHE \n \
                               |alignment=center \n \
                            }}--> \n \
                        | detail = Detailed description of " + cat.replace('_', ' ') + " \n \
                        }} \n \
                        ";
                    var par_cat = '[[Category:'+ par +' | ' + children.length +']]';
                    console.log("creating child " + cat + " belongs to " + par_cat);
                    var params = {
                        action: 'edit',
                        title: 'Category:' + cat,
                        appendtext: tmplate + par_cat,
                        format: 'json'
                    };
                
                    api.postWithToken( 'csrf', params ).done( function ( data ) {
                        console.log( data );
                        //focus = siblings.length;
                        location.href = mw.config.get( 'wgServer' ) + mw.util.getUrl('Category:' + cat);
                        //getCategoryMembers("siblings", parent, ".siblings_holder", "siblings");
                    } );
            }
            else{
                console.log("Page already exists");
                $( '.siblings_holder .siblings' ).contextmenu();
            }
        }
    });
    return;

    
}

function getFullPageView(cat){
    if(multilineInput){
        jQuery(multilineInput.$element).remove();
    }
    multilineInput = null;
    var api = new mw.Api();
    api.get( {
        action: 'parse',
        useskin: 'vector',
        page: 'Category:'+ cat,
        format: "json"
    } ).done( function ( data ) {
        jQuery(".pagefullview_holder .mw-parser-output" ).remove();
        jQuery(".pagefullview_holder").append(data.parse.text['*']);
        jQuery( ".pagepreview_holder" ).hide();
        jQuery(".pagetools_holder .edit" ).show();
        jQuery( ".pagefullview_holder" ).show();
    });
}

function submitEdit(title, text){
    var params = {
		action: 'edit',
		title: 'Category:'+ title,
        text: text,
		format: 'json'
	},
	api = new mw.Api();

    api.postWithToken( 'csrf', params ).done( function ( data ) {
        console.log( data.edit.result );
        if(data.edit.result === "Success"){
            //mw.notify( 'Submitted successfullly.' ); 
            location.href = mw.config.get( 'wgServer' ) + mw.util.getUrl('Category:' + siblings[focus]);
        }
        else{
            //mw.notify( 'Error in submission.' ); 
        }
    } ).fail(function(){

    });
}