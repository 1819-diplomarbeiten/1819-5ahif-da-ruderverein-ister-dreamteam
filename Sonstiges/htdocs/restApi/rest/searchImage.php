<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 15.10.2019
 * Time: 11:52
 */
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);
$email = $_GET['email'];
$challengeId = (int)$_GET['session']*10000 + (int)$_GET['year'];

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){

}
else{
    $data = [];
    $data['picture']= $query->getImage($challengeId,$email);
    $data['name'] = "evidence";
    echo json_encode($data, JSON_UNESCAPED_UNICODE);

}