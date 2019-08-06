<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// get database connection
include_once '../config/database.php';

// instantiate product object
include_once '../model/result.php';

include_once'../queries/Query.php';
include_once '../../vendor/autoload.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);


$result = new Result($db);

// get posted data
$data = file_get_contents('php://input');
$data = json_decode($data, true);

$rights=$query->getUserRights($data['idToken']);
if($query->getUserRights($data['idToken']) != 'participant' && $query->getUserRights($data['idToken']) != 'schramm'){
    http_response_code(401);
}
else {



// set product property values
    $result->challenge_id = $query->getCurrentChallengeId();
    $result->distance = $data['distance'];
    $result->participant_email = $data['email'];
    $result->image = $data['evidencePic'];
    if($query->resultAlreadyExists($query->getCurrentChallengeId(), $data['email']) != null) {
        $result->result_id = $query->resultAlreadyExists($query->getCurrentChallengeId(), $result->participant_email);
        $result->update();
    }else{
        if ($result->create()) {
            echo '{';
            echo '"message": "Result was created."';
            echo '}';
        } // if unable to create the product, tell the user
        else {
            echo '{';
            echo '"message": "Unable to create Result."';
            echo '}';
        }
    }

// create the product

}
?>