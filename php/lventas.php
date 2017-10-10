<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class lventas extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getTable(){
			// creamos el array $retorna con los datos de la tabla lcompras
			$result = $this->_db->query("SELECT * FROM lventas WHERE  show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);


			//recorremos el array $retorna
			foreach ($retorna as $key => $value) {

				//buesqueda del proveedor
				// creamos el array $retorna con los datos de la tabla lcompras
				$result = $this->_db->query("SELECT * FROM cliente WHERE  show_by= '1' and 	idCliente = '".$value['Cliente_idCliente']."'");
				$retorna_proveedor = $result->fetch_all(MYSQL_ASSOC);

				//creamos fecha con vector $fecha_lcompras
				$fecha_lcompras = explode("-", $value['fecha_factv']);

				//formar el arrray delibro compras para la interfaz
				$outp[] = array('id'=> $value['idLventas'],
								'd'=> $fecha_lcompras[2],
								'm'=>$fecha_lcompras[1],
								'a'=>$fecha_lcompras[0],
								'cod_fuente'=>$retorna_proveedor[0]['cod_cliente'],
								'nom_fuente'=>$retorna_proveedor[0]['nom_cliente'],
								'nro_factura'=>$value['nro_factv'],
								'nro_autorizacion'=>$value['nro_autorizacionv'],
								'cod_control'=>$value['cod_controlv'],
								'total_factura'=>$value['importe_factv'],
								'total_ice'=>$value['importe_ICEv'],
								'total_exento'=>$value['importe_excentov'],
								'importe_neto'=>$value['importe_netov'],
								'fiscal'=> $value['df']);

				
				
			}
			return $outp;
			$result->close();
		}//End function getTable

		//funcion para mostrar todos los registros de una tabla
		public function getDataUsuarioEmpresa($_idUsuario){

			//hallar ciclo contable
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE show_by= '1' ORDER BY idCicloContable DESC LIMIT 1");
			$retorna_gestion = $result->fetch_all(MYSQL_ASSOC);

			//hallar empresa que pertenece el ciclo contable
			//hallar empresa
			$result = $this->_db->query("SELECT * FROM empresa WHERE show_by= '1' and idEmpresa = '".$retorna_gestion[0]['Empresa_idEmpresa']."'");
			$retorna_empresa = $result->fetch_all(MYSQL_ASSOC);


			//hallar usuario
			$result = $this->_db->query("SELECT * FROM usuario WHERE show_by= '1' and idUsuario = '".$_idUsuario."'");
			$retorna_usuario = $result->fetch_all(MYSQL_ASSOC);

			//formar el arrray delibro compras para la interfaz
				  $outp = array('gestion'=> $retorna_gestion[0]['gestion_ccontable'],
								'nom_fuente'=> $retorna_empresa[0]['nom_empresa'],
								'cod_fuente'=>$retorna_empresa[0]['nit_empresa'],
								'ci_usu'=>$retorna_usuario[0]['ci_usu'],
								'nombres_usu'=>$retorna_usuario[0]['nombres_usu'],
								'apellidos_usu'=>$retorna_usuario[0]['apellidos_usu']
								);

			return $outp;
		}

	}


	//main para llamar a las clases
	//objeto a manipular
	$object = new lventas();
	$table = "lventas"; //nombre de la tabla
	$nom_idTable = "	idLventas";

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->getTable();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case '1':// listar primera parte
			$outp = $object->getDataUsuarioEmpresa($_POST['idUsuario']);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		
		
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}

	
	

?>