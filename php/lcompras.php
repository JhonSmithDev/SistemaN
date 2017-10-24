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

		//funcion para cargar los siglos contables
		public function getCicloCotable(){
			// creamos el array $retorna con los datos de la tabla lcompras
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE show_by = '1' ORDER BY idCicloContable DESC");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			return $retorna;
		}

		//funcion para mostrar todos los registros de una tabla
		public function getTable($_idCicloContable){
			// creamos el array $retorna con los datos de la tabla lcompras
			$result = $this->_db->query("SELECT cc.idCicloContable, cc.gestion_ccontable, cc.obs_ccontable, cc.Empresa_idEmpresa, lb.idLibroDiario, lb.Comprobante_idComprobante, eg.idEgreso, eg.Comprobante_idComprobante, lc.idLcompras, lc.fecha_factc, lc.nro_factc, lc.nro_autorizacionc, lc.cod_controlc, lc.importe_factc, lc.importe_ICEc, lc.importe_excentoc, lc.importe_netoc, lc.cf, lc.Egreso_idEgreso, lc.Proveedor_idProveedor, lc.Egreso_idEgreso  FROM ciclocontable cc, librodiario lb, egreso eg, lcompras lc WHERE cc.idCicloContable = lb.CicloContable_idCicloContable and eg.Comprobante_idComprobante = lb.Comprobante_idComprobante and lc.Egreso_idEgreso = eg.idEgreso and cc.idCicloContable = '".$_idCicloContable."' and lc.show_by = '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);


			//recorremos el array $retorna
			foreach ($retorna as $key => $value) {

				//buesqueda del proveedor
				// creamos el array $retorna con los datos de la tabla lcompras
				$result = $this->_db->query("SELECT * FROM cliente WHERE  show_by= '1' and 	idCliente = '".$value['Proveedor_idProveedor']."'");
				$retorna_proveedor = $result->fetch_all(MYSQL_ASSOC);

				//creamos fecha con vector $fecha_lcompras
				$fecha_lcompras = explode("-", $value['fecha_factc']);

				//formar el arrray delibro compras para la interfaz
				$outp[] = array('id'=> $value['idLcompras'],
								'd'=> $fecha_lcompras[2],
								'm'=>$fecha_lcompras[1],
								'a'=>$fecha_lcompras[0],
								'cod_fuente'=>$retorna_proveedor[0]['cod_cliente'],
								'nom_fuente'=>$retorna_proveedor[0]['nom_cliente'],
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

		//funcion para mostrar todos los registros de una tabla
		public function getDataUsuarioEmpresa($_idUsuario, $_idCicloContable){

			//hallar ciclo contable
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE show_by= '1' and idCicloContable = '".$_idCicloContable."'");
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
	$object = new lcompras();
	$table = "lcompras"; //nombre de la tabla
	$nom_idTable = "idLcompras";

	switch ($_POST['run']) {
		case '0':// listar 
			$outp = $object->getCicloCotable();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case '1':// listar primera parte
			$outp = $object->getTable($_POST['idCicloContable']);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		
		case '2':// listar primera parte
			$outp = $object->getDataUsuarioEmpresa($_POST['idUsuario'], $_POST['idCicloContable']);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;

		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}

	
	

?>