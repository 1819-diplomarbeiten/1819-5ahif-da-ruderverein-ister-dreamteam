<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../model/result.php';

include_once '../queries/Query.php';


$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$data = json_decode(file_get_contents("php://input"));

foreach ($data as &$d){
    $result = new Result($db);
    $result->challenge_id = $query->getCurrentChallengeId();
    $result->distance = $d->distance;
    $result->participant_email = $d->email;

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
}




