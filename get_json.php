 <?php
    $xml_file = $_GET['id'];
    $xml      = simplexml_load_file($xml_file);
    
    if (count($xml->children()) > 0) {
        $records = $xml->children();
        $json    = '{ "columns" : ' . count($records[0]->children()) . ', "rows" : ' . count($records) . ', ';
        
        $column = 0;
        $json .= '"headings" : [ ';
        foreach ($records[0] as $key => $value) {
            $column++;
            if ($column > 1)
                $json .= ', ';
            $json .= '"' . $key . '"';
        }
        $json .= ' ], ';
        
        $json .= '"data" : [ ';
        
        $row = 0;
        foreach ($records as $record) {
            $row++;
            if ($row > 1)
                $json .= ', ';
            
            $json .= '[ ';
            $column = 0;
            foreach ($record as $data) {
                $column++;
                if ($column > 1)
                    $json .= ', ';
                $json .= '"' . $data . '"';
            }
            $json .= ' ]';
        }
        $json .= '] }';
        echo ($json);
    } else
        echo '{"columns" : 0, "rows" : 0 }';
?> 