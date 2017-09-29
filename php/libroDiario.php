<?php
	require_once "model.php";
	/**
	* BY: NELY M CH M
	*/

	//CLASS
	class libroDiario extends model{
		
		//CONSTRUCTOR
		public function __construct(){
			parent:: __construct();
		}

		public function crearInterfaz(){
			
		}

		public function insertarLibroDiario($glosa, $fecha, $tipoPagoId, $monedaId , $nro_ld, $Usuario_idUsuario, $CicloContable_idCicloContable, $data){
			//insertar en tabla empresa los campos requeridos
			if (!$this->_db->query("INSERT INTO comprobante (glosa_comp, fecha_comp, TipoPago_idTipoPago, Moneda_idMoneda) VALUES ('".$glosa."', '".$fecha."', '".$tipoPagoId."', '". $monedaId."')")) {
				//en casso de error muestra el problema en consola
		    	return "Fallo INSERT INTO comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{

				$outp[] = array('mensaje'=> "Insert comprobante ok");
				$result = $this->_db->query("SELECT * FROM comprobante ORDER BY idComprobante DESC LIMIT 1");
				$retorna = $result->fetch_all(MYSQL_ASSOC);

				//$retorna = json_decode($retorna, true);

				//print_r($retorna);
				if (!$this->_db->query("INSERT INTO librodiario (nro_ld, Usuario_idUsuario, CicloContable_idCicloContable, Comprobante_idComprobante) VALUES ('".$nro_ld."', '".$Usuario_idUsuario."', '".$CicloContable_idCicloContable."', '".$retorna[0]['idComprobante']."')")) {
					//en casso de error muestra el problema en consola
			    	return "Fallo INSERT INTO librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
				}else{
					// en caso de exito muestra el mensaje en consola
					$outp[] = array('mensaje'=> "Insert librodiario ok");


					//insertar detalle
					$result = $this->_db->query("SELECT * FROM libroDiario ORDER BY idLibroDiario DESC LIMIT 1");
					$retorna = $result->fetch_all(MYSQL_ASSOC);

					$data = json_decode($data, true);
					//print_r($data);
					//print_r($retorna[0]['idLibroDiario']);

					//print("'".$data[0]['id']."', '".$data[0]['debe_bs']."' , '".$data[0]['haber_bs']."' , '".$data[0]['debe_sus']."' , '".$data[0]['haber_sus']."' , '".$retorna[0]['idLibroDiario']."' , '".$data[0]['Cuenta_idCuenta']."'" );

					for ($i=0; $i <count($data) ; $i++) { 
						$value_detalle = "'".$data[$i]['id']."', '".$data[$i]['debe_bs']."' , '".$data[$i]['haber_bs']."' , '".$data[$i]['debe_sus']."' , '".$data[$i]['haber_sus']."' , '".$retorna[0]['idLibroDiario']."' , '".$data[$i]['Cuenta_idCuenta']."'";

						if (!$this->_db->query("INSERT INTO ld_detalle (nro_linea, 
																	debe_bs, 
																	haber_bs, 
																	debe_us, 
																	haber_us, 
																	LibroDiario_idLibroDiario, 
																	Cuenta_idCuenta) 
																	VALUES (".$value_detalle.")")) {
							//en casso de error muestra el problema en consola
							$value_detalle = "";
					    	return "Fallo INSERT INTO librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							// en caso de exito muestra el mensaje en consola
							$outp[] = array('mensaje'=> "Insert ld_detalle ok");
						}
						//print($value_detalle." | ");
					}
					
				}

				return $outp;
								            
				
			}
		}


	}



	//MAIN
	$object = new libroDiario();
	$outp = $object->insertarLibroDiario("".$_POST['glosa']."","".$_POST['fecha']."","".$_POST['TipoPago_idTipoPago']."","".$_POST['Moneda_idMoneda']."","".$_POST['nro_ld']."","".$_POST['Usuario_idUsuario']."","".$_POST['CicloContable_idCicloContable']."","".$_POST['data']."");




	echo json_encode($outp);
?>