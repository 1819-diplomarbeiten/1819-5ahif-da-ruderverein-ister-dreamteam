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

if (!(isset($_GET['challenge']))) {
    $sql = $db->prepare("select challenge_id, sum(r.distance) 
        from result r 
        group by r.challenge_id");


// initialize object
    $query = new Query($db);
    echo $query->buildJson("sum(r.distance)", "totalResultsChallenge", $sql);
} else {
    $challenge = $_GET['challenge'];


    $sql = $db->prepare("select sum(r.distance) 
        from result r 
        where r.challenge_id = :challenge");

    $sql->bindValue(':challenge', $challenge, PDO::PARAM_INT);

// initialize object
    $query = new Query($db);

    echo $query->buildJson("sum(r.distance)", "totalResultsChallenge", $sql);
}

?>