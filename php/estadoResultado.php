<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class estadoResultado extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getData(){

			//crear datos de ciclo contable
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE  show_by= '1' ORDER BY idCicloContable Desc");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			//devuelve dato
			return $retorna;
			//print_r($out);
			$result->close();
		}//End function getData

		//funcion para mostrar todos los registros de una tabla
		public function getIngreso($CicloContable_idCicloContable){
			//lista todas las cuentas que existe en la tabla ingreso de la gestion X
			$result = $this->_db->query("SELECT cl.idClaseCuenta, cl.nom_ccuenta, cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, cu.tipo_cuenta, cu.ClaseCuenta_idClaseCuenta, ld.idld_detalle, ld.Cuenta_idCuenta, ld.LibroDiario_idLibroDiario, lb.idLibroDiario, lb.CicloContable_idCicloContable, cc.idCicloContable, cc.gestion_ccontable FROM clasecuenta cl, cuenta cu, ld_detalle ld, librodiario lb, ciclocontable cc WHERE cl.idClaseCuenta = cu.ClaseCuenta_idClaseCuenta and ld.Cuenta_idCuenta = cu.idCuenta and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.show_by = 1 and lb.CicloContable_idCicloContable = cc.idCicloContable and cc.idCicloContable = '".$CicloContable_idCicloContable."' and cu.tipo_cuenta = 4   GROUP BY cu.idCuenta ORDER BY cu.aux_codcuenta");
			// carga los datos en un array para ser recorrido
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			foreach ($retorna as $key => $value) {
				//inyecta el saldo correspondiente
				$result = $this->_db->query("SELECT cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, lm.idLibroMayor, lm.saldo_lm FROM libromayor lm, cuenta cu WHERE cu.idCuenta = lm.Cuenta_idCuenta and lm.Cuenta_idCuenta = '".$value['Cuenta_idCuenta']."' ORDER BY idLibroMayor DESC LIMIT 1");
				// carga los datos en un array para ser recorrido
				$retorna_lm = $result->fetch_all(MYSQL_ASSOC);

				$out[] = array('idCuenta'=> $retorna_lm[0]['idCuenta'],
							   'cod_cuenta'=> $retorna_lm[0]['cod_cuenta'],
							   'nom_cuenta'=> $retorna_lm[0]['nom_cuenta'],
							   'saldo_lm'=> $retorna_lm[0]['saldo_lm']
								);
			}
			
			//print_r($out);
			return $out;
			$result->close();
		}//End function getTable

		//funcion para mostrar todos los registros de una tabla
		public function getEgreso($CicloContable_idCicloContable){
			//lista todas las cuentas que existe en la tabla ingreso de la gestion X
			$result = $this->_db->query("SELECT cl.idClaseCuenta, cl.nom_ccuenta, cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, cu.tipo_cuenta, cu.ClaseCuenta_idClaseCuenta, ld.idld_detalle, ld.Cuenta_idCuenta, ld.LibroDiario_idLibroDiario, lb.idLibroDiario, lb.CicloContable_idCicloContable, cc.idCicloContable, cc.gestion_ccontable FROM clasecuenta cl, cuenta cu, ld_detalle ld, librodiario lb, ciclocontable cc WHERE cl.idClaseCuenta = cu.ClaseCuenta_idClaseCuenta and ld.Cuenta_idCuenta = cu.idCuenta and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.show_by = 1 and lb.CicloContable_idCicloContable = cc.idCicloContable and cc.idCicloContable = '".$CicloContable_idCicloContable."' and cu.tipo_cuenta = 5   GROUP BY cu.idCuenta ORDER BY cu.aux_codcuenta");
			// carga los datos en un array para ser recorrido
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			foreach ($retorna as $key => $value) {
				//inyecta el saldo correspondiente
				$result = $this->_db->query("SELECT cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, lm.idLibroMayor, lm.saldo_lm FROM libromayor lm, cuenta cu WHERE cu.idCuenta = lm.Cuenta_idCuenta and lm.Cuenta_idCuenta = '".$value['Cuenta_idCuenta']."' ORDER BY idLibroMayor DESC LIMIT 1");
				// carga los datos en un array para ser recorrido
				$retorna_lm = $result->fetch_all(MYSQL_ASSOC);

				$out[] = array('idCuenta'=> $retorna_lm[0]['idCuenta'],
							   'cod_cuenta'=> $retorna_lm[0]['cod_cuenta'],
							   'nom_cuenta'=> $retorna_lm[0]['nom_cuenta'],
							   'saldo_lm'=> $retorna_lm[0]['saldo_lm']
								);
			}
			
			return $out;
			$result->close();
		}//End function getTable


	}



	//main para llamar a las clases
	//objeto a manipular
	$object = new estadoResultado();

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->getData();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case 'ingreso':// listar
			$outp = $object->getIngreso($_POST['ciclocontable']);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case 'egreso':// insertar

			$outp = $object->getEgreso($_POST['ciclocontable']);
			//envia json a amgularjs 
			
			echo json_encode($outp);
			break;
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}

	
	

?>