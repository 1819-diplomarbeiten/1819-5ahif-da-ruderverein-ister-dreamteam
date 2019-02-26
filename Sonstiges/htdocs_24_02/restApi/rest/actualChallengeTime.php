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

$dateStart = $query->nextStartDate();
$dateEnd = $query->nextEndDate();

if($dateEnd < $dateStart){
    $data['time'] = $dateEnd;
    $data['state'] = 'ENDS';
}

else{
    $data['time'] = $dateStart;
    $data['state'] = 'STARTS';
}

if (isset($data)) {
    $json = json_encode($data, JSON_UNESCAPED_UNICODE);
}
echo $json;
