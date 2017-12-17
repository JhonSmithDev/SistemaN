<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class libromayor extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para la interfaz de libro mayor
		public function crearInterfaz($table){

			//valor de nro de libro mayor por defecto empezara en 1
			$num_libromayor = 1;

			//creacion del total de cuentas en libro mayor
			$result = $this->_db->query("SELECT * FROM libromayor WHERE  show_by= '1' GROUP BY Cuenta_idCuenta");
			$retorna_libroMayorPorCuenta = $result->fetch_all(MYSQL_ASSOC);

			//print_r($retorna_libroMayorPorCuenta);
			//recorre las cuentas existentes
			foreach ($retorna_libroMayorPorCuenta as $key => $value) {
				$array = array();
				//creacion del total de cuentas en libro mayor
				$result = $this->_db->query("SELECT lm.idLibroMayor,ld.detalle_ldd ,ld.debe_bs, ld.haber_bs , lm.saldo_lm , cu.idCuenta, cu.cod_cuenta, cu.nom_cuenta, co.sigla_comp, co.fecha_comp FROM libromayor lm, cuenta cu, comprobante co, ld_detalle ld WHERE lm.Cuenta_idCuenta = cu.idCuenta and lm.Comprobante_idComprobante = co.idComprobante and ld.idld_detalle = lm.nro_lm and cu.idCuenta = '".$value['Cuenta_idCuenta']."' ORDER BY lm.idLibroMayor");


				$array = $result->fetch_all(MYSQL_ASSOC);



				//formar el arrray de mayor para la interfaz
				$outp[] = array('id'=> $num_libromayor,
								'num_lm'=> $num_libromayor,
								'id_cuenta'=>$value['Cuenta_idCuenta'],
								'value'=> $array);

				//el contador aumenta en 1
				$num_libromayor = 1 + $num_libromayor;
				
			}

			//print_r($outp);
			return $outp;
			$result->close();
		}//End function getTable

		//funcion para mostrar los campos de una tabla
		public function showTable($table){

			/*
			//codigo cuando es dato foraneo
			$result = $this->_db->query("SELECT * FROM ".$table." WHERE  show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			
			//creacion de array
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['nombre_proveedor'],
									 'value'=> $valor['nombre_proveedor']
									);

			}
			//print_r($outp_select);
			$result->close();
			
			//creacion de arrays de campos
			$outp = array();

			// Creacion de campos
			$outp[] = array('name'=> "nombre_proveedor",
							'label'=> "NOMBRE PROVEEDOR",
							'tipo'=> "select",
							'class'=> "",
							'valueSelect'=> $outp_select,
							'value'=> $outp_select);


			$result = $this->_db->query("SELECT * FROM productos WHERE elimina = '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			
			//creacion de array
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['id_producto'],
									 'value'=> $valor['nombre_producto']
									);

			}
			//print_r($outp_select);
			$result->close();
			*/

			$outp[] = array('name'=> "nit_empresa",
							'label'=> "NIT DE EMPRESA",
							'tipo'=> "text",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "");

			$outp[] = array('name'=> "nom_empresa",
							'label'=> "NOMBRE EMPRESA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "");

			$outp[] = array('name'=> "tipo_empresa",
							'label'=> "TIPO DE EMPRESA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "");

			
			//bandera para controlar la eliminacion
			$outp[] = array('name'=> "show_by",
							'label'=> "",
							'tipo'=> "text-block",
							'class'=> "hide",
							'value'=> "1");

			//print_r($outp);

			return $outp;
		}//End function showTable

		//funcion para mostrar los campos de una tabla
		public function showTableAllModify($table, $nom_idTable, $id){
			//creacion de arrays de campos
			$outp = array();
			
			//CAASO LLAVE FORANEA
			//tabla principal
			$result_main = $this->_db->query("SELECT * FROM ".$table." WHERE show_by = '1' and ".$nom_idTable." = '".$id."'");
			$retorna_main = $result_main->fetch_all(MYSQL_ASSOC);
			$result_main->close();
			/*
			//tabla select all
			$result_select = $this->_db->query("SELECT * FROM proveedor WHERE elimina = '1'");
			$retorna_select = $result_select->fetch_all(MYSQL_ASSOC);
			
			//creacion de array para select all
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna_select as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['nombre_proveedor'],
									   'value'=> $valor['nombre_proveedor']
									   );

			}

			//table select selected
			$result_selectId = $this->_db->query("SELECT * FROM proveedor WHERE elimina = '1' and nombre_proveedor = '".$retorna_main[0]['nombre_proveedor']."'");
			$retorna_selectId = $result_selectId->fetch_all(MYSQL_ASSOC);

			//$retorna_selectId = json_decode($retorna_selectId, true);
			//creacion de array para select selected
			$outp_selectId = array();
			$id_selectId = "";
			$value_selectId = "";

			//formando para el select
			foreach ($retorna_selectId as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_selectId = array('id'=> $valor['nombre_proveedor'],
									 	 'value'=> $valor['nombre_proveedor']
									    );

			}
			$result_select->close();
			$result_selectId->close();

			$result_main->close();
			//print_r($outp_selectId);

			//print_r($outp_select);
			
			

			//creacion de arrays de campos
			$outp = array();

			// Creacion de campos
			$outp[] = array('name'=> "nombre_proveedor",
							'label'=> "NOMBRE PROVEEDOR",
							'tipo'=> "select-block",
							'class'=> "",
							'valueSelect'=> $outp_selectId,
							'value'=> $outp_select);
			

			//tabla select all
			$result_select = $this->_db->query("SELECT * FROM productos WHERE elimina = '1'");
			$retorna_select = $result_select->fetch_all(MYSQL_ASSOC);
			
			//creacion de array para select all
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna_select as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['id_producto'],
									   'value'=> $valor['nombre_producto']
									   );

			}

			//table select selected
			$result_selectId = $this->_db->query("SELECT * FROM productos WHERE elimina = '1' and id_producto = '".$retorna_main[0]['id_producto']."'");
			$retorna_selectId = $result_selectId->fetch_all(MYSQL_ASSOC);

			//$retorna_selectId = json_decode($retorna_selectId, true);
			//creacion de array para select selected
			$outp_selectId = array();
			$id_selectId = "";
			$value_selectId = "";

			//formando para el select
			foreach ($retorna_selectId as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_selectId = array('id'=> $valor['id_producto'],
									 	 'value'=> $valor['nombre_producto']
									    );

			}
			$result_select->close();
			$result_selectId->close();
			*/
			$outp[] = array('name'=> "idEmpresa",
							'label'=> "ID EMPRESA",
							'tipo'=> "text-block",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "".$retorna_main[0]['idEmpresa']."");

			$outp[] = array('name'=> "nit_empresa",
							'label'=> "NIT DE EMPRESA",
							'tipo'=> "text",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "".$retorna_main[0]['nit_empresa']."");

			$outp[] = array('name'=> "nom_empresa",
							'label'=> "NOMBRE EMPRESA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "".$retorna_main[0]['nom_empresa']."");

			$outp[] = array('name'=> "tipo_empresa",
							'label'=> "TIPO DE EMPRESA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "".$retorna_main[0]['tipo_empresa']."");

			

			//print_r($outp);
			
			return $outp;
		}//End function showTable

		//funcion para mostrar los campos de una tabla
		public function showTableAllDelete($table, $nom_idTable, $id){
			//creacion de arrays de campos
			$outp = array();
			
			//CAASO LLAVE FORANEA
			//tabla principal
			$result_main = $this->_db->query("SELECT * FROM ".$table." WHERE show_by = '1' and ".$nom_idTable." = '".$id."'");
			$retorna_main = $result_main->fetch_all(MYSQL_ASSOC);
			$result_main->close();
			/*
			//tabla select all
			$result_select = $this->_db->query("SELECT * FROM proveedor WHERE elimina = '1'");
			$retorna_select = $result_select->fetch_all(MYSQL_ASSOC);
			
			//creacion de array para select all
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna_select as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['nombre_proveedor'],
									   'value'=> $valor['nombre_proveedor']
									   );

			}

			//table select selected
			$result_selectId = $this->_db->query("SELECT * FROM proveedor WHERE elimina = '1' and nombre_proveedor = '".$retorna_main[0]['nombre_proveedor']."'");
			$retorna_selectId = $result_selectId->fetch_all(MYSQL_ASSOC);

			//$retorna_selectId = json_decode($retorna_selectId, true);
			//creacion de array para select selected
			$outp_selectId = array();
			$id_selectId = "";
			$value_selectId = "";

			//formando para el select
			foreach ($retorna_selectId as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_selectId = array('id'=> $valor['nombre_proveedor'],
									 	 'value'=> $valor['nombre_proveedor']
									    );

			}
			$result_select->close();
			$result_selectId->close();

			$result_main->close();
			//print_r($outp_selectId);

			//print_r($outp_select);
			
			

			//creacion de arrays de campos
			$outp = array();

			// Creacion de campos
			$outp[] = array('name'=> "nombre_proveedor",
							'label'=> "NOMBRE PROVEEDOR",
							'tipo'=> "select-block",
							'class'=> "",
							'valueSelect'=> $outp_selectId,
							'value'=> $outp_select);
			

			//tabla select all
			$result_select = $this->_db->query("SELECT * FROM productos WHERE elimina = '1'");
			$retorna_select = $result_select->fetch_all(MYSQL_ASSOC);
			
			//creacion de array para select all
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna_select as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['id_producto'],
									   'value'=> $valor['nombre_producto']
									   );

			}

			//table select selected
			$result_selectId = $this->_db->query("SELECT * FROM productos WHERE elimina = '1' and id_producto = '".$retorna_main[0]['id_producto']."'");
			$retorna_selectId = $result_selectId->fetch_all(MYSQL_ASSOC);

			//$retorna_selectId = json_decode($retorna_selectId, true);
			//creacion de array para select selected
			$outp_selectId = array();
			$id_selectId = "";
			$value_selectId = "";

			//formando para el select
			foreach ($retorna_selectId as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_selectId = array('id'=> $valor['id_producto'],
									 	 'value'=> $valor['nombre_producto']
									    );

			}
			$result_select->close();
			$result_selectId->close();
			*/
			$outp[] = array('name'=> "idEmpresa",
							'label'=> "ID EMPRESA",
							'tipo'=> "text-block",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "".$retorna_main[0]['idEmpresa']."");

			$outp[] = array('name'=> "nit_empresa",
							'label'=> "NIT DE EMPRESA",
							'tipo'=> "text-block",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "".$retorna_main[0]['nit_empresa']."");

			$outp[] = array('name'=> "nom_empresa",
							'label'=> "NOMBRE EMPRESA",
							'tipo'=> "text-block",
							'class'=> "",
							'value'=> "".$retorna_main[0]['nom_empresa']."");

			$outp[] = array('name'=> "tipo_empresa",
							'label'=> "TIPO DE EMPRESA",
							'tipo'=> "text-block",
							'class'=> "",
							'value'=> "".$retorna_main[0]['tipo_empresa']."");

			

			//print_r($outp);
			
			return $outp;
		}//End function showTable

		//insertar un registro en una tabla
		public function insertTable($table, $data){
			$nombre_campo = "";
			$variable_campo = "";

			//print_r($data);

			//formando el name y value para el insert - generico

			foreach ($data as $key => $value) {
				//print_r($value['name']);

				//armar para consulta insert
				// en caso de que se input de tipo text
				if ($key == 0 && $value['tipo'] != 'select') {
					$nombre_campo = $value['name'];
					$variable_campo = "'".$value['value']."'";

				}else{
					if ($value['tipo'] != 'select') {
						$nombre_campo = $nombre_campo." , ".$value['name'];
						$variable_campo = $variable_campo." , '".$value['value']."'";
					}
				}

				//en caso de que sean select
				if ($key == 0 && $value['tipo'] == 'select') {
					$nombre_campo = $value['name'];
					$variable_campo = "'".$value['valueSelect']['id']."'";
				}else{
					if ($value['tipo'] == 'select') {
						$nombre_campo = $nombre_campo." , ".$value['name'];
						$variable_campo = $variable_campo." , '".$value['valueSelect']['id']."'";
					}
				}
				
			}

			//print($nombre_campo);
			//print($variable_campo);

			$query = "INSERT INTO ".$table." (".$nombre_campo.") VALUES (".$variable_campo.")";
			//print_r($query);
			if (!$this->_db->query($query)) {
				//en casso de error muestra el problema en consola
			    return "Fallo INSERT INTO: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				// en caso de exito muestra el mensaje en consola
				$resolve[] = array('mensaje'=> "Insert ok");
									            
				return $resolve;
		
			}
			$result->close();
			
		}//End function insertTable

		//funcion para modificar
		public function updateTable($table,  $data, $nom_id, $id){
			$set_campo = "";

			//print_r($data);

			//formando el name y value para el insert - generico

			foreach ($data as $key => $value) {
				//print_r($value['name']);

				//armar para consulta insert
				// en caso de que se input de tipo text
				if ($key == 0 && $value['tipo'] != 'select') {
					$set_campo = "".$value['name']." = '".$value['value']."'";

				}else{
					if ($value['tipo'] != 'select') {
						$set_campo = $set_campo." , ".$value['name']." = '".$value['value']."'";
					}
				}

				//en caso de que sean select
				if ($key == 0 && $value['tipo'] == 'select') {
					$set_campo = "".$value['name']." = '".$value['valueSelect']['id']."'";
				}else{
					if ($value['tipo'] == 'select') {

						$set_campo =  $set_campo." , ".$value['name']." = '".$value['valueSelect']['id']."'";
						
					}
				}
				
			}
			//print_r($set_campo);

			$query = "UPDATE ".$table." SET ".$set_campo." WHERE ".$nom_id." = '".$id."'";
			//print_r($query);
			if (!$this->_db->query($query)) {
				//en casso de error muestra el problema en consola
			    return "Fallo UPDATE: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				// en caso de exito muestra el mensaje en consola
				$resolve[] = array('mensaje'=> "Update ok");
									            
				return $resolve;
			}

			$result->close();
			
		}//End function updateTable

		//funcion para modificar ELIMINAR REGISTRO sin borrar
		public function deleteTable($table, $nom_id, $id, $user){
			$outp = array();
			$set_campo = "show_by = '0'";

			$query = "UPDATE ".$table." SET ".$set_campo." WHERE ".$nom_id." = '".$id."'";
			//print_r($query);
			if (!$this->_db->query($query)) {
				//en casso de error muestra el problema en consola
			    return "Fallo UPDATE -DELETE- : (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				// en caso de exito muestra el mensaje en consola
				$resolve[] = array('mensaje'=> "Eliminar ok");
									            
				return $resolve;
			}

			$result->close();
			
		}//End function updateTable


	}



	//main para llamar a las clases
	//objeto a manipular
	$object = new libromayor();
	$table = "libromayor"; //nombre de la tabla
	$nom_idTable = "idLibroMayor"; // llave primaria de la tabla

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->crearInterfaz($table);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}

	
	

?>