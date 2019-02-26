<?php require("google_login.php");

$code = isset($_GET['code']) ? $_GET['code'] : NULL;

if(isset($code)) {
    try {
        $token = $g_client->fetchAccessTokenWithAuthCode($code);
        $g_client->setAccessToken($token);
    }catch (Exception $e){
        echo $e->getMessage();
    }
    try {
        $pay_load = $g_client->verifyIdToken();
    }catch (Exception $e) {
        echo $e->getMessage();
    }
} else{
    $pay_load = null;
}
if(isset($pay_load)){
    echo $pay_load["email"];
}