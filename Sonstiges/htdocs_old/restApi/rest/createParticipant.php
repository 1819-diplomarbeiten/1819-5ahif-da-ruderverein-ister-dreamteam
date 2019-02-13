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
include_once '../model/participant.php';

$database = new Database();
$db = $database->getConnection();

$participant = new Participant($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$participant->email = $data->email;
$participant->first_name = $data->first_name;
$participant->last_name = $data->last_name;
$participant->dob = $data->dob;
$participant->club = $data->club;
$participant->gender = $data->gender;
$participant->weight = $data->weight;

// create the product
if($participant->create()){
    echo '{';
    echo '"message": "Participant was created."';
    echo '}';
}

// if unable to create the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to create Participant."';
    echo '}';
}
?>