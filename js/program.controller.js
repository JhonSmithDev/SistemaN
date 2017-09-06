//Instancia del objeto modulo - para conectar con el html
var app = angular.module('sistema_contable', ['ngGrid' , 'ngRoute']);

// COMIENZO de Controladores 

//      LISTAR CUENTA

app.controller("listarCuenta", function($scope, $http, $location) {
    //verificar si esta en session
    //console.log(sessionStorage.getItem("activo"));
        
    //Dato para la conexion a la base de datos
    var tabla = "cuenta";
    //mediante que se oredenara
    var cod = "aux_codcuenta";

    // Dato para el titulo interfaz
    $scope.titulo = "Cuenta";

    //SECCION DE LISTADO, TABLA INTELIGENTE NG-GRID
    //algoritmo para editar las variables de busqueda y filtrado de datos
    $scope.datoElimina = "";
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    //dimension de json
    //$http.get('largeLoad.json').success(function (largeLoad) {      
      //  $scope.total=largeLoad.length; 
        //console.log($scope.total);
    //});  


    // Tamano de los registros a mostrar en la tabla o grid, y con el numero de pagina a comenzar
    $scope.pagingOptions = {
        pageSize: 250,
        currentPage: 1
    };  

    // paginador
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    // consulta para acceder a los informacion de la base de datos mediante AJAX
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        //$(".carga-info").css("display", "block");
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                //////////////////////////////////////////////////////////////////////
                $.ajax({
                // la URL para la petición
                url : '../php/listar_grid.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {tabla : tabla , codigo : cod},
 
                // especifica si será una petición POST o GET
                type : 'POST',
 
                // el tipo de información que se espera de respuesta
                dataType : 'json',
 
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(largeLoad) {
                data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                    //$(".carga-info").css("display", "none");
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
                }
            });

                /////////////////////////////////////////////////////////////////////

                //$http.post('../php/producto.listar.php').success(function (largeLoad) {      
                  //  data = largeLoad.filter(function(item) {
                    //    return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    //});
                    //$scope.setPagingData(data,page,pageSize);
               // });        
            } else {
                $.ajax({
                // la URL para la petición
                url : '../php/listar_grid.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { tabla : tabla , codigo : cod},
 
                // especifica si será una petición POST o GET
                type : 'POST',
 
                // el tipo de información que se espera de respuesta
                dataType : 'json',
 
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(largeLoad) {
                    console.log(largeLoad);
                    $scope.setPagingData(largeLoad,page,pageSize);
                    $(".carga-info").css("display", "none");
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
                }
                });
                /*$http.post('php/listar_grid.php').success(function (largeLoad) {
                    console.log(largeLoad);
                    $scope.setPagingData(largeLoad,page,pageSize);
                    $(".carga-info").css("display", "none");
                });*/
            }
        }, 100);
    };
    
    // consulta de form asincrona
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    // lo que mostrara
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
          //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    // funcion de buscador para que cargue cada busqueda.
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    // gestion de los datos, lo que se vera en la interaz.
    // En esta parte se puede modificar los datos de lo que se muestra en la tabla de la interfaz
    $scope.gridOptions = {
        i18n:'es',
        data: 'myData',
        enablePaging: true,
        enableRowSelection: false,
        enableColumnResize:true,
        showFooter: true,
        totalServerItems:'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        columnDefs: [
                     {field: 'cod_cuenta', displayName: 'Código', width:150,cellClass: 'grid-align-left'}, 
                     {field: 'nom_cuenta', displayName: 'Nombre', width:400}
                     ]

    };

});

//      LISTAR, AGREGAR, MODIFICAR  CUENTAS

app.controller("cuentaListarCtrl", function($scope, $http) {
   // $scope.formData = {};
    var conteo = 0;

    $.ajax({
            // la URL para la petición
            url : '../php/listar_grid.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                codigo : $scope.usuario_codigo
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);

                $scope.data = data;

                $scope.$apply();
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
               //location.href='#/producto';
            }
        });

    //FUNCIONES PARA ADICIONAR
    $scope.adicionarCuenta = function(id,nombre,accion){
        console.log("adicionar")
        localStorage.setItem("id_codigo", id);
        $(".remove").removeClass("red");
        $(".fila"+id).addClass("red");
        $("#myModal").modal();
        $scope.hide = "";
        $scope.ejecuta_1="hide";
        $scope.ejecuta_2="hide";
        $scope.ejecuta_3="hide";
        $scope.nom_cuenta ="";

        if (accion == "1") {
            $scope.accion="Adicionar Cuenta";
            $scope.titulo_1="Nombre de nueva cuenta ";
            $scope.contenido_1="Se adicionara dentro de";
            $scope.nombreCuenta = nombre;
            $scope.contenido_2="la cuenta: ";
            $scope.hide = "";
            $scope.ejecuta_1="";
        };
        if (accion == "2") {
            $scope.accion="Modificar Cuenta";
            $scope.titulo_1="Nuevo nombre de cuenta ";
            $scope.contenido_1="Se modificara";
            $scope.contenido_1="Se modificara el nombre de cuenta ";
            $scope.nombreCuenta = nombre;
            $scope.contenido_2=" por: ";
            $scope.hide = "";
            $scope.ejecuta_2="";
        };
        if (accion == "3") {
            $scope.accion="Eliminar Cuenta";
            $scope.titulo_1="Eliminar Cuenta ";
            $scope.contenido_1="Se eliminara la cuenta";
            $scope.nombreCuenta = nombre;
            $scope.contenido_2="";
            $scope.hide="hide";
            $scope.ejecuta_3="";
        }
    }
    //funcion cancela adicionar
    $scope.cuenta_cancelar = function(){
        $("#myModal").modal('hide');
        $(".input_cuenta").val("");
        $('.btn_agregar').attr('disabled','disabled');
        $(".remove").removeClass("red");
    }
    
    //funcion para guardar en base de datos
    $scope.cuenta_verificado = function(item) {
        $("#myModal").modal('hide');
        var des = item; 
        var id = localStorage.getItem("id_codigo");
        console.log(id);
        
        var nombre_cuenta = $(".input_cuenta").val();

        $.ajax({
            // la URL para la petición
            url : '../php/ejecuta.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                cod_cuenta : id, nom_cuenta : nombre_cuenta, describe: des
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log(data);

                $scope.data = data;
                $(".input_cuenta").val("");
                $('.btn_agregar').attr('disabled','disabled');
                $scope.buscar = "";
                $scope.$apply();
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
                //location.href='#/user_listar';
            }
        });

    };
     
});


//////----=============++++++++++++++++FIN de controladores




//RUTAS DE ACCeSO A LOS DISTINTAS VENTANAS DISPONIBLES
//***************************************controller*******************************
//***************************************router*******************************
app.config(function($routeProvider) {

    $routeProvider
    .when("/", {
        templateUrl : "../template/vacio.html"
        
    })
    .when("/cuentas", {
        templateUrl : "../template/cuenta.html",
        controller : "cuentaListarCtrl"
    })
    ;
});
