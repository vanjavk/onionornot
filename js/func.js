function keyPress(event) 
{
    var char = event.keyCode || event.which;
    var move;
    switch(char)
    {
        case 100://d
            move=1;
            break;
        case 68://d
            move=1;
            break;
        case 39://d
            move=1;
            break;
        case 97://a
            move=-1;
            break;
        case 65://a
            move=-1;
            break;
        case 37://a
            move=-1;
            break;
    }
    if (move==-1 && document.getElementById("theonion").disabled==false){
        TheOnion();
    }
    else if (move==1 && document.getElementById("nottheonion").disabled==false){
        NotTheOnion();
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function resetScore() 
{
    setCookie("correct", 0);
    setCookie("incorrect", 0);
    document.getElementById("tabledata").innerHTML = "";
    localStorage.tabledata = document.getElementById("tabledata").innerHTML;
    updateScore();
    showTable();
}


function checkCookie() 
{
    var correct = getCookie("correct");
    var incorrect = getCookie("incorrect");
    var tabledata = localStorage.tabledata;

    if (correct == "") 
    {
    	correct = 0;
        setCookie("correct", correct);
    }
    if (incorrect == "") 
    {
        incorrect = 0;
        setCookie("incorrect", incorrect);
    }
    if (tabledata == "") 
    {
        tabledata = "";
        localStorage.tabledata = tabledata;
    }
}

function updateScore(){
	var correct=getCookie('correct');
    var incorrect=getCookie('incorrect');
	document.getElementById("correct").innerHTML = correct;
    document.getElementById("incorrect").innerHTML = incorrect;
    document.getElementById("tabledata").innerHTML = localStorage.tabledata;
    showTable();
}

function updateData()
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	var data = JSON.parse(xhttp.responseText);
	    	document.getElementById("title").innerHTML = data['title'];
	    	document.getElementById("author").innerHTML = data['author'];
	    	document.getElementById("score").innerHTML = data['score'];
	    	document.getElementById("url").innerHTML = data['url'];
	    	document.getElementById("full_link").innerHTML = data['full_link'];
            document.getElementById("theonion").disabled = false;
            document.getElementById("nottheonion").disabled = false;
	    }
	};
	xhttp.open("GET", "https://onionornot.vanjavk.me/getpost.php", true);
	xhttp.send();
}

function TheOnion(){
    document.getElementById("theonion").disabled = true;
    document.getElementById("nottheonion").disabled = true;
    if (document.getElementById("full_link").innerHTML.toLowerCase().includes("r/theonion"))
    {
        updateTable(0,1);
        setCookie('correct',parseInt(getCookie("correct"))+1);
    }
    else
    {
        updateTable(0,0);
        setCookie('incorrect',parseInt(getCookie("incorrect"))+1);
    }
    newQuestion();

}


function NotTheOnion(){
    document.getElementById("theonion").disabled = true;
    document.getElementById("nottheonion").disabled = true;
    if (document.getElementById("full_link").innerHTML.toLowerCase().includes("r/nottheonion"))
    {
        updateTable(1,1);
        setCookie('correct',parseInt(getCookie("correct"))+1);
    }
    else
    {
        updateTable(1,0);
        setCookie('incorrect',parseInt(getCookie("incorrect"))+1);
    }
    newQuestion();
}

function newQuestion()
{

    updateData();
    updateScore();

}
function updateTable(guess, correct)
{
    var tableRef = document.getElementById('history').getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow(0);
    var newCell  = newRow.insertCell(0)
    if (correct==0)
    {
        newCell.style = "color: red;";
        newCell.innerHTML = "Incorrect";
    }
    else
    {
        newCell.style = "color: green;";
        newCell.innerHTML = "Correct";
    }
    var newCell  = newRow.insertCell(0)
    if (guess==0)
    {
        newCell.innerHTML = "The Onion";
    }
    else
    {
        newCell.innerHTML = "Not The Onion";
    }   
    newRow.insertCell(0).innerHTML = '<a href="'+document.getElementById("full_link").innerHTML+'">'+document.getElementById("title").innerHTML+'</a>';
    localStorage.tabledata = document.getElementById('tabledata').innerHTML;
}

function showTable()
{
    if (document.getElementById('tabledata').innerHTML=="")
    {
        document.getElementById('history').hidden=true;
    }
    else
    {
        document.getElementById('history').hidden=false;
    }
}

function loadFunc()
{
    checkCookie();
	updateScore();
	updateData();
    showTable();
}