<?php
$authKey = 'AIzaSyAW3ew5SBdyffNzXDO-cAyKH0vrf52h1o0';
$endpoints[] = 'cTDfCznf8QA:APA91bGsmB6bPl4MQncm0RxYt39SboIiK6k4C_GbZ7ZfO6AJmXq62sfYuTiYdIUZa0RVXFSAsSiLP1eabn-uB2tHmof68Z5_bMd8UExfAgTW8jbBmMUyb7tgOjB7CSX2Wk06kuTw6APz';
$gcmUrl = 'https://android.googleapis.com/gcm/send';

$fields = [
	'registration_ids' => $endpoints,
];
$headers = [
	"Authorization: key={$authKey}", 
	'Content-Type: application/json'
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $gcmUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

$result = curl_exec($ch);

if (!$result)
	die('Curl Failed');

var_dump($result);
curl_close($ch);