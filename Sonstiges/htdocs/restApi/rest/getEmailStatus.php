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
$email = $_GET['email'];

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){

}
else{
    if(isset($email)){
        $arr = $query->getEmailStatus($email);
        if($query->getCurrentChallengeId() == null)
            $arr['challengeStatus'] = "false";
        else
            $arr['challengeStatus'] = "true";
    }

    echo json_encode($arr);
}

