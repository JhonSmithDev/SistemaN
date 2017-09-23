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

		public function insertarLibroDiario($glosa, $fecha, $tipoPagoId, $monedaId , $nro_ld, $Usuario_idUsuario, $CicloContable_idCicloContable){
			//insertar en tabla empresa los campos requeridos
			if (!$this->_db->query("INSERT INTO comprobante (glosa_comp, fecha_comp, TipoPago_idTipoPago, Moneda_idMoneda) VALUES ('".$glosa."', '".$fecha."', '".$tipoPagoId."', '". $monedaId."')")) {
				//en casso de error muestra el problema en consola
		    	return "Falló INSERT INTO comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{

				$outp[] = array('mensaje'=> "Insert comprobante ok");
				$result = $this->_db->query("SELECT * FROM comprobante ORDER BY idComprobante DESC LIMIT 1");
				$retorna = $result->fetch_all(MYSQL_ASSOC);

				//$retorna = json_decode($retorna, true);

				//print_r($retorna);
				if (!$this->_db->query("INSERT INTO librodiario (nro_ld, Usuario_idUsuario, CicloContable_idCicloContable, Comprobante_idComprobante) VALUES ('".$nro_ld."', '".$Usuario_idUsuario."', '".$CicloContable_idCicloContable."', '".$retorna[0]['idComprobante']."')")) {
					//en casso de error muestra el problema en consola
			    	return "Falló INSERT INTO librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
				}else{
					// en caso de exito muestra el mensaje en consola
					$outp[] = array('mensaje'=> "Insert librodiario ok");
				}
				return $outp;
								            
				
			}
		}


	}



	//MAIN
	$object = new libroDiario();
	$outp = $object->insertarLibroDiario("".$_POST['glosa']."","".$_POST['fecha']."","".$_POST['TipoPago_idTipoPago']."","".$_POST['Moneda_idMoneda']."","".$_POST['nro_ld']."","".$_POST['Usuario_idUsuario']."","".$_POST['CicloContable_idCicloContable']."");
	echo json_encode($outp);
?>