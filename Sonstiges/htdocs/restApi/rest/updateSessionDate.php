<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../model/Challenge.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);
// prepare product object
$challenge = new Challenge($db);

$data = file_get_contents('php://input');
$data = json_decode($data, true);

$id = $query->getChallengeIdFromStartDate($data['object']['oldDate']);

echo "test";