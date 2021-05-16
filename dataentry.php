<?php
session_start();
?>
<?php if ($_SESSION['login']=='True'){ ?>
<!DOCTYPE html>
    <html>
        <head>
            <title>Insurance Management</title>
            <link rel="stylesheet"
                  href="style.css">
        </head>
        <body>
        <h2 id="producttitle"> Choose Your Product </h2>

        <button id="lic" onclick="lic()">
                LIC</button>
            <button id="mutual" class= "button" onclick="mutual()">
                DHAN Mutual
            </button>
        <div id="operations">
        </div>
        <div id="product">
        </div>
        </body>
    </html>


<?php } else{ ?>
    <h2>You can't access this page without login</h2>
    <p>Please <a href="index.php">login here</a></p>


<?php } ?>

<script src="magic.js">

</script>