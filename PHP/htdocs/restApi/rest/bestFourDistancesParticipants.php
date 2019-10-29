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
include_once '../../vendor/autoload.php';


$database = new Database();
$db = $database->getConnection();
$query = new Query($db);

$year = $_GET['year'];
$sequence = $_GET['sequence'];
$result = $_GET['result'];
$idToken = $_GET['idtoken'];
if($query->getUserRights($idToken) != 'participant' && $query->getUserRights($idToken) != 'schramm'){
    http_response_code(401);
}else {
    try {
        if ($result == "0" && $sequence != 'Categories') {
            $data = generateBasicJson();
        }

        if ($result > 0 && $sequence != 'Categories') {
            $data = generateAdvancedJson();
        }

        if ($result == 0 && $sequence == 'Categories') {
            $data = generateBasicJson();
            $data = generateClassArrays($data);

        }

        if ($result > 0 && $sequence == 'Categories') {
            $data = generateAdvancedJson();
            $data = generateClassArrays($data);
        }
    } catch (Throwable $t) {
        http_response_code(500);
    }







    if ($sequence == 'Alphabetic') {
        usort($data, "sort_by_name");

    }



    if ($sequence == "TopDown") {
        usort($data, "sort_by_result");
    }



    if (isset($data)) {
        /*    convert data to json */
        $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    }


    echo $json;
}
function generateBasicJson()
{
    global $query;
    global $year;
    global $sequence;
    global $result;
    $emails = $query->getAllEmails();

    foreach ($emails as &$e) {
        $data[] = (json_decode($query->getParticipantInfo($e['email']), true))[0];
        $distance['roundOne'] = intval((json_decode($query->getParticipantDistance($e['email'], 10000 + $year), true))[0]['distance']);
        $distance['roundTwo'] = intval((json_decode($query->getParticipantDistance($e['email'], 20000 + $year), true))[0]['distance']);
        $distance['roundThree'] = intval((json_decode($query->getParticipantDistance($e['email'], 30000 + $year), true))[0]['distance']);
        $distance['roundFour'] = intval((json_decode($query->getParticipantDistance($e['email'], 40000 + $year), true))[0]['distance']);
        $distance['roundFive'] = intval((json_decode($query->getParticipantDistance($e['email'], 50000 + $year), true))[0]['distance']);
        $distance['roundSix'] = intval((json_decode($query->getParticipantDistance($e['email'], 60000 + $year), true))[0]['distance']);
        $data[count($data) - 1]['allSixDistances'] = $distance;
        $bestFour = (json_decode($query->getBestFourDistances($e['email'], $year), true))[0]['bestFourDistances'];
        $data[count($data) - 1]['bestFourDistances'] = $bestFour;
        $data[count($data) - 1]['pClass'] = json_decode($query->getPClass($e['email'], $year), true)[0]['pClass'];
        if ($distance['roundOne'] == 0 && $distance['roundTwo'] == 0 && $distance['roundThree'] == 0 && $distance['roundFour'] == 0 && $distance['roundFive'] == 0 && $distance['roundSix'] == 0) {
            array_pop($data);
        }

    }
    return $data;
}

function generateAdvancedJson()
{
    global $query;
    global $year;
    global $sequence;
    global $result;

    $emails = $query->getAllEmails();

    foreach ($emails as &$e) {
        $round = intval((json_decode($query->getParticipantDistance($e['email'], $result * 10000 + $year), true))[0]['distance']);
        if ($round != 0) {
            $data[] = (json_decode($query->getParticipantInfo($e['email']), true))[0];
            $data[count($data) - 1]['round'] = $round;
            $data[count($data) - 1]['wattKg'] = round(doubleval((json_decode($query->getWattPerKgParticipant($e['email'], $result * 10000 + $year), true))[0]['wattPerKgParticipant']), 2);
            $data[count($data) - 1]['watt'] = round(doubleval((json_decode($query->getWattParticipant($e['email'], $result * 10000 + $year), true))[0]['wattParticipant']), 2);
            $data[count($data) - 1]['fiveHundred'] = intval(json_decode($query->getFiveHundredTime($e['email'], $result * 10000 + $year), true)[0]['fiveHundred']);
            $data[count($data) - 1]['pClass'] = json_decode($query->getPClass($e['email'], $year), true)[0]['pClass'];
        }
    }
    if (isset($data)) {
        return $data;
    } else {
        http_response_code(500);
        return null;
    }


}

function generateClassArrays($data)
{
    global $query;
    global $year;
    global $sequence;
    global $result;

    foreach ($data as &$d) {
        switch ($d['pClass']) {
            case 'SCH' :
                $schArray[] = $d;
                break;
            case 'JB' :
                $jbArray[] = $d;
                break;
            case 'JA' :
                $jaArray[] = $d;
                break;
            case 'U23' :
                $u23Array[] = $d;
                break;
            case 'SEN' :
                $senArray[] = $d;
                break;
            case 'A' :
                $aArray[] = $d;
                break;
            case 'B' :
                $bArray[] = $d;
                break;
            case 'C' :
                $cArray[] = $d;
                break;
            case 'D' :
                $dArray[] = $d;
                break;
            case 'E' :
                $eArray[] = $d;
                break;
        }
    }
    $data = $query->getAllPClass();
    if (isset($schArray))
        $data[0]['results'] = $schArray;
    if (isset($jbArray))
        $data[1]['results'] = $jbArray;
    if (isset($jaArray))
        $data[2]['results'] = $jaArray;
    if (isset($u23Array))
        $data[3]['results'] = $u23Array;
    if (isset($senArray))
        $data[4]['results'] = $senArray;
    if (isset($aArray))
        $data[5]['results'] = $aArray;
    if (isset($bArray))
        $data[6]['results'] = $bArray;
    if (isset($cArray))
        $data[7]['results'] = $cArray;
    if (isset($dArray))
        $data[8]['results'] = $dArray;
    if (isset($eArray))
        $data[9]['results'] = $eArray;

    foreach ($data as &$d) {
        usort($d['results'], 'sort_by_result');
    }
    return $data;
}

function sort_by_name($a, $b)
{
    return strcmp($a["lastName"], $b["lastName"]);
}

function sort_by_result($a, $b)
{
    global $result;
    if ($result == 0) {
        return $a["bestFourDistances"] < $b["bestFourDistances"];
    } else {
        return $a['round'] < $b['round'];
    }
}