<?php
/**
 * Created by PhpStorm.
 * User: David
 * Date: 16.09.2018
 * Time: 20:58
 */

class Club
{
    // database connection and table name
    private $conn;
    private $table_name = "club";

    public $email;
    public $name;
    public $contraction;

    public function __construct($db){
        $this->conn = $db;
    }

    function create(){

        $query = "INSERT INTO " . $this->table_name . "
        SET
            email=:email, contraction=:contraction, name=:name";

        $stmt = $this->conn->prepare($query);

        $this->sanitize();



        if($stmt->execute()){
            return true;
        }

        return false;

    }

    function sanitize(){
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->contraction=htmlspecialchars(strip_tags($this->contraction));
    }



    function update(){
        $query = "UPDATE
                " . $this->table_name . "
            SET
                contraction = :contraction,
                name = :name
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

        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":contraction", $this->contraction);
        $stmt->bindParam(":name", $this->name);


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