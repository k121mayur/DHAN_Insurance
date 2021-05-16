<?php
session_start();
if (isset($_SESSION['login'])){ ?>
<DOCTYPE! html>
    <html>
        <head>
            <title>New Member</title>
            <link rel="stylesheet"
                  href="style.css">

        </head>
        <body>
            <h2>Enter New Member Details</h2>
            <form id ="newMemberForm" method="post" action="newMember.php">
                <?php
                $databaseConnect =new PDO("mysql:host=localhost:8889; dbname=insurance", 'mjk','kaka');
                $query = "SELECT cluster FROM clusterList";
                $preparation =$databaseConnect->prepare($query);
                $preparation->execute();
                $clusterArray = $preparation->fetchAll(PDO::FETCH_ASSOC);
                echo "<label for=\"clusters\">Choose a cluster:</label>";
                echo "<select id=\"clusters\" name=\"cluster\">";
                foreach($clusterArray as $cluster){
                    echo "<option value=\"$cluster[cluster]\"> $cluster[cluster]</option>";
                }
                echo "</select>"
                ?>
                <br>
                <br>
                <label for ="groups">Select Group: </label><select id="groups" name="group">

                </select>
                <table id="memTable">

                </table>

                <!--p>Name: <input type="text" required></--p>
                <p>Father/Spouse: <input type="text" required></p>
                <p>Age: <input type="number" required></p>
                <p>Nominee Name: <input type="text" required></p>
                <p>Nominee Age: <input type="number" required></p>
                <p>Relation: <input type="text" required></p>
                <p>Address: <input type="text" required></p>
                <input type="submit" value="Add Member"-->
            </form>
        </body>
    <script src="magic.js"></script>
    </html>

<?php } else { ?>
    <h2>You cannot access this page without login. Please <a href="index.php">login here</a> to access this page. </h2>
<?php } ?>

<?php
$selected = [];
$keys = array_keys($_POST);
foreach ($keys as $key){
    if ($key == 'cluster' or $key == 'group'){
        continue;
    }
    $keyNumber = explode("_", $key);
    if ($keyNumber[0] == 'selected'){
        $selected[$keyNumber[1]] = true;
    }
    if (isset($selected[$keyNumber[1]])){
        echo $key;
        echo "<br>";
    }
}
?>

