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

$year = $_GET['year'];
//$sequence = $_GET['sequence'];
//$result = $_GET['result'];

$sqlSessionResults = $db->prepare("SELECT club.name, sum(distance) AS distance, club, challenge_id 
                                    from result inner join participant on result.participant_email = participant.email 
                                    inner join club on participant.club = club.contraction 
                                    group by participant.club, challenge_id");


// query products
$sqlSessionResults->execute();

while ($row = $sqlSessionResults->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}
$newData = array();
for ($i = 0; $i < count($data); $i++) {
    if (count($newData) == 0) {
        $newData[] = $data[$i];
    }
    if (!isset($distance)) {
        $distance = $zeroDistance;
    }
    for ($j = 0; $j < count($newData); $j++) {

        $helper1 = $newData[$j]['club'];
        $helper2 = $data[$i]['club'];
        if ($helper1 == $helper2) {

            switch ($data[$i]['challenge_id'] - $year) {
                case 10000:
                    $distance['roundOne'] = $data[$i]['distance'];
                    break;
                case 20000:
                    $distance['roundTwo'] = $data[$i]['distance'];
                    break;
                case 30000:
                    $distance['roundThree'] = $data[$i]['distance'];
                    break;
                case 40000:
                    $distance['roundFour'] = $data[$i]['distance'];
                    break;
                case 50000:
                    $distance['roundFive'] = $data[$i]['distance'];
                    break;
                case 60000:
                    $distance['roundSix'] = $data[$i]['distance'];
                    break;
            }
            $newData[count($newData)-1]['allSixDistances'] = $distance;

        } else {
            $distance = $zeroDistance;
            switch ($data[$i]['challenge_id'] - $year) {
                case 10000:
                    $distance['roundOne'] = $data[$i]['distance'];
                    break;
                case 20000:
                    $distance['roundTwo'] = $data[$i]['distance'];
                    break;
                case 30000:
                    $distance['roundThree'] = $data[$i]['distance'];
                    break;
                case 40000:
                    $distance['roundFour'] = $data[$i]['distance'];
                    break;
                case 50000:
                    $distance['roundFive'] = $data[$i]['distance'];
                    break;
                case 60000:
                    $distance['roundSix'] = $data[$i]['distance'];
                    break;
            }
            $newData[] = $data[$i];
            $newData[$j+1]['allSixDistances'] = $distance;

        }


    }

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