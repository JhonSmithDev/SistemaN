// BY: NELY M CH M
//Instancia del objeto modulo - para conectar con el html
var app = angular.module('administra', []);
app.controller("Ctrl_administra", function($scope, $http) {
  $scope.formData = {};
   sessionStorage.setItem("activo", "0"); 
  $scope.formDataSend = {name:"",password:""};

    $scope.restaurar = function(){
       $(".nombre_reg").val("");
       $(".pass_reg").val("");
       $("#myModalUser").modal('hide');
    };

    $scope.submitForm = function(formData) {
      //$scope.formDataSend.name = $.md5(formData.name);
      var password = $.md5(formData.password);

      var name = formData.name;
      //$scope.formDataSend.password = formData.password;      

      //////////////////////////////////////////////////////////////////////
                $.ajax({
                // la URL para la petición
                url : 'php/index.usuario.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { name :  name, password : password},
 
                // especifica si será una petición POST o GET
                type : 'POST',
 
                // el tipo de información que se espera de respuesta
                dataType : 'json',
 
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                  if (data[0].activo == "1") {
                    console.log("entro");

                    sessionStorage.setItem("user", data[0].nombres_usu+" "+data[0].apellidos_usu );
                    sessionStorage.setItem("id_user", data[0].idUsuario);
                    sessionStorage.setItem("activo", data[0].activo);
                    sessionStorage.setItem("rol", data[0].GrupoUsu_idGrupoUsu); 
                    sessionStorage.setItem("id_rol", data[0].idGrupoUsu);    

                    location.href = 'template/program.html';  
                  }else{
                    $("#myModalUser").modal('show');
                    sessionStorage.setItem("activo", "0"); 
                  } 
                },  
                // código a ejecutar si la petición falla;
                // son pasados como argumentos a la función
                // el objeto de la petición en crudo y código de estatus de la petición
                error : function(xhr, status) {
                  console.log('Disculpe, existió un problema envio');
                },
 
                // código a ejecutar sin importar si la petición falló o no
                complete : function(xhr, status) {
                //console.log('Petición realizada');
                }
        });

                /////////////////////////////////////////////////////////////////////

    };

    $scope.abri_modal = function() {
      $('#myModalRecupera').modal('show');
    };
    $scope.usuario_recupera_modal = function() {
      var codigo = $(".nombre_usuario_modal").val();
      //////////////////////////////////////////////////////////////////////
                $.ajax({
                  // la URL para la petición
                  url : 'php/user.email.php',
 
                  // la información a enviar
                  // (también es posible utilizar una cadena de datos)
                  data : { codigo : codigo },
 
                  // especifica si será una petición POST o GET
                  type : 'POST',
 
                  // el tipo de información que se espera de respuesta
                  dataType : 'json',
 
                  // código a ejecutar si la petición es satisfactoria;
                  // la respuesta es pasada como argumento a la función
                  success : function(data) {
                    console.log(data);  
                  },  
                  // código a ejecutar si la petición falla;
                  // son pasados como argumentos a la función
                  // el objeto de la petición en crudo y código de estatus de la petición
                  error : function(xhr, status) {
                    console.log('Disculpe, existió un problema');
                  },
 
                  // código a ejecutar sin importar si la petición falló o no
                  complete : function(xhr, status) {
                  //console.log('Petición realizada');
                    $('#myModalRecupera').modal('hide');            
                  }
                });

                /////////////////////////////////////////////////////////////////////
    };

});

