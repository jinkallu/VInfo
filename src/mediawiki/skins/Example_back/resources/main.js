/* JavaScript for the Example skin */
"use strict";

var parent;
var siblings = [];
var children = [];
var focus = 0;

jQuery( document ).ready( function() {
    //$("#content").hide();
    console.log('initial loading');
    initialLoading();
    
    jQuery( '.parent_root' ).on( 'click', function() {
        console.log('clicked parent');
        getParentCategory(parent);
    });
    // when clicked on children
	jQuery( '.children_holder' ).on( 'click', '.child', function() {
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
    } );
    // when clicked on siblings
    // very important to keep this format
    jQuery( '.siblings_holder' ).on( 'click', '.siblings', function(event) {
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
        getPreview(siblings[focus].replace(' ', '_'));
    } );
    
    jQuery( '.edit' ).on( 'click', function() {
        console.log('clicked edit');
        editPage(siblings[focus].replace(' ', '_'));
    });
} );

function initialLoading(){
    // initial loading
    parent = "BigBang";
    jQuery(".nodeview").append('<div class="parent_holder"></div>');
    jQuery(".parent_holder").append('<div class="parent_root">' + parent + '</div>');

    // get siblings
    jQuery(".nodeview").append('<div class="siblings_holder"></div>');
    getCategoryMembers("siblings", parent, ".siblings_holder", "siblings");

    // Fullview, edit
    jQuery(".nodeview").append('<div class="pagetools_holder"></div>');
    jQuery(".pagetools_holder").append('<div class="edit">Edit</div>');
    jQuery(".pagetools_holder").append('<div class="fullview">Full View</div>');

    // preview holder
    jQuery(".nodeview").append('<div class="preview_holder"></div>');

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
        if(type === "siblings")
        {
            siblings = [];    
        }
        else if(type === "children")
        {
            children = [];    
        }
        for (var i = 0; i < child.length; i++){
            console.log( child[i].title);
            if(type === "siblings")
            {
                siblings.push(child[i].title.replace('Category:', ''));
            }
            if(type === "children")
            {
                children.push(child[i].title.replace('Category:', ''));
            }
            jQuery(holder_div).append('<div class='+ child_div +'>' + child[i].title.replace('Category:', '') + '</div>');
        }
        if(type === "siblings")
        {
            // get children
            if(siblings.length > focus){
                getCategoryMembers("children", siblings[focus].replace(' ', '_'), ".children_holder", "child");
                getPreview(siblings[focus].replace(' ', '_'));
            }
            //editPage('Formal_Science');
        }
    } );
}

function getPreview(cat){
    jQuery( ".preview_holder .mw-parser-output" ).remove();
    jQuery( ".preview_holder #editform" ).remove();
    var api = new mw.Api();
    api.get( {
        action: 'parse',
        page: 'Category:'+ cat,
        format: "json"
    } ).done( function ( data ) {
        //console.log(data.parse.text['*']);
        jQuery(".preview_holder").append(data.parse.text['*']);
    });
}

function editPage(cat){
    console.log("Edit");
    jQuery( ".preview_holder .mw-parser-output" ).remove();
    jQuery(".preview_holder").append('<div id = editform> </div>');
    $('#editform').load('http://localhost/mediawiki/index.php?title=Category:' + cat + '&action=edit #editform', function () {
       // mw.notify( 'Load complete!' );
    } );
    var api = new mw.Api();
    api.get( {
        action: 'edit',
        title: 'Category:'+ cat,
        format: "json"
    } ).done( function ( data ) {
        console.log(data);
        //jQuery(".preview_holder").append(data.parse.text['*']);
    });
}