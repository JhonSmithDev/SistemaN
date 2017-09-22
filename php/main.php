<?php
	require_once "databaseModel.php";
	//BY NELY M CH M

	switch ($_POST['run']) {// tipo de accion a realizar como 0: listar, 1: insertar, 2: modificar y 3: eliminar
		
		case '4': // listar las tablas

			//instanciar objeto listar 
			$listarObject = new databaseModel();
			$outp = $listarObject->getTableId("".$_POST['opcion']."","".$_POST['order']."","".$_POST['nom_id']."","".$_POST['id']."");
			echo json_encode($outp);
			
			break;
		case '5': // el ultimo mayor

			//instanciar objeto listar 
			$listarObject = new databaseModel();
			$outp = $listarObject->getTableMayor("".$_POST['opcion']."","".$_POST['order']."");
			echo json_encode($outp);
			
			break;

		case '0': // listar las tablas

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
				case 'tipocambio':
					$outp = $listarObject->getTable("tipocambio","idtipocambio");
					echo json_encode($outp);
					break;
				case 'tipopago':
					$outp = $listarObject->getTable("tipopago","idTipoPago");
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
				case 'cliente':
					$outp = $listarObject->getTable("cliente","idCliente");
					echo json_encode($outp);
					break;
				case 'proveedor':
					$outp = $listarObject->getTable("proveedor","idProveedor");
					echo json_encode($outp);
					break;
				default:
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
			}
			break;
		
		case '1'://agregar o insertar

			//instanciar objeto agregar
			$agregarObject = new databaseModel();

			//seleccionar para opcion de menu
			switch ($_POST['opcion']) {
				case 'empresa':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $agregarObject->insertTable("null",
																"null",
																"empresa",
																"campo"
																);
							
							break;
						case 'insertar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $agregarObject->insertTable("null",
																$obj,
																"empresa",
																"insertar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				case 'cicloContable':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $agregarObject->insertTable("null",
																"null",
																"ciclocontable",
																"campo"
																);
							
							break;
						case 'insertar':
							// prepara comunicacion con bd para la agregar nuevo
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $agregarObject->insertTable("null",
																$obj,
																"ciclocontable",
																"insertar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				case 'moneda':
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
				case 'tipocambio':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $agregarObject->insertTable("null",
																"null",
																"tipocambio",
																"campo"
																);
							
							break;
						case 'insertar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $agregarObject->insertTable("null",
																$obj,
																"tipocambio",
																"insertar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
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
					$outp = $agregarObject->insertTable("'".$_POST['cod_cuenta']."'", "'".$_POST['nom_cuenta']."'", "cuenta","null");
					echo json_encode($outp);
					break;
				case 'cliente':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $agregarObject->insertTable("null",
																"null",
																"cliente",
																"campo"
																);
							
							break;
						case 'insertar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $agregarObject->insertTable("null",
																$obj,
																"cliente",
																"insertar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				case 'proveedor':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $agregarObject->insertTable("null",
																"null",
																"proveedor",
																"campo"
																);
							
							break;
						case 'insertar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $agregarObject->insertTable("null",
																$obj,
																"proveedor",
																"insertar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				default:
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
			}
			break;
		case '2'://modificar

			//instanciar objeto modificar
			$modificarObject = new databaseModel();

			//seleccionar para opcion de menu
			switch ($_POST['opcion']) {
				case 'empresa':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $modificarObject->updateTable("empresa", 
																"idEmpresa", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																"null data", 
																"campo"
																);
							
							break;
						case 'modificar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $modificarObject->updateTable("empresa", 
																"idEmpresa", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																$obj, 
																"modificar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				case 'cicloContable':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $modificarObject->updateTable("ciclocontable", 
																"idCicloContable", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																"null data", 
																"campo"
																);
							
							break;
						case 'modificar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $modificarObject->updateTable("ciclocontable", 
																"idCicloContable", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																$obj, 
																"modificar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
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
					$outp = $modificarObject->updateTable("cuenta","cod_cuenta","'".$_POST['cod_cuenta']."'","nom_cuenta", "'".$_POST['nom_cuenta']."'", "null");
					echo json_encode($outp);
					break;
				case 'cliente':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $modificarObject->updateTable("cliente", 
																"idCliente", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																"null data", 
																"campo"
																);
							
							break;
						case 'modificar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $modificarObject->updateTable("cliente", 
																"idCliente", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																$obj, 
																"modificar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				case 'proveedor':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $modificarObject->updateTable("proveedor", 
																"idProveedor", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																"null data", 
																"campo"
																);
							
							break;
						case 'modificar':
							// prepara comunicacion con bd para la agregar nueva empresa
							$json = $_POST['data'];
							$obj = json_decode($json, true);
							$outp = $modificarObject->updateTable("proveedor", 
																"idProveedor", 
																"'".$_POST['id']."'", 
																"null nom_ data", 
																$obj, 
																"modificar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				default:
					$outp = "Error en la opcion";
					echo json_encode($outp);
					break;
			}
			break;
		case '3'://eliminar

			//instanciar objeto eliminar
			$eliminarObject = new databaseModel();

			//seleccionar para opcion de menu
			switch ($_POST['opcion']) {
				case 'empresa':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $eliminarObject->deleteTable("empresa",
																 "idEmpresa",
																 "'".$_POST['id']."'",
																 "campo"
																);
							
							break;
						case 'eliminar':
							// prepara comunicacion con bd para la agregar nueva empresa
			
							//prepara todos los campos a adiocionar						
							$outp = $eliminarObject->deleteTable("empresa",
																 "idEmpresa",
																 "'".$_POST['id']."'",
																 "eliminar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
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
					$outp = $eliminarObject->deleteTable("cuenta","cod_cuenta","'".$_POST['cod_cuenta']."'", "null");
					echo json_encode($outp);
					break;
				case 'cliente':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $eliminarObject->deleteTable("cliente",
																 "idCliente",
																 "'".$_POST['id']."'",
																 "campo"
																);
							
							break;
						case 'eliminar':
							// prepara comunicacion con bd para la agregar nueva empresa
			
							//prepara todos los campos a adiocionar						
							$outp = $eliminarObject->deleteTable("cliente",
																 "idCliente",
																 "'".$_POST['id']."'",
																 "eliminar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
					echo json_encode($outp);
					break;
				case 'proveedor':
					switch ($_POST['tipo']) {
						case 'campo':	
							//prepara todos los campos a adiocionar						
							$outp = $eliminarObject->deleteTable("proveedor",
																 "idProveedor",
																 "'".$_POST['id']."'",
																 "campo"
																);
							
							break;
						case 'eliminar':
							// prepara comunicacion con bd para la agregar nueva empresa
			
							//prepara todos los campos a adiocionar						
							$outp = $eliminarObject->deleteTable("proveedor",
																 "idProveedor",
																 "'".$_POST['id']."'",
																 "eliminar"
																);	
																							
							break;
						
						default:
							$outp = "Error en el tipo";
							break;
					}
					//envia json con lo necesario para proceder.
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
	}

		

	
?>