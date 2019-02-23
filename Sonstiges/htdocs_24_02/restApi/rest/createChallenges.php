<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Expose-Headers: *");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../model/Challenge.php';

$database = new Database();
$db = $database->getConnection();

$challenge1 = new Challenge($db);
$challenge2 = new Challenge($db);
$challenge3 = new Challenge($db);
$challenge4 = new Challenge($db);
$challenge5 = new Challenge($db);
$challenge6 = new Challenge($db);

$test2 = $_POST['roundOne'];
// get posted data
$data = file_get_contents('php://input');
$data = json_decode($data, true);


$challenge1->start_date = $data['roundOne'];
$challenge2->start_date = $data['roundTwo'];
$challenge3->start_date = $data['roundThree'];
$challenge4->start_date = $data['roundFour'];
$challenge5->start_date = $data['roundFive'];
$challenge6->start_date = $data['roundSix'];
$challenge1->challenge_id = 10000 + $data['year'];
$challenge2->challenge_id = 20000 + $data['year'];
$challenge3->challenge_id = 30000 + $data['year'];
$challenge4->challenge_id = 40000 + $data['year'];
$challenge5->challenge_id = 50000 + $data['year'];
$challenge6->challenge_id = 60000 + $data['year'];


$challenge1->create();
$challenge2->create();
$challenge3->create();
$challenge4->create();
$challenge5->create();
$challenge6->create();

echo $data;