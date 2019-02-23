<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 16.09.2018
 * Time: 23:13
 */

class Query
{
    private $conn;


    function buildJson($oldName, $newName, $sql)
    {


// query products
        $sql->execute();

        while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
            $row[$newName] = $row[$oldName];
            unset($row[$oldName]);
            $data[] = $row;
        }

        /*    checking if data has no rows */
        if (isset($data)) {
            /*    convert data to json */
            $json = json_encode($data);
        } else {
            /*    set nothing to return */
            $json = null;
        }

        /* return the json result */
        return $json;
    }

    function getClubCount($club)
    {
        global $db;
        global $query;
        $sql = $db->prepare("select count(*)
                     from participant p
                      where p.club = :club");


        $sql->bindValue(':club', $club, PDO::PARAM_STR);

// initialize object
        return $query->buildJson("count(*)", "clubCount", $sql);
    }

    function getBestFourDistances($email)
    {
        global $db;
        global $query;

        $sql = $db->prepare("Select sum(distances.distance) 
        from (select participant_email, distance 
              from result 
              where participant_email = :email
              order by distance desc limit 4) distances");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);


        return $query->buildJson("sum(distances.distance)", "bestFourDistances", $sql);

    }

    function getParticipantInfo($email)
    {
        global $db;
        global $query;

        $sql = $db->prepare("Select club, first_name as firstName, last_name, gender, date_of_birth from participant where email = :email");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);

        return $query->buildJson("last_name", "lastName", $sql);
    }

    function getAllChallenges()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT * FROM CHALLENGE");
        return $query->buildJson("challenge_id", "challengeId", $sql);
    }

    function getParticipantDistance($email, $challengeId)
    {
        global $db;
        global $query;

        $sql = $db->prepare("Select distance as d from result where participant_email = :email and challenge_id = :challengeId");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->bindValue(':challengeId', $challengeId, PDO::PARAM_INT);

        return $query->buildJson("d", "distance", $sql);
    }

    function getAllEmails()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT email As e from participant");


// initialize object

        return json_decode($query->buildJson("e", "email", $sql), true);
    }

    function getWattPerKgParticipant($email, $challenge)
    {
        global $db;
        global $query;

        $sql = $db->prepare("select (2.8 / power(((500*30*60/r.distance)/500), 3))/(power(p.weight, (2/3)))
        from result as r
        join participant as p on r.participant_email = p.email
        where r.participant_email = :email
        and r.challenge_id = :challenge");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->bindValue(':challenge', $challenge, PDO::PARAM_INT);


        return $query->buildJson("(2.8 / power(((500*30*60/r.distance)/500), 3))/(power(p.weight, (2/3)))", "wattPerKgParticipant", $sql);
    }

    function getWattParticipant($email, $challenge)
    {
        global $db;
        global $query;
        $sql = $db->prepare("select 2.8 / power(((500*30*60/r.distance)/500), 3)
        from result as r
        where r.participant_email = :email
        and r.challenge_id = :challenge");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->bindValue(':challenge', $challenge, PDO::PARAM_INT);


        return $query->buildJson("2.8 / power(((500*30*60/r.distance)/500), 3)", "wattParticipant", $sql);
    }

    function getFiveHundredTime($email, $challenge)
    {
        global $db;
        global $query;
        $sql = $db->prepare("select (500*30/r.distance)*60
                              from result r
                              where r.participant_email = :email
                              and r.challenge_id = :challenge");
        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->bindValue(':challenge', $challenge, PDO::PARAM_INT);
        return $query->buildJson("(500*30/r.distance)*60", "fiveHundred", $sql);
    }

    function getPClass($email, $year)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT category
                              from age_group 
                              where :year - 
                               (SELECT year(date_of_birth) from participant where email = :email) >= min_age 
                               AND :year - 
                               (SELECT year(date_of_birth) from participant where email = :email) <= max_age");
        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->bindValue(':year', $year, PDO::PARAM_INT);
        return $query->buildJson("category", "pClass", $sql);
    }

    function getAllPClass()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT category
                             from age_group");
        return json_decode($query->buildJson("category", "pClass", $sql), true);
    }

    function getCurrentChallengeId()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT challenge_id from challenge where start_date <= curdate() and end_date >= curdate()");
        $test = json_decode($query->buildJson("challenge_id", "id", $sql), true);
        return $test[0]['id'];

    }

    function nextStartDate()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT (UNIX_TIMESTAMP(MIN(start_date))*1000) FROM challenge WHERE start_date > curdate()");
        $test = json_decode($query->buildJson("(UNIX_TIMESTAMP(MIN(start_date))*1000)", "milliseconds", $sql), true);
        return $test[0]['milliseconds'];

    }

    function nextEndDate()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT (UNIX_TIMESTAMP(MIN(end_date))*1000) FROM challenge WHERE end_date > curdate()");
        $test = json_decode($query->buildJson("(UNIX_TIMESTAMP(MIN(end_date))*1000)", "milliseconds", $sql), true);
        return $test[0]['milliseconds'];
    }

    function emailExists($email)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT * from participant where participant.email = :email");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $result = json_decode($query->buildJson("email", "e", $sql), true);
        if ($result == null)
            return false;
        return true;
    }

    function getTranslation($language)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT term from language");
        $keys = json_decode($query->buildJson("term", "key", $sql), true);
        $sql = $db->prepare("SELECT " . $language . " from language");
        $values = json_decode($query->buildJson($language, "values", $sql), true);
        $newArray = array();

        for ($i = 0; $i < count($keys); $i++) {
            $newArray[$keys[$i]['key']] = $values[$i]['values'];
        }


        return $newArray;
    }

    function getAllClubs()
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT name from Club");

        $sql->execute();

        while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row['name'];
        }

        return $data;

    }

    function getEmailStatus($email)
    {
        global $db;
        global $query;

        $arr = Array();

        $sql = $db->prepare("SELECT * from Participant where email = :email");
        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $result = json_decode($query->buildJson("email", "e", $sql), true);
        if ($result == null) {
            $sql = $db->prepare("SELECT * from Club where email = :email");
            $sql->bindValue(':email', $email, PDO::PARAM_STR);
            $result = json_decode($query->buildJson("email", "e", $sql), true);
            if ($result != null) {
                $arr['emailStatus'] = "club";
            }
        } else {
            $arr['emailStatus'] = "participant";
            if ($result[0]['e'] == "davipoin@gmail.com") {
                $arr['emailStatus'] = "schramm";
            }
        }
        return $arr;

    }

    function getChallengeIdFromStartDate($date)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT challenge_id from challenge where start_date = :date");
        $sql->bindValue(':date', $date, PDO::PARAM_STR);
        $result = json_decode($query->buildJson("challenge_id", "id", $sql), true);
        return $result[0]['id'];

    }

    function getFemaleDistanceSum($year)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT SUM(distance) 
                              FROM result 
                              join participant 
                              on result.participant_email = participant.email 
                              where participant.gender = 'M' AND (challenge_id - :year)% 10000 = 0");
        $sql->bindValue(':year', $year, PDO::PARAM_INT);
        $result = json_decode($query->buildJson("SUM(distance)", "id", $sql), true);

    }

    function getGenderCount($year, $gender)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT count(DISTINCT(email)) FROM result join participant on result.participant_email = participant.email where participant.gender = :gender AND (challenge_id - :year)% 10000 = 0");
        $sql->bindValue(':year', $year, PDO::PARAM_INT);
        $sql->bindValue(':gender', $gender, PDO::PARAM_STR);

        $result = json_decode($query->buildJson("count(DISTINCT(email))", "count", $sql), true);
        return (int)$result[0]['count'];


    }

    function getGenderRounds($year, $gender)
    {
        global $db;
        global $query;

        $arr = Array();
        $sql = $db->prepare("SELECT SUM(distance) from result join participant on result.participant_email = participant.email WHERE challenge_id = :challengeId AND participant.gender = :gender");
        $sql->bindValue(':challengeId', 10000 + $year, PDO::PARAM_INT);
        $sql->bindValue(':gender', $gender, PDO::PARAM_STR);
        $arr['roundOne'] = (int)json_decode($query->buildJson("SUM(distance)", "sum", $sql), true)[0]['sum'];
        $sql->bindValue(':challengeId', 20000 + $year, PDO::PARAM_INT);
        $arr['roundTwo'] = (int)json_decode($query->buildJson("SUM(distance)", "sum", $sql), true)[0]['sum'];
        $sql->bindValue(':challengeId', 30000 + $year, PDO::PARAM_INT);
        $arr['roundThree'] = (int)json_decode($query->buildJson("SUM(distance)", "sum", $sql), true)[0]['sum'];
        $sql->bindValue(':challengeId', 40000 + $year, PDO::PARAM_INT);
        $arr['roundFour'] = (int)json_decode($query->buildJson("SUM(distance)", "sum", $sql), true)[0]['sum'];
        $sql->bindValue(':challengeId', 50000 + $year, PDO::PARAM_INT);
        $arr['roundFive'] = (int)json_decode($query->buildJson("SUM(distance)", "sum", $sql), true)[0]['sum'];
        $sql->bindValue(':challengeId', 60000 + $year, PDO::PARAM_INT);
        $arr['roundSix'] = (int)json_decode($query->buildJson("SUM(distance)", "sum", $sql), true)[0]['sum'];
        return $arr;
    }

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function getGenderCountRounds($year, $gender)
    {
        global $db;
        global $query;

        $sql = $db->prepare("SELECT count(*) FROM result join participant on result.participant_email = participant.email where participant.gender = :gender AND challenge_id = :challengeId");
        $sql->bindValue(':challengeId', 10000 + $year, PDO::PARAM_INT);
        $sql->bindValue(':gender', $gender, PDO::PARAM_STR);
        $arr['roundOne'] = (int)json_decode($query->buildJson("count(*)", "count", $sql), true)[0]['count'];
        $sql->bindValue(':challengeId', 20000 + $year, PDO::PARAM_INT);
        $arr['roundTwo'] = (int)json_decode($query->buildJson("count(*)", "count", $sql), true)[0]['count'];
        $sql->bindValue(':challengeId', 30000 + $year, PDO::PARAM_INT);
        $arr['roundThree'] = (int)json_decode($query->buildJson("count(*)", "count", $sql), true)[0]['count'];
        $sql->bindValue(':challengeId', 40000 + $year, PDO::PARAM_INT);
        $arr['roundFour'] = (int)json_decode($query->buildJson("count(*)", "count", $sql), true)[0]['count'];
        $sql->bindValue(':challengeId', 50000 + $year, PDO::PARAM_INT);
        $arr['roundFive'] = (int)json_decode($query->buildJson("count(*)", "count", $sql), true)[0]['count'];
        $sql->bindValue(':challengeId', 60000 + $year, PDO::PARAM_INT);
        $arr['roundSix'] = (int)json_decode($query->buildJson("count(*)", "count", $sql), true)[0]['count'];
        return $arr;

    }

    function getTotalDistancesRounds($year)
    {
        $arr1 = $this->getGenderRounds($year, 'M');
        $arr2 = $this->getGenderRounds($year, 'F');

        $arr3 = array();
        foreach ($arr1 as $key => $val1) {
            $val2 = $arr2[$key];
            $arr3[$key] = $val1 + $val2;
        }
        return $arr3;
    }

    function getTotalCountsRound($year)
    {
        $arr1 = $this->getGenderCountRounds($year, 'M');
        $arr2 = $this->getGenderCountRounds($year, 'F');

        $arr3 = array();
        foreach ($arr1 as $key => $val1) {
            $val2 = $arr2[$key];
            $arr3[$key] = $val1 + $val2;
        }
        return $arr3;
    }

    function getReachedDistances($year, $gender)
    {
        global $db;
        global $query;

        $arr = Array();
        $arrCount = 0;
        for ($i = 3500; $i <= 8000; $i = $i + 500) {
            for ($j = 1; $j <= 6; $j++) {
                $sql = $db->prepare("SELECT count(*) from result join participant on result.participant_email = participant.email where distance >= :distance AND participant.gender = :gender and result.challenge_id = :challengeId");
                $sql->bindValue(':challengeId', $j * 10000 + $year, PDO::PARAM_INT);
                $sql->bindValue(':gender', $gender, PDO::PARAM_STR);
                $sql->bindValue(':distance', $i, PDO::PARAM_INT);
                $arr[$arrCount]['reachenDistance'] = $i;
                switch ($j) {
                    case 1:
                        $arr[$arrCount]['distances']['roundOne'] = (int)json_decode($query->buildJson("count(*)", "reachedDistance", $sql), true)[0]['reachedDistance'];
                        break;
                    case 2:
                        $arr[$arrCount]['distances']['roundTwo'] = (int)json_decode($query->buildJson("count(*)", "reachedDistance", $sql), true)[0]['reachedDistance'];
                        break;

                    case 3:
                        $arr[$arrCount]['distances']['roundThree'] = (int)json_decode($query->buildJson("count(*)", "reachedDistance", $sql), true)[0]['reachedDistance'];
                        break;

                    case 4:
                        $arr[$arrCount]['distances']['roundFour'] = (int)json_decode($query->buildJson("count(*)", "reachedDistance", $sql), true)[0]['reachedDistance'];
                        break;

                    case 5:
                        $arr[$arrCount]['distances']['roundFive'] = (int)json_decode($query->buildJson("count(*)", "reachedDistance", $sql), true)[0]['reachedDistance'];
                        break;

                    case 6:
                        $arr[$arrCount]['distances']['roundSix'] = (int)json_decode($query->buildJson("count(*)", "reachedDistance", $sql), true)[0]['reachedDistance'];
                        break;
                }
                $test = json_decode($query->buildJson("count(*)", "reachenDistance", $sql), true);
            }
            $arrCount++;

        }
        return $arr;
    }

    function getClassCounts($year)
    {
        global $db;
        global $query;

        $arr = Array();

        $sql = $db->prepare("SELECT category from age_group");
        $categories = json_decode($query->buildJson("category", "cat", $sql), true);

        $arrCount = 0;
        foreach ($categories as &$c) {
            $arr[$arrCount]['category'] = $c['cat'];
            $arrCount++;
        }

        $sql = $db->prepare("SELECT year(CURDATE())- min_age, year(CURDATE())-max_age as min from age_group");
        $ages = json_decode($query->buildJson("year(CURDATE())- min_age", "max", $sql), true);
        $arrCount = 0;

        foreach ($ages as &$a) {
            $arr[$arrCount]['years'] = $a['min'] . " - " . $a['max'];
            $arrCount++;
        }

        foreach ($arr as &$a) {
            $a['maleCount'] = 0;
            $a['femaleCount'] = 0;
            $a['totalCount'] = 0;
        }

        $sql = $db->prepare("SELECT :year - year(participant.date_of_birth) from result join participant on result.participant_email = participant.email where challenge_id%10000 = :year AND participant.gender = 'M' group by participant_email");
        $sql->bindValue(':year', $year, PDO::PARAM_INT);
        $maleAges = json_decode($query->buildJson($year . " - year(participant.date_of_birth)", "age", $sql), true);
        $sql = $db->prepare("SELECT :year - year(participant.date_of_birth) from result join participant on result.participant_email = participant.email where challenge_id%10000 = :year AND participant.gender = 'F' group by participant_email");
        $sql->bindValue(':year', $year, PDO::PARAM_INT);
        $femaleAges = json_decode($query->buildJson($year . " - year(participant.date_of_birth)", "age", $sql), true);
        foreach ($maleAges as &$maleAge) {
            $maleAge = (int)$maleAge['age'];
            switch (true) {
                case $maleAge <= 14 :
                    $arr[0]['maleCount']++;
                    break;

                case $maleAge > 14 && $maleAge <= 16 :
                    $arr[1]['maleCount']++;
                    break;


                case $maleAge > 16 && $maleAge <= 18 :
                    $arr[2]['maleCount']++;
                    break;

                case $maleAge > 18 && $maleAge <= 22 :
                    $arr[3]['maleCount']++;
                    break;

                case $maleAge > 22 && $maleAge <= 29 :
                    $arr[4]['maleCount']++;
                    break;

                case $maleAge > 29 && $maleAge <= 39 :
                    $arr[5]['maleCount']++;
                    break;

                case $maleAge > 39 && $maleAge <= 49 :
                    $arr[6]['maleCount']++;
                    break;

                case $maleAge > 49 && $maleAge <= 59 :
                    $arr[7]['maleCount']++;
                    break;

                case $maleAge > 59 && $maleAge <= 69 :
                    $arr[8]['maleCount']++;
                    break;

                case $maleAge > 69 && $maleAge <= 79 :
                    $arr[9]['maleCount']++;
                    break;

            }
        }

        foreach ($femaleAges as &$femaleAge) {
            $femaleAge = (int)$femaleAge['age'];
            switch (true) {
                case $femaleAge <= 14 :
                    $arr[0]['femaleCount']++;
                    break;

                case $femaleAge > 14 && $femaleAge <= 16 :
                    $arr[1]['femaleCount']++;
                    break;


                case $femaleAge > 16 && $femaleAge <= 18 :
                    $arr[2]['femaleCount']++;
                    break;

                case $femaleAge > 18 && $femaleAge <= 22 :
                    $arr[3]['femaleCount']++;
                    break;

                case $femaleAge > 22 && $femaleAge <= 29 :
                    $arr[4]['femaleCount']++;
                    break;

                case $femaleAge > 29 && $femaleAge <= 39 :
                    $arr[5]['femaleCount']++;
                    break;

                case $femaleAge > 39 && $femaleAge <= 49 :
                    $arr[6]['femaleCount']++;
                    break;

                case $femaleAge > 49 && $femaleAge <= 59 :
                    $arr[7]['femaleCount']++;
                    break;

                case $femaleAge > 59 && $femaleAge <= 69 :
                    $arr[8]['femaleCount']++;
                    break;

                case $femaleAge > 69 && $femaleAge <= 79 :
                    $arr[9]['femaleCount']++;
                    break;

            }
        }
        foreach ($arr as &$ar){
            $ar['totalCount'] = $ar['femaleCount'] + $ar['maleCount'];
        }


        return $arr;
    }

    function getResultId($challengeId, $email){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT result_id from result where challenge_id = :challenge_id and participant_email = :email");
        $sql->bindValue(':challenge_id', $challengeId, PDO::PARAM_INT);
        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $result = json_decode($query->buildJson("result_id", "id", $sql), true);
        return (int)$result[0]['id'];
    }

    function getEmailNameReference(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT email, CONCAT(first_name,' ', last_name) from participant");
        $result = json_decode($query->buildJson("CONCAT(first_name,' ', last_name)", "name", $sql), true);
        return $result;
    }

    function deleteChallengesInYear($year){
        global $db;

        $sql = $db->prepare("DELETE FROM challenge where challenge_id%10000 = :year");
        $sql->bindValue(':year', $year, PDO::PARAM_STR);
        if($sql->execute()){
            return true;
        }
        return false;
    }

}