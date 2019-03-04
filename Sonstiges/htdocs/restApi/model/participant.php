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

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function create()
    {

        if ($this->club == "") {
            $query = "INSERT INTO " . $this->table_name . "
        SET
            email=:email, first_name=:first_name, last_name=:last_name, date_of_birth=:dob, gender=:gender, weight=:weight";
        } else {
            $query = "INSERT INTO " . $this->table_name . "
        SET
            email=:email, first_name=:first_name, last_name=:last_name, date_of_birth=:dob, gender=:gender, club=:club, weight=:weight";
        }


        $this->sanitize();
        $stmt = $this->bind($query);


        if ($stmt->execute()) {
            return true;
        }

        return false;

    }

    function sanitize()
    {
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->last_name = htmlspecialchars(strip_tags($this->last_name));
        $this->dob = htmlspecialchars(strip_tags($this->dob));
        $this->gender = htmlspecialchars(strip_tags($this->gender));
        $this->club = htmlspecialchars(strip_tags($this->club));
        $this->weight = htmlspecialchars(strip_tags($this->weight));

    }


    // update the product
    function update()
    {

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

        if ($this->dob == "undefined") {
            $query = "UPDATE
                " . $this->table_name . "
            SET
                first_name = :first_name,
                last_name = :last_name,
                gender = :gender,
                club = :club,
                weight = :weight
            WHERE
                email = :email";
            if ($this->club == null) {
                $query = "UPDATE
                " . $this->table_name . "
                SET
                    first_name = :first_name,
                    last_name = :last_name,
                    gender = :gender,
                    weight = :weight
                WHERE
                    email = :email";
            }
        }


        // prepare query statement


        $this->sanitize();

        $stmt = $this->bind($query);


        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function bind($query)
    {
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(':email', $this->email, PDO::PARAM_STR);
        $stmt->bindValue(':first_name', $this->first_name, PDO::PARAM_STR);
        $stmt->bindValue(':last_name', $this->last_name, PDO::PARAM_STR);
        if (!$this->dob == "undefined")
            $stmt->bindValue(':dob', $this->dob, PDO::PARAM_STR);

        $stmt->bindValue(':gender', $this->gender, PDO::PARAM_STR);
        if ($this->club != "")
            $stmt->bindValue(':club', $this->club, PDO::PARAM_STR);

        $stmt->bindValue(':weight', $this->weight, PDO::PARAM_INT);

        return $stmt;
    }

    function delete()
    {
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE email = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind id of record to delete
        $stmt->bindParam(1, $this->email);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


}