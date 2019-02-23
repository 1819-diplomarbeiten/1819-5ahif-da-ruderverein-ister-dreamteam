<?php
$conn = new mysqli("localhost", "admin", "passme", "testDb");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$password = @$_POST['password'];
$password = hash('sha512', $password);
$email = @$_POST['email'];
$firstName = @$_POST['firstName'];
$lastName = @$_POST['lastName'];
$dob = @$_POST['dob'];
$weight = @$_POST['weight'];
$gender = @$_POST['gender'];
$club = @$_POST['club'];
$sql = "INSERT INTO Participant (Email, Password, First_Name, Last_Name, Date_Of_Birth, Weight, Gender, Club )
VALUES ('$email', '$password', '$firstName', '$lastName', '$dob', '$weight', '$gender', '$club')";
if ($conn->query($sql) == TRUE) {
    echo "works";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();


?>


<form action="test.php" method="post">
    <p> E-Mail: <input type="text" name="email"></p>
    <p> Passwort: <input type="password" name="password"></p>
    <p> Vorname: <input type="text" name="firstName"/></p>
    <p> Nachname: <input type="text" name="lastName"></p>
    <p> Gebrtsdatum: <input type="date" name="dob"/></p>
    <p> Gewicht(Kg): <input type="number" name="weight"></p>
    <p> Geschlecht:
        <input type="radio" name="gender" value="m"> männlich
        <input type="radio" name="gender" value="f"> weiblich<br></p>
    <p> Verein: <input type="text" name="club"></p>
    <p><input type="submit" class="button" onclick="callSql()"/></p>
</form>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js">
    function callSql() {
        $.ajax({
            type: "POST",
            url: 'localhost/phptest/test.php',
            data: {action: 'call_this'},
            success: function (html) {
                alert(html);
            }

        });
    }</script>









