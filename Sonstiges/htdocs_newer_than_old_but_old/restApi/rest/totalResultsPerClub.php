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

if (!(isset($_GET['club']))) {
    $sql = $db->prepare("select club, sum(r.distance)
        from participant as p 
        join result as r on r.participant_email = p.email
        group by p.club");


// initialize object
    $query = new Query($db);
    echo $query->buildJson("sum(r.distance)", "totalResultsPerClub", $sql);
} else {
    $club = $_GET['club'];

    $sql = $db->prepare("select sum(r.distance)
        from participant as p 
        join result as r on r.participant_email = p.email
        where p.club = :club");

    $sql->bindValue(':club', $club, PDO::PARAM_STR);


// initialize object
    $query = new Query($db);

    echo $query->buildJson("sum(r.distance)", "totalResultsPerClub", $sql);
}

?>