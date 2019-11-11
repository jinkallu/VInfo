<?php 
    $xml = $_POST['xml'];
    if ($xml != null) {
        
        $p = xml_parser_create();
        xml_parse_into_struct($p, $xml, $vals, $index);
        xml_parser_free($p);

        $xml = '\'' . $xml . '\'';
        $command = 'python/main.py ' . $xml;
        $output = shell_exec($command);
        echo $output;
    }
?>