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
		}
	}

?>