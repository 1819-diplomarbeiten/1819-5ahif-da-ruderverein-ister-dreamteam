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
$query = new Query($db);



if(!(isset($_GET['club']))){
    $sql = $db->prepare("select count(*), club 
                          from participant p, club c 
                          where p.club = c.contraction 
                          GROUP BY club");



// initialize object
    echo $query->buildJson("count(*)", "clubCount", $sql);
}


else{
    $club = $_GET['club'];
    echo $query->getClubCount($club);

}



