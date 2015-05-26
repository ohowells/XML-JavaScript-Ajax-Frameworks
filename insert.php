<?php
    $xml_file = $_GET['id'];
    $n_one    = $_GET['a'];
    $n_two    = $_GET['b'];
    $n_three  = $_GET['c'];
    $n_four   = $_GET['d'];
    $n_five   = $_GET['e'];
    $n_six    = $_GET['f'];
    
    $dom = new DOMDocument();
    $dom->load($xml_file);
    $nodes = $dom->getElementsByTagName("*");
    
    $root = $dom->createElement($nodes->item(1)->nodeName);
    echo $nodes->item(2)->nodeName;
    $dom->documentElement->appendChild($root);
    
    $n_one = $dom->createElement($nodes->item(2)->nodeName, $n_one);
    $root->appendChild($n_one);
    
    $n_two = $dom->createElement($nodes->item(3)->nodeName, $n_two);
    $root->appendChild($n_two);
    
    $n_three = $dom->createElement($nodes->item(4)->nodeName, $n_three);
    $root->appendChild($n_three);
    
    $n_four = $dom->createElement($nodes->item(5)->nodeName, $n_four);
    $root->appendChild($n_four);
    
    $n_five = $dom->createElement($nodes->item(6)->nodeName, $n_five);
    $root->appendChild($n_five);
    
    $n_six = $dom->createElement($nodes->item(7)->nodeName, $n_six);
    $root->appendChild($n_six);
    
    $dom->save($xml_file);
?> 