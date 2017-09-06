<?php
    include "conexion.php";
    $link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);

    //$sql2 = 'SELECT * FROM nota ORDER BY id_nota DESC';
    //$sql2 = "SELECT * FROM nota where year(fecha_creacion) ='".$_POST['year']."'  and MONTH(fecha_creacion) = '".$_POST['month']."' ORDER BY id_nota DESC";
    mysqli_set_charset($link,"utf8");

    $sql2 = 'SELECT * FROM cuenta ORDER BY aux_codcuenta ';
    
    $result = mysqli_query($link,$sql2)or die(mysqli_error());

    $outp = $result->fetch_all(MYSQLI_ASSOC);

    header('Content-type: application/json; charset=utf-8');
    //echo json_encode($json_grid, JSON_FORCE_OBJECT);
    echo json_encode($outp);
    //echo json_last_error();
    //echo "<pre>";
    //print_r($json_grid);
    //echo "</pre>";


    mysqli_close($link);        
?>