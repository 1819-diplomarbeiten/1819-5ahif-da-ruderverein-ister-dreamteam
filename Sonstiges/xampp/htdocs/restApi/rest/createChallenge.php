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
include_once '../model/Challenge.php';

$database = new Database();
$db = $database->getConnection();

$challenge = new Challenge($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$challenge->challenge_id = $data->challenge_id;
$challenge->start_date = $data->start_date;
$challenge->end_date = $data->end_date;


// create the product
if($challenge->create()){
    echo '{';
    echo '"message": "Challenge was created."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to create Challenge."';
    echo '}';
}
?>