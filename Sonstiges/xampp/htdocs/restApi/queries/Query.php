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
        $num = $sql->rowCount();

// check if more than 0 record found
        if($num>0){



            $row = $sql->fetch(PDO::FETCH_ASSOC);
            extract($row);

            $row[$newName] = $row[$oldName];
            unset($row[$oldName]);


            return json_encode($row);

        }

        else{
            echo json_encode(
                array("message" => $num)
            );
        }

    }

    public function __construct($db)
    {
        $this->conn = $db;
    }

}