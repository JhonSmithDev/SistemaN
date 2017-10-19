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
			$result = $this->_db->query("SELECT cc.idCicloContable, cc.gestion_ccontable, ig.idIngreso, ig.Comprobante_idComprobante, com.idComprobante, lb.idLibroDiario, ld.idld_detalle, ld.LibroDiario_idLibroDiario, ld.Cuenta_idCuenta  FROM ingreso ig, comprobante com, librodiario lb, ld_detalle ld, ciclocontable cc WHERE ig.Comprobante_idComprobante = com.idComprobante and com.idComprobante = lb.Comprobante_idComprobante and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.CicloContable_idCicloContable = cc.idCicloContable and lb.CicloContable_idCicloContable = '".$CicloContable_idCicloContable."' GROUP BY ld.Cuenta_idCuenta");
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

		//funcion para mostrar todos los registros de una tabla
		public function getEgreso($CicloContable_idCicloContable){
			//lista todas las cuentas que existe en la tabla ingreso de la gestion X
			$result = $this->_db->query("SELECT cc.idCicloContable, cc.gestion_ccontable, eg.idEgreso, eg.Comprobante_idComprobante, com.idComprobante, lb.idLibroDiario, ld.idld_detalle, ld.LibroDiario_idLibroDiario, ld.Cuenta_idCuenta  FROM egreso eg, comprobante com, librodiario lb, ld_detalle ld , ciclocontable cc WHERE eg.Comprobante_idComprobante = com.idComprobante and com.idComprobante = lb.Comprobante_idComprobante and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and lb.CicloContable_idCicloContable = cc.idCicloContable and lb.CicloContable_idCicloContable = '".$CicloContable_idCicloContable."' GROUP BY ld.Cuenta_idCuenta");
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