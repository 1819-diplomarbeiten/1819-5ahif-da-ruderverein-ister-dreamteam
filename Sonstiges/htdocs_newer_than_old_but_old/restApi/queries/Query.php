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
        if(isset($data)){
            /*    convert data to json */
            $json = json_encode($data);
        }else{
            /*    set nothing to return */
            $json = null;
        }

        /* return the json result */
        return $json;
    }

    function getClubCount($club){
        global $db;
        global $query;
        $sql = $db->prepare("select count(*)
                     from participant p
                      where p.club = :club");


        $sql->bindValue(':club', $club, PDO::PARAM_STR);

// initialize object
        return $query->buildJson("count(*)", "clubCount", $sql);
    }

    function getBestFourDistances($email){
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

    function getParticipantInfo($email){
        global $db;
        global $query;

        $sql = $db->prepare("Select club, first_name as firstName, last_name, gender, date_of_birth from participant where email = :email");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);

        return $query->buildJson("last_name", "lastName", $sql);
    }

    function getAllChallenges(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT * FROM CHALLENGE");
        return $query->buildJson("challenge_id", "challengeId", $sql);
    }

    function getParticipantDistance($email, $challengeId){
        global $db;
        global $query;

        $sql = $db->prepare("Select distance as d from result where participant_email = :email and challenge_id = :challengeId");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->bindValue(':challengeId', $challengeId, PDO::PARAM_INT);

        return $query->buildJson("d", "distance", $sql);
    }

    function getAllEmails(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT email As e from participant");


// initialize object

        return json_decode($query->buildJson("e", "email", $sql), true);
    }

    function getWattPerKgParticipant($email, $challenge){
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

    function getWattParticipant($email, $challenge){
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

    function getFiveHundredTime($email, $challenge){
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

    function getPClass($email, $year){
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

    function getAllPClass(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT category
                             from age_group");
        return json_decode($query->buildJson("category", "pClass", $sql), true);
    }

    function getCurrentChallengeId(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT challenge_id from challenge where start_date <= curdate() and end_date >= curdate()");
        $test =  json_decode($query->buildJson("challenge_id", "id", $sql), true);
        return $test[0]['id'];

    }

    function nextStartDate(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT (UNIX_TIMESTAMP(MIN(start_date))*1000) FROM challenge WHERE start_date > curdate()");
        $test = json_decode($query->buildJson("(UNIX_TIMESTAMP(MIN(start_date))*1000)", "milliseconds", $sql), true);
        return $test[0]['milliseconds'];

    }

    function nextEndDate(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT (UNIX_TIMESTAMP(MIN(end_date))*1000) FROM challenge WHERE end_date > curdate()");
        $test = json_decode($query->buildJson("(UNIX_TIMESTAMP(MIN(end_date))*1000)", "milliseconds", $sql), true);
        return $test[0]['milliseconds'];
    }

    function emailExists($email){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT * from participant where participant.email = :email");

        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $result = json_decode($query->buildJson("email", "e", $sql), true);
        if($result == null)
            return false;
        return true;
    }

    function getTranslation($language){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT term from language");
        $keys = json_decode($query->buildJson("term", "key", $sql), true);
        $sql = $db->prepare("SELECT ".$language." from language");
        $values = json_decode($query->buildJson($language, "values", $sql), true);
        $newArray = array();

        for ($i=0; $i < count($keys); $i++) {
            $newArray[$keys[$i]['key']] = $values[$i]['values'];
        }


        return $newArray;
    }

    function getAllClubs(){
        global $db;
        global $query;

        $sql = $db->prepare("SELECT name from Club");

        $sql->execute();

        while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
            $data[] = $row['name'];
        }

        return $data;

    }

    function getEmailStatus($email){
        global $db;
        global $query;

        $arr = Array();

        $sql = $db->prepare("SELECT * from Participant where email = :email");
        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $result = json_decode($query->buildJson("email", "e", $sql), true);
        if($result == null){
            $sql = $db->prepare("SELECT * from Club where email = :email");
            $sql->bindValue(':email', $email, PDO::PARAM_STR);
            $result = json_decode($query->buildJson("email", "e", $sql), true);
            if($result != null){
                $arr['emailStatus'] = "club";
            }
        }
        else{
            $arr['emailStatus'] = "participant";
            if($result[0]['e'] == "davipoin@gmail.com"){
                $arr['emailStatus'] = "schramm";
            }
        }
        return $arr;

    }
    public function __construct($db)
    {
        $this->conn = $db;
    }

}