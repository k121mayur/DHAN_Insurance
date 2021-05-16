<?php
session_start();

$database = new PDO("mysql:host=localhost:8889; dbname=insurance", 'mayur', 'ajgm2020');

$query = $database->prepare("SELECT id, password FROM login WHERE id = :i;");

$query-> execute(array(
    ':i'=>$_POST['id'],
));

$row = $query->fetch(PDO::FETCH_ASSOC);

?>
<?php if (!$row){ ?>
    <h1>Wrong User id <a href="index.php">click here</a> try again.</h1>
<?php }else if ($row['password']==$_POST['pw']){
    $_SESSION['login'] = 'True';
    header('Location: dataentry.php');
}
?>
<?php
//if (isset($_POST['id']) & isset($_POST['pw'])){
//    if ($_POST['id']=="mayur" && $_POST['pw']=="kaka"){
//        $_SESSION['login']='True';
//        header('Location: dataentry.php');
//    }else{
//        $_SESSION['login']='False';
//        header('Location: dataentry.php');
//};
//}else{
//    header('Location: index.php');
//}?>