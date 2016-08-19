<?php
require_once dirname(__FILE__).'/memcaches.php';
require_once dirname(__FILE__).'/mailer/swiftmailer/lib/swift_required.php';
require_once dirname(__FILE__).'/mailer/swiftmailer/SwiftMailer.php';

class mails{
  private $prostr = 'mails:';
  private $mem;
  private $count = 'count';
  private $now = 'now';
  private $list = 'list:';
  private $smtp = 'smtp.exmail.qq.com';
  private $port = '25';
  private $user = 'guerlain68@samesamechina.com';
  private $password = 'China68';
  private $mailer;
  private $mails = array();
  private $SwiftMailer;

  public function __construct(){
    $this->mem = new memcaches();
    if(!$this->mem->getData($this->prostr.$this->count)){
      $this->mem->addData($this->prostr.$this->count ,'1');
      $this->mem->addData($this->prostr.$this->now ,'0');
    }
    $this->SwiftMailer = new SwiftMailer();
    $transport = $this->SwiftMailer->smtpTransport($this->smtp, $this->port)
    ->setUsername($this->user)
    ->setPassword($this->password);
    $this->mailer = $this->SwiftMailer->mailer($transport);
  }

  public function addmemmail(array $datain = array()){
    $message = $this->SwiftMailer->newMessage($datain['subject'])
    ->setFrom($datain['from'])
    ->setTo($datain['to'])
    ->setBody($datain['body'] ,'text/html');
    return $message;
  }

  public function pushmails(){
    $key = $this->mem->incremkey($this->prostr.$this->now);
    $data = json_decode($this->mem->getData($this->prostr.$this->list.$key) ,true);
    $this->mailer->send($this->addmemmail($data));
    $this->mem->delData($this->prostr.$this->list.$key);
  }

  public function ststus(){
    if($this->mem->getData($this->prostr.$this->now) < $this->mem->getData($this->prostr.$this->count)){
      return true;
    }else{
      return false;
    }
  }
}
$mail = new mails();
  while($mail->ststus())
  {
    $mail->pushmails();
  }
