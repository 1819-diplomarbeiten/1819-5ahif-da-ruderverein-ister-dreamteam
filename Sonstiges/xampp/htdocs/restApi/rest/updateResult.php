<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../model/result.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$result = new Result($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$result->result_id = $data->result_id;

// set product property values
$result->distance = $data->distance;
$result->participant_email = $data->participant_email;
$result->challenge_id = $data->challenge_id;

// update the product
if($result->update()){
    echo '{';
    echo '"message": "Result was updated."';
    echo '}';
}

// if unable to update the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to update Result."';
    echo '}';
}
?>