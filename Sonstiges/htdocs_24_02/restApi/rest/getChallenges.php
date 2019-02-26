<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);
$year = $_GET['year'];

$challenges = json_decode($query->getAllChallenges(), true);

$data = Array();

foreach($challenges as &$c){
    switch($c['challengeId'] - $year){
        case 10000:
           $data['roundOne'] = $c['start_date'];
           break;

        case 20000:
            $data['roundTwo'] = $c['start_date'];
            break;

        case 30000:
            $data['roundThree'] = $c['start_date'];
            break;

        case 40000:
            $data['roundFour'] = $c['start_date'];
            break;

        case 50000:
            $data['roundFive'] = $c['start_date'];
            break;

        case 60000:
            $data['roundSix'] = $c['start_date'];
            break;

        default:
            break;
    }
}

echo json_encode($data);