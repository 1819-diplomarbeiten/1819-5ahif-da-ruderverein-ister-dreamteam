<?php
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


$challenges = json_decode($query->getAllChallenges(), true);


$years = [];
$data = [];
foreach ($challenges as &$c) {
    for ($i = 2000; $i < 2100; $i++) {
        if (($c['challengeId'] - $i) % 10000 == 0) {
            $isThere = false;
            foreach ($years as &$y) {
                if ($y == $i)
                    $isThere = true;
            }
            if (!$isThere) {
                $years[] = $i;
                $year['year'] = (string)$i;
                foreach ($challenges as &$ch) {
                    if (($ch['challengeId'] - $i) % 10000 == 0) {
                        switch ($ch['challengeId'] - $i) {
                            case 10000:
                                $year['roundOne'] = $ch['start_date'];
                                break;

                            case 20000:
                                $year['roundTwo'] = $ch['start_date'];
                                break;

                            case 30000:
                                $year['roundThree'] = $ch['start_date'];
                                break;

                            case 40000:
                                $year['roundFour'] = $ch['start_date'];
                                break;

                            case 50000:
                                $year['roundFive'] = $ch['start_date'];
                                break;

                            case 60000:
                                $year['roundSix'] = $ch['start_date'];
                                break;
                        }
                    }
                }
                $data[] = $year;
                unset($year);
            }
        }
    }
}


    if (isset($data)) {
        /*    convert data to json */
        $json = json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    echo $json;

