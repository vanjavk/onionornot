<?php

	$servername = "localhost";
	$username = "onionornot";
	$password = 'D$MIMz1nOkzR1LOrvJ77';
	$dbname = "onionornot";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
    $stmt = $conn->prepare("SELECT * FROM theonion ORDER BY RAND() LIMIT 1");
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    $result = $stmt->fetch();
    #print_r($result);


    #echo "New records created successfully";
    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;

?>

<!DOCTYPE html>
<html>
	<head>
		<script src="js/func.js"></script>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
		<meta charset="UTF-8">
		<title>Onion or not?</title>
	</head>
	<body onload="loadFunc()" onkeydown="keyPress(event)">
		<div style= "  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;">
  		
			<h2 id="title" style="max-width: 800px">
				
			</h2><br>
			<label>Author: <b id="author"></b> - Score: <b id="score"></b></label>

			<h4>Correct: <b style="color: green;" id="correct"></b> Incorrect: <b style="color: red;" id="incorrect"></b><br>
				<div style= "padding-top: 15px;
  align-items: center;
  text-align: center;">
					<button id="theonion" style="user-select: none;" type="button" onclick="TheOnion()" class="btn-lg btn-outline-success">The Onion</button>
					<button id="nottheonion" style="user-select: none;"  type="button" onclick="NotTheOnion()" class="btn-lg btn-outline-danger">Not The Onion</button>
				</div>
				<div style= "padding-top: 15px;
  align-items: center;
  text-align: center;">
					<br>

				</div>
				<div style= "padding-top: 55px;
  align-items: center;
  text-align: center;">
					<br>
					<button style="user-select: none;" type="button" onclick="resetScore()" class="btn btn-outline-secondary">Reset score</button>

				</div>
		</div>
		<div>
			<table id="history" class="table">
			  	<thead>
			    	<tr>
			      		<th scope="col">Title</th>
			      		<th scope="col">You guessed</th>
			      		<th scope="col">Result</th>
			  		</tr>
			 	</thead>
			 	<tbody id="tabledata">
			 	</tbody>
			</table>
		</div>

		<p id="full_link" hidden></p>
		<p id="url" hidden></p>
	</body>
	

</html>

