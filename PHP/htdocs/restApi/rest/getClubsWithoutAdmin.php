<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Expose-Headers: *");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../model/Challenge.php';
include_once '../queries/Query.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$data = $query->getClubsWithoutAdmin();
echo json_encode($data,JSON_UNESCAPED_UNICODE);