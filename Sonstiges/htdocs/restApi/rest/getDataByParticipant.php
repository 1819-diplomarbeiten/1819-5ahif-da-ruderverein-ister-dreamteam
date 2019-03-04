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
include_once '../model/participant.php';
include_once '../queries/Query.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){

}
else{
    $email = $_GET['email'];
    $result = $query->getParticipantData($email);
    echo json_encode($result);
}