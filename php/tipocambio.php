<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class tipocambio extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getTable($table){
			$result = $this->_db->query("SELECT * FROM ".$table." WHERE  show_by = '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			return $retorna;
			$result->close();
		}//End function getTable

		//funcion para mostrar los campos de una tabla
		public function showTable($table){
			//codigo cuando es dato foraneo
			$result = $this->_db->query("SELECT * FROM moneda WHERE  show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			
			//creacion de array
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['idMoneda'],
									   'value'=> $valor['tipo_moneda']
										);

			}
			//print_r($outp_select);
			$result->close();
			
			//creacion de arrays de campos
			$outp = array();

			
			/*
			
			


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

			$outp[] = array('name'=> "tc_fecha",
							'label'=> "TIPO CAMBIO FECHA",
							'tipo'=> "text",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "");

			$outp[] = array('name'=> "tc_compra",
							'label'=> "TIPO CAMBIO COMPRA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "");

			$outp[] = array('name'=> "tc_venta",
							'label'=> "TIPO CAMBIO VENTA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "");

			// Creacion de campos
			$outp[] = array('name'=> "Moneda_idMoneda",
							'label'=> "MONEDA",
							'tipo'=> "select",
							'class'=> "",
							'valueSelect'=> $outp_select,
							'value'=> $outp_select);

			
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


			//tabla select all
			$result_select = $this->_db->query("SELECT * FROM moneda WHERE show_by = '1'");
			$retorna_select = $result_select->fetch_all(MYSQL_ASSOC);
			
			//creacion de array para select all
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna_select as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['idMoneda'],
									   'value'=> $valor['tipo_moneda']
									   );

			}

			//table select selected
			$result_selectId = $this->_db->query("SELECT * FROM moneda WHERE show_by = '1' and idMoneda = '".$retorna_main[0]['Moneda_idMoneda']."'");
			$retorna_selectId = $result_selectId->fetch_all(MYSQL_ASSOC);

			//$retorna_selectId = json_decode($retorna_selectId, true);
			//creacion de array para select selected
			$outp_selectId = array();
			$id_selectId = "";
			$value_selectId = "";

			//formando para el select
			foreach ($retorna_selectId as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_selectId = array('id'=> $valor['idMoneda'],
									 	 'value'=> $valor['tipo_moneda']
									    );

			}
			$result_select->close();
			$result_selectId->close();

			//print_r($outp_selectId);

			//print_r($outp_select);
			
			

			//creacion de arrays de campos
			$outp = array();

			

			/*
			
			

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
			$outp[] = array('name'=> "tc_fecha",
							'label'=> "TIPO CAMBIO FECHA",
							'tipo'=> "text",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "".$retorna_main[0]['tc_fecha']."");

			$outp[] = array('name'=> "tc_compra",
							'label'=> "TIPO CAMBIO COMPRA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "".$retorna_main[0]['tc_compra']."");

			$outp[] = array('name'=> "tc_venta",
							'label'=> "TIPO CAMBIO VENTA",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "".$retorna_main[0]['tc_venta']."");

			// Creacion de campos
			$outp[] = array('name'=> "Moneda_idMoneda",
							'label'=> "MONEDA",
							'tipo'=> "select",
							'class'=> "",
							'valueSelect'=> $outp_selectId,
							'value'=> $outp_select);
			

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


			//tabla select all
			$result_select = $this->_db->query("SELECT * FROM moneda WHERE show_by = '1'");
			$retorna_select = $result_select->fetch_all(MYSQL_ASSOC);
			
			//creacion de array para select all
			$outp_select = array();
			$id_select = "";
			$value_select = "";

			//formando para el select
			foreach ($retorna_select as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['idMoneda'],
									   'value'=> $valor['tipo_moneda']
									   );

			}

			//table select selected
			$result_selectId = $this->_db->query("SELECT * FROM moneda WHERE show_by = '1' and idMoneda = '".$retorna_main[0]['Moneda_idMoneda']."'");
			$retorna_selectId = $result_selectId->fetch_all(MYSQL_ASSOC);

			//$retorna_selectId = json_decode($retorna_selectId, true);
			//creacion de array para select selected
			$outp_selectId = array();
			$id_selectId = "";
			$value_selectId = "";

			//formando para el select
			foreach ($retorna_selectId as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_selectId = array('id'=> $valor['idMoneda'],
									 	 'value'=> $valor['tipo_moneda']
									    );

			}
			$result_select->close();
			$result_selectId->close();

			//print_r($outp_selectId);

			//print_r($outp_select);
			
			

			//creacion de arrays de campos
			$outp = array();

			

			/*
			
			

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
			$outp[] = array('name'=> "tc_fecha",
							'label'=> "TIPO CAMBIO FECHA",
							'tipo'=> "text-block",
							'class'=> "",
							'valueSelect'=> "",
							'value'=> "".$retorna_main[0]['tc_fecha']."");

			$outp[] = array('name'=> "tc_compra",
							'label'=> "TIPO CAMBIO COMPRA",
							'tipo'=> "text-block",
							'class'=> "",
							'value'=> "".$retorna_main[0]['tc_compra']."");

			$outp[] = array('name'=> "tc_venta",
							'label'=> "TIPO CAMBIO VENTA",
							'tipo'=> "text-block",
							'class'=> "",
							'value'=> "".$retorna_main[0]['tc_venta']."");

			// Creacion de campos
			$outp[] = array('name'=> "Moneda_idMoneda",
							'label'=> "MONEDA",
							'tipo'=> "select-block",
							'class'=> "",
							'valueSelect'=> $outp_selectId,
							'value'=> $outp_select);
			

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
			$set_campo = "show_by = '0' , delete_by = '".$user."'";

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
	$object = new tipocambio();
	$table = "tipocambio"; //nombre de la tabla
	$nom_idTable = "idtipocambio";

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->getTable($table);
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case '1':// insertar

			switch ($_POST['tipo']) {
				case 'campo':
					$outp = $object->showTable($table);
					break;
				case 'insertar':
					$json = $_POST['data'];
					$obj = json_decode($json, true);
					$outp = $object->insertTable($table,$obj);
					break;
				default:
					# code...
					break;
			}
			
			echo json_encode($outp);
			break;
		case '2':// modificar
			switch ($_POST['tipo']) {
				case 'campo':
					$outp = $object->showTableAllModify($table, $nom_idTable, $_POST['id']);
					break;
				case 'modificar':
					$json = $_POST['data'];
					$obj = json_decode($json, true);
					$outp = $object->updateTable($table, $obj, $nom_idTable, $_POST['id']);
					break;
				default:
					# code...
					break;
			}
			
			echo json_encode($outp);
			break;
			break;
		case '3':// eliminar
			switch ($_POST['tipo']) {
				case 'campo':
					$outp = $object->showTableAllDelete($table, $nom_idTable, $_POST['id']);
					break;
				case 'eliminar':
					$outp = $object->deleteTable($table, $nom_idTable, $_POST['id'], $_POST['user']);
					break;
				default:
					# code...
					break;
			}
			
			echo json_encode($outp);
			break;
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}

	
	

?>