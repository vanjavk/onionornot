<?php
die();
include 'dbdata.php';

$html=file_get_contents('https://api.pushshift.io/reddit/search/submission/?subreddit=theonion&limit=500&sort_type=score');
$json=json_decode($html,true);
foreach($json['data'] as $v){


try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
    $stmt = $conn->prepare("INSERT INTO theonion (full_link, score, title, url, author) 
    VALUES (:full_link, :score, :title, :url, :author)");
    $stmt->bindParam(':full_link', $v['full_link']);
    $stmt->bindParam(':score', $v['score']);
    $stmt->bindParam(':title', $v['title']);
    $stmt->bindParam(':url', $v['url']);
    $stmt->bindParam(':author', $v['author']);

    $stmt->execute();


    echo "New records created successfully";
    }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }
$conn = null;
}

?>