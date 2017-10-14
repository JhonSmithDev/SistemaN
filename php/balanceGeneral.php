<?php
	require_once "model.php";
	/**
	* BY: Rolando Angel Montenegro Carranza
	*/
	class balanceGeneral extends model{
		//private $table

		public function __construct(){
			parent:: __construct();
		}

		//funcion para mostrar todos los registros de una tabla
		public function getData(){
			$result = $this->_db->query("SELECT * FROM ciclocontable WHERE  show_by= '1'");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			$out[] = $retorna;

			$result = $this->_db->query("SELECT * FROM clasecuenta");
			$retorna = $result->fetch_all(MYSQL_ASSOC);

			$out[] = $retorna;

			return $out;
			$result->close();
		}//End function getData

		//funcion para mostrar todos los registros de una tabla
		public function makeData($ciclocontable, $nivel_1, $nivel_2){

		}// End makeData


	}



	//main para llamar a las clases
	//objeto a manipular
	$object = new balanceGeneral();
	

	switch ($_POST['run']) {
		case '0':// listar
			$outp = $object->getData();
			//envia json a amgularjs 
			echo json_encode($outp);
			break;
		case '1':// insertar

			$outp = $object->makeData($_POST['ciclocontable'],$_POST['nivel_1'],$_POST['nivel_2']);
			
			echo json_encode($outp);
			break;
		
		default:
			array('mensaje'=> "Error tipo RUN");
			echo json_encode($outp);
			break;
	}
	
	

?>