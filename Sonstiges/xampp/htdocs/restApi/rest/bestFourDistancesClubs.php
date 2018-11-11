<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/Database.php';
include_once '../queries/Query.php';


$database = new Database();
$db = $database->getConnection();

//$year = $_GET['year'];
//$sequence = $_GET['sequence'];
//$result = $_GET['result'];

$sqlSessionResults = $db->prepare("SELECT club.name, sum(distance), club, challenge_id 
                                    from result inner join participant on result.participant_email = participant.email 
                                    inner join club on participant.club = club.contraction 
                                    group by participant.club, challenge_id");


// query products
$sqlSessionResults->execute();

while ($row = $sqlSessionResults->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
}
$newData = array();
for($i = 0; $i < count($data); $i++) {
    $isFound = false;
    if(count($newData) == 0){
        $newData[] = $data[$i];
        $isFound = true;
    }
    for($j = 0; $j < count($newData); $j++){
        $helper1 = $newData[$j]['club'];
        $helper2 = $data[$i]['club'];
        if($helper1 == $helper2){
            $isFound = true;
        }

    }
    if(!$isFound){
        $newData[] = $data[$i];
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