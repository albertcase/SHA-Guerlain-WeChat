<?php
require_once dirname(__FILE__).'/memcaches.php';

class sendemailApi{
  private $prostr = 'mails:';
  private $mem;
  private $count = 'count';
  private $now = 'now';
  private $list = 'list:';
  private $mailer;
  private $mails = array();
  private $API_USER = 'dirk_wang_test_ufMq1R';
  private $API_KEY = 'Mef8L5x6K4RHHRzb';

  public function __construct(){
    $this->mem = new memcaches();
    if(!$this->mem->getData($this->prostr.$this->count)){
      $this->mem->addData($this->prostr.$this->count ,'1');
      $this->mem->addData($this->prostr.$this->now ,'0');
    }
  }

  public function pushmails(){
    $key = $this->mem->incremkey($this->prostr.$this->now);
    $data = json_decode($this->mem->getData($this->prostr.$this->list.$key) ,true);
    $this->send_mail($data);
    $this->mem->delData($this->prostr.$this->list.$key);
  }

  public function ststus(){
    if($this->mem->getData($this->prostr.$this->now) < $this->mem->getData($this->prostr.$this->count)){
      return true;
    }else{
      return false;
    }
  }

  public function send_mail($content) {
    if(!is_array($content) || !isset($content['from']) || !isset($content['subject']) || !isset($content['xsmtpapi']) || !isset($content['templateInvokeName']) )
      return false;
    $url = 'http://api.sendcloud.net/apiv2/mail/sendtemplate';
    $vars = json_encode($content['xsmtpapi'] ,JSON_UNESCAPED_UNICODE);

    $param = array(
        'apiUser' => $this->API_USER, # 使用api_user和api_key进行验证
        'apiKey' => $this->API_KEY,
        'from' => $content['from']['email'], # 发信人，用正确邮件地址替代
        'fromName' => $content['from']['name'],
        'xsmtpapi' => $vars,
        'templateInvokeName' => $content['templateInvokeName'],
        'subject' => $content['subject'],
        'respEmailId' => 'true'
    );

    $data = http_build_query($param);

    $options = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-Type: application/x-www-form-urlencoded',
            'content' => $data
    ));
    $context  = stream_context_create($options);
    $result = file_get_contents($url, FILE_TEXT, $context);
    return $result;
  }
}

$mail = new sendemailApi();
  while($mail->ststus())
  {
    $mail->pushmails();
  }
