<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 04.02.2019
 * Time: 12:59
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

if(isset($_GET['language'])){
    $language = $_GET['language'];
    echo json_encode($query->getTranslation($language), JSON_UNESCAPED_UNICODE);

}