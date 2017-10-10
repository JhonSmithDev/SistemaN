<?php
	require_once "model.php";
	/**
	* BY: NELY M CH M
	*/

	//CLASS
	class index extends model{

		//SECCION DE DEFINICION DE VARIABLES
		

		//ARRAY DE MENU
		protected $menu = array();

		//CONSTRUCTOR
		public function __construct(){
			parent:: __construct();
		}

		public function recepcionUsuario($nombre , $password){

			//busca el usuario en la tabla usuario
			$result_child = $this->_db->query("SELECT * FROM usuario WHERE login_usu = '".$nombre."'");
			$retorna_child = $result_child->fetch_all(MYSQL_ASSOC);

			//mensaje por defecto indicando que no se registro
			//genera mensaje para el sistema
			$outp = array('activo'=> "0");

			//verifica que exista el usuario
			if (!$result_child) {
    			return "Falló SELECT usuario: (" . $this->_db->errno . ") " . $this->_db->error;
			}else{

				if (count($retorna_child) > 0) {
					//print_r(count($retorna_child));
					//busca su grupo de usuario para asignar un rol 
					$result_master = $this->_db->query("SELECT * FROM grupousu WHERE idGrupoUsu = '".$retorna_child[0]['GrupoUsu_idGrupoUsu']."'");
					$retorna_master = $result_master->fetch_all(MYSQL_ASSOC);

					//verifique que tenga un grupo de usuario
					if (!$result_child) {
	    				return "Falló SELECT grupousu: (" . $this->_db->errno . ") " . $this->_db->error;
					}else{
						//verifica la contrasena
						if (md5($retorna_child[0]['pass_usu']) == $password) {
							//genera mensaje para el sistema
							$outp[] = array('idUsuario'=> "".$retorna_child[0]['idUsuario']."",
											'nombres_usu'=> "".$retorna_child[0]['nombres_usu']."",
											'apellidos_usu'=> "".$retorna_child[0]['apellidos_usu']."",
											'GrupoUsu_idGrupoUsu'=> "".$retorna_master[0]['idGrupoUsu']."",
											'GrupoUsu_nombreGrupoUsu'=> "".$retorna_master[0]['nom_gu']."",
											'activo'=> "1",
											);
							return $outp;
							$result_child->close();
							$result_master->close();
						}else{
							//genera mensaje para el sistema
							$outp[] = array('activo'=> "0"
											
											);
						}
					}				
				}else{
					//genera mensaje para el sistema
					$outp[] = array('activo'=> "0");
				}
				
			}
			return $outp;
			
		}

	}




	//MAIN de index usuario
	$object = new index();


	$outp = $object->recepcionUsuario($_POST['name'] ,$_POST['password']);




	echo json_encode($outp);
?>