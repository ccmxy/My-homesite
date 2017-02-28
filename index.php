<!DOCTYPE html>
<html>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Colleen Minor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/contact-btn.css">
        <link rel="stylesheet" href="css/sneaky-me.css">
        <link rel="stylesheet" href="css/footer.css">

        <link rel="stylesheet" href="css/font-awesome-4.7.0/font-awesome.min.css">
        <link rel="stylesheet" href="css/responsive.css">
        <script src="js/modernizr-2.js"></script>
    </head>

    <body>

    <div class="site">
      <!-- In case of incompatable browser: -->
      <div id="inline-svg-sprites" class="display-none">
        <?php include 'sections/browser-compat.php' ?>
      </div>
      <?php
          include 'sections/section1.php';
          include 'sections/main-section.php';
          include 'sections/footer.php';
          include 'sections/open-envelope.php';
       ?>
    </div>

    <!-- Scripts -->
    <script>window.jQuery || document.write('<script src="js/jquery-1.js"><\/script>')</script>
    <script src="js/plugins.js"></script>
    <script src="js/main.js"></script>
    <!-- For icons: -->
    <script src="https://use.fontawesome.com/c974c318cb.js"></script>
    <!-- Create local scope for site to prevent clashing with any libs: -->
    <script>(function() {new Site();  })();</script>
    <script src="js/scrolling.js"></script>

  </body>
</html>
