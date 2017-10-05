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
			//genra fila
			$array_ = array();
			$array[] = array('id'=> 0 , 
							  'cod_cuenta'=> "", 
							  'nom_cuenta'=> "", 
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
				//genra fila
				$array_ = array();
				$outp = array('id'=> $idFila , 
								  'cod_cuenta'=> "", 
								  'nom_cuenta'=> "", 
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
			$hoy = date("Y/n/d");
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
	                				'tipo'=> "text", 
	                				'name'=> "nro_factv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Nro. de autirzación", 
	                				'tipo'=> "text", 
	                				'name'=> "nro_autorizacionv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Codigo de control de Venta", 
	                				'tipo'=> "text", 
	                				'name'=> "cod_controlv" ,
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe de factura", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "importe_factv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe ICE", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "imorte_ICEv",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe excento", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "importe_excentov",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe Neto", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "importe_netov",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "DF", 
	                				'tipo'=> "text", 
	                				'name'=> "resultado",
	                				'value'=> ""
	                				);


	                $outp[] = array('label'=> "sub total fila",
	                				'class'=> "", 
	                				'tipo'=> "text-block", 
	                				'name'=> "sub_total_fila",
	                				'value'=> $data['haber_bs']
	                				);

	                $outp[] = array('label'=> "total fila",
	                				'class'=> "", 
	                				'tipo'=> "text-block", 
	                				'name'=> "total_fila",
	                				'value'=> 0
	                				);

	                 $outp[] = array('label'=> "Cliente_idCliente",
	                				'class'=> "", 
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
	                				'tipo'=> "text", 
	                				'name'=> "nro_factc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Nro. de autirzación", 
	                				'tipo'=> "text", 
	                				'name'=> "nro_autorizacionc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Codigo de control de Venta", 
	                				'tipo'=> "text", 
	                				'name'=> "cod_controlc" ,
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe de factura", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "importe_factc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe ICE", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "imorte_ICEc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe excento", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "importe_excentoc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "Importe Neto", 
	                				'tipo'=> "text-keyup", 
	                				'name'=> "importe_netoc",
	                				'value'=> "" 
	                				);

	                $outp[] = array('label'=> "CF", 
	                				'tipo'=> "text", 
	                				'name'=> "resultado",
	                				'value'=> ""
	                				);

	                $outp[] = array('label'=> "sub total fila",
	                				'class'=> "", 
	                				'tipo'=> "text-block", 
	                				'name'=> "sub_total_fila",
	                				'value'=> $data['debe_bs']
	                				);

	                $outp[] = array('label'=> "total fila",
	                				'class'=> "", 
	                				'tipo'=> "text-block", 
	                				'name'=> "total_fila",
	                				'value'=> 0
	                				);

	                 $outp[] = array('label'=> "Proveedor_idProveedor",
	                				'class'=> "", 
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

			//print_r($data);
			$outp = array();
			switch ($idDecContable) {
				case '2'://Ingreso
					$array_ = array();
					$outp = array('id'=> $idFila , 
									  'cod_cuenta'=> "221", 
									  'nom_cuenta'=> "DEBITO FISCAL", 
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
					$array_ = array();
					$outp = array('id'=> $idFila , 
									  'cod_cuenta'=> "1207", 
									  'nom_cuenta'=> "CREDITO FISCAL", 
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
		default:
			# code...
			break;
	}
	//$outp = $object->insertarLibroDiario("".$_POST['glosa']."","".$_POST['fecha']."","".$_POST['TipoPago_idTipoPago']."","".$_POST['Moneda_idMoneda']."","".$_POST['nro_ld']."","".$_POST['Usuario_idUsuario']."","".$_POST['CicloContable_idCicloContable']."","".$_POST['data']."");
	echo json_encode($outp);
?>