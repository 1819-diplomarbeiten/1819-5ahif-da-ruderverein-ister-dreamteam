<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

if(isset($_GET['email'])){
    $arr = $query->getEmailStatus($_GET['email']);
    if($query->getCurrentChallengeId() == null)
        $arr['challengeStatus'] = "false";
    else
        $arr['challengeStatus'] = "true";
}

echo json_encode($arr);