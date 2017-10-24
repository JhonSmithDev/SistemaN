<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class comprobanteIngreso extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getCicloContable(){
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE  show_by= '1' ORDER BY idCicloContable DESC");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			
			return $retorna;
			$result->close();
		}//End function getTable

		//funcion para mostrar todos los registros de una tabla
		public function getComprobante($_idCicloContable){
			$result = $this->_db->query("SELECT * FROM ingreso ing, comprobante com , librodiario lb, ciclocontable cc WHERE ing.Comprobante_idComprobante = com.idComprobante and com.idComprobante = lb.Comprobante_idComprobante and lb.CicloContable_idCicloContable = cc.idCicloContable and cc.show_by = 1 and cc.idCicloContable = '".$_idCicloContable."'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			
			return $retorna;
			$result->close();
		}//End function getTable

		//funcion para mostrar todos los registros de una tabla
		public function getDetalle($_idComprobante){
			$result = $this->_db->query("SELECT com.idComprobante, com.sigla_comp, ld.debe_bs, ld.haber_bs, ld.debe_us, ld.haber_us,cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta FROM comprobante com, librodiario lb, ld_detalle ld, cuenta cu WHERE lb.Comprobante_idComprobante = com.idComprobante and ld.LibroDiario_idLibroDiario = lb.idLibroDiario and cu.idCuenta = ld.Cuenta_idCuenta and com.idComprobante = '".$_idComprobante."'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			
			return $retorna;
			$result->close();
		}//End function getTable

	}		



	//main para llamar a las clases
	//objeto a manipular
	$object = new comprobanteIngreso();

	switch ($_POST['opcion']) {
		case 'cc':// listar ciclocontable
			$outp = $object->getCicloContable();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case 'co':// listar comprobante

			$outp = $object->getComprobante($_POST['idCicloContable']);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case 'de':// listar detalle de comprobante
			$outp = $object->getDetalle($_POST['idComprobante']);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
			break;
		
		default:
			array('mensaje'=> "Error tipo OPCION");
			echo json_encode($outp);
			break;
	}	

?>