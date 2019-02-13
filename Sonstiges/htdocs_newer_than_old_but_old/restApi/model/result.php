<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 16.09.2018
 * Time: 20:59
 */

class Result
{
    private $conn;
    private $table_name = "result";

    public $result_id;
    public $challenge_id;
    public $participant_email;
    public $distance;

    public function __construct($db){
        $this->conn = $db;
    }

    function create(){

        $query = "INSERT INTO " . $this->table_name . "
        SET
            challenge_id=:challenge_id, participant_email=:participant_email, distance=:distance";



        $this->sanitize();

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":challenge_id", $this->challenge_id);
        $stmt->bindParam(":participant_email", $this->participant_email);
        $stmt->bindParam(":distance", $this->distance);


        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function sanitize(){
        $this->challenge_id=htmlspecialchars(strip_tags($this->challenge_id));
        $this->participant_email=htmlspecialchars(strip_tags($this->participant_email));
        $this->distance=htmlspecialchars(strip_tags($this->distance));
    }



    function update(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                challenge_id = :challenge_id,
                participant_email = :participant_email,
                distance = :distance
            WHERE
                result_id = :result_id";

        // prepare query statement


        $this->sanitize();

        $stmt = $this->bind($query);



        // execute the query
        if($stmt->execute()){
            return true;
        }

        return false;
    }

    function bind($query){
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":result_id", $this->result_id);
        $stmt->bindParam(":challenge_id", $this->challenge_id);
        $stmt->bindParam(":participant_email", $this->participant_email);
        $stmt->bindParam(":distance", $this->distance);


        return $stmt;
    }

    function delete(){
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE result_id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->result_id=htmlspecialchars(strip_tags($this->result_id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->result_id);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;
    }

}