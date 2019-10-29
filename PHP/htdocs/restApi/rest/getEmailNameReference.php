<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';
include_once '../../vendor/autoload.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$idToken = $_GET['idtoken'];
$clubEmail = $_GET['club'];



if($query->getUserRights($idToken) != 'club' && $query->getUserRights($idToken) != 'schramm'){
    http_response_code(401);
}else {

    $data = $query->getEmailNameReference($clubEmail);

    echo json_encode($data);
}