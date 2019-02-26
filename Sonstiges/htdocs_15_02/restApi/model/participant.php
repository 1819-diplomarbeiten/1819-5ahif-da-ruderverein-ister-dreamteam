<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 16.09.2018
 * Time: 20:55
 */

class Participant
{
    // database connection and table name
    private $conn;
    private $table_name = "participant";

    public $email;
    public $first_name;
    public $last_name;
    public $dob;
    public $gender;
    public $club;
    public $weight;

    public function __construct($db){
        $this->conn = $db;
    }

    function create(){

        $query = "INSERT INTO " . $this->table_name . "
        SET
            email=:email, first_name=:first_name, last_name=:last_name, date_of_birth=:dob, gender=:gender, club=:club, weight=:weight";

        $stmt = $this->conn->prepare($query);

        $this->sanitize();

        $stmt = $this->bind($stmt);

        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function sanitize(){
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->first_name=htmlspecialchars(strip_tags($this->first_name));
        $this->last_name=htmlspecialchars(strip_tags($this->last_name));
        $this->dob=htmlspecialchars(strip_tags($this->dob));
        $this->gender=htmlspecialchars(strip_tags($this->gender));
        $this->club=htmlspecialchars(strip_tags($this->club));
        $this->weight=htmlspecialchars(strip_tags($this->weight));

    }



    // update the product
    function update(){

        // update query
        $query = "UPDATE
                " . $this->table_name . "
            SET
                first_name = :first_name,
                last_name = :last_name,
                date_of_birth = :dob,
                gender = :gender,
                club = :club,
                weight = :weight
            WHERE
                email = :email";

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
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':first_name', $this->first_name);
        $stmt->bindParam(':last_name', $this->last_name);
        $stmt->bindParam(':dob', $this->dob);
        $stmt->bindParam(':gender', $this->gender);
        $stmt->bindParam(':club', $this->club);
        $stmt->bindParam(':weight', $this->weight);

        return $stmt;
    }

    function delete(){
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE email = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email=htmlspecialchars(strip_tags($this->email));

        // bind id of record to delete
        $stmt->bindParam(1, $this->email);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;
    }


}