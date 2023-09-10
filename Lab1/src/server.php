<?php

@session_start();
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (!isset($_SESSION["table"])) init_table();

    $x = (float) $_GET["x"];
    $y = (float) $_GET["y"];
        
    $r = (float) $_GET["r"];
    $result = "Промах";
    if (check_hit($x, $y, $r)) $result = "Попадание";

    $current_time = date("H : i : s");
    $exec_time = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];

    $res = "
        <tr>
            <td>$x</td>
            <td>$y</td>
            <td>$r</td>
            <td>$result</td>
            <td>$current_time</td>
            <td>$exec_time</td>
        </tr>
    ";
    send_response($res);
}

function check_hit($x, $y, $r) {
    if ($x > 0 and $y > 0 and $x + $y <= $r) return true;// I quarter
    if (pow($x, 2) + pow($y, 2) <= pow($r/2, 2) and $y > 0 and $x < 0) return true; // II querter
    if ($x < $r and $x > 0 and $y > -$r/2 and $y < 0) return true; // IV quarter
    return false;
}

function send_response($res) {
    $response = "";

    array_push($_SESSION["table"], $res);

    foreach ($_SESSION["table"] as $row) $response .= $row;
    $response .= "</table>";

    header('Access-Control-Allow-Origin: *');
    echo $response;
}

function init_table() {
    $_SESSION["table"] = array();
    array_push($_SESSION["table"], "
        <table id=\"outputTable\" cellspacing=\"0\" cellpadding=\"0\">
        <tr>
            <th class=\"tableHeader\">X</th>
            <th class=\"tableHeader\">Y</th>
            <th class=\"tableHeader\">R</th>
            <th class=\"tableHeader\">Результат</th>
            <th class=\"tableHeader\">Текущее время</th>
            <th class=\"tableHeader\">Время работы скрипта</th>
        </tr>
    ");
}

