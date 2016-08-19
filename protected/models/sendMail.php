<?php

/**
* ACM for Memcached
*/
class sendMail
{
  private $prostr = 'mails:';
  private $mem;
  private $count = 'count';
  private $now = 'now';
  private $list = 'list:';
  private $from = array('guerlain68@samesamechina.com' => 'Wechat Guerlain');
  private $to = array('dirk.wang@samesamechina.com' => 'DIRC','reservationwechat@guerlain.fr' => 'Guerlain Wechat Booking');

  public function __construct(){
    $this->mem = new memcaches();
    if(!$this->mem->getData($this->prostr.$this->count)){
      $this->mem->addData($this->prostr.$this->count ,'1');
      $this->mem->addData($this->prostr.$this->now ,'1');
    }
  }

  public function addmail($data){
    $key = $this->mem->incremkey($this->prostr.$this->count);
    $this->mem->addData($this->prostr.$this->list.$key,json_encode($data), '800');
  }

  public function mailsend(){
    exec("nohup ".dirname(__FILE__)."/sh/sendmail.sh >>./protected/runtime/email.log 2>&1 &");
  }

  public function buildemil($data){
    $datain = array(
      'from' => $this->from,
      'to' => $this->to,
      'body' => $this->body($data),
      'subject' => 'Wechat An appointment from :'.$data['name'],
    );
    return $datain;
  }

  public function body($data){
    $bespeakApi = new bespeakApi();
    $storeids = $bespeakApi->getstoresid();
    if($data['title'] == '1')
      $data['title'] = 'Sir';
    if($data['title'] == '2')
      $data['title'] = 'Ms';
    if($data['title'] == '3')
      $data['title'] = 'Miss';
    $data['storeid'] = isset($storeids[$data['storeid']])?$storeids[$data['storeid']]:$data['storeid'];
    if($data['sguide'] == '0')
      $data['sguide'] = 'No Need';
    if($data['sguide'] == '1')
      $data['sguide'] = 'Need';
    if($data['callway'] == '1')
      $data['callway'] = 'telphone';
    if($data['callway'] == '2')
      $data['callway'] = 'email';
    $body =
      '<html>'.
      ' <head></head>'.
      ' <body>'.
      '<span style="color:#090">First Name:</span>&nbsp;'.$data['name'].'<br>'.
      '<span style="color:#090">Family Nnme:</span>&nbsp;'.$data['surname'].'<br>'.
      '<span style="color:#090">Title:</span>&nbsp;'.$data['title'].'<br>'.
      '<span style="color:#090">Phone No.:</span>&nbsp;'.$data['telphone'].'<br>'.
      '<span style="color:#090">Email Address:</span>&nbsp;'.$data['email'].'<br>'.
      '<span style="color:#090">Preferred way to contact:</span>&nbsp;'.$data['callway'].'<br>'.
      '<span style="color:#090">Store:country:</span>&nbsp;'.$data['country'].'<br>'.
      '<span style="color:#090">Store:</span>&nbsp;'.$data['storeid'].'<br>'.
      '<span style="color:#090">Chinese Guide:</span>&nbsp;'.$data['sguide'].'<br>'.
      '<span style="color:#090">appointment Date:</span>&nbsp;'.$data['bespeaktime'].'<br>'.
      ' </body>'.
      '</html>';
      return $body;
  }

}
