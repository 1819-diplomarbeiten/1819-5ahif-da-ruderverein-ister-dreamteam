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
$club = $_GET['club'];

$sql = $db->prepare("select count(*)
        from participant p 
        where p.club = :club");

$sql->bindValue(':club', $club, PDO::PARAM_STR);

// initialize object
$query = new Query($db);

echo $query->buildJson("count(*)", "participantsPerClub", $sql);