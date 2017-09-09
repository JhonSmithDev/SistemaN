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

		public function insertTable($id, $data, $table){
			switch ($table) {
				case 'cuenta':

					if (!$this->_db->query('call insertarcuenta('.$id.', '.$data.')')) {
    					return "Falló CALL: (" . $this->_db->errno . ") " . $this->_db->error;
					}
					break;
				case 'empresa':
					
					break;
				default:
					$retorna = "Error tabla";
					return $retorna;
					break;
			}
			
		}//End function insertTable

		public function updateTable($table, $nom_id, $id, $nom_data, $data){
			if (!$this->_db->query('UPDATE '.$table.' SET '.$nom_data.' = '.$data.' WHERE '.$nom_id.' = '.$id.'')) {
    			return "Falló UPDATE: (" . $this->_db->errno . ") " . $this->_db->error;
			}
			
		}//End function updateTable

		public function deleteTable($table, $nom_id, $id){
			if (!$this->_db->query('DELETE FROM '.$table.' WHERE '.$nom_id.' = '.$id.'')) {
    			return "Falló DELETE: (" . $this->_db->errno . ") " . $this->_db->error;
			}
			
		}//End function updateTable



	}//END CLASS databaseModel

?>