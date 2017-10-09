<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class lcompras extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getTable(){
			// creamos el array $retorna con los datos de la tabla lcompras
			$result = $this->_db->query("SELECT * FROM lcompras WHERE  show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);


			//recorremos el array $retorna
			foreach ($retorna as $key => $value) {

				//buesqueda del proveedor
				// creamos el array $retorna con los datos de la tabla lcompras
				$result = $this->_db->query("SELECT * FROM proveedor WHERE  show_by= '1' and idProveedor = '".$value['Proveedor_idProveedor']."'");
				$retorna_proveedor = $result->fetch_all(MYSQL_ASSOC);

				//creamos fecha con vector $fecha_lcompras
				$fecha_lcompras = explode("-", $value['fecha_factc']);

				//formar el arrray delibro compras para la interfaz
				$outp[] = array('id'=> $value['idLcompras'],
								'd'=> $fecha_lcompras[2],
								'm'=>$fecha_lcompras[1],
								'a'=>$fecha_lcompras[0],
								'cod_fuente'=>$retorna_proveedor[0]['cod_prov'],
								'nom_fuente'=>$retorna_proveedor[0]['nom_prov'],
								'nro_factura'=>$value['nro_factc'],
								'nro_autorizacion'=>$value['nro_autorizacionc'],
								'cod_control'=>$value['cod_controlc'],
								'total_factura'=>$value['importe_factc'],
								'total_ice'=>$value['importe_ICEc'],
								'total_exento'=>$value['importe_excentoc'],
								'importe_neto'=>$value['importe_netoc'],
								'fiscal'=> $value['cf']);

				
				
			}
			return $outp;
			$result->close();
		}//End function getTable

	}


	//main para llamar a las clases
	//objeto a manipular
	$object = new lcompras();
	$table = "lcompras"; //nombre de la tabla
	$nom_idTable = "idLcompras";

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->getTable();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}

	
	

?>