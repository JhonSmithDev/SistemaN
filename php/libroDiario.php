<?php
	require_once "model.php";
	/**
	* BY: NELY M CH M
	*/

	//CLASS
	class librodiario extends model{
		
		//CONSTRUCTOR
		public function __construct(){
			parent:: __construct();
		}

		//cambiar moneda cambia el tipo de cambio 
		public function MonedaTipoCambio($id){
			$result = $this->_db->query("SELECT * FROM tipocambio WHERE show_by= '1' and Moneda_idMoneda = '".$id."'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			$outp_select = array();
			//verifica que exista la tabla
			if (!$result) {
				//en casso de error muestra el problema en consola
		    	return "Fallo select tipocambio: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				//formando para el select
				foreach ($retorna as $clave => $valor) {
	    			//print_r($valor['categoria_producto']);
				    $outp_select[] = array('id'=> $valor['idtipocambio'],
										 'value'=> $valor['tc_venta'],
										 'filter'=> $valor['Moneda_idMoneda']
										 );

				}
				return $outp_select;
			}
		}
		
		//adicionar el nuevo tipo de cambio
		public function TipoCambioAdicionar($value ,$id){
			//insertar nuevo tipo de cambio
			//fecha de hoy
			$hoy = date("Y/n/d");
			//nombres de campo
			$nombre_campo = "tc_fecha, tc_venta, Moneda_idMoneda, show_by";
			//valores de campo
			$variable_campo = "'".$hoy."' , '".$value."' , '".$id."' , '1'";
			//variable que se enviara ambos Select
			$outp = array();

			//genera query
			$query = "INSERT INTO tipocambio (".$nombre_campo.") VALUES (".$variable_campo.")";
			//print_r($query);
			$result = $this->_db->query($query);
			if (!$result) {
				//en casso de error muestra el problema en consola
			    return "Fallo INSERT INTO tipocambio: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				// en caso de exito muestra el mensaje en consola
				$result = $this->_db->query("SELECT * FROM tipocambio WHERE show_by= '1' and Moneda_idMoneda = '".$id."'");
				$retorna = $result->fetch_all(MYSQL_ASSOC);

				$outp_select = array();
				//verifica que exista la tabla
				if (!$result) {
					//en casso de error muestra el problema en consola
			    	return "Fallo select tipocambio: (" . $this->_db->errno . ") " . $this->_db->error;
				}else{
					//formando para el select
					foreach ($retorna as $clave => $valor) {
		    			//print_r($valor['categoria_producto']);
					    $outp_select[] = array('id'=> $valor['idtipocambio'],
											 'value'=> $valor['tc_venta'],
											 'filter'=> $valor['Moneda_idMoneda']
											 );

					}
					//llenar
					$outp[] = $outp_select;
					
					// en caso de exito muestra el mensaje en consola
					$result = $this->_db->query("SELECT * FROM tipocambio WHERE show_by= '1' and Moneda_idMoneda = '".$id."' ORDER BY idtipocambio DESC LIMIT 1");
					$retorna = $result->fetch_all(MYSQL_ASSOC);

					$outp_selectId = array();
					//verifica que exista la tabla
					if (!$result) {
						//en casso de error muestra el problema en consola
				    	return "Fallo select tipocambio: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//formando para el select
						foreach ($retorna as $clave => $valor) {
			    			//print_r($valor['categoria_producto']);
						    $outp_selectId = array('id'=> $valor['idtipocambio'],
												 'value'=> $valor['tc_venta'],
												 'filter'=> $valor['Moneda_idMoneda']
												 );

						}
						//llenar
						$outp[] = $outp_selectId;
						//print_r($outp);
						return $outp;
					}
				}
		
			}

			$result->close();
			
		}
		//Recuperar el numero de comprobante
		public function crearSiglaComprobante($docContable){
			//creacion de arrays de campos
			$outp = array();

			//**************************************
			//crear asiento Y Comprobante con la tabla librodiario
			$result = $this->_db->query("SELECT * FROM ".$docContable." WHERE show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			

			switch ($docContable) {
				case 'traspaso':
					$outp = array('value'=> "CDT-".(count($retorna)+1));
					break;
				case 'ingreso':
					$outp = array('value'=> "CDI-".(count($retorna)+1));
					break;
				case 'egreso':
					$outp = array('value'=> "CDE-".(count($retorna)+1));
					break;
				
				default:
					$outp = array('value'=> "error docContable");
					break;
			}

			return $outp;


		}

		//creacion de los campos para el libro diario 
		public function crearInterfaz(){

			//creacion de arrays de campos
			$outp = array();

			//**************************************
			//crear asiento Y Comprobante con la tabla librodiario
			$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by= '1' ORDER BY idLibroDiario DESC LIMIT 1");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			//verifica que exista la tabla
			if (!$result) {
				//en casso de error muestra el problema en consola
		    	return "Fallo select librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				//return array('mensaje'=> "todo bien",'tamano'=> count($retorna));
				// Creacion de campos
				if (count($retorna) == 0 ) {
					$outp[] = array('name'=> "nro_ld",
									'table'=> "librodiario",
									'label'=> "Asiento",
									'tipo'=> "text",
									'class'=> "",
									'value'=> "".(count($retorna) + 1)."",
									'valueSelect'=> "");
					// Creacion de campos
					$outp[] = array('name'=> "sigla_comp",
									'table'=> "comprobante",
									'label'=> "Nro. Comprobante",
									'tipo'=> "text",
									'class'=> "",
									'value'=> "".(count($retorna)+1)."",
									'valueSigla'=> "");

				}else{
					$outp[] = array('name'=> "nro_ld",
									'table'=> "librodiario",
									'label'=> "Asiento",
									'tipo'=> "text",
									'class'=> "",
									'value'=> "".($retorna[0]['nro_ld'] + 1)."",
									'valueSelect'=> "");

					// Creacion de campos
					$outp[] = array('name'=> "sigla_comp",
									'table'=> "comprobante",
									'label'=> "Nro. Comprobante",
									'tipo'=> "text",
									'class'=> "",
									'value'=> "".($retorna[0]['nro_ld'] + 1)."",
									'valueSigla'=> "");
				}
				
			}

			//**************************************
			//crear MONEDA con la tabla moneda
			$result = $this->_db->query("SELECT * FROM moneda WHERE show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			//formando para el select
			foreach ($retorna as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['idMoneda'],
									 'value'=> $valor['tipo_moneda']
									 );

			}

			//verifica que exista la tabla
			if (!$result) {
				//en casso de error muestra el problema en consola
		    	return "Fallo select moneda: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				//return array('mensaje'=> "todo bien",'tamano'=> count($retorna));
				// Creacion de campos
				// Creacion de campos
				$outp[] = array('id'=> "Moneda_idMoneda",
								'table'=> "comprobante",
								'label'=> "Moneda de Cambio",
								'tipo'=> "select",
								'class'=> "",
								'value'=> $outp_select,
								'valueSelect'=> $outp_select[1]);
				
			}
			
			//**************************************
			//para campo dec contable  TRASPASO / INGRESO / EGRESO
			$decContable []= array('id'=> "1", 'value'=> "Traspaso");
			$decContable []= array('id'=> "2", 'value'=> "Ingreso");
			$decContable []= array('id'=> "3", 'value'=> "Egreso");
			// Creacion de campos
			$outp[] = array('name'=> "",
							'table'=> "",
							'label'=> "Dec. Contable",
							'tipo'=> "select",
							'class'=> "",
							'value'=> $decContable,
							'valueSelect'=> "");

			//**************************************
			//para campo FECHA
			//fecha de hoy segun servidor
			//$hoy = date_default_timezone_get();

			$hoy = date("d/n/Y"); 
			// Creacion de campos
			$outp[] = array('name'=> "fecha_comp",
							'table'=> "comprobante",
							'label'=> "Fecha",
							'tipo'=> "text",
							'class'=> "",
							'value'=> $hoy,
							'valueSelect'=> "");

			//**************************************
			//para campo TIPO DE CAMBIO Venta
			// Creacion de campos
			$outp_select = array();	
			$result = $this->_db->query("SELECT * FROM tipocambio WHERE show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			//formando para el select
			foreach ($retorna as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['idtipocambio'],
									 'value'=> $valor['tc_venta'],
									 'filter'=> $valor['Moneda_idMoneda']
									 );

			}

			//verifica que exista la tabla
			if (!$result) {
				//en casso de error muestra el problema en consola
		    	return "Fallo select tipocambio: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				//return array('mensaje'=> "todo bien",'tamano'=> count($retorna));
				// Creacion de campos
				$result_child = $this->_db->query("SELECT * FROM tipocambio WHERE show_by= '1' and Moneda_idMoneda = '2'");
				$retorna_child = $result_child->fetch_all(MYSQL_ASSOC);

				//formando para el select
				foreach ($retorna_child as $clave => $valor) {
	    			//print_r($valor['categoria_producto']);
				    $outp_selectId = array('id'=> $valor['idtipocambio'],
										   'value'=> $valor['tc_venta'],
										   'Moneda_idMoneda'=> $valor['Moneda_idMoneda']
										   );

				}
				if (!$result_child) {
					//en casso de error muestra el problema en consola
			    	return "Fallo select tipocambio: (" . $this->_db->errno . ") " . $this->_db->error;
				}else{
					$outp[] = array('name'=> "",
									'table'=> "",
									'label'=> "Tipo cambio (venta)",
									'tipo'=> "select",
									'class'=> "",
									'value'=> $outp_select,
									'valueSelect'=> $outp_selectId);
				}
				
				$result_child->close();
			}
			

			//**************************************
			//para campo Recibido por
			// Creacion de campos
			$outp[] = array('name'=> "",
							'table'=> "0",
							'label'=> "Recibido por",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "",
							'valueSelect'=> "");

			//**************************************
			//para campo Pagado por
			// Creacion de campos
			$outp[] = array('name'=> "",
							'table'=> "0",
							'label'=> "Pagado por",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "",
							'valueSelect'=> "");

			//**************************************
			//para campo NIT/CI
			// Creacion de campos
			$outp[] = array('name'=> "",
							'table'=> "0",
							'label'=> "NIT/CI",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "",
							'valueSelect'=> "");

			//**************************************
			//para campo Nro recibo
			// Creacion de campos
			$outp[] = array('name'=> "recibo_comp",
							'table'=> "comprobante",
							'label'=> "Nro. Recibo",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "",
							'valueSelect'=> "");

			//**************************************
			//para campo TIPO DE PAGO

			// Creacion de campos
			$outp_select = array();	
			$result= $this->_db->query("SELECT * FROM tipopago WHERE show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			//print_r($retorna);

			//formando para el select
			foreach ($retorna as $clave => $valor) {
    			//print_r($valor['categoria_producto']);
			    $outp_select[] = array('id'=> $valor['idTipoPago'],
									   'value'=> $valor['nom_tp'],
									   'filter'=> $valor['tipo_pago']
									   );

			}

			//verifica que exista la tabla
			if (!$result) {
				//en casso de error muestra el problema en consola
		    	return "Fallo select tipopago: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				// Creacion de campos
				$outp[] = array('name'=> "",
								'table'=> "tipopago",
								'label'=> "tipopago",
								'tipo'=> "select",
								'class'=> "",
								'value'=> $outp_select,
								'valueSelect'=> $outp_select);
			}
			

			//**************************************
			//para campo Nro Glosa
			// Creacion de campos
			$outp[] = array('name'=> "glosa_comp",
							'table'=> "comprobante",
							'label'=> "Glosa",
							'tipo'=> "select",
							'class'=> "",
							'value'=> "",
							'valueSelect'=> "");

			//**************************************
			//para campos DETALLE O REGISTRO 
			//genera hora
			$hoy_hora = date('Y/m/d h:i:s');
			//genera fila
			$array_ = array();
			$array[] = array('id'=> 0 ,
							  'id_cuenta'=> "", 
							  'cod_cuenta'=> "", 
							  'nom_cuenta'=> "",
							  'hora'=> $hoy_hora, 
							  'debe_bs'=> "", 
							  'haber_bs'=> "", 
							  'debe_sus'=> "", 
							  'haber_sus'=> "", 
							  'checkboxSelected' => false, 
							  'registro'=> $array_
							  );
			// Creacion de campos
			$outp[] = array('name'=> "ld_detalle",
							'table'=> "ld_detalle",
							'label'=> "",
							'tipo'=> "json",
							'class'=> "",
							'value'=> $array,
							'valueSelect'=> "");


			//**************************************
			// para campos Totales
			// Creacion de campos
			$outp[] = array('name'=> "total",
							'table'=> "0",
							'label'=> "Totales",
							'tipo'=> "text",
							'class'=> "",
							'value'=> "",
							'valueSelect'=> "");
			

			$result->close();
			//print_r($outp);
			return $outp;
		}

		//funcion para crear mas filas de detalle de libro diario
		public function crearDetalle($idFila){
			//**************************************
				//para campos DETALLE O REGISTRO obj
				// genera fecha hora 
				$hoy_hora = date('Y/m/d h:i:s');
				//genera fila
				$array_ = array();
				$outp = array('id'=> $idFila , 
								  'id_cuenta'=> "",
								  'cod_cuenta'=> "", 
								  'nom_cuenta'=> "", 
								  'hora'=> $hoy_hora,
								  'debe_bs'=> "", 
								  'haber_bs'=> "", 
								  'debe_sus'=> "", 
								  'haber_sus'=> "",
								  'checkboxSelected' => false, 
								  'registro'=> $array_
								  );
				return $outp;
		}

		//crea informacion del iva vacio
		public function crearIva($idFila , $idDecContable, $idIVACLIENTEPROVEEDOR, $dataFila){
			//convertir json a array para su lectura
			$data = json_decode($dataFila, true);

			//fecha de hoy
			$hoy = date("d/n/y");
			//print_r($data);
			$outp = array();
			switch ($idDecContable) {
				case '2'://Ingreso
					

					$outp[] = array('label'=> "Fecha de factura", 
									'tipo'=> "text-date", 
									'name'=> "fecha_factv",
									'value'=> $hoy
									);

	                $outp[] = array('label'=> "Nro. de factura", 
	                				'tipo'=> "text-numericOnly", 
	                				'name'=> "nro_factv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Nro. de autirzación", 
	                				'tipo'=> "text--numericOnly", 
	                				'name'=> "nro_autorizacionv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Codigo de control de Venta", 
	                				'tipo'=> "text", 
	                				'name'=> "cod_controlv" ,
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe de factura", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "importe_factv",
	                				'value'=> $data['haber_bs'] 
	                				);

	                $outp[] = array('label'=> "Importe ICE", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "imorte_ICEv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe excento", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "importe_excentov",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe Neto", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "importe_netov",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "DF", 
	                				'tipo'=> "text-block", 
	                				'name'=> "resultado",
	                				'value'=> number_format(($data['haber_bs'] * 0.13), 2, '.', '')
	                				);


	                $outp[] = array('label'=> "sub total fila",
	                				'class'=> "hide", 
	                				'tipo'=> "text-block", 
	                				'name'=> "sub_total_fila",
	                				'value'=> $data['haber_bs']
	                				);

	                $outp[] = array('label'=> "total fila",
	                				'class'=> "hide", 
	                				'tipo'=> "text-block", 
	                				'name'=> "total_fila",
	                				'value'=> number_format($data['haber_bs'] - number_format(($data['haber_bs'] * 0.13), 2, '.', ''), 2, '.', '')
	                				);

	                 $outp[] = array('label'=> "Cliente_idCliente",
	                				'class'=> "hide", 
	                				'tipo'=> "text-block", 
	                				'name'=> "Cliente_idCliente",
	                				'value'=> $idIVACLIENTEPROVEEDOR
	                				);


					return $outp;

					break;
				case '3'://Egreso

					$outp[] = array('label'=> "Fecha de factura", 
									'tipo'=> "text-date", 
									'name'=> "fecha_factc",
									'value'=> $hoy 
									);

	                $outp[] = array('label'=> "Nro. de factura", 
	                				'tipo'=> "text-numericOnly", 
	                				'name'=> "nro_factc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Nro. de autirzación", 
	                				'tipo'=> "text-numericOnly", 
	                				'name'=> "nro_autorizacionc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Codigo de control de Venta", 
	                				'tipo'=> "text", 
	                				'name'=> "cod_controlc" ,
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe de factura", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "importe_factc",
	                				'value'=> $data['debe_bs'] 
	                				);

	                $outp[] = array('label'=> "Importe ICE", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "imorte_ICEc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe excento", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "importe_excentoc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe Neto", 
	                				'tipo'=> "text-keyup-numericOnly", 
	                				'name'=> "importe_netoc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "CF", 
	                				'tipo'=> "text-block", 
	                				'name'=> "resultado",
	                				'value'=> number_format(($data['debe_bs'] * 0.13), 2, '.', '')
	                				);

	                $outp[] = array('label'=> "sub total fila",
	                				'class'=> "hide", 
	                				'tipo'=> "text-block", 
	                				'name'=> "sub_total_fila",
	                				'value'=> $data['debe_bs']
	                				);

	                $outp[] = array('label'=> "total fila",
	                				'class'=> "hide", 
	                				'tipo'=> "text-block", 
	                				'name'=> "total_fila",
	                				'value'=> number_format($data['debe_bs'] - number_format(($data['debe_bs'] * 0.13), 2, '.', ''), 2, '.', '')
	                				);

	                 $outp[] = array('label'=> "Proveedor_idProveedor",
	                				'class'=> "hide", 
	                				'tipo'=> "text-block", 
	                				'name'=> "Proveedor_idProveedor",
	                				'value'=> $idIVACLIENTEPROVEEDOR
	                				);


	                 //print_r($outp);
	                return $outp;


					break;
				default:
					# code...
					break;
			}
			//print_r($outp);
			//**************************************
				//para campos DETALLE O REGISTRO obj
				//genra fila
				
		}


		//creacion de una  fila para detalle de libro diario
		public function crearDetalleFISCAL($idFila , $datoFilaIva, $idDecContable){
			//convertir json a array para su lectura
			$data =  json_decode($datoFilaIva, true);

			

			//hora y fech 
			$hoy_hora = date('Y/m/d h:i:s');
			//print_r($data);
			$outp = array();
			switch ($idDecContable) {
				case '2'://Ingreso
					//conseguir el idCuenta de Fiscal
					$result= $this->_db->query("SELECT * FROM cuenta WHERE cod_cuenta = '221'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);


					$array_ = array();
					$outp = array('id'=> $idFila , 
									  'id_cuenta'=> $retorna[0]['idCuenta'], 
									  'cod_cuenta'=> "221", 
									  'nom_cuenta'=> "DEBITO FISCAL", 
									  'hora'=> $hoy_hora, 
									  'debe_bs'=> "", 
									  'haber_bs'=> $data[8]['value'], 
									  'debe_sus'=> "", 
									  'haber_sus'=> "", 
									  'checkboxSelected' => true, 
									  'registro'=> $array_
									  );
					


					return $outp;

					break;
				case '3'://Egreso
					//conseguir el idCuenta de Fiscal
					$result= $this->_db->query("SELECT * FROM cuenta WHERE cod_cuenta = '127'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);
					$array_ = array();
					$outp = array('id'=> $idFila , 
									  'id_cuenta'=> $retorna[0]['idCuenta'], 
									  'cod_cuenta'=> "127", 
									  'nom_cuenta'=> "CREDITO FISCAL", 
									  'hora'=> $hoy_hora,
									  'debe_bs'=> $data[8]['value'], 
									  'haber_bs'=> "", 
									  'debe_sus'=> "", 
									  'haber_sus'=> "", 
									  'checkboxSelected' => true, 
									  'registro'=> $array_
									  );

	                 //print_r($outp);
	                return $outp;


					break;
				default:
					# code...
					break;
			}
			//print_r($outp);
			//**************************************
				//para campos DETALLE O REGISTRO obj
				//genra fila
				
		}


		//funcion par llenar el modal con datos de cuenta, cliente y proveedor
		public function llenarModal($idDecContable){
			$outp =  array();
			switch ($idDecContable) {
				case 'cuenta':
					//**************************************
					//para campo Listado de cuentas
					// Creacion de campos
					$result = $this->_db->query("SELECT * FROM cuenta");
					$retorna = $result->fetch_all(MYSQL_ASSOC);

					//verifica que exista la tabla
					if (!$result) {
						//en casso de error muestra el problema en consola
				    	return "Fallo select cuenta: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//return array('mensaje'=> "todo bien",'tamano'=> count($retorna));
						// Creacion de campos
						//$outp = $retorna;
						//formando para el select
						foreach ($retorna as $clave => $valor) {
			    			//print_r($valor['categoria_producto']);
						    $outp[] =  array('id'=> $valor['idCuenta'],
											 'value1'=> $valor['cod_cuenta'],
											 'value2'=> $valor['nom_cuenta']
											 );

						}
						
					}
					break;
					case 'cliente':
					//**************************************
					//para campo Listado de clientes
					// Creacion de campos
					$result = $this->_db->query("SELECT * FROM cliente WHERE show_by = '1'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);

					//verifica que exista la tabla
					if (!$result) {
						//en casso de error muestra el problema en consola
				    	return "Fallo select cliente: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//return array('mensaje'=> "todo bien",'tamano'=> count($retorna));
						// Creacion de campos
						foreach ($retorna as $clave => $valor) {
			    			//print_r($valor['categoria_producto']);
						    $outp[] =  array('id'=> $valor['idCliente'],
											 'value1'=> $valor['nom_cliente'],
											 'value2'=> $valor['cod_cliente']
											 );

						}
						
					}
					break;
					case 'proveedor':
					//**************************************
					//para campo Listado de proveedores
					// Creacion de campos
					$result = $this->_db->query("SELECT * FROM proveedor WHERE show_by = '1'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);

					//verifica que exista la tabla
					if (!$result) {
						//en casso de error muestra el problema en consola
				    	return "Fallo select proveedor: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//return array('mensaje'=> "todo bien",'tamano'=> count($retorna));
						// Creacion de campos
						foreach ($retorna as $clave => $valor) {
			    			//print_r($valor['categoria_producto']);
						    $outp[] =  array('id'=> $valor['idProveedor'],
											 'value1'=> $valor['nom_prov'],
											 'value2'=> $valor['cod_prov']
											 );

						}
						
					}
					break;
				
				default:
					$outp = array('error'=> "Llenar modal");
					break;
			}
			return $outp;
		}


		//funcion para guardar en lis tablas de librodiario, ld_detallec, comprobante, egreso, ingreso , traspaso , lvnetas, lcompras y libromayor
		public function guardarLibroDiario($dataLibroDiario, $Usuario_idUsuario){

			//valores para resrevar - con finalidad que 2 usuarios o mas puedan guardar sin confilcto de datos
			$_idComprobante = '';
			$_idLibroDiario = '';
			$_idTraspaso = '';
			$_idIngreso = '';
			$_idEgreso = '';
			$_idLventas = '';
			$_idLcompras = '';
			$_idCicloContable = '';
			$_idUsuario = $Usuario_idUsuario;

			// ciclocntable el ultimo valor para ejecutar el select necesario para obtener el nro_ld
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE show_by = '1' ORDER BY idCicloContable DESC LIMIT 1");
			$retorna = $result->fetch_all(MYSQL_ASSOC);
			$_idCicloContable = $retorna[0]['idCicloContable'];

			//convertir json a array para su lectura
			$data =  json_decode($dataLibroDiario, true);
			//print_r($data);
			
			// divide la sigla de comprobante en 2 partes y las convierte en array
			$opcion = explode("-", $data[1]['valueSigla']);
			//Reservar un comprobante y un libro diario
			switch ($opcion[0]) {
				case 'CDT':
					//print_r("traspaso");

					//1 Reservar tablas para insertar
					//  1.1RESREVA DE UN COMPROBANTE
					$query = "INSERT INTO comprobante (sigla_comp, TipoPago_idTipoPago, Moneda_idMoneda, show_by) VALUES ('".$opcion[0]."' ,".$data[10]['valueSelect']['id']." , ".$data[2]['valueSelect']['id'].", '1')";
					if (!$this->_db->query($query)) {
						//en casso de error muestra el problema en consola
					    return "Fallo INSERT INTO comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//Obtenemod el idComprobante para operarlo despues
						$result = $this->_db->query("SELECT * FROM comprobante WHERE show_by = '1' ORDER BY idComprobante DESC LIMIT 1");

						$retorna = $result->fetch_all(MYSQL_ASSOC);
						$_idComprobante = $retorna[0]['idComprobante'];

						//1.2 RESREVA DE UN librodiario
						$query = "INSERT INTO librodiario (Usuario_idUsuario, CicloContable_idCicloContable, Comprobante_idComprobante, show_by) VALUES ('".$Usuario_idUsuario."' , ".$_idCicloContable." , ".$_idComprobante.", '1')";
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo INSERT INTO librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							//Obtenemod el idComprobante para operarlo despues
							$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by = '1' ORDER BY 	idLibroDiario DESC LIMIT 1");

							$retorna = $result->fetch_all(MYSQL_ASSOC);
							$_idLibroDiario = $retorna[0]['idLibroDiario'];
						}
						//1.3 RESREVA DE UN traspaso
						$query = "INSERT INTO traspaso (Comprobante_idComprobante, show_by) VALUES (".$_idComprobante.", '1')";
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo INSERT INTO traspaso: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							//Obtenemod el idComprobante para operarlo despues
							$result = $this->_db->query("SELECT * FROM traspaso WHERE show_by = '1' ORDER BY 	idTraspaso DESC LIMIT 1");

							$retorna = $result->fetch_all(MYSQL_ASSOC);
							$_idTraspaso = $retorna[0]['idTraspaso'];
						}
					}

					// 2. update de las tablas reservadas del ultimo hasta el principio
					//  2.1 traspaso llenado de tabla
					// verificamos el numero de traspasos
					$result = $this->_db->query("SELECT * FROM traspaso WHERE show_by = '1'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);


					$query = "UPDATE traspaso SET nro_t ='".count($retorna)."'  WHERE idTraspaso = '".$_idTraspaso."'";
					//print_r($query);
					if (!$this->_db->query($query)) {
						//en casso de error muestra el problema en consola
					    return "Fallo UPDATE traspaso: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						
						//2.2 librodiario llenado de tabla
						//contamos las filas de nro_ld (asiento) y colocamos el que sigue con count()
						$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by = '1' and CicloContable_idCicloContable = '".$_idCicloContable."'");
						$retorna = $result->fetch_all(MYSQL_ASSOC);

						//modificamos valores de nro_ld que es numero de filas
						$query = "UPDATE librodiario SET nro_ld	 ='".count($retorna)."'WHERE idLibroDiario = '".$_idLibroDiario."'";
						//print_r($query);
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo UPDATE librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{

							//2.3. llenado en la tabla ld_detalle
							$array = $data[12]['value'];
							foreach ($array as $key => $value) {
							   	//realizar consulta sql para llenar en ld_detalle
							   	$nombre_set="nro_linea, detalle_ldd, debe_bs, haber_bs, debe_us, haber_us, LibroDiario_idLibroDiario, Cuenta_idCuenta, show_by, hora_ldd";
							   	$value_set="'".(($value['id']*1)+1)."' , '".$data[11]['value']."' , '".$value['debe_bs']."' , '".$value['haber_bs']."', '".$value['debe_sus']."', '".$value['haber_sus']."', '".$_idLibroDiario."' , '".$value['id_cuenta']."' , '1', '".$value['hora']."'";

							   	//print_r(($value['debe_bs']));
							   	//query para ld_detalle
								$query = "INSERT INTO ld_detalle (".$nombre_set.") VALUES (".$value_set.")";
								if (!$this->_db->query($query)) {
									//en casso de error muestra el problema en consola
								    return "Fallo INSERT INTO ld_detalle [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
								}

								//seleccionamos los valores anteriores de ld_detalle, el ultimo valor, para conseguir su id
								$result = $this->_db->query("SELECT * FROM libromayor WHERE show_by = '1' and Cuenta_idCuenta = '".$value['id_cuenta']."' ORDER BY 	idLibroMayor DESC");
								$retorna = $result->fetch_all(MYSQL_ASSOC);


								//seleccionamos los valores anteriores de libromayor, el ultimo valor de la cuenta para restar para su saldo
								$result = $this->_db->query("SELECT * FROM ld_detalle WHERE show_by = '1' ORDER BY 	idld_detalle  DESC LIMIT 1");
								$_idld_detalle = $result->fetch_all(MYSQL_ASSOC);
								//print_r(count($retorna));
								//print_r(($value['debe_bs']));
								//verificamos que tenga un valor en caso de que no tuviera valor se lo inicializa con cero. esto se hara con valor absoluto
								if (count($retorna) <= 0) {// se verifica que no tiene valor saldo anterior

									//asignar valor anterior
									$saldo_ago = 0.00;
									$saldo_present = number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', '');

									//print_r(number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', ''));

									$_setNOMBRE = "nro_lm, saldo_lm, Comprobante_idComprobante, Cuenta_idCuenta, show_by";
									$_setVALOR = "'".$_idld_detalle[0]['idld_detalle']."', '".$saldo_present."', '".$_idComprobante."', '".$value['id_cuenta']."', '1'";
									//query para libromayor
									$query = "INSERT INTO libromayor (".$_setNOMBRE.") VALUES (".$_setVALOR.")";
									if (!$this->_db->query($query)) {
										//en casso de error muestra el problema en consola
									    return "Fallo INSERT INTO libromayor [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
									}
								}else{
									//asignar valor anterior
									$saldo_ago = number_format($retorna[0]['saldo_lm'], 2, '.', '');
									$saldo_present = number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', '');

									$_setNOMBRE = "nro_lm, saldo_lm, Comprobante_idComprobante, Cuenta_idCuenta, show_by";
									$_setVALOR = "'".$_idld_detalle[0]['idld_detalle']."', '".$saldo_present."', '".$_idComprobante."', '".$value['id_cuenta']."', '1'";
									//query para libromayor
									$query = "INSERT INTO libromayor (".$_setNOMBRE.") VALUES (".$_setVALOR.")";
									if (!$this->_db->query($query)) {
										//en casso de error muestra el problema en consola
									    return "Fallo INSERT INTO libromayor [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
									}
								}

								


							}
							unset($valor); // rompe la referencia con el último elemento

							//2.4 llenado en la tabla comprobante
							//contamos las filas de traspaso y colocamos el sigla comp con el que sigue con count()
							$result = $this->_db->query("SELECT * FROM traspaso WHERE show_by = '1'");
							$retorna = $result->fetch_all(MYSQL_ASSOC);

							//cambiar posicion de fecha para base de datos 
							$fehca_array = explode("/",$data[4]['value']);
							$fecha_db = $fehca_array[2]."/".$fehca_array[1]."/".$fehca_array[0]; 
							//modificamos valores de nro_ld que es numero de filas
							$query = "UPDATE comprobante SET recibo_comp = '".$data[9]['value']."', sigla_comp	 ='".$opcion[0]."-".count($retorna)."', glosa_comp = '".$data[11]['value']."' , fecha_comp = '".$fecha_db."' , TipoPago_idTipoPago = '".$data[10]['valueSelect']['id']."' , Moneda_idMoneda = '".$data[2]['valueSelect']['id']."'  WHERE idComprobante = '".$_idComprobante."'";
							//print_r($query);
							if (!$this->_db->query($query)) {
								//en casso de error muestra el problema en consola
							    return "Fallo UPDATE comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								return array('mensaje'=> "Guardar ok");
							}
						}
					}					
					break;
				case 'CDI':
					
					//print_r("Ingreso");

					//1 Reservar tablas para insertar
					//  1.1RESREVA DE UN COMPROBANTE
					$query = "INSERT INTO comprobante (sigla_comp, TipoPago_idTipoPago, Moneda_idMoneda, show_by) VALUES ('".$opcion[0]."' ,".$data[10]['valueSelect']['id']." , ".$data[2]['valueSelect']['id'].", '1')";
					if (!$this->_db->query($query)) {
						//en casso de error muestra el problema en consola
					    return "Fallo INSERT INTO comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//Obtenemod el idComprobante para operarlo despues
						$result = $this->_db->query("SELECT * FROM comprobante WHERE show_by = '1' ORDER BY idComprobante DESC LIMIT 1");

						$retorna = $result->fetch_all(MYSQL_ASSOC);
						$_idComprobante = $retorna[0]['idComprobante'];

						//1.2 RESREVA DE UN librodiario
						$query = "INSERT INTO librodiario (Usuario_idUsuario, CicloContable_idCicloContable, Comprobante_idComprobante, show_by) VALUES ('".$Usuario_idUsuario."' , ".$_idCicloContable." , ".$_idComprobante.", '1')";
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo INSERT INTO librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							//Obtenemod el idComprobante para operarlo despues
							$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by = '1' ORDER BY 	idLibroDiario DESC LIMIT 1");

							$retorna = $result->fetch_all(MYSQL_ASSOC);
							$_idLibroDiario = $retorna[0]['idLibroDiario'];
						}
						//1.3 RESREVA DE UN traspaso
						$query = "INSERT INTO ingreso (Comprobante_idComprobante, show_by) VALUES ('".$_idComprobante."', '1')";
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo INSERT INTO ingreso: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							//Obtenemod el idComprobante para operarlo despues
							$result = $this->_db->query("SELECT * FROM ingreso WHERE show_by = '1' ORDER BY 	idIngreso DESC LIMIT 1");

							$retorna = $result->fetch_all(MYSQL_ASSOC);
							$_idIngreso = $retorna[0]['idIngreso'];
						}
					}

					// 2. update de las tablas reservadas del ultimo hasta el principio
					//  2.1 traspaso llenado de tabla
					// verificamos el numero de traspasos
					$result = $this->_db->query("SELECT * FROM ingreso WHERE show_by = '1'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);


					$query = "UPDATE ingreso SET nro_i ='".count($retorna)."'  WHERE idIngreso = '".$_idIngreso."'";
					//print_r($query);
					if (!$this->_db->query($query)) {
						//en casso de error muestra el problema en consola
					    return "Fallo UPDATE ingreso: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						
						//2.2 librodiario llenado de tabla
						//contamos las filas de nro_ld (asiento) y colocamos el que sigue con count()
						$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by = '1' and CicloContable_idCicloContable = '".$_idCicloContable."'");
						$retorna = $result->fetch_all(MYSQL_ASSOC);

						//modificamos valores de nro_ld que es numero de filas
						$query = "UPDATE librodiario SET nro_ld	 ='".count($retorna)."'WHERE idLibroDiario = '".$_idLibroDiario."'";
						//print_r($query);
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo UPDATE librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{

							//2.3. llenado en la tabla ld_detalle
							$array = $data[12]['value'];
							foreach ($array as $key => $value) {
							   	//realizar consulta sql para llenar en ld_detalle
							   	//print_r($array);
							   	$nombre_set="nro_linea, detalle_ldd, debe_bs, haber_bs, debe_us, haber_us, LibroDiario_idLibroDiario, Cuenta_idCuenta, show_by, hora_ldd";
							   	$value_set="'".(($value['id']*1)+1)."' , '".$data[11]['value']."' , '".$value['debe_bs']."' , '".$value['haber_bs']."', '".$value['debe_sus']."', '".$value['haber_sus']."', '".$_idLibroDiario."' , '".$value['id_cuenta']."' , '1', '".$value['hora']."'";
							   	//print_r($value_set);
							   	//query
								$query = "INSERT INTO ld_detalle (".$nombre_set.") VALUES (".$value_set.")";
								if (!$this->_db->query($query)) {
									//en casso de error muestra el problema en consola
								    return "Fallo INSERT INTO ld_detalle [ingreso]: (" . $this->_db->errno . ") " . $this->_db->error;
								}else{

									//2.4 llenado de la tabla lventas
									//guardamos en un array todo si es que tiene iva
									if (isset($value['registroIva'])) {// pregunta si tiene iva
										//en caso de que tenga iva.
										//print_r("hola");

										$array_iva = $value['registroIva'];

										//fecha convertir
										$fehca_array = explode("/",$array_iva[0]['value']);
										//print_r($fehca_array);
										$fecha_db = $fehca_array[2]."/".$fehca_array[1]."/".$fehca_array[0];

										//recorremos todo lo que tenga iva

										$nombre_ivaSet ="fecha_factv, nro_factv, nro_autorizacionv, cod_controlv, importe_factv, importe_ICEv, importe_excentov, importe_netov, df, Ingreso_idIngreso, Cliente_idCliente";
										$values_ivaSet ="'".$fecha_db."' , '".$array_iva[1]['value']."' , '".$array_iva[2]['value']."' , '".$array_iva[3]['value']."' , '".$array_iva[4]['value']."' , '".$array_iva[5]['value']."' , '".$array_iva[6]['value']."' , '".$array_iva[7]['value']."' , '".$array_iva[8]['value']."' , '".$_idIngreso."' , '".$array_iva[11]['value']."'"; 

										//print_r($values_ivaSet);
										$query = "INSERT INTO lventas (".$nombre_ivaSet." , show_by) VALUES (".$values_ivaSet.", '1')";
										if (!$this->_db->query($query)) {
											//en casso de error muestra el problema en consola
										    return "Fallo INSERT INTO lventas: (" . $this->_db->errno . ") " . $this->_db->error;
										}
									}
								}

								//seleccionamos los valores anteriores de libromayor, el ultimo valor de la cuenta para restar para su saldo
								$result = $this->_db->query("SELECT * FROM libromayor WHERE show_by = '1' and Cuenta_idCuenta = '".$value['id_cuenta']."' ORDER BY 	idLibroMayor DESC");
								$retorna = $result->fetch_all(MYSQL_ASSOC);

								//seleccionamos los valores anteriores de libromayor, el ultimo valor de la cuenta para restar para su saldo
								$result = $this->_db->query("SELECT * FROM ld_detalle WHERE show_by = '1' ORDER BY 	idld_detalle  DESC LIMIT 1");
								$_idld_detalle = $result->fetch_all(MYSQL_ASSOC);

								//verificamos que tenga un valor en caso de que no tuviera valor se lo inicializa con cero. esto se hara con valor absoluto
								if (count($retorna) == 0) {// se verifica que no tiene valor saldo anterior

									//asignar valor anterior
									$saldo_ago = 0.00;
									$saldo_present = number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', '');

									$_setNOMBRE = "nro_lm, saldo_lm, Comprobante_idComprobante, Cuenta_idCuenta ,show_by";
									$_setVALOR = "'".$_idld_detalle[0]['idld_detalle']."', '".$saldo_present."', '".$_idComprobante."', '".$value['id_cuenta']."', '1'";
									//query para libromayor
									$query = "INSERT INTO libromayor (".$_setNOMBRE.") VALUES (".$_setVALOR.")";
									if (!$this->_db->query($query)) {
										//en casso de error muestra el problema en consola
									    return "Fallo INSERT INTO libromayor [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
									}
								}else{
									//asignar valor anterior
									$saldo_ago = number_format($retorna[0]['saldo_lm'], 2, '.', '');
									$saldo_present = number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', '');

									$_setNOMBRE = "nro_lm, saldo_lm, Comprobante_idComprobante, Cuenta_idCuenta , show_by";
									$_setVALOR = "'".$_idld_detalle[0]['idld_detalle']."', '".$saldo_present."', '".$_idComprobante."', '".$value['id_cuenta']."', '1'";
									//query para libromayor
									$query = "INSERT INTO libromayor (".$_setNOMBRE.") VALUES (".$_setVALOR.")";
									if (!$this->_db->query($query)) {
										//en casso de error muestra el problema en consola
									    return "Fallo INSERT INTO libromayor [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
									}
								}
							}
							unset($valor); // rompe la referencia con el último elemento

							//2.4 llenado en la tabla comprobante
							//contamos las filas de traspaso y colocamos el sigla comp con el que sigue con count()
							$result = $this->_db->query("SELECT * FROM ingreso WHERE show_by = '1'");
							$retorna = $result->fetch_all(MYSQL_ASSOC);

							//cambiar posicion de fecha para base de datos 
							$fehca_array = explode("/",$data[4]['value']);
							$fecha_db = $fehca_array[2]."/".$fehca_array[1]."/".$fehca_array[0]; 
							//modificamos valores de nro_ld que es numero de filas
							$query = "UPDATE comprobante SET recibo_comp = '".$data[9]['value']."', sigla_comp	 ='".$opcion[0]."-".count($retorna)."', glosa_comp = '".$data[11]['value']."' , fecha_comp = '".$fecha_db."' , TipoPago_idTipoPago = '".$data[10]['valueSelect']['id']."' , Moneda_idMoneda = '".$data[2]['valueSelect']['id']."'  WHERE idComprobante = '".$_idComprobante."'";
							//print_r($query);
							if (!$this->_db->query($query)) {
								//en casso de error muestra el problema en consola
							    return "Fallo UPDATE comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								return array('mensaje'=> "Guardar ok");
							}
						}
					}					

					break;
				case 'CDE':
					//print_r("Egreso");

					//1 Reservar tablas para insertar
					//  1.1RESREVA DE UN COMPROBANTE
					$query = "INSERT INTO comprobante (sigla_comp, TipoPago_idTipoPago, Moneda_idMoneda, show_by) VALUES ('".$opcion[0]."' ,".$data[10]['valueSelect']['id']." , ".$data[2]['valueSelect']['id'].", '1')";
					if (!$this->_db->query($query)) {
						//en casso de error muestra el problema en consola
					    return "Fallo INSERT INTO comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//Obtenemod el idComprobante para operarlo despues
						$result = $this->_db->query("SELECT * FROM comprobante WHERE show_by = '1' ORDER BY idComprobante DESC LIMIT 1");

						$retorna = $result->fetch_all(MYSQL_ASSOC);
						$_idComprobante = $retorna[0]['idComprobante'];

						//1.2 RESREVA DE UN librodiario
						$query = "INSERT INTO librodiario (Usuario_idUsuario, CicloContable_idCicloContable, Comprobante_idComprobante, show_by) VALUES ('".$Usuario_idUsuario."' , ".$_idCicloContable." , ".$_idComprobante.", '1')";
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo INSERT INTO librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							//Obtenemod el idComprobante para operarlo despues
							$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by = '1' ORDER BY 	idLibroDiario DESC LIMIT 1");

							$retorna = $result->fetch_all(MYSQL_ASSOC);
							$_idLibroDiario = $retorna[0]['idLibroDiario'];
						}
						//1.3 RESREVA DE UN traspaso
						$query = "INSERT INTO egreso (Comprobante_idComprobante, show_by) VALUES ('".$_idComprobante."', '1')";
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo INSERT INTO egreso: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{
							//Obtenemod el idComprobante para operarlo despues
							$result = $this->_db->query("SELECT * FROM egreso WHERE show_by = '1' ORDER BY idEgreso DESC LIMIT 1");

							$retorna = $result->fetch_all(MYSQL_ASSOC);
							$_idEgreso = $retorna[0]['idEgreso'];
						}
					}

					// 2. update de las tablas reservadas del ultimo hasta el principio
					//  2.1 traspaso llenado de tabla
					// verificamos el numero de traspasos
					$result = $this->_db->query("SELECT * FROM egreso WHERE show_by = '1'");
					$retorna = $result->fetch_all(MYSQL_ASSOC);


					$query = "UPDATE egreso SET nro_e ='".count($retorna)."'  WHERE idEgreso = '".$_idEgreso."'";
					//print_r($query);
					if (!$this->_db->query($query)) {
						//en casso de error muestra el problema en consola
					    return "Fallo UPDATE egreso: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						
						//2.2 librodiario llenado de tabla
						//contamos las filas de nro_ld (asiento) y colocamos el que sigue con count()
						$result = $this->_db->query("SELECT * FROM librodiario WHERE show_by = '1' and CicloContable_idCicloContable = '".$_idCicloContable."'");
						$retorna = $result->fetch_all(MYSQL_ASSOC);

						//modificamos valores de nro_ld que es numero de filas
						$query = "UPDATE librodiario SET nro_ld	 ='".count($retorna)."'WHERE idLibroDiario = '".$_idLibroDiario."'";
						//print_r($query);
						if (!$this->_db->query($query)) {
							//en casso de error muestra el problema en consola
						    return "Fallo UPDATE librodiario: (" . $this->_db->errno . ") " . $this->_db->error;
						}else{

							//2.3. llenado en la tabla ld_detalle
							$array = $data[12]['value'];
							foreach ($array as $key => $value) {
							   	//realizar consulta sql para llenar en ld_detalle
							   	//print_r($array);
							   	$nombre_set="nro_linea, detalle_ldd, debe_bs, haber_bs, debe_us, haber_us, LibroDiario_idLibroDiario, Cuenta_idCuenta, show_by, hora_ldd";
							   	$value_set="'".(($value['id']*1)+1)."' , '".$data[11]['value']."' , '".$value['debe_bs']."' , '".$value['haber_bs']."', '".$value['debe_sus']."', '".$value['haber_sus']."', '".$_idLibroDiario."' , '".$value['id_cuenta']."' , '1', '".$value['hora']."'";

							   	//query
								$query = "INSERT INTO ld_detalle (".$nombre_set.") VALUES (".$value_set.")";
								if (!$this->_db->query($query)) {
									//en casso de error muestra el problema en consola
								    return "Fallo INSERT INTO ld_detalle [egreso]: (" . $this->_db->errno . ") " . $this->_db->error;
								}else{

									//2.4 llenado de la tabla lventas
									//guardamos en un array todo si es que tiene iva
									if (isset($value['registroIva'])) {// pregunta si tiene iva
										//en caso de que tenga iva.
										//print_r("hola");

										$array_iva = $value['registroIva'];

										//fecha convertir
										$fehca_array = explode("/",$array_iva[0]['value']);
										//print_r($fehca_array);
										$fecha_db = $fehca_array[2]."/".$fehca_array[1]."/".$fehca_array[0];

										//recorremos todo lo que tenga iva

										$nombre_ivaSet ="fecha_factc, nro_factc, nro_autorizacionc, cod_controlc, importe_factc, importe_ICEc, importe_excentoc, importe_netoc, cf, Egreso_idEgreso, Proveedor_idProveedor";
										$values_ivaSet ="'".$fecha_db."' , '".$array_iva[1]['value']."' , '".$array_iva[2]['value']."' , '".$array_iva[3]['value']."' , '".$array_iva[4]['value']."' , '".$array_iva[5]['value']."' , '".$array_iva[6]['value']."' , '".$array_iva[7]['value']."' , '".$array_iva[8]['value']."' , '".$_idEgreso."' , '".$array_iva[11]['value']."'"; 

										//print_r($values_ivaSet);
										$query = "INSERT INTO lcompras (".$nombre_ivaSet." , show_by) VALUES (".$values_ivaSet.", '1')";
										if (!$this->_db->query($query)) {
											//en casso de error muestra el problema en consola
										    return "Fallo INSERT INTO lcompras: (" . $this->_db->errno . ") " . $this->_db->error;
										}
									}
								}
								//seleccionamos los valores anteriores de libromayor, el ultimo valor de la cuenta para restar para su saldo
								$result = $this->_db->query("SELECT * FROM libromayor WHERE show_by = '1' and Cuenta_idCuenta = '".$value['id_cuenta']."' ORDER BY 	idLibroMayor DESC");
								$retorna = $result->fetch_all(MYSQL_ASSOC);

								//seleccionamos los valores anteriores de libromayor, el ultimo valor de la cuenta para restar para su saldo
								$result = $this->_db->query("SELECT * FROM ld_detalle WHERE show_by = '1' ORDER BY 	idld_detalle  DESC LIMIT 1");
								$_idld_detalle = $result->fetch_all(MYSQL_ASSOC);

								//verificamos que tenga un valor en caso de que no tuviera valor se lo inicializa con cero. esto se hara con valor absoluto
								if (count($retorna) == 0) {// se verifica que no tiene valor saldo anterior

									//asignar valor anterior
									$saldo_ago = 0.00;
									$saldo_present = number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', '');

									$_setNOMBRE = "nro_lm, saldo_lm, Comprobante_idComprobante, Cuenta_idCuenta , show_by";
									$_setVALOR = "'".$_idld_detalle[0]['idld_detalle']."', '".$saldo_present."', '".$_idComprobante."', '".$value['id_cuenta']."', '1'";
									//query para libromayor
									$query = "INSERT INTO libromayor (".$_setNOMBRE.") VALUES (".$_setVALOR.")";
									if (!$this->_db->query($query)) {
										//en casso de error muestra el problema en consola
									    return "Fallo INSERT INTO libromayor [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
									}
								}else{
									//asignar valor anterior
									$saldo_ago = number_format($retorna[0]['saldo_lm'], 2, '.', '');
									$saldo_present = number_format(($value['debe_bs'] - $value['haber_bs'] + $saldo_ago), 2, '.', '');

									$_setNOMBRE = "nro_lm, saldo_lm, Comprobante_idComprobante, Cuenta_idCuenta ,show_by";
									$_setVALOR = "'".$_idld_detalle[0]['idld_detalle']."', '".$saldo_present."', '".$_idComprobante."', '".$value['id_cuenta']."', '1'";
									//query para libromayor
									$query = "INSERT INTO libromayor (".$_setNOMBRE.") VALUES (".$_setVALOR.")";
									if (!$this->_db->query($query)) {
										//en casso de error muestra el problema en consola
									    return "Fallo INSERT INTO libromayor [traspaso]: (" . $this->_db->errno . ") " . $this->_db->error;
									}
								}
							}
							unset($valor); // rompe la referencia con el último elemento

							//2.4 llenado en la tabla comprobante
							//contamos las filas de traspaso y colocamos el sigla comp con el que sigue con count()
							$result = $this->_db->query("SELECT * FROM egreso WHERE show_by = '1'");
							$retorna = $result->fetch_all(MYSQL_ASSOC);

							//cambiar posicion de fecha para base de datos 
							$fehca_array = explode("/",$data[4]['value']);
							$fecha_db = $fehca_array[2]."/".$fehca_array[1]."/".$fehca_array[0]; 
							//modificamos valores de nro_ld que es numero de filas
							$query = "UPDATE comprobante SET recibo_comp = '".$data[9]['value']."', sigla_comp	 ='".$opcion[0]."-".count($retorna)."', glosa_comp = '".$data[11]['value']."' , fecha_comp = '".$fecha_db."' , TipoPago_idTipoPago = '".$data[10]['valueSelect']['id']."' , Moneda_idMoneda = '".$data[2]['valueSelect']['id']."'  WHERE idComprobante = '".$_idComprobante."'";
							//print_r($query);
							if (!$this->_db->query($query)) {
								//en casso de error muestra el problema en consola
							    return "Fallo UPDATE comprobante: (" . $this->_db->errno . ") " . $this->_db->error;
							}else{
								return array('mensaje'=> "Guardar ok");
							}
						}
					}		
					break;
				default:
					# code...
					break;
				$result->close();
			}
			
		}
	}

	



	//MAIN
	$object = new librodiario();
	
	switch ($_POST['run']) {
		case 'listar':
			$outp = $object->crearInterfaz();
			break;
		case 'moneda':
			$outp = $object->MonedaTipoCambio($_POST['id']);
			break;
		case 'adicionar_tipocambio':
			$outp = $object->TipoCambioAdicionar($_POST['value'], $_POST['Moneda_idMoneda']);
			break;
		case 'crear_detalle':
			$outp = $object->crearDetalle($_POST['idFila']);
			break;
		case 'crear_iva':
			$outp = $object->crearIva($_POST['idFila'], $_POST['idDecContable'], $_POST['idIVACLIENTEPROVEEDOR'], $_POST['dataFila']);
			break;
		case 'crear_detalle_FISCAL':
			$outp = $object->crearDetalleFISCAL($_POST['idFila'], $_POST['datoFilaIva'], $_POST['idDecContable']);
			break;
		case 'llenarSegunDocContable':
			$outp = $object->llenarModal($_POST['llenarSegunDocContable']);
			break;
		case 'guardar_libro_diario':
			$outp = $object->guardarLibroDiario($_POST['value'], $_POST['Usuario_idUsuario']);
			break;
		case 'crear_sigla_comprobante':
			$outp = $object->crearSiglaComprobante($_POST['docContableGet']);
			break;
		default:
			# code...
			break;
	}
	//$outp = $object->insertarLibroDiario("".$_POST['glosa']."","".$_POST['fecha']."","".$_POST['TipoPago_idTipoPago']."","".$_POST['Moneda_idMoneda']."","".$_POST['nro_ld']."","".$_POST['Usuario_idUsuario']."","".$_POST['CicloContable_idCicloContable']."","".$_POST['data']."");
	echo json_encode($outp);
?>