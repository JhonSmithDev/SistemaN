<?php
	require_once "config.php";
	/**
	* BY: NELY M. CH. M.
	*/
	class model{	
		protected $_db;

		public function __construct(){
			$this->_db = mysqli_connect(db_host,db_user,db_password,db_name);
			if ($this->_db->connect_errno) {
				echo "Fallo al conectar a Mysql: ".$this->_db->connect_errno;
				return ;
			}
			$this->_db->set_charset(db_charset);
		}
	}
?>