//Instancia del objeto modulo - para conectar con el html
var app = angular.module('sistema_contable', ['ngGrid' , 'ngRoute']);

// COMIENZO de Controladores 

//      LISTAR, AGREGAR, MODIFICAR  CUENTAS

app.controller("cuentaListarCtrl", function($scope, $http) {
   // $scope.formData = {};
    var conteo = 0;

    $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "cuenta"
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

//      LISTAR EMPRESA

app.controller("listarCuentaCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "CUENTA";
    var opcion = "cuenta";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'cod_cuenta', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.cod_cuenta)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'cod_cuenta', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.cod_cuenta)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'cod_cuenta', displayName: 'CÓDIGO', width:150}, 
                     {field: 'nom_cuenta', displayName: 'NOMBRE', width:250},
                     ]

    };

});
//      LISTAR EMPRESA

app.controller("listarEmpresaCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "EMPRESA";
    var opcion = "empresa";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idEmpresa', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idEmpresa)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idEmpresa', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idEmpresa)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idEmpresa', displayName: 'CÓDIGO', width:100}, 
                     {field: 'nit_empresa', displayName: 'NIT', width:150},
                     {field:'nom_empresa', displayName:'NOMBRE', width: 150}, 
                     {field:'tipo_empresa', displayName:'TIPO EMPRESA', width:150}
                     ]

    };

});

//      LISTAR CICLO CONTABLE

app.controller("listarCicloContableCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "CICLO CONTABLE";
    var opcion = "cicloContable";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idCicloContable', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idCicloContable)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idCicloContable', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idCicloContable)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idCicloContable', displayName: 'CÓDIGO', width:100}, 
                     {field: 'gestion_ccontable', displayName: 'GESTIÓN CONTABLE', width:200},
                     {field:'obs_ccontable', displayName:'OBSEVACIÓN', width: 150}, 
                     {field:'Empresa_idEmpresa', displayName:'CÓDIGO EMPRESA', width:150}
                     ]

    };

});

//      LISTAR MONEDA

app.controller("listarMonedaCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "MONEDA";
    var opcion = "moneda";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idMoneda', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idMoneda)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idMoneda', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idMoneda)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idMoneda', displayName: 'CÓDIGO', width:100}, 
                     {field: 'tipo_moneda', displayName: 'TIPO MONEDA', width:200},
                     {field: 'obs_moneda', displayName:'OBSEVACIÓN', width: 150}, 
                     ]

    };

});

//      LISTAR TIPO CAMBIO

app.controller("listarTipoCambioCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "TIPO CAMBIO";
    var opcion = "tipoCambio";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idtipocambio', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idtipocambio)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idtipocambio', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idtipocambio)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idtipocambio', displayName: 'CÓDIGO', width:100}, 
                     {field: 'tc_fecha', displayName: 'TIPO CAMBIO FECHA', width:200},
                     {field: 'tc_compra', displayName:'TC. COMPRA', width: 150},
                     {field: 'tc_venta', displayName:'TC. VENTA', width: 150},
                     {field: 'Moneda_idMoneda', displayName:'CÓDIGO MONEDA', width: 150}, 
                     ]

    };

});

//      LISTAR TIPO USUARIO

app.controller("listarUsuarioCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "USUARIO";
    var opcion = "usuario";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idUsuario', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idUsuario)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idUsuario', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idUsuario)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idUsuario', displayName: 'CÓDIGO', width:100}, 
                     {field: 'ci_usuario', displayName: 'C.I.', width:200},
                     {field: 'login_usu', displayName:'LOGIN', width: 150},
                     {field: 'pass_usu', displayName:'PASSWORD', width: 150},
                     {field: 'apellidos_usu', displayName:'APELLIDO', width: 150},
                     {field: 'nombres_usu', displayName:'NOMBRE', width: 150},
                     {field: 'telef_usu', displayName:'TELÉFONO', width: 150},
                     {field: 'dir_usu', displayName:'DIRECCIÓN', width: 150},
                     {field: 'correo_usu', displayName:'CORREO', width: 150},
                     {field: 'cargo_usu', displayName:'CARGO', width: 150}, 
                     {field: 'GrupoUsu_idGrupoUsu', displayName:'GRUPO USUARIO', width: 150}, 
                     ]

    };

});

//      LISTAR TIPO USUARIO

app.controller("listarGrupoUsuarioCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "GRUPO USUARIO";
    var opcion = "grupoUsuario";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idGrupoUsu', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idGrupoUsu)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idGrupoUsu', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idGrupoUsu)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idGrupoUsu', displayName: 'CÓDIGO', width:100}, 
                     {field: 'nom_gu', displayName: 'NOMBRE', width:200},
                     
                     ]

    };

});

//      LISTAR TIPO CLASE CUENTA

app.controller("listarClaseCuentaCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "CLASE CUENTA";
    var opcion = "claseCuenta";

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
        pageSize: 20,
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                url : '../php/main.php',
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {opcion: opcion},
 
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
                     {field: 'idClaseCuenta', displayName:'', cellTemplate: '<div ng-click="modificar(row.entity.idClaseCuenta)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idClaseCuenta', displayName:'', cellTemplate: '<div ng-click="eliminar(row.entity.idClaseCuenta)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></div>',width:30},
                     {field: 'idClaseCuenta', displayName: 'ID', width:100}, 
                     {field: 'cod_ccuenta', displayName: 'CÓDIGO', width:200},
                     {field: 'nom_ccuenta', displayName: 'NOMBRE', width:200},
                     {field: 'digito_ccuenta', displayName: 'DIGITO', width:200},
                     {field: 'antecesor_ccuenta', displayName: 'ANTECESOR', width:200},

                     
                     ]

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
        templateUrl : "../template/listar.html",
        controller : "listarCuentaCtrl"
    })
    .when("/cuentas2", {
        templateUrl : "../template/cuenta.html",
        controller : "cuentaListarCtrl"
    })
    .when("/empresa", {
        templateUrl : "../template/listar.html",
        controller : "listarEmpresaCtrl"
    })
    .when("/ciclo_contable", {
        templateUrl : "../template/listar.html",
        controller : "listarCicloContableCtrl"
    })
    .when("/moneda", {
        templateUrl : "../template/listar.html",
        controller : "listarMonedaCtrl"
    })
    .when("/tipo_cambio", {
        templateUrl : "../template/listar.html",
        controller : "listarTipoCambioCtrl"
    })
    .when("/usuario", {
        templateUrl : "../template/listar.html",
        controller : "listarUsuarioCtrl"
    })
    .when("/grupo_usuario", {
        templateUrl : "../template/listar.html",
        controller : "listarGrupoUsuarioCtrl"
    })
    .when("/clase_cuenta", {
        templateUrl : "../template/listar.html",
        controller : "listarClaseCuentaCtrl"
    })
    ;
});
