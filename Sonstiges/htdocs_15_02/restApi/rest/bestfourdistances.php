<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';


$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

if (!(isset($_GET['email']))) {
    $sql = $db->prepare("SELECT participant_email, sum(distance) from (select distance from result group by participant_email order by distance desc limit 4)");


// initialize object

    echo $query->buildJson("sum(distance)", "bestFourDistances", $sql);
} else {


    $email = $_GET['email'];

    echo $query->getBestFourDistances($email);
}
