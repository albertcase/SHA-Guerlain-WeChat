<?php
exec("nohup ".dirname(__FILE__)."/sendmail.sh >> null 2>&1 &");
?>
