<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class balanceGeneral extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getData(){

			//crear datos de ciclo contable
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE  show_by= '1' ORDER BY idCicloContable Desc");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			//inyecta en array
			$out[] = $retorna;

			$result = $this->_db->query("SELECT * FROM clasecuenta");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			//encerrar dentro de una interfaz para que sea accesible
			foreach ($retorna as $key => $value) {
				$out_conjunto_2[] = array( 
										'idClaseCuenta'=> $value['idClaseCuenta'], 
										'nom_ccuenta'=> $value['nom_ccuenta'], 
										'digito_ccuenta'=> $value['digito_ccuenta'], 
										'selected'=> false,
										);
			}

			//inyecta en array
			$out[] = $out_conjunto_2;

			//devuelve dato
			return $out;
			//print_r($out);
			$result->close();
		}//End function getData

		//funcion para mostrar todos los registros de una tabla
		public function makeDataActivo($ciclocontable){
			//crear condicion de checkbox seleccionados
			$condicionCheckbox = "and (ClaseCuenta_idClaseCuenta = 3 OR ClaseCuenta_idClaseCuenta = 1)";

			//crear el listado de cuentas con clase cuentas, toamado en cuenta que las subcuentas se encuentren dentro de ACTIVO PASIVO Y PATRIMONIO y ordenados.
			$result = $this->_db->query("SELECT cc.idClaseCuenta, cc.nom_ccuenta, cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, cu.tipo_cuenta, cu.aux_codcuenta,cu.ClaseCuenta_idClaseCuenta FROM cuenta cu, clasecuenta cc WHERE tipo_cuenta = 1 and cc.idClaseCuenta = cu.ClaseCuenta_idClaseCuenta ORDER BY aux_codcuenta ");

			$retorna = $result->fetch_all(MYSQL_ASSOC);


			foreach ($retorna as $key => $value) {

				//hallar el valor (saldo de una cuenta especifica), al no encontrarlo no lo inyecta en el array
				$result = $this->_db->query("SELECT cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, lm.nro_lm , lm.saldo_lm, ld.idld_detalle, ld.LibroDiario_idLibroDiario, lb.idLibroDiario, cc.idCicloContable, cc.gestion_ccontable FROM libromayor lm, ld_detalle ld, librodiario lb, ciclocontable cc, cuenta cu where lm.nro_lm = ld.idld_detalle and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.CicloContable_idCicloContable = cc.idCicloContable and cu.idCuenta = lm.Cuenta_idCuenta and lm.Cuenta_idCuenta = '".$value['idCuenta']."' and lm.show_by = 1 and cc.idCicloContable = '".$ciclocontable."' ORDER BY lm.idLibroMayor DESC LIMIT 1");

				$retorna_especifico = $result->fetch_all(MYSQL_ASSOC);
				//print_r(count($retorna_especifico));

				//verificamos que la cuenta tenga saldo caso contrario se ignora para el array de datos a enviar
				if (count($retorna_especifico) == 0 || $retorna_especifico == null) {
					
				}else{
					//crear array
					$outp[] = array( 
									'idCuenta'=> $retorna_especifico[0]['idCuenta'], 
									'cod_cuenta'=> $retorna_especifico[0]['cod_cuenta'], 
									'nom_cuenta'=> $retorna_especifico[0]['nom_cuenta'], 
									'saldo_lm'=> $retorna_especifico[0]['saldo_lm'],
									'gestion_ccontable'=> $retorna_especifico[0]['gestion_ccontable'], 
									'tipo_cuenta'=> $value['tipo_cuenta'], 
									'idClaseCuenta'=> $value['idClaseCuenta']
									);
				}


				
			}

			//devuelve dato
			return $outp;
			$result->close();

		}// End makeData


				//funcion para mostrar todos los registros de una tabla
		public function makeDataPasivo($ciclocontable){
			//crear condicion de checkbox seleccionados
			$condicionCheckbox = "and (ClaseCuenta_idClaseCuenta = 3 OR ClaseCuenta_idClaseCuenta = 1)";

			//crear el listado de cuentas con clase cuentas, toamado en cuenta que las subcuentas se encuentren dentro de ACTIVO PASIVO Y PATRIMONIO y ordenados.
			$result = $this->_db->query("SELECT cc.idClaseCuenta, cc.nom_ccuenta, cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, cu.tipo_cuenta, cu.aux_codcuenta,cu.ClaseCuenta_idClaseCuenta FROM cuenta cu, clasecuenta cc WHERE  tipo_cuenta = 2  and cc.idClaseCuenta = cu.ClaseCuenta_idClaseCuenta ORDER BY aux_codcuenta ");

			$retorna = $result->fetch_all(MYSQL_ASSOC);


			foreach ($retorna as $key => $value) {

				//hallar el valor (saldo de una cuenta especifica), al no encontrarlo no lo inyecta en el array
				$result = $this->_db->query("SELECT cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, lm.nro_lm , lm.saldo_lm, ld.idld_detalle, ld.LibroDiario_idLibroDiario, lb.idLibroDiario, cc.idCicloContable, cc.gestion_ccontable FROM libromayor lm, ld_detalle ld, librodiario lb, ciclocontable cc, cuenta cu where lm.nro_lm = ld.idld_detalle and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.CicloContable_idCicloContable = cc.idCicloContable and cu.idCuenta = lm.Cuenta_idCuenta and lm.Cuenta_idCuenta = '".$value['idCuenta']."' and lm.show_by = 1 and cc.idCicloContable = '".$ciclocontable."' ORDER BY lm.idLibroMayor DESC LIMIT 1");

				$retorna_especifico = $result->fetch_all(MYSQL_ASSOC);
				//print_r(count($retorna_especifico));

				//verificamos que la cuenta tenga saldo caso contrario se ignora para el array de datos a enviar
				if (count($retorna_especifico) == 0 || $retorna_especifico == null) {
					
				}else{
					//crear array
					$outp[] = array( 
									'idCuenta'=> $retorna_especifico[0]['idCuenta'], 
									'cod_cuenta'=> $retorna_especifico[0]['cod_cuenta'], 
									'nom_cuenta'=> $retorna_especifico[0]['nom_cuenta'], 
									'saldo_lm'=> $retorna_especifico[0]['saldo_lm'],
									'gestion_ccontable'=> $retorna_especifico[0]['gestion_ccontable'], 
									'tipo_cuenta'=> $value['tipo_cuenta'], 
									'idClaseCuenta'=> $value['idClaseCuenta']
									);
				}


				
			}

			//devuelve dato
			return $outp;
			$result->close();

		}// End makeData

				//funcion para mostrar todos los registros de una tabla
		public function makeDataPatrimonio($ciclocontable){
			//crear condicion de checkbox seleccionados
			$condicionCheckbox = "and (ClaseCuenta_idClaseCuenta = 3 OR ClaseCuenta_idClaseCuenta = 1)";

			//crear el listado de cuentas con clase cuentas, toamado en cuenta que las subcuentas se encuentren dentro de ACTIVO PASIVO Y PATRIMONIO y ordenados.
			$result = $this->_db->query("SELECT cc.idClaseCuenta, cc.nom_ccuenta, cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, cu.tipo_cuenta, cu.aux_codcuenta,cu.ClaseCuenta_idClaseCuenta FROM cuenta cu, clasecuenta cc WHERE tipo_cuenta = 3  and cc.idClaseCuenta = cu.ClaseCuenta_idClaseCuenta ORDER BY aux_codcuenta ");

			$retorna = $result->fetch_all(MYSQL_ASSOC);


			foreach ($retorna as $key => $value) {

				//hallar el valor (saldo de una cuenta especifica), al no encontrarlo no lo inyecta en el array
				$result = $this->_db->query("SELECT cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, lm.nro_lm , lm.saldo_lm, ld.idld_detalle, ld.LibroDiario_idLibroDiario, lb.idLibroDiario, cc.idCicloContable, cc.gestion_ccontable FROM libromayor lm, ld_detalle ld, librodiario lb, ciclocontable cc, cuenta cu where lm.nro_lm = ld.idld_detalle and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.CicloContable_idCicloContable = cc.idCicloContable and cu.idCuenta = lm.Cuenta_idCuenta and lm.Cuenta_idCuenta = '".$value['idCuenta']."' and lm.show_by = 1 and cc.idCicloContable = '".$ciclocontable."' ORDER BY lm.idLibroMayor DESC LIMIT 1");

				$retorna_especifico = $result->fetch_all(MYSQL_ASSOC);
				//print_r(count($retorna_especifico));

				//verificamos que la cuenta tenga saldo caso contrario se ignora para el array de datos a enviar
				if (count($retorna_especifico) == 0 || $retorna_especifico == null) {
					
				}else{
					//crear array
					$outp[] = array( 
									'idCuenta'=> $retorna_especifico[0]['idCuenta'], 
									'cod_cuenta'=> $retorna_especifico[0]['cod_cuenta'], 
									'nom_cuenta'=> $retorna_especifico[0]['nom_cuenta'], 
									'saldo_lm'=> $retorna_especifico[0]['saldo_lm'],
									'gestion_ccontable'=> $retorna_especifico[0]['gestion_ccontable'], 
									'tipo_cuenta'=> $value['tipo_cuenta'], 
									'idClaseCuenta'=> $value['idClaseCuenta']
									);
				}


				
			}

			//devuelve dato
			return $outp;
			$result->close();

		}// End makeData


	}



	//main para llamar a las clases
	//objeto a manipular
	$object = new balanceGeneral();
	

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->getData();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case 'activo':// insertar

			$outp = $object->makeDataActivo($_POST['ciclocontable']);
			
			echo json_encode($outp);
			break;
		case 'pasivo':// insertar

			$outp = $object->makeDataPasivo($_POST['ciclocontable']);
			
			echo json_encode($outp);
			break;
		case 'patrimonio':// insertar

			$outp = $object->makeDataPatrimonio($_POST['ciclocontable']);
			
			echo json_encode($outp);
			break;
		
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}
	
	

?>