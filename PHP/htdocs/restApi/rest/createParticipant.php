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
include_once '../model/participant.php';
include_once '../model/club.php';
include_once '../queries/Query.php';

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    echo "test";
} else {
    $participant = new Participant($db);

    $data = file_get_contents('php://input');
    $data = json_decode($data, true);

    if ($data['firstName'] == null) {

        $club = new club($db);
        if ($data['msgType'] == "clubNew") {

            $club->email = $data['email'];
            $club->name = $data['clubLong'];
            $club->contraction = $data['clubShort'];
            $club->create();
        }
        if($data['msgType'] == "clubExisting"){
            $club->contraction = $query->getClubContraction($data['club']);
            $club->name = $data['club'];
            $club->email = $data['email'];
            $club->update();
        }


    } else {
        $participant->email = $data['email'];
        $participant->first_name = $data['firstName'];
        $participant->last_name = $data['lastName'];
        $participant->dob = $data['birthday'];
        $participant->club = $query->getClubContraction($data['club']);
        $participant->gender = $data['gender'];
        $participant->weight = $data['weight'];

        if ($query->getParticipantData($participant->email) == null) {
            if ($participant->create()) {
                http_response_code (201);
            }
            else {
                http_response_code(500);
            }
        } else {
            $participant->update();
        }
    }

}