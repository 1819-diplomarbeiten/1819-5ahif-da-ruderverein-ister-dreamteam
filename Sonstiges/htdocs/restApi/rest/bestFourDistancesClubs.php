<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Access-Control-Allow-Credentials: true');

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';
$zeroDistance['roundOne'] = 0;
$zeroDistance['roundTwo'] = 0;
$zeroDistance['roundThree'] = 0;
$zeroDistance['roundFour'] = 0;
$zeroDistance['roundFive'] = 0;
$zeroDistance['roundSix'] = 0;

$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$year = $_GET['year'];
$sequence = $_GET['sequence'];
$result = $_GET['result'];


$sqlSessionResults = $db->prepare("SELECT club.name AS clubLong, sum(distance) AS distance, club, challenge_id 
                                    from result inner join participant on result.participant_email = participant.email 
                                    inner join club on participant.club = club.contraction 
                                    group by participant.club, challenge_id");


// query products
$sqlSessionResults->execute();

while ($row = $sqlSessionResults->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}

$newData = array();
$i = 1;
while ($i < count($data) - 1) {
    if (count($newData) == 0) {
        $newData[] = $data[$i - 1];
    }
    if (!isset($distance)) {
        $distance = $zeroDistance;
    }
    do {
        switch ($data[$i - 1]['challenge_id'] - $year) {
            case 10000:
                $distance['roundOne'] = intval($data[$i - 1]['distance']);
                break;
            case 20000:
                $distance['roundTwo'] = intval($data[$i - 1]['distance']);
                break;
            case 30000:
                $distance['roundThree'] = intval($data[$i - 1]['distance']);
                break;
            case 40000:
                $distance['roundFour'] = intval($data[$i - 1]['distance']);
                break;
            case 50000:
                $distance['roundFive'] = intval($data[$i - 1]['distance']);
                break;
            case 60000:
                $distance['roundSix'] = intval($data[$i - 1]['distance']);
                break;

        }

        if ($i < count($data) - 1) {
            $i++;
        } else {
            $i++;
            break;
        }


    } while ($data[$i]['club'] == $data[$i - 1]['club']);
    switch ($data[$i - 1]['challenge_id'] - $year) {
        case 10000:
            $distance['roundOne'] = intval($data[$i - 1]['distance']);
            break;
        case 20000:
            $distance['roundTwo'] = intval($data[$i - 1]['distance']);
            break;
        case 30000:
            $distance['roundThree'] = intval($data[$i - 1]['distance']);
            break;
        case 40000:
            $distance['roundFour'] = intval($data[$i - 1]['distance']);
            break;
        case 50000:
            $distance['roundFive'] = intval($data[$i - 1]['distance']);
            break;
        case 60000:
            $distance['roundSix'] = intval($data[$i - 1]['distance']);
            break;

    }
    $newData[count($newData) - 1]['allSixDistances'] = $distance;
    $clubCount =  json_decode($query->getClubCount($data[$i-1]['club']), true);
    $total = array_sum($distance);
    $newData[count($newData) - 1]['clubParticipantCount'] = $clubCount[0]['clubCount'];
    $newData[count($newData) - 1]['total'] = $total;
    $distance = $zeroDistance;
    if ($i < count($data)) {
        $newData[] = $data[$i];
    }
    $i++;


}

if($sequence == 'Alphabetic'){
    usort($newData,"sort_by_name");
    $test = $newData;

}
if($sequence == 'TopDown'){
    usort($newData,"sort_by_distance");
}

function sort_by_name($a,$b)
{
    return strcmp($a['clubLong'], $b['clubLong']);
}

function sort_by_distance($a,$b){
    return $a['total'] < $b['total'];
}



if (isset($newData)) {
    /*    convert data to json */
    $json = json_encode($newData);
}
echo $json;


//$set = array()
//
//foreach ($data as $d){
//    if(!isset($newData)){
//
//        $newData[] = array();
//        $newData-> $d;
//    }
//    if(!array_search($d['club'],$newData)){
//        $newData += $d;
//    }
//
//}
//
///*    checking if data has no rows */
//if (isset($newData)) {
//    /*    convert data to json */
//    $json = json_encode($newData);

//} else {
//    /*    set nothing to return */
//    $json = null;
//}
//
//echo $json;

//$query = new Query($db);
//echo $query->buildJson("name", "clubName", $sqlSessionResults);


//if (!(isset($_GET['email']))) {
//    $sql = $db->prepare("SELECT participant_email, sum(distance) from (select distance from result group by participant_email order by distance desc limit 4)");
//
//
//// initialize object
//    $query = new Query($db);
//    echo $query->buildJson("sum(distance)", "bestFourDistances", $sql);
//} else {
//    $sql = $db->prepare("select sum(distances.distance)
//        from (select distance
//              from result
//              where participant_email = :email
//              order by distance desc limit 4) distances");
//
//    $email = $_GET['email'];
//
//    $sql->bindValue(':email', $email, PDO::PARAM_STR);
//// initialize object
//    $query = new Query($db);
//
//    echo $query->buildJson("sum(distances.distance)", "bestFourDistances", $sql);
//}