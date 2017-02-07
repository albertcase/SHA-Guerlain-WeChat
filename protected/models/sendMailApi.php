<?php

/**
* ACM for Memcached
*/
class sendMailApi
{
  private $prostr = 'mails:';
  private $mem;
  private $count = 'count';
  private $now = 'now';
  private $list = 'list:';
  private $from = array(
    'email' => 'guerlain68@samesamechina.com',
    'name' => 'Wechat Guerlain'
  );
  private $to = array(
    '757867658@qq.com',
    'reservationwechat@guerlain.fr',
    'Jingtao.He@mcgarrybowen.com',
    'NADIA.DUAULT@mcgarrybowen.com',
    'NATACHA.BLAZQUEZYGOMEZ@mcgarrybowen.com'
   );

  public function __construct(){
    $this->mem = new memcaches();
    if(!$this->mem->getData($this->prostr.$this->count)){
      $this->mem->addData($this->prostr.$this->count ,'1');
      $this->mem->addData($this->prostr.$this->now ,'1');
    }
  }

  public function addmail($data){
    $key = $this->mem->incremkey($this->prostr.$this->count);
    $this->mem->addData($this->prostr.$this->list.$key,json_encode($data, JSON_UNESCAPED_UNICODE), '800');
  }

  public function mailsend(){
    exec("nohup ".dirname(__FILE__)."/sh/sendmailApi.sh >>./protected/runtime/email.log 2>&1 &");
  }

  public function buildemil($data){
    $datain = array(
      'from' => $this->from,
      'subject' => 'Wechat An appointment from : %bookingname%',
      'templateInvokeName' => 'booking_module',
      'xsmtpapi' => array(
          "to" => $this->to,
          'sub' => array(
            "%bookingname%" => array("%Mbookingname%","%Mbookingname%","%Mbookingname%","%Mbookingname%","%Mbookingname%"),
            "%firstname%" => array("%Mfirstname%","%Mfirstname%","%Mfirstname%","%Mfirstname%","%Mfirstname%"),
            "%familyname%" => array("%Mfamilyname%","%Mfamilyname%","%Mfamilyname%","%Mfamilyname%","%Mfamilyname%"),
            "%title%" => array("%Mtitle%","%Mtitle%","%Mtitle%","%Mtitle%","%Mtitle%"),
            "%phonenumber%" => array("%Mphonenumber%","%Mphonenumber%","%Mphonenumber%","%Mphonenumber%","%Mphonenumber%"),
            "%emailaddress%" => array("%Memailaddress%","%Memailaddress%","%Memailaddress%","%Memailaddress%","%Memailaddress%"),
            "%contactway%" => array("%Mcontactway%","%Mcontactway%","%Mcontactway%","%Mcontactway%","%Mcontactway%"),
            "%services%" => array("%Mservices%","%Mservices%","%Mservices%","%Mservices%","%Mservices%"),
            "%comment%" => array("%Mcomment%","%Mcomment%","%Mcomment%","%Mcomment%","%Mcomment%"),
            "%appointdate%" => array("%Mappointdate%","%Mappointdate%","%Mappointdate%","%Mappointdate%","%Mappointdate%"),
          ),
          "section" => array(
            "%Mbookingname%" => $this->getparam($data, 'first'),
            "%Mfirstname%" => $this->getparam($data, 'first'),
            "%Mfamilyname%" => $this->getparam($data, 'second'),
            "%Mtitle%" => $this->getparam($data, 'sex'),
            "%Mphonenumber%" => $this->getparam($data, 'mobile'),
            "%Memailaddress%" => $this->getparam($data, 'email'),
            "%Mcontactway%" => $this->getparam($data, 'type'),
            "%Mservices%" => $this->getparam($data, 'bak1').'|'.$this->getparam($data, 'bak2').'|'.$this->getparam($data, 'bak3'),
            "%Mcomment%" => $this->getparam($data, 'comment'),
            "%Mappointdate%" => $this->getparam($data, 'date'),
          )
        )
    );
    return $datain;
  }

  public function getparam($arr, $param){
    return isset($arr[$param])?$arr[$param]:'';
  }

}
