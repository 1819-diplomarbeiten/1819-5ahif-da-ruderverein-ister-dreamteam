<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

$sql = $db->prepare("select sum(r.distance)
        from result r");

// initialize object
$query = new Query($db);

echo $query->buildJson("sum(r.distance)", "totalResults", $sql);

?>