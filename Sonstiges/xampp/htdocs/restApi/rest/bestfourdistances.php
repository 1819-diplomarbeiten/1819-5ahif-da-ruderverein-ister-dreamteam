<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';


$database = new Database();
$db = $database->getConnection();
$email = $_GET['email'];

$sql = $db->prepare("select sum(distances.distance) 
        from (select distance 
              from result 
              where participant_email = :email
              order by distance desc limit 4) distances");

$sql->bindValue(':email', $email, PDO::PARAM_STR);
// initialize object
$query = new Query($db);

echo $query->buildJson("sum(distances.distance)", "bestFourDistances", $sql);
