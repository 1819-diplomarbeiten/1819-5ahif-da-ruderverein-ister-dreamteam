<?php require ("../vendor/autoload.php");
//Step 1: Enter you google account credentials
$g_client = new Google_Client();
$g_client->setClientId("863083094018-90dqbb2kvkiaog6tugmd5gagr7kgf483.apps.googleusercontent.com");
$g_client->setClientSecret("1C06AyyOfb55bhuyfcdqccyI");
$g_client->setRedirectUri("http://localhost/login/redirPage.php");
$g_client->setScopes("email");

//Step 2 : Create the url
$auth_url = $g_client->createAuthUrl();
echo "<a href='$auth_url'>Login Through Google </a>";