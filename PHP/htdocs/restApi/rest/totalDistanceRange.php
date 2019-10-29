<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';


$database = new Database();
$db = $database->getConnection();
$gender = $_GET['gender'];
$range = (int)$_GET['range'];

$sql = $db->prepare("select count(*)
        from result as r
        join participant as p on p.email = r.participant_email and p.gender = :gender
        where r.distance > :range");

$sql->bindValue(':gender', $gender, PDO::PARAM_STR);
$sql->bindValue(':range', $range, PDO::PARAM_INT);
// initialize object
$query = new Query($db);

echo $query->buildJson("count(*)", "totalDistanceRange", $sql);