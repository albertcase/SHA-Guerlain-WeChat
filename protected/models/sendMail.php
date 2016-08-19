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
  private $to = array('757867658@qq.com' => 'DIRC','reservationwechat@guerlain.fr' => 'Guerlain Wechat Booking');

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
      'subject' => 'Wechat An appointment from :'.$data['first'],
    );
    return $datain;
  }

  public function body($data){
    $body =
      '<html>'.
      ' <head></head>'.
      ' <body>'.
      '<span style="color:#090">First Name:</span>&nbsp;'.$data['first'].'<br>'.
      '<span style="color:#090">Family Nnme:</span>&nbsp;'.$data['second'].'<br>'.
      '<span style="color:#090">Title:</span>&nbsp;'.$data['sex'].'<br>'.
      '<span style="color:#090">Phone No.:</span>&nbsp;'.$data['mobile'].'<br>'.
      '<span style="color:#090">Email Address:</span>&nbsp;'.$data['email'].'<br>'.
      '<span style="color:#090">Preferred way to contact:</span>&nbsp;'.$data['type'].'<br>'.
      '<span style="color:#090">Services:</span>&nbsp;'.$data['bak1'].'|'.$data['bak2'].'|'.$data['bak3'].'<br>'.
      '<span style="color:#090">Comment:</span>&nbsp;'.$data['comment'].'<br>'.
      '<span style="color:#090">appointment Date:</span>&nbsp;'.$data['date'].'<br>'.
      ' </body>'.
      '</html>';
      return $body;
  }

}
