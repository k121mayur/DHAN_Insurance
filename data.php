<?php
if (isset($_POST['cluster']) && !isset($_POST['group'])){
    $mydatabase = new PDO("mysql:host=localhost:8889; dbname=insurance", 'mjk', 'kaka' );
    $sqlqry = "SELECT srNo from clusterList WHERE cluster = :c";
    $preparation = $mydatabase -> prepare($sqlqry);
    $preparation->execute(array(
        ":c"=>$_POST['cluster']
    ));
    $clusterCode = $preparation->fetchAll(PDO::FETCH_ASSOC);

    $grouplistQry = "SELECT groupName FROM groupList WHERE clusterCode = :c ";
    $grpPreparation = $mydatabase -> prepare($grouplistQry);
    $grpPreparation->execute(array(
        ':c'=> $clusterCode[0]['srNo'],
    ));

    $groupList = $grpPreparation->fetchAll(PDO::FETCH_ASSOC);
    foreach ($groupList as $group){
        echo $group['groupName'];
        echo "\n";

    }
}
if(isset($_POST['cluster']) && isset($_POST['group'])){
    $insuranceDatabase = new PDO("mysql:host=localhost:8889; dbname=insurance",'mjk','kaka');
    $clusterCodeQry = "SELECT srNo FROM clusterList WHERE cluster = :c";
    $clusterPreparation = $insuranceDatabase->prepare($clusterCodeQry);
    $clusterPreparation->execute(array(
       ':c'=>$_POST['cluster'],
    ));
    $clusterCode = $clusterPreparation->fetchAll(PDO::FETCH_ASSOC);

    $groupCodeQry = "SELECT srNo FROM groupList WHERE groupName=:g AND clusterCode = :c";
    $groupCodePreparation = $insuranceDatabase->prepare($groupCodeQry);
    $groupCodePreparation->execute(array(
       ':g'=>$_POST['group'],
       ':c'=>$clusterCode[0]['srNo']
    ));
    $groupCodeRaw = $groupCodePreparation->fetchAll(PDO::FETCH_ASSOC);
    $groupCode = $groupCodeRaw[0]['srNo'];

    $memQry = "SELECT memberName, husbandName, yearOfBirth, adharCard, rationCard, voterID, mobileNo FROM memberList WHERE clusterCode = :c AND groupCode = :g";
    $memDataPreparation = $insuranceDatabase->prepare($memQry);
    $memDataPreparation->execute(array(
       ':c'=>$clusterCode[0]['srNo'],
       ':g'=>$groupCode
    ));
    $memData = $memDataPreparation->fetchAll(PDO::FETCH_ASSOC);
    print_r(json_encode($memData));
}
?>