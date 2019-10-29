<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../model/Challenge.php';
include_once '../queries/Query.php';
include_once '../../vendor/autoload.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);
// prepare product object
$challenge = new Challenge($db);

$data = file_get_contents('php://input');
$data = html_entity_decode($data);
$data = json_decode($data, true);



$id = $query->getChallengeIdFromStartDate($data['oldDate']);

$challenge->challenge_id = $id;
$challenge->start_date = $data['newDate'];
$idToken = $data['idtoken'];

if($query->getUserRights($idToken) != 'schramm'){
    http_response_code(401);
}else {
    if ($challenge->update()) {
        echo '{';
        echo '"message": "Result was updated."';
        echo '}';
    } // if unable to update the product, tell the user
    else {
        echo '{';
        echo '"message": "Unable to update Result."';
        echo '}';
    }
}