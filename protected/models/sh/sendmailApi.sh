#!/bin/bash
result=$(ps -aux|grep sendemailApi.php|grep -v grep)
if [[ $result ]]
then
	echo 'this service already runing';
	exit;
fi
php ~+/protected/models/sh/sendemailApi.php &
# echo 'websocket begin runing'
# echo ~+/protected/models/sh/;
# exit;
