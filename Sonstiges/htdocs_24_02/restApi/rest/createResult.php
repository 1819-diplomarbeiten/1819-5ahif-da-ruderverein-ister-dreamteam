<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../model/result.php';

include_once'../queries/Query.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$result = new Result($db);

// get posted data
$data = file_get_contents('php://input');
$data = json_decode($data, true);

// set product property values
$result->challenge_id = $query->getCurrentChallengeId();
$result->distance = $data['object']['distance'];
$result->participant_email = $data['object']['email'];

// create the product
if($result->create()){
    echo '{';
    echo '"message": "Result was created."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to create Result."';
    echo '}';
}
?>