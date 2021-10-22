<?php
  require '../php/db.php';

  $link = mysqli_connect($host, $user, $password, $db) or die("Ошибка " . mysqli_error($link));

  $sql = "SELECT * FROM todo;";
  $result = $link->query($sql);

  $todos = array();
  while($row = $result->fetch_assoc()) {
    $todo[] = $row;
  }
  echo json_encode($todo);
?>