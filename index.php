<?php
session_start();
$_SESSION['login']= 'False';
?>
<!DOCTYPE html>
<html lang="en" charset="utf8">
<header>
    <title>Insurance Management</title>
    <link rel="stylesheet" href="style.css">
    <script src="magic.js"></script>
</header>
<body>
    <div class="container">
        <img id="logo" src="logo.jpg" alt="Yadgir Janashakti Mahila kalanjiam Okkuta Logo.">
        <h1>DHAN Mutual Insurance Management Softwere</h1>
        <p id="para">Building the resillience...</p>
        <button class="button"><a class="link" target="_blank"  href="http://49.207.184.59:8096/Dhanam2021/Login.jsp">DHANAM</a></button>
        <button class="button"><a class="link" target="_blank"  href="http://49.207.184.59:8096/FAST2021/Login.jsp">FAST</a></button>
    </div>
    <hr>
    <div class="loginDiv">
        <div id="formDiv">
            <form action="login.php" method="post">
                <h2 style="text-align:center;">Login</h2>
                <p>Login Id: <input name="id" type="text"></p>
                <p>Password: <input name="pw" type="password"></p>
                <button action="submit">Log In</button><p><a style=" position: relative; left: 140px;" href="reg.php">Register..</a></p>
            </form>
        </div>
    </div>
</body>
</html>