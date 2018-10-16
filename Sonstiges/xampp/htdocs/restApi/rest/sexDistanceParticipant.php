<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$gender = $_GET['gender'];

$sql = $db->prepare("select sum(r.distance)
        from participant as p
        join result as r on r.participant_email = p.email
        where p.gender = :gender");

$sql->bindValue(':gender', $gender, PDO::PARAM_STR);

// initialize object
$query = new Query($db);

echo $query->buildJson("sum(r.distance)", "sexDistanceParticipant", $sql);

?>