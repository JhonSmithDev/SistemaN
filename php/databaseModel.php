<?php
	require_once "model.php";
	/**
	* BY: NELY M CH M
	*/
	class databaseModel extends model{
		
		public function __construct(){
			parent:: __construct();
		}

		public function getTable($table,$order_id){
			$result = $this->_db->query("SELECT * FROM ".$table." ORDER BY ".$order_id."");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			return $retorna;
		}//End function getTable

		public function insertTable($id, $data, $table, $tipo){
			switch ($table) {
				case 'cuenta':

					if (!$this->_db->query('call insertarcuenta('.$id.', '.$data.')')) {
    					return "Falló CALL: (" . $this->_db->errno . ") " . $this->_db->error;
					}
					break;
				case 'empresa':

					switch ($tipo) {
						case 'campo':
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa

							$outp[] = array('label'=> "NIT EMPRESA",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nit_empresa",
								            'name'=> "nit_empresa",
								        	'value'=> "");

							$outp[] = array('label'=> "NOMBRE DE EMPRESA",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nom_empresa",
								            'name'=> "nom_empresa",
								        	'value'=> "");

							$outp[] = array('label'=> "TIPO EMPRESA",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "tipo_empresa",
								            'name'=> "tipo_empresa",
								        	'value'=> "");
							return $outp;

							break;
						case 'insertar':

							//insertar en tabla empresa los campos requeridos
							if (!$this->_db->query("INSERT INTO empresa (nit_empresa, nom_empresa, tipo_empresa)
													VALUES ('".$data[0]['value']."', '".$data[1]['value']."', '".$data[2]['value']."')")) {
								//en casso de error muestra el problema en consola
		    					return "Falló INSERT INTO: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Insert ok");
								            
								return $outp;
							}
							break;

						default:
							# code...
							break;
					}
					
					break;
				case 'ciclocontable':

					switch ($tipo) {
						case 'campo':
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa

							$outp[] = array('label'=> "GESTION CONTABLE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "gestion_ccontable",
								            'name'=> "gestion_ccontable",
								        	'value'=> "");

							$outp[] = array('label'=> "OBSERVACION DE CICLO CONTABLE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "obs_ccontable",
								            'name'=> "obs_ccontable",
								        	'value'=> "");

							$outp[] = array('label'=> "EMPRESA",
								            'input'=> "select",
								            'class'=> "",
								            'for'=> "Empresa_idEmpresa",
								            'name'=> "Empresa_idEmpresa",
								        	'value'=> "");
							return $outp;

							break;
						case 'insertar':

							//insertar en tabla empresa los campos requeridos
							if (!$this->_db->query("INSERT INTO ciclocontable (nit_empresa, nom_empresa, tipo_empresa)
													VALUES ('".$data[0]['value']."', '".$data[1]['value']."', '".$data[2]['value']."')")) {
								//en casso de error muestra el problema en consola
		    					return "Falló INSERT INTO: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Insert ok");
								            
								return $outp;
							}
							break;

						default:
							# code...
							break;
					}
					
					break;
				case 'cliente':

					switch ($tipo) {
						case 'campo':
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa

							$outp[] = array('label'=> "CÓDIGO CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "cod_cliente",
								            'name'=> "cod_cliente",
								        	'value'=> "");

							$outp[] = array('label'=> "TIPO DE CÓDIGO CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "tipo_codcliente",
								            'name'=> "tipo_codcliente",
								        	'value'=> "");

							$outp[] = array('label'=> "NOMBRE CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nom_cliente ",
								            'name'=> "nom_cliente ",
								        	'value'=> "");

							$outp[] = array('label'=> "DIRECCIÓN CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "dir_cliente",
								            'name'=> "dir_cliente",
								        	'value'=> "");

							$outp[] = array('label'=> "TELÉFONO CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "telef_cliente",
								            'name'=> "telef_cliente",
								        	'value'=> "");

							$outp[] = array('label'=> "FAX CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "fax_cliente",
								            'name'=> "fax_cliente",
								        	'value'=> "");

							$outp[] = array('label'=> "CELULAR CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "cel_cliente",
								            'name'=> "cel_cliente",
								        	'value'=> "");

							$outp[] = array('label'=> "PAÍS CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "pais_cliente",
								            'name'=> "pais_cliente",
								        	'value'=> "");

							$outp[] = array('label'=> "CIUDAD CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "ciudad_cliente",
								            'name'=> "ciudad_cliente",
								        	'value'=> "");
							return $outp;

							break;
						case 'insertar':

							//insertar en tabla empresa los campos requeridos
							if (!$this->_db->query("INSERT INTO cliente (cod_cliente, tipo_codcliente, nom_cliente, dir_cliente,telef_cliente, fax_cliente, cel_cliente, pais_cliente, ciudad_cliente)
													VALUES ('".$data[0]['value']."', '".$data[1]['value']."', '".$data[2]['value']."', '".$data[3]['value']."', '".$data[4]['value']."', '".$data[5]['value']."', '".$data[6]['value']."', '".$data[7]['value']."', '".$data[8]['value']."')")) {
								//en casso de error muestra el problema en consola
		    					return "Falló INSERT INTO: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Insert ok");
								            
								return $outp;
							}
							break;

						default:
							# code...
							break;
					}
					
					break;
				case 'proveedor':

					switch ($tipo) {
						case 'campo':
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa

							$outp[] = array('label'=> "CÓDIGO PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "cod_prov",
								            'name'=> "cod_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "NOMBRE DE PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nom_prov",
								            'name'=> "nom_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "DIRECCIÓN PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "dir_prov",
								            'name'=> "dir_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "TELÉFONO PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "telef_prov",
								            'name'=> "telef_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "FAX PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "fax_prov",
								            'name'=> "fax_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "CELULAR PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "cel_prov",
								            'name'=> "cel_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "CORREO ELECTRÓNICO PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "email_prov",
								            'name'=> "email_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "PAÍS PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "pais_prov",
								            'name'=> "pais_prov",
								        	'value'=> "");

							$outp[] = array('label'=> "CIUDAD PROVEEDOR",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "ciudad_prov",
								            'name'=> "ciudad_prov",
								        	'value'=> "");

							return $outp;

							break;
						case 'insertar':

							//insertar en tabla empresa los campos requeridos
							if (!$this->_db->query("INSERT INTO proveedor (cod_prov, nom_prov, dir_prov, telef_prov, fax_prov, cel_prov, email_prov, pais_prov, ciudad_prov)
													VALUES ('".$data[0]['value']."', '".$data[1]['value']."', '".$data[2]['value']."', '".$data[3]['value']."', '".$data[4]['value']."', '".$data[5]['value']."', '".$data[6]['value']."', '".$data[7]['value']."', '".$data[8]['value']."')")) {
								//en casso de error muestra el problema en consola
		    					return "Falló INSERT INTO: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Insert ok");
								            
								return $outp;
							}
							break;

						default:
							# code...
							break;
					}
					
					break;
				default:
					$retorna = "Error tabla";
					return $retorna;
					break;
			}
			
		}//End function insertTable

		public function updateTable($table, $nom_id, $id, $nom_data, $data, $tipo){
			//seleccion de operacion
			switch ($table) {
				case 'cuenta':
					if (!$this->_db->query('UPDATE '.$table.' SET '.$nom_data.' = '.$data.' WHERE '.$nom_id.' = '.$id.'')) {
		    			return "Falló UPDATE: (" . $this->_db->errno . ") " . $this->_db->error;
					}
					break;
				
				case 'empresa':
					switch ($tipo) {
						case 'campo':

							$result = $this->_db->query('SELECT * FROM '.$table.' WHERE '.$nom_id.' = '.$id.'');
							$retorna = $result->fetch_all(MYSQL_ASSOC);
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa

							$outp[] = array('label'=> "CÓDIGO",
								            'input'=> "block",
								            'class'=> "",
								            'for'=> "idEmpresa",
								            'name'=> "idEmpresa",
								        	'value'=> "".$retorna[0]['idEmpresa']."");

							$outp[] = array('label'=> "NIT EMPRESA",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nit_empresa",
								            'name'=> "nit_empresa",
								        	'value'=> "".$retorna[0]['nit_empresa']."");

							$outp[] = array('label'=> "NOMBRE DE EMPRESA",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nom_empresa",
								            'name'=> "nom_empresa",
								        	'value'=> "".$retorna[0]['nom_empresa']."");

							$outp[] = array('label'=> "TIPO EMPRESA",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "tipo_empresa",
								            'name'=> "tipo_empresa",
								        	'value'=> "".$retorna[0]['tipo_empresa']."");
							return $outp;
							break;

						case 'modificar':

							//insertar en tabla empresa los campos requeridos
							if (!$this->_db->query("UPDATE ".$table." SET nit_empresa = " .$data[1]['value'].", nom_empresa = '".$data[2]['value']."', tipo_empresa = '".$data[3]['value']."' WHERE idEmpresa = ".$id."")) {
								//en casso de error muestra el problema en consola
		    					return "Falló UPDATE: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Update ok");
								            
								return $outp;
							}
							break;
						
						default:
						
							break;
					}
					
					break;
				case 'cliente':
					switch ($tipo) {
						case 'campo':

							$result = $this->_db->query('SELECT * FROM '.$table.' WHERE '.$nom_id.' = '.$id.'');
							$retorna = $result->fetch_all(MYSQL_ASSOC);
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa
							$outp[] = array('label'=> "ID CLIENTE",
								            'input'=> "block",
								            'class'=> "",
								            'for'=> "idCliente",
								            'name'=> "idCliente",
								        	'value'=> "".$retorna[0]['idCliente']."");

							$outp[] = array('label'=> "CÓDIGO CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "cod_cliente",
								            'name'=> "cod_cliente",
								        	'value'=> "".$retorna[0]['cod_cliente']."");

							$outp[] = array('label'=> "TIPO DE CÓDIGO CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "tipo_codcliente",
								            'name'=> "tipo_codcliente",
								        	'value'=> "".$retorna[0]['tipo_codcliente']."");

							$outp[] = array('label'=> "NOMBRE CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "nom_cliente ",
								            'name'=> "nom_cliente ",
								        	'value'=> "".$retorna[0]['nom_cliente']."");

							$outp[] = array('label'=> "DIRECCIÓN CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "dir_cliente",
								            'name'=> "dir_cliente",
								        	'value'=> "".$retorna[0]['dir_cliente']."");

							$outp[] = array('label'=> "TELÉFONO CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "telef_cliente",
								            'name'=> "telef_cliente",
								        	'value'=> "".$retorna[0]['telef_cliente']."");

							$outp[] = array('label'=> "FAX CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "fax_cliente",
								            'name'=> "fax_cliente",
								        	'value'=> "".$retorna[0]['fax_cliente']."");

							$outp[] = array('label'=> "CELULAR CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "cel_cliente",
								            'name'=> "cel_cliente",
								        	'value'=> "".$retorna[0]['cel_cliente']."");

							$outp[] = array('label'=> "PAÍS CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "pais_cliente",
								            'name'=> "pais_cliente",
								        	'value'=> "".$retorna[0]['pais_cliente']."");

							$outp[] = array('label'=> "CIUDAD CLIENTE",
								            'input'=> "text",
								            'class'=> "",
								            'for'=> "ciudad_cliente",
								            'name'=> "ciudad_cliente",
								        	'value'=> "".$retorna[0]['ciudad_cliente']."");
							return $outp;
							break;

						case 'modificar':

							//insertar en tabla empresa los campos requeridos
							if (!$this->_db->query("UPDATE ".$table." SET cod_cliente = " .$data[1]['value'].", tipo_codcliente = '".$data[2]['value']."',nom_cliente = '".$data[3]['value']."',dir_cliente = '".$data[4]['value']."',telef_cliente = '".$data[5]['value']."',fax_cliente = '".$data[6]['value']."',cel_cliente = '".$data[7]['value']."',pais_cliente = '".$data[8]['value']."',ciudad_cliente = '".$data[9]['value']."' WHERE idCliente = ".$id."")) {
								//en casso de error muestra el problema en consola
		    					return "Falló UPDATE: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Update ok");
								            
								return $outp;
							}
							break;
						
						default:
						
							break;
					}
					
					break;

				default:
					# code...
					break;
			}
			
			
		}//End function updateTable

		public function deleteTable($table, $nom_id, $id, $tipo){
			switch ($table) {
				case 'cuenta':
					if (!$this->_db->query('DELETE FROM '.$table.' WHERE '.$nom_id.' = '.$id.'')) {
		    			return "Falló DELETE: (" . $this->_db->errno . ") " . $this->_db->error;
					}
					break;
				case 'empresa':

					switch ($tipo) {
						case 'campo':

							$result = $this->_db->query('SELECT * FROM '.$table.' WHERE '.$nom_id.' = '.$id.'');
							$retorna = $result->fetch_all(MYSQL_ASSOC);
							//creacion de arrays de campos
							$outp = array();

							// Creacion de campos para empresa

							$outp[] = array('label'=> "CÓDIGO",
								            'input'=> "block",
								            'class'=> "",
								            'for'=> "idEmpresa",
								            'name'=> "idEmpresa",
								        	'value'=> "".$retorna[0]['idEmpresa']."");

							$outp[] = array('label'=> "NIT EMPRESA",
								            'input'=> "block",
								            'class'=> "",
								            'for'=> "nit_empresa",
								            'name'=> "nit_empresa",
								        	'value'=> "".$retorna[0]['nit_empresa']."");

							$outp[] = array('label'=> "NOMBRE DE EMPRESA",
								            'input'=> "block",
								            'class'=> "",
								            'for'=> "nom_empresa",
								            'name'=> "nom_empresa",
								        	'value'=> "".$retorna[0]['nom_empresa']."");

							$outp[] = array('label'=> "TIPO EMPRESA",
								            'input'=> "block",
								            'class'=> "",
								            'for'=> "tipo_empresa",
								            'name'=> "tipo_empresa",
								        	'value'=> "".$retorna[0]['tipo_empresa']."");
							return $outp;
							break;

						case 'eliminar':

							//eliminar en tabla empresa los campos requeridos
							if (!$this->_db->query('DELETE FROM '.$table.' WHERE '.$nom_id.' = '.$id.'')) {
				    			return "Falló DELETE: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								// en caso de exito muestra el mensaje en consola
								$outp[] = array('mensaje'=> "Delete ok");
								            
								return $outp;
							}
							break;
						
						default:
						
							break;
					}
					break;
				
				default:
					# code...
					break;
			}

			
			
		}//End function updateTable



	}//END CLASS databaseModel

?>