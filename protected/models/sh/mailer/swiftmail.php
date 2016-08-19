
<?php
// require_once dirname(__FILE__).'/swiftmailer/lib/swift_required.php';
// require_once dirname(__FILE__).'/swiftmailer/SwiftMailer.php';
  class swiftmail{

    private $smtp = 'smtp.exmail.qq.com';
    private $port = '25';
    private $user = 'guerlain68@samesamechina.com';
    private $password = 'China68';
    private $mailer;
    private $mails = array();
    private $SwiftMailer;

    public function __construct(){
      Yii::$enableIncludePath = false;
      Yii::import('ext.mailer.swiftmailer.lib.swift_required', 1);
      Yii::import('ext.mailer.swiftmailer.SwiftMailer', 1);
      $this->SwiftMailer = new SwiftMailer();
      $transport = $this->SwiftMailer->smtpTransport($this->smtp, $this->port)
      ->setUsername($this->user)
      ->setPassword($this->password);
      $this->mailer = $this->SwiftMailer->mailer($transport);
    }

    public function addmail(array $datain = array()){
      $message = $this->SwiftMailer->newMessage($datain['subject'])
      ->setFrom($datain['from'])
      ->setTo($datain['to'])
      ->setBody($datain['body']);
      array_push($this->mails ,$message);
    }

    public function send(){
      foreach($this->mails as $x)
        $this->mailer->send($x);
    }
  }
?>
