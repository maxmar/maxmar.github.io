<?php
$authKey = 'AIzaSyAW3ew5SBdyffNzXDO-cAyKH0vrf52h1o0';
$endpoints[] = 'eiAu_XP4dEI:APA91bH17sN89aCe8KURNT1FyYk76zrg9M7lsqtoKiSpFbVh2iLAix5Q2uLAqCImQ9CAsX__Ih4x7_XmTkvJsFZ0o0XqHl9G87lHiWUCur9jlb_Y0U1YBcZxFxfV7wsNG8OVg3lmwXi8';
$gcmUrl = 'https://android.googleapis.com/gcm/send';

$data = [
	"title" => "Hi, %UserName%",
	"message" => "I\'m an example of push-notification o.o",
	"icon" => "http://www.jsclasses.org/browse/view/image/file/3900/name/android-icon-192x192.png",
	"tag" => "example-push-notification",
];

$fields = [
	'registration_ids' => $endpoints, 
	'data' => $data,
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