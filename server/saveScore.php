<?php
require("../conf/dbSettings.php");
if (isset($_POST["firstname"]) && isset($_POST["lastname"]) && isset($_POST["email"]) && isset($_POST["score"])) {

	$firstname = $_POST["firstname"];
	$lastname = $_POST["lastname"];
	$email = $_POST["email"];
	$score = $_POST["score"];

	$sql = "
	INSERT INTO `scores`
	(`id`, `firstname`, `lastname`, `email`, `score`, `date`) 
	VALUES 
	(null,'" . $firstname ."','" . $lastname ."','" . $email ."','" . $score ."','');";
	$conn = new mysqli($hostname, $username, $password);
	$conn->select_db($dbname);
	$conn->query($sql);
	$sql = "SELECT * FROM `scores` ORDER BY `score` DESC LIMIT 10";
	$result = $conn->query($sql);

	$res = array("status" => "error");
	if ($result) {
		$i = 1;
		$scores = "<li>SCOREBOARD</li>";
		while ($row = $result->fetch_assoc()) {
			$scores .= "<li>".$i." - ".$row["firstname"]." ".$row["lastname"]." = ".$row["score"]."</li>";
			$i++;
		}
		$res = array("status" => "ok", "scores" => $scores);
	}

	$conn->close();
	echo json_encode($res);
}