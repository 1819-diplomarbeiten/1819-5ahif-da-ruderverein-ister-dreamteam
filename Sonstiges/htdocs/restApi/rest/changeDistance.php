<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// include database and object files
include_once '../config/database.php';
include_once '../model/Result.php';
include_once '../queries/Query.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$result = new Result($db);

$data = file_get_contents('php://input');
$data = html_entity_decode($data);
$data = json_decode($data, true);

$resultId = $query->getResultId((int) $data['session']*10000+ (int)$data['year'], $data['email']);

$result->result_id = $resultId;
$result->distance = $data['newValue'];

$result->update();

return "halo";