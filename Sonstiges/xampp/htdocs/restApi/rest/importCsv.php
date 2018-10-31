<?php
include_once '../config/database.php';

$database = new Database();
$con = $database->getConnection();

if (isset($_POST["Import"])) {

    $filename = $_FILES["file"]["tmp_name"];
    $sql = "SELECT challenge_id FROM challenge WHERE start_date < CURDATE() AND end_date > CURDATE()";
    $row = $con->query($sql)->fetch(PDO::FETCH_ASSOC);
    $challengeId = $row['challenge_id'];
    if($challengeId == null){
        echo "<script type=\"text/javascript\">
						alert(\"There´s no challenge at the moment\");
						window.location = \"clubCount.php\"
					</script>";
    }else {

        if ($_FILES["file"]["size"] > 0) {
            $file = fopen($filename, "r");
            while (($getData = fgetcsv($file, 10000, ";")) !== FALSE) {


                $sql = "INSERT into result (challenge_id , participant_email, distance) 
                   values ('" . $challengeId . "','" . $getData[0] . "','" . $getData[1] . "')";
                $result = $con->query($sql);
//            $result = $result->execute();
                if (!isset($result)) {
                    echo "<script type=\"text/javascript\">
							alert(\"Invalid File:Please Upload CSV File.\");
							window.location = \"index.php\"
						  </script>";
                } else {
                    echo "<script type=\"text/javascript\">
						alert(\"CSV File has been successfully Imported.\");
						window.location = \"clubCount.php\"
					</script>";
                }
            }

            fclose($file);
        }
    }
}


?>