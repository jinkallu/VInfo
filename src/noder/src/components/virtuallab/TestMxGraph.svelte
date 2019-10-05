<script>
     var mxLoadResources = false;
     import { onMount } from "svelte";

     import mxgraph from 'mxgraph';

     const {
          mxClient, mxGraph, mxRubberband, mxUtils, 
          mxEvent, mxToolbar, mxEditor, mxDefaultToolbar,
          mxObjectCodec
     } = mxgraph();

     let container;
     onMount(async () => {
          if (!mxClient.isBrowserSupported()) {
               console.log("Browser is not supported");
          }
          else
          {
               console.log("Browser is supported");
               
          }
          var editor = new mxEditor();

          var config = mxUtils.load('/editors/config/uiconfig.xml').getDocumentElement();


          mxObjectCodec.allowEval = true;
		editor.configure(config);
          mxObjectCodec.allowEval = false;
          
          editor.setGraphContainer(container);

          var toolbar = new mxDefaultToolbar(container, editor);
          toolbar.addItem('Copy', null, 'copy');
          toolbar.addItem('Show XML', '/editors/images/gear.png', 'myFirstAction');
		toolbar.addItem('Delete', '/editors/images/keys.png', 'delete');

          var combo = toolbar.addActionCombo('More actions...');
          toolbar.addActionOption(combo, 'Paste', 'paste');
          
          //var editor = new mxEditor(container);
          // Creates the graph inside the given container
          //var graph = new mxGraph(container);
          var graph = editor.graph;

          // create toolbar
          //var toolbar = new mxToolbar(editor);
          //toolbar.addItem('Copy', null, 'copy');

            // Enables rubberband selection
            new mxRubberband(graph);

            // Gets the default parent for inserting new cells. This
            // is normally the first child of the root (ie. layer 0).
            var parent = graph.getDefaultParent();

            // Adds cells to the model in a single step
            graph.getModel().beginUpdate();
            try
            {
               var v1 = graph.insertVertex(parent, null,
                        'Hello,', 20, 20, 80, 30);
               var v2 = graph.insertVertex(parent, null,
                        'World!', 200, 150, 80, 30);
               var e1 = graph.insertEdge(parent, null, '', v1, v2);
            }
            finally
            {
               // Updates the display
               graph.getModel().endUpdate();
            }
     });
     
</script>

<style>
     .vlab{
          height: 100%;
     }
</style>

<div class="vlab" >
     <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0">
	<tr>
		<td id="toolbar" colspan="2" height="80px" style="background:#7F7F7F;padding:10px;">
		</td>
	</tr>
	<tr>
		<td id="toolbox" valign="top" width="70px" style="min-width:70px;background:#7F7F7F;padding:12px;">
		</td>
		<td width="100%" style="background:url('editors/images/grid.gif');border: solid gray 1px;height:100%;">
			<div bind:this = {container} id="graph" style="overflow:auto;width:100%;height:100%;">
			</div>
		</td>
	</tr>
	</table>
</div>