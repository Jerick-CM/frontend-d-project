<?php
//echo $_SERVER['REQUEST_URI'];
$uri = explode('?', $_SERVER['REQUEST_URI'])[0];
$uri = trim($uri, '/');
$uri = explode('/', $uri);
//var_dump($uri);
//exit();
if (count($uri) > 1) {
    $uri = $uri[1];
    if ($_SERVER['QUERY_STRING']) {
        $qs = '&' . $_SERVER['QUERY_STRING'];
    }
    //echo $uri;
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: /page?page=" . urlencode($uri) . $qs);
    exit();
}
//exit();
include_once(dirname(__FILE__) . '/index.html');
