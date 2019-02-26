<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../model/club.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$club = new Club($db);

// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));

// set ID property of product to be edited
$club->email = $data->email;

// set product property values
$club->contraction = $data->contraction;
$club->name = $data->name;

// update the product
if($club->update()){
    echo '{';
    echo '"message": "Club was updated."';
    echo '}';
}

// if unable to update the product, tell the user
else{
    echo '{';
    echo '"message": "Unable to update Club."';
    echo '}';
}
?>