<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object file
include_once '../config/database.php';
include_once '../model/Challenge.php';
include_once '../queries/Query.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);
$year = $_GET['year'];

if($query->deleteChallengesInYear($year)){
    header('HTTP/1.1 200 OK');
}

else{
    header('HTTP/1.1 500 Internal Server Error');
}
