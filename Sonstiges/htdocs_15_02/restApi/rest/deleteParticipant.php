<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// include database and object file
include_once '../config/database.php';
include_once '../model/participant.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$participant = new Participant($db);

// get product id
$data = json_decode(file_get_contents("php://input"));

// set product id to be deleted
//$participant->email = $data->participant_email;
$participant->email = $_GET['email'];

// delete the product
if($participant->delete()){
    echo '{';
    echo '"message": "Participant was deleted."';
    echo '}';
}

// if unable to delete the product
else{
    echo '{';
    echo '"message": "Unable to delete Participant."';
    echo '}';
}
?>