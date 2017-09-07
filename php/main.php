<?php
	require_once "databaseModel.php";

	$listarObject = new databaseModel();

	switch ($_POST['opcion']) {
		case 'empresa':
			$outp = $listarObject->getTable("empresa","idEmpresa");
			echo json_encode($outp);
			break;
		case 'cicloContable':
			$outp = $listarObject->getTable("ciclocontable","idCicloContable");
			echo json_encode($outp);
			break;
		case 'moneda':
			$outp = $listarObject->getTable("moneda","idMoneda");
			echo json_encode($outp);
			break;
		case 'tipoCambio':
			$outp = $listarObject->getTable("tipocambio","idtipocambio");
			echo json_encode($outp);
			break;
		case 'usuario':
			$outp = $listarObject->getTable("usuario","idUsuario");
			echo json_encode($outp);
			break;
		case 'grupoUsuario':
			$outp = $listarObject->getTable("grupousu","idGrupoUsu");
			echo json_encode($outp);
			break;
		case 'claseCuenta':
			$outp = $listarObject->getTable("clasecuenta","idClaseCuenta");
			echo json_encode($outp);
			break;
		case 'cuenta':
			$outp = $listarObject->getTable("cuenta","aux_codcuenta");
			echo json_encode($outp);
			break;
		default:
			$outp = "Error en la opcion";
			echo json_encode($outp);
			break;
	}

	
?>