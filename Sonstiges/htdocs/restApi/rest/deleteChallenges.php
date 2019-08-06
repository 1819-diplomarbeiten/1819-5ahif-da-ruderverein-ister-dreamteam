<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object file
include_once '../config/database.php';
include_once '../model/Challenge.php';
include_once '../queries/Query.php';
include_once '../../vendor/autoload.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$year = $data['year'];
$idToken = $data['idtoken'];

if($query->getUserRights($idToken) != 'schramm'){
    http_response_code(401);
}else {
    if ($query->deleteChallengesInYear($year)) {
        header('HTTP/1.1 200 OK');
    } else {
        header('HTTP/1.1 500 Internal Server Error');
    }
}
