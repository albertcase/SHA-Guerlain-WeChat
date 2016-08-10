<?php

class SiteController extends Controller
{
	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */

	public function actionIndex()
	{
		$this->render('index');
	}

	public function actionStore($id)
	{
		$sql = "select * from same_store where id = ".intval($id);
		$store = Yii::app()->db->createCommand($sql)->queryRow();
		$this->renderPartial('store', array('store' => $store));
	}


	public function actionGuest(){
		$session = new Session();
		if($session->has('loguser')){
			$this->redirect('/site/list');
			Yii::app()->end();
		}
		$xss = new forbidXss();
		$this->renderPartial('guest',array('xsscode' => $xss->addXsscode()));
	}

	public function actionGuest2(){
		$session = new Session();
		if($session->has('loguser')){
			$this->redirect('/site/list2');
			Yii::app()->end();
		}
		$xss = new forbidXss();
		$this->renderPartial('guest2',array('xsscode' => $xss->addXsscode()));
	}

	public function actionList()
	{
		$session = new Session();
		if($session->has('loguser')){
			$this->renderPartial('list');
			Yii::app()->end();
		}
		$this->redirect('/site/guest');
	}

	public function actionList2()
	{
		$session = new Session();
		if($session->has('loguser')){
			$this->renderPartial('list2');
			Yii::app()->end();
		}
		$this->redirect('/site/guest2');
	}

	public function actionApi($action ,$xsscode = null){
		$guestApi = new guestApi();
		$forbitlist = array();
		if(in_array($action,$forbitlist)){
			$forbidXss = new forbidXss($xsscode);
			$x = $forbidXss->subCode();
			if($x != '51'){
				echo json_encode($x);
				Yii::app()->end();
			}
		}
		echo json_encode($guestApi->$action());
		Yii::app()->end();
	}

	public function actionAdminapi($action){
		$guestadmin = new guestadmin();
		$session = new Session();
		if($session->has('loguser')){
			echo json_encode($guestadmin->$action());
			Yii::app()->end();
		}
		echo json_encode('4');/*not login*/
		Yii::app()->end();
	}

	public function actionAdminapi2($action){
		$guestadmin = new guestadmin2();
		$session = new Session();
		if($session->has('loguser')){
			echo json_encode($guestadmin->$action());
			Yii::app()->end();
		}
		echo json_encode('4');/*not login*/
		Yii::app()->end();
	}

	public function actionLogout(){
		$session = new Session();
		$session->clean();
		echo json_encode('11');/*login out*/
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
