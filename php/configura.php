<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class interfaz extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar la ibterfaz correspondiente segun su rol
		public function interfaz($_rol){
			
			switch ($_rol) {
				case '1': // rol administrador
					$outp[] = array('url'=> "/",
		        			'template'=> "../template/vacio.html",
		        			'controller'=> "vacioCtrl"
		        
				    );
				    $outp[] = array('url'=> "/cuentas",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarCuentaCtrl"
				    );
				    $outp[] = array('url'=> "/cuentas2",
				        			'template'=> "../template/cuenta.html",
				        			'controller'=> "cuentaListarCtrl"
				    );
				    $outp[] = array('url'=> "/empresa",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarEmpresaCtrl"
				    );
				    $outp[] = array('url'=> "/ciclo_contable",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarCicloContableCtrl"
				    );
				    $outp[] = array('url'=> "/moneda",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarMonedaCtrl"
				    );
				    $outp[] = array('url'=> "/tipo_cambio",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarTipoCambioCtrl"
				    );
				    $outp[] = array('url'=> "/usuario",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarUsuarioCtrl"
				    );
				    $outp[] = array('url'=> "/grupo_usuario",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarGrupoUsuarioCtrl"
				    );
				    $outp[] = array('url'=> "/clase_cuenta",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarClaseCuentaCtrl"
				    );
				    $outp[] = array('url'=> "/cliente",
				        			'template'=> "../template/listar.html",
				       			 	'controller'=> "listarClienteCtrl"
				    );
				    $outp[] = array('url'=> "/proveedor",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarProveedorCtrl"
				    );
				    $outp[] = array('url'=> "/libro_diario",
				        			'template'=> "../template/libroDiario.html",
				        			'controller'=> "libroDiarioCtrl"
				    );
				    $outp[] = array('url'=> "/libro_mayor",
				        			'template'=> "../template/libroMayor.html",
				        			'controller'=> "listarLibroMayorCtrl"
				    );
				    $outp[] = array('url'=> "/libro_compra",
				        			'template'=> "../template/libroCompras.html",
				        			'controller'=> "comprasIvaCtrl"
				    );
				    $outp[] = array('url'=> "/libro_venta",
				        			'template'=> "../template/libroVentas.html",
				        			'controller'=> "ventasIvaCtrl"
				    );
				    $outp[] = array('url'=> "/ingresos",
				        			'template'=> "../template/ingresos.html",
				        			'controller'=> "ingresosCtrl"
				    );
				    $outp[] = array('url'=> "/egresos",
				        			'template'=> "../template/egresos.html",
				        			'controller'=> "egresosCtrl"
				    );
				    $outp[] = array('url'=> "/balance_general",
				        			'template'=> "../template/balanceGeneral.html",
				        			'controller'=> "balanceGeneralCtrl"
				    );

					break;
				case '2':// rol contador
					$outp[] = array('url'=> "/",
		        			'template'=> "../template/vacio.html",
		        			'controller'=> "vacioCtrl"
		        
				    );
				    $outp[] = array('url'=> "/cuentas",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarCuentaCtrl"
				    );
				    $outp[] = array('url'=> "/cuentas2",
				        			'template'=> "../template/cuenta.html",
				        			'controller'=> "cuentaListarCtrl"
				    );
				    $outp[] = array('url'=> "/empresa",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarEmpresaCtrl"
				    );
				    $outp[] = array('url'=> "/ciclo_contable",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarCicloContableCtrl"
				    );
				    $outp[] = array('url'=> "/moneda",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarMonedaCtrl"
				    );
				    $outp[] = array('url'=> "/tipo_cambio",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarTipoCambioCtrl"
				    );
				    
				    $outp[] = array('url'=> "/clase_cuenta",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarClaseCuentaCtrl"
				    );
				    $outp[] = array('url'=> "/cliente",
				        			'template'=> "../template/listar.html",
				       			 	'controller'=> "listarClienteCtrl"
				    );
				    $outp[] = array('url'=> "/proveedor",
				        			'template'=> "../template/listar.html",
				        			'controller'=> "listarProveedorCtrl"
				    );
				    $outp[] = array('url'=> "/libro_diario",
				        			'template'=> "../template/libroDiario.html",
				        			'controller'=> "libroDiarioCtrl"
				    );
				    $outp[] = array('url'=> "/libro_mayor",
				        			'template'=> "../template/libroMayor.html",
				        			'controller'=> "listarLibroMayorCtrl"
				    );
				    $outp[] = array('url'=> "/libro_compra",
				        			'template'=> "../template/libroCompras.html",
				        			'controller'=> "comprasIvaCtrl"
				    );
				    $outp[] = array('url'=> "/libro_venta",
				        			'template'=> "../template/libroVentas.html",
				        			'controller'=> "ventasIvaCtrl"
				    );
				    $outp[] = array('url'=> "/ingresos",
				        			'template'=> "../template/ingresos.html",
				        			'controller'=> "ingresosCtrl"
				    );
				    $outp[] = array('url'=> "/egresos",
				        			'template'=> "../template/egresos.html",
				        			'controller'=> "egresosCtrl"
				    );
				    $outp[] = array('url'=> "/balance_general",
				        			'template'=> "../template/balanceGeneral.html",
				        			'controller'=> "balanceGeneralCtrl"
				    );
					break;
				case '3':
					$outp[] = array('url'=> "/",
		        			'template'=> "../template/vacio.html",
		        			'controller'=> "vacioCtrl"
		        
				    );
				    
				    $outp[] = array('url'=> "/libro_diario",
				        			'template'=> "../template/libroDiario.html",
				        			'controller'=> "libroDiarioCtrl"
				    );
				    $outp[] = array('url'=> "/libro_mayor",
				        			'template'=> "../template/libroMayor.html",
				        			'controller'=> "listarLibroMayorCtrl"
				    );
				    $outp[] = array('url'=> "/libro_compra",
				        			'template'=> "../template/libroCompras.html",
				        			'controller'=> "comprasIvaCtrl"
				    );
				    $outp[] = array('url'=> "/libro_venta",
				        			'template'=> "../template/libroVentas.html",
				        			'controller'=> "ventasIvaCtrl"
				    );
				    $outp[] = array('url'=> "/ingresos",
				        			'template'=> "../template/ingresos.html",
				        			'controller'=> "ingresosCtrl"
				    );
				    $outp[] = array('url'=> "/egresos",
				        			'template'=> "../template/egresos.html",
				        			'controller'=> "egresosCtrl"
				    );
				    $outp[] = array('url'=> "/balance_general",
				        			'template'=> "../template/balanceGeneral.html",
				        			'controller'=> "balanceGeneralCtrl"
				    );
					break;
				case '4':
					$outp[] = array('url'=> "/",
		        			'template'=> "../template/vacio.html",
		        			'controller'=> "vacioCtrl"
		        
				    );

				    $outp[] = array('url'=> "/balance_general",
				        			'template'=> "../template/balanceGeneral.html",
				        			'controller'=> "balanceGeneralCtrl"
				    );

				    $outp[] = array('url'=> "/ingresos",
				        			'template'=> "../template/ingresos.html",
				        			'controller'=> "ingresosCtrl"
				    );
				    $outp[] = array('url'=> "/egresos",
				        			'template'=> "../template/egresos.html",
				        			'controller'=> "egresosCtrl"
				    );
					break;
				
				default:
					# code...
					break;
			}

			
			return $outp;


		}//End function 



	}

	//main para llamar a las clases
	//objeto a manipular
	$object = new interfaz();
	

	
	$outp = $object->interfaz($_POST['rol']);

			
	echo json_encode($outp);

	
	

?>