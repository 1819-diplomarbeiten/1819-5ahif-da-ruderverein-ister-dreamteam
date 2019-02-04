<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

if(isset($_GET['email'])){
    $result = $query->emailExists($_GET['email']);
    echo $result ? 'true' : 'false';

}
else
    echo false;