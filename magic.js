
function lic(){
    var mutualButton = document.getElementById("mutual");
    mutualButton.remove();
    var licButton = document.getElementById("lic");
    licButton.remove();
    var product = document.getElementById("producttitle")
    product.remove();

    var form = document.getElementById("product");
    var title = document.createElement("h2");
    title.innerHTML = "Choose what you want to do";
    // var body = document.getElementsByTagName("body")[0];
    form.appendChild(title);

    var newMemberLink = document.createElement("a");
    newMemberLink.setAttribute("href", "newMember.php");
    var newMemberButton = document.createElement("button");
    newMemberButton.innerHTML="New Member";
    newMemberButton.setAttribute("target", "_blank");

    form.appendChild(newMemberLink);
    newMemberLink.appendChild(newMemberButton);

    var remMemberLink = document.createElement("a");
    var remMemberButton = document.createElement("button");

    remMemberButton.innerHTML=("Remove member");
    remMemberLink.appendChild(remMemberButton);
    form.appendChild(remMemberLink);
    remMemberButton.addEventListener('click',fetchdata)

    var importData = document.createElement("a")
    var importDataButton = document.createElement("button");
    importDataButton.innerHTML="Import data from excel";
    importDataButton.setAttribute("onclick", "importData()")

    importData.setAttribute("href", "#");
    importData.appendChild(importDataButton);
    form.appendChild(importData);



}
function mutual(){

}
function importData(){
    var form = document.getElementById("product")
    form.remove();
    var importForm = document.createElement("form");
    importForm.setAttribute("method", "post")
    importForm.setAttribute("action", "excelProcess.php");
    importForm.setAttribute("enctype", "multipart/form-data");
    var para = document.createElement("p");
    para.innerHTML = "Browse file";
    var input = document.createElement("input");
    input.setAttribute("type", "file")
    input.setAttribute("name", "excelfile")
    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Upload");

    importForm.appendChild(para);
    importForm.appendChild(input);
    importForm.appendChild(submit);

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(importForm);

}

function fetchdata(){
    console.log("First step crossed!")
    const request = new XMLHttpRequest();

    request.open('POST', "login.php", true);

    request.onprogress = function (){
        console.log("You are on right path go ahead!");
    }

    request.onload = function (){
        let newPara = document.createElement("p");
        console.log(this.responseText);

        newPara.innerHTML = "resp";
    }
    request.send("id=admin&pw=mayur");
}
var selectCombobox = document.getElementById("clusters");
selectCombobox.addEventListener('focusout', loadGroups);

function loadGroups(){
    console.log("Working go ahead!!");

    const reqest = new XMLHttpRequest();

    reqest.open('POST', "data.php", true);

    reqest.onprogress = function (){
        console.log("onprogress working!!");
        var notice = document.createElement("p");
        notice.innerHTML = "Loading";
        notice.setAttribute("id", "notice")
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(notice);
    }
    reqest.onload = function(){
        var notice = document.getElementById("notice");
        notice.remove();
        var groupData = (this.responseText);
        var groupArray = groupData.split("\n");
        groupArray.pop();
        console.log(groupArray);
        var groupCombobox = document.getElementById('groups');

        groupArray.forEach(function(item, index){
            let option = document.createElement('option');
            option.setAttribute('value',item);
            option.innerHTML = item;
            groupCombobox.appendChild(option);
        });
    }
    reqest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var clusterName = document.getElementById("clusters").value;
    reqest.send("cluster="+ clusterName)

}

var groupCombobox = document.getElementById("groups");
groupCombobox.addEventListener('focusout', loadMember);

function loadMember(){
    console.log("loading members from selected group");
    let groupName = groupCombobox.value;
    let clusterName = selectCombobox.value;
    const memberRequest = new XMLHttpRequest();
    memberRequest.open('POST', 'data.php', true);

    memberRequest.onprogres = function () {
      alert("Congo");
    };

    memberRequest.onload = function(){
        var JSONdata = JSON.parse(this.responseText);
        //console.log(JSONdata);
        let form = document.getElementById('newMemberForm');
        var memTable = document.createElement('table');
        memTable.setAttribute('border', 1 );
        memTable.setAttribute('cellspacing', 3);
        memTable.setAttribute('cellpadding', 5);

        var checkBoxheading = document.createElement('th');
        checkBoxheading.innerHTML = '<p>Select All</p><br><input id="selectAllMember" type="checkbox" checked=0>';

        var memNameHead = document.createElement('th');
        memNameHead.innerHTML="Member Name";
        var husNameHead = document.createElement('th');
        husNameHead.innerHTML="Spouse/Father Name";

        var nomineeHead = document.createElement('th');
        nomineeHead.innerHTML = "Nominee Name";

        var nomAgeHead = document.createElement('th');
        nomAgeHead.innerHTML = "Nominee Age";


        var ageHead = document.createElement('th');
        ageHead.innerHTML="Age";

        var mobileNoHead = document.createElement('th');
        mobileNoHead.innerHTML="Mobile No";

        var adharHead = document.createElement('th');
        adharHead.innerHTML="Aadhar ID";

        var rationHead = document.createElement('th');
        rationHead.innerHTML="Ration Card No";

        var voterHead = document.createElement('th');
        voterHead.innerHTML="Voter ID";

        var headArray = [checkBoxheading, memNameHead, husNameHead, ageHead, nomineeHead, nomAgeHead, mobileNoHead, adharHead, rationHead, voterHead]

        headArray.forEach(function(item, index){
            memTable.appendChild(item);
        })

        form.appendChild(memTable);
        console.log(JSONdata);
        var counter=0;
        JSONdata.forEach(function(item, index){

            var row = document.createElement('tr');
            var checkBox = document.createElement('input');
            checkBox.setAttribute("name", "selected " + counter);
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('checked', true);
            checkBox.setAttribute('value', counter);
            checkBox.setAttribute('class', "check")
            var checkboxrow = document.createElement('td');
            checkboxrow.appendChild(checkBox);

            var namecell = document.createElement('td');
            var nameInput = document.createElement('input',)
            nameInput.setAttribute('name', "member " + counter );
            nameInput.setAttribute('value', item.memberName);
            namecell.appendChild(nameInput);


            var husbandcell = document.createElement('td');
            var husbandInput = document.createElement('input');
            husbandInput.setAttribute('name', "spouse "+counter);
            husbandInput.setAttribute('value', item.husbandName)
            husbandcell.appendChild(husbandInput);


            var yearObject = new Date();
            var year = yearObject.getFullYear();
            var agecell = document.createElement('td');
            var ageInput = document.createElement('input');
            ageInput.setAttribute('name', "memAge "+counter);
            ageInput.setAttribute('value', year - item.yearOfBirth);
            agecell.appendChild(ageInput);

            var nominee = document.createElement('td');
            var nomineeInput = document.createElement('input');
            nominee.appendChild(nomineeInput);

            var nomAge = document.createElement('td');
            var nomAgeInput = document.createElement('input');
            nomAge.appendChild(nomAgeInput);


            var mobilecell = document.createElement('td');
            var mobileInput = document.createElement('input');
            mobileInput.setAttribute('name', "mobile "+counter);
            mobileInput.setAttribute('value', item.mobileNo)
            mobilecell.appendChild(mobileInput);

            var adharcell = document.createElement('td');
            var adharInput = document.createElement('input');
            adharInput.setAttribute('name', "adhar "+counter);
            adharInput.setAttribute('value', item.adharCard)
            adharcell.appendChild(adharInput);

            var rationcell = document.createElement('td');
            var rationInput = document.createElement('input');
            rationInput.setAttribute('name', "ration "+counter);
            rationInput.setAttribute('value', item.rationCard)
            rationcell.appendChild(rationInput);

            var votercell = document.createElement('td');
            var voterInput = document.createElement('input');
            voterInput.setAttribute('name', "voter "+counter);
            voterInput.setAttribute('value', item.voterID)
            votercell.appendChild(voterInput);

            var cellArray = [checkboxrow, namecell, husbandcell, agecell, nominee, nomAge, mobilecell, adharcell, rationcell, votercell];
            cellArray.forEach(function(item, index){
                row.appendChild(item);
            })
            memTable.appendChild(row);
            console.log(item.memberName);
            counter++;
        })
        var addMemberButton = document.createElement('input');
        addMemberButton.setAttribute('value', "Add Members");
        addMemberButton.setAttribute('type', 'submit');

        form.appendChild(addMemberButton);
        var selectMemberss = document.getElementById('selectAllMember');
        selectMemberss.addEventListener('click', selectMembers)

    }
    memberRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    memberRequest.send('cluster='+clusterName+'&group='+groupName);

}


function selectMembers(){
    var masterCheckbox = document.getElementById("selectAllMember");
    var select = masterCheckbox.getAttribute("checked");
    console.log(select);
    if (select === 'true'){
        var allCheckBox = document.getElementsByClassName("check");
        allCheckBox.forEach(function(item, index){
          item.setAttribute("checked", true);
        })
    }else if(select === 'false'){
        var allCheckBox = document.getElementsByClassName("check");
        allCheckBox.forEach(function(item, index){
            item.setAttribute("checked", false);
        })
    }
}
