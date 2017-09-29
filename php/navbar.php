<?php
	require_once "model.php";
	/**
	* BY: NELY M CH M
	*/

	//CLASS
	class navbar extends model{

		//SECCION DE DEFINICION DE VARIABLES
		

		//ARRAY DE MENU
		protected $menu = array();

		//CONSTRUCTOR
		public function __construct(){
			parent:: __construct();
		}

		public function creacionNavBar($idUsuario){

			//busca el usuario en la tabla usuario
			$result = $this->_db->query("SELECT * FROM usuario WHERE show_by = '1' and idUsuario = '".$idUsuario."'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);


			//verifica que exista el usuario
			if (!$result) {
    			return "Falló SELECT usuario: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{
				//busca el usuario en la tabla usuario
				$result_c = $this->_db->query("SELECT * FROM ciclocontable WHERE show_by = '1' ORDER BY idCicloContable DESC LIMIT 1");
				$retorna_c = $result_c->fetch_all(MYSQL_ASSOC);

				//fecha de hoy segun servidor
				$hoy = date("j/n/Y"); 

				//creacion de arrays de menu NAVBAR
				$outp = array();


				// Creacion de campos <li>

				$outp[] = array('gestion_contable'=> "".$retorna_c[0]['gestion_ccontable']."",
								'fecha'=> $hoy,
								'ayuda'=> "",
								'nombre'=> $retorna[0]['nombres_usu']." ".$retorna[0]['apellidos_usu']
								);



							
							return $outp;
				
			}

			$result_c->close();
			$result->close();
		}

	}




	//MAIN de index usuario
	$object = new navbar();


	$outp = $object->creacionNavBar($_POST['idUsuario']);




	echo json_encode($outp);
?>