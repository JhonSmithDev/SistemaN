<?php
	require_once "databaseModel.php";
	//BY NELY M CH M

	switch ($_POST['run']) {
		case '0':

			//instanciar objeto listar 
			$listarObject = new databaseModel();

			//seleccionar para opcion de menu
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
			break;
		
		case '1':

			//instanciar objeto agregar
			$agregarObject = new databaseModel();

			//seleccionar para opcion de menu
			switch ($_POST['opcion']) {
				case 'empresa':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'cicloContable':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'moneda':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'tipoCambio':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'usuario':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'grupoUsuario':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'claseCuenta':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'cuenta':
					$outp = $agregarObject->insertTable("'".$_POST['cod_cuenta']."'", "'".$_POST['nom_cuenta']."'", "cuenta");
					echo json_encode($outp);
					break;
				default:
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
			}
			break;
		case '2':

			//instanciar objeto modificar
			$modificarObject = new databaseModel();

			//seleccionar para opcion de menu
			switch ($_POST['opcion']) {
				case 'empresa':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'cicloContable':
					$$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'moneda':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'tipoCambio':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'usuario':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'grupoUsuario':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'claseCuenta':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'cuenta':
					$outp = $modificarObject->updateTable("cuenta","cod_cuenta","'".$_POST['cod_cuenta']."'","nom_cuenta", "'".$_POST['nom_cuenta']."'");
					echo json_encode($outp);
					break;
				default:
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
			}
			break;
		case '3':

			//instanciar objeto eliminar
			$agregarObject = new databaseModel();

			//seleccionar para opcion de menu
			switch ($_POST['opcion']) {
				case 'empresa':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'cicloContable':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'moneda':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'tipoCambio':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'usuario':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'grupoUsuario':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'claseCuenta':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'cuenta':
					$outp = $agregarObject->deleteTable("cuenta","cod_cuenta","'".$_POST['cod_cuenta']."'");
					echo json_encode($outp);
					break;
				default:
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
			}
			break;

		default:
			
			$outp = "Error en run";
			echo json_encode($outp);
			break;
			break;
	}

		

	
?>