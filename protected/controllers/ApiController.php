<?php

class ApiController extends Controller
{

	public function actionSubmit()
	{
		$tag = false;
	    $sex = isset($_POST['sex']) ? $_POST['sex'] : $tag = true;
	    $first = isset($_POST['first']) ? $_POST['first'] : $tag = true;
	    $second = isset($_POST['second']) ? $_POST['second'] : $tag = true;
	    $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : $tag = true;
	    $email = isset($_POST['email']) ? $_POST['email'] : $tag = true;
	    $type = isset($_POST['type']) ? $_POST['type'] : $tag = true;
	    $bak1 = isset($_POST['bak1']) ? $_POST['bak1'] : $tag = true;
	    $bak2 = isset($_POST['bak2']) ? $_POST['bak2'] : '';
	    $bak3 = isset($_POST['bak3']) ? $_POST['bak3'] : '';
	    $date = isset($_POST['date']) ? $_POST['date'] : $tag = true;
	    $comment = isset($_POST['comment']) ? $_POST['comment'] : $tag = true;
	    if ( $tag ) {
	    	print json_encode(array('code' => 2, 'msg' => '请填写必填项'));
	    	Yii::app()->end();
	    }
	    $sql="insert into same_book set sex = :sex, first = :first, second = :second, mobile = :mobile, email = :email, type = :type, bak1 = :bak1, bak2 = :bak2, bak3 = :bak3, date = :date, comment = :comment";
		$command = Yii::app()->db->createCommand($sql);
		$command->bindParam(':sex',$sex,PDO::PARAM_STR);
		$command->bindParam(':first',$first,PDO::PARAM_STR);
		$command->bindParam(':second',$second,PDO::PARAM_STR);
		$command->bindParam(':mobile',$mobile,PDO::PARAM_STR);
		$command->bindParam(':email',$email,PDO::PARAM_STR);
		$command->bindParam(':type',$type,PDO::PARAM_STR);
		$command->bindParam(':bak1',$bak1,PDO::PARAM_STR);
		$command->bindParam(':bak2',$bak2,PDO::PARAM_STR);
		$command->bindParam(':bak3',$bak3,PDO::PARAM_STR);
		$command->bindParam(':date',$date,PDO::PARAM_STR);
		$command->bindParam(':comment',$comment,PDO::PARAM_STR);
		$command->execute();
		//send email
		$sendMail = new sendMailApi();
		// $sendMail = new sendMail();
		$keys = array(
			'sex' => $sex,
			'first' => $first,
			'second' => $second,
			'mobile' => $mobile,
			'email' => $email,
			'type' => $type,
			'bak1' => $bak1,
			'bak2' => $bak2,
			'bak3' => $bak3,
			'date' => $date,
			'comment' => $comment
		);
		$sendMail->addmail($sendMail->buildemil($keys));
		$sendMail->mailsend();
	  print json_encode(array('code' => 1, 'msg' => '提交成功'));
	  Yii::app()->end();

	}

	public function actionInfo()
	{
		if (isset($_COOKIE['little_gift161101'])&&$_COOKIE['little_gift161101']!='') {
			print json_encode(array('code' => 3, 'msg' => '您已经提交过信息了'));
	    	Yii::app()->end();
		}
		$tag = false;
	    $name = isset($_POST['name']) ? $_POST['name'] : $tag = true;
	    $mobile = isset($_POST['mobile']) ? $_POST['mobile'] : $tag = true;
	    $address = isset($_POST['address']) ? $_POST['address'] : $tag = true;
	    if ( $tag ) {
	    	print json_encode(array('code' => 4, 'msg' => '请填写必填项'));
	    	Yii::app()->end();
	    }
	    $sql="insert into same_lottery set name = :name, mobile = :mobile, address = :address";
		$command = Yii::app()->db->createCommand($sql);
		$command->bindParam(':name',$name,PDO::PARAM_STR);
		$command->bindParam(':mobile',$mobile,PDO::PARAM_STR);
		$command->bindParam(':address',$address,PDO::PARAM_STR);
		$command->execute();

		setcookie("little_gift161101","1",time()+3600*24*365);
		$_COOKIE['little_gift161101'] = 1;

		$rs = Yii::app()->db->createCommand("select count(id) from same_lottery")->select()->queryScalar();
		if ($rs>1000) {
			print json_encode(array('code' => 2, 'msg' => '小样已经申领完了'));
	    	Yii::app()->end();
		}
	    print json_encode(array('code' => 1, 'msg' => '申领成功'));
	    Yii::app()->end();
	}

	public function actionTestEmail()
	{
		$message            = new YiiMailMessage;
		$message->subject   = "=?UTF-8?B?".base64_encode('Guerlain预约信息提醒')."?=";
        $message->setBody('test', 'text/html');
        $message->setTo(array('demon.zhang@samesamechina.com'=>"Demon"));
        $message->setFrom(array("guerlain68@samesamechina.com"=>"guerlain"));
        try {
        	 $rr = Yii::app()->mail->send($message);
        	 //var_dump($rr);
        } catch (Exception $e) {
        	//var_dump($e->getMessage());
        }

		print_r($rr);
		exit;
	}

	public function actionApi2(){
		$sendMail = new sendMail();
		$keys = array(
			"name" => "name",
			"surname" =>  'aaaasurname',
			"title" => 'aaaatitle',
			'telphone' => 'aaaatelphone',
			'email' => 'aaaaemail',
			'callway' => 'aaaacallway',
			'country' => 'aaaacountry',
			'storeid' => 'aaaastoreid',
			'sguide' => 'aaaasguide',
			'bespeaktime' => 'aaaabespeaktime',
		);
		$sendMail->addmail($sendMail->buildemil($keys));
		$sendMail->mailsend();
		print "\nsuccess";
		Yii::app()->end();
	}

	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
	    if($error=Yii::app()->errorHandler->error)
	    {
	    	if(Yii::app()->request->isAjaxRequest)
	    		echo $error['message'];
	    	else
	        	$this->render('error', $error);
	    }
	}
}
