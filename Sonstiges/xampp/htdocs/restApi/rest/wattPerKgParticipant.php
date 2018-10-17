<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
$email = $_GET['email'];
$challenge = $_GET['challenge'];


$sql = $db-> prepare( "select (2.8 / power(((500*30*60/r.distance)/500), 3))/(power(p.weight, (2/3)))
        from result as r
        join participant as p on r.participant_email = p.email
        where r.participant_email = :email
        and r.challenge_id = :challenge");

$sql->bindValue(':email', $email, PDO::PARAM_STR);
$sql->bindValue(':challenge', $challenge, PDO::PARAM_INT);



// initialize object
$query = new Query($db);

echo $query->buildJson("(2.8 / power(((500*30*60/r.distance)/500), 3))/(power(p.weight, (2/3)))", "wattPerKgParticipant", $sql);