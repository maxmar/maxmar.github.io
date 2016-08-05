<?php
$authKey = 'AIzaSyAW3ew5SBdyffNzXDO-cAyKH0vrf52h1o0';
$endpoints[] = 'e8VnkR3HKiw:APA91bFgYlGAAtvm857yH5wUJC6rHgGU5-ugKr_3hVRuyjZL7ngEOXdZZD7fyIMOftN7yRL8uV0ikfHdyHspMl_w36T-iSO4B48-tdD7dJAwqf97EtyucLXoMi7adt0xbGivTjjakdQO';
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