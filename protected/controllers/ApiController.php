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
	    if ( $tag ) {
	    	print json_encode(array('code' => 2, 'msg' => '请填写必填项'));
	    	Yii::app()->end();
	    }
	    $sql="insert into same_book set sex = :sex, first = :first, second = :second, mobile = :mobile, email = :email, type = :type, bak1 = :bak1, bak2 = :bak2, bak3 = :bak3, date = :date";
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
		$command->execute();
	    print json_encode(array('code' => 1, 'msg' => '提交成功'));
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
