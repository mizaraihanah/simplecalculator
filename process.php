<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["result"])) {
    $result = $_POST["result"];
    setcookie("calcHistory", $result, time() + 3600, "/");
}
?>
