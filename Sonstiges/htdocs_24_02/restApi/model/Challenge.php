<?php
header("Access-Control-Allow-Origin: *");

class Challenge
{

    // database connection and table name
    private $conn;
    private $table_name = "challenge";

    public $challenge_id;
    public $start_date;
    public $end_date;

    public function __construct($db)
    {
        $this->conn = $db;
    }


    function create(){

        $query = "INSERT INTO " . $this->table_name . "
        SET
            challenge_id=:challenge_id, start_date=:start_date,end_date = (SELECT DATE_ADD(:start_date, INTERVAL 4 DAY ))";


        $this->sanitize();
        $stmt = $this->bind($query);

        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function sanitize(){
        $this->start_date=htmlspecialchars(strip_tags($this->start_date));
        $this->challenge_id=htmlspecialchars(strip_tags($this->challenge_id));
    }

    function bind($query){
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":challenge_id", $this->challenge_id);


        return $stmt;
    }
    function update(){
        $query = "UPDATE challenge SET start_date = :start_date, end_date = (SELECT DATE_ADD(:start_date,INTERVAL 4 DAY)) WHERE challenge_id = :challenge_id";

        // prepare query statement


        $this->sanitize();

        $stmt = $this->bind($query);



        // execute the query
        if($stmt->execute()){
            return true;
        }

        return false;
    }

    function delete(){
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE challenge_id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->challenge_id=htmlspecialchars(strip_tags($this->challenge_id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->challenge_id);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;
    }


}