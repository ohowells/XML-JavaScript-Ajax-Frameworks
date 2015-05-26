 <?php
    $file_name = $_GET['id'];
    $xml_doc   = new DOMDocument();
    $xml_doc->load($file_name);
    
    $schema = trim($file_name, ".xml");
    
    if (!$xml_doc->schemaValidate($schema . ".xsd"))
        echo "invalid";
?> 