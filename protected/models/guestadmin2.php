<?php

class guestadmin2
{
  private $sql;
  private $request;

  public function __construct(){
    $this->sql = new database();
    $this->request = new uprequest();
  }

  public function getpage(){
    $data = array(
      array('key' => 'name' ,'type'=> 'post' ,'regtype'=> 'text'),
      array('key' => 'mobile' ,'type'=> 'post' ,'regtype'=> 'text'),
      array('key' => 'address' ,'type'=> 'post' ,'regtype'=> 'text'),
    );
    if(!$keys = $this->request->uselykeys($data))
      return '11'; /*data formate error*/
    if(!is_array($keys))
        $keys = array();
    $numb = isset($keys['numb'])?$keys['numb']:'1';
    $one = isset($keys['one'])?$keys['one']:'20';
    unset($keys['numb']);
    unset($keys['one']);
    if(isset($keys['openidd'])){
      if($keys['openidd'] == '1'){
        $keys['openid'] = "^.";
      }else{
        $keys['openid'] = "^$";
      }
    }
    unset($keys['openidd']);
    return $this->sql->Reggetpage($numb ,$one ,$keys ,array(),'same_lottery');
  }

  public function comfirmbespk(){
    $data = array(
      array('key' => 'id' ,'type'=> 'post' ,'regtype'=> 'number'),
    );
    if(!$keys = $this->request->comfirmKeys($data))
      return '11'; /*data formate error*/
    if($this->sql->Sqlupdate('same_lottery',array('status'=>'1'),'id=:id',array(':id' => $keys['id']))){
      return '12'; /*data instart success*/
    }
    return '13';/*data insert error*/
  }

  public function getcount(){
    $data = array(
      array('key' => 'name' ,'type'=> 'post' ,'regtype'=> 'text'),
      array('key' => 'mobile' ,'type'=> 'post' ,'regtype'=> 'text'),
      array('key' => 'address' ,'type'=> 'post' ,'regtype'=> 'text'),
    );
    if(!$keys = $this->request->uselykeys($data))
      return '11'; /*data formate error*/
    if(!is_array($keys))
      $keys = array();
      if(isset($keys['openidd'])){
        if($keys['openidd'] == '1'){
          $keys['openid'] = "^.";
        }else{
          $keys['openid'] = "^$";
        }
      }
    unset($keys['openidd']);
    return array('count' => $this->sql->Reggetcount('same_lottery',$keys));
  }

  private function getdelNo($ext){
    $in = implode(",", $ext);
    $sql = "SELECT cardno,firstname FROM same_login WHERE cardno NOT IN (".$in.")";
    return $this->sql->Sqlselectall($sql);
  }
}
