<?php
	
	include "conexion.php";

	$link = mysqli_connect($var_host, $var_user, $var_password, $var_baseDatos);
	$cont = 0;
	$dato = "";
	$user = "";
	$psw = "";
	$emp = "";
	$rol = "";
	$id_usuario = "";


if( isset($_POST['psw']) ) {
	$sql2 = "SELECT * FROM usuario WHERE  login_usu ='".$_POST['user']."'";

    $result2 = mysqli_query($link,$sql2)or die(mysqli_error());

    $user = $_POST['user'];
    $psw = $_POST['psw'];
    while($row = mysqli_fetch_array($result2)) {

    	$emp = $row['nombres_usu']." ".$row['apellidos_usu'];
		$dato = $row['pass_usu'];
		$id_usuario = $row['login_usu'];
		//$rol = $row['rol'];
        $cont++;
    }
}

	if ($cont == 1) {
		if ( $psw == md5($dato)) {
			//$json_grid[0]['nombre'] = $emp;
			$json_grid[0]['nombre'] = $emp;
			//$json_grid[0]['rol'] = $rol;
			$json_grid[0]['id_usuario'] = $id_usuario;
			if ($rol == "administrador") {
			
			}
			if ($rol == "otros") {
			
			}

		}else{
			$json_grid[0]['nombre'] = "0";
		}

	}else{
		$json_grid[0]['nombre'] = "0";
	};
	echo json_encode($json_grid);
	mysqli_close($link);		
?>