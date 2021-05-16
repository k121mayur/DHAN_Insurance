<?php if(isset($_POST['id'])){?>
    <?php if ($_POST['pass'] !== $_POST['conpass']){
        echo "<p>Password Not Matching <a href='reg.php'>try again</a></p>";
    }else {
        $register =new PDO("mysql:host=localhost:8889;dbname=insurance", 'k121mayur', 'ajgm2020');
        $sql = "INSERT INTO login(name, lastname, email, id, password) VALUES (:n, :l, :e, :i, :p);";
        $qry = $register -> prepare($sql);
        $data = $qry -> execute(array(
            ':n' => $_POST['fname'],
            ':l' => $_POST['lname'],
            ':e' => $_POST['mail'],
            ':i' => $_POST['id'],
            ':p' => $_POST['pass']
            ));
        if ($data) {
            echo "<h2>You account has been created sussfully <a href='index.php'>log in</a> here to use softwere.</h2>";
//        $validation = $register->prepare("SELECT email, id, password FROM login WHERE name= :name ")
        } else {
            echo "Failed to create an account.";
        }
    }

    ?>
<?php } else { ?>
    <h2>New Member Registration</h2>
<form action="reg.php" method="POST">
    <p>First Name: <input name="fname" type="text" required></p>
    <p>Last Name: <input name="lname" type="text"></p>
    <p>Email Id: <input name="mail" type="email" required></p>
    <p>User Id: <input name="id" type="text" placeholder="this can be email id also" required></p>
    <p>Password: <input name="pass" type="password" required></p>
    <p>Confirm Password: <input name="conpass" type="password" required></p>
    <input type="submit" value="Register">
</form>
<?php } ?>