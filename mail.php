<?php

require 'vendor/autoload.php';
use Mailgun\Mailgun;


if (isset($_POST['message']) && isset($_POST['email'])) {

    $msg = $_POST['message'];
    $email = $_POST['email'];


    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg, 70);

    // $mgClient = new Mailgun(<MAILGUN KEY>);
    // $domain   = <DOMAIN>;

    $mgClient = new Mailgun('key-34456aa50263b740acbc9598e6c82102'); //EATING ORANGES
    $domain   = "eatingoranges.com";


    $result = $mgClient->sendMessage("$domain", array(
        'from' => 'Colleen <postmaster@eatingoranges.com>',
        'to' => 'Colleen <colleenscloudmail@gmail.com>',
        'subject' => 'Hello Colleen https://mailgun.com/cp/log',
        'text' => $msg . " From: " . $email
    ));

    if ($email !== ''){
      $result2 = $mgClient->sendMessage("$domain", array(
          'from' => 'Colleen Minor <postmaster@eatingoranges.com>',
          'to' => '<' . $email . '>',
          'subject' => 'Thanks for the email!',
          'text' => 'This is an automated email. Your message is important to me and I will get back to you as soon as I can. :)'
      ));
    }
    //verify that email was sent
    if (($result && $email == '') || ($result && $result2)) {
        echo json_encode("Mail sent successfully.");
    }
    else if(!$result2 && $email !== ''){
    }
  }

else {
    echo json_encode("Did not receive message from javascript");
}

?>
