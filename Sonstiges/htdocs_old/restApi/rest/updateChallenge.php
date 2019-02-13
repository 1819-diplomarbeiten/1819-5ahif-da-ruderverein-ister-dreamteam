<?php
// required headers
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

// prepare product object
$challenge = new Challenge($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$challenge->challenge_id = $data->challenge_id;

// set product property values
$challenge->start_date = $data->start_date;
$challenge->end_date = $data->end_date;

// update the product
if($challenge->update()){
    echo '{';
    echo '"message": "Challenge was updated."';
    echo '}';
}

// if unable to update the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to update Challenge."';
    echo '}';
}
?>