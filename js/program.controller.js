// BY: NELY M CH M
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

//      LISTAR CUENTA

app.controller("listarCuentaCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "CUENTA";
    var opcion = "cuenta";
    $scope.hide_buttom = 'hide';

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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
        enableSorting: false,
        columnDefs: [
                     {field: 'cod_cuenta', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.cod_cuenta,1,row.entity.nom_cuenta)""><span class="glyphicon glyphicon-plus edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'cod_cuenta', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.cod_cuenta,2,row.entity.nom_cuenta)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'cod_cuenta', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.cod_cuenta,3,row.entity.nom_cuenta)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'cod_cuenta', displayName: 'CÓDIGO', width:150, cellClass: 'align_left'}, 
                     {field: 'nom_cuenta', displayName: 'NOMBRE', width:250, cellClass: 'align_left'}
                     ]

    };

    //Funcion para AGREGAR, MODIFICAR Y ELIMINAR
    $scope.action = function(id,run,nombre){
        $scope.run =run;
        switch(run) {
            case 1:
                $scope.accion = "AGREGAR" 
                $scope.titulo_1 = "Nombre de nueva cuenta: ";
                $scope.contenido_1="Se adicionara dentro de ";
                $scope.nombreCuenta=nombre;
                $scope.contenido_2="la cuenta: ";
                $scope.hide ="";
                break;
            case 2:
                $scope.accion = "MODIFICAR" 
                $scope.titulo_1 = "Nuevo nombre de cuenta: ";
                $scope.contenido_1="Se modificara el nombre de cuenta ";
                $scope.nombreCuenta=nombre;
                $scope.contenido_2="por: ";
                $scope.nom_cuenta ="";
                $scope.hide ="";
                break;
            case 3:
                $scope.accion = "ELIMINAR" 
                $scope.titulo_1 = "";
                $scope.contenido_1="Se eliminara la cuenta ";
                $scope.nombreCuenta=nombre;
                $scope.contenido_2="";
                $scope.nom_cuenta ="";
                $scope.hide ="hide";
                break;
            default:
            
        }
        
        $("#myModal").modal();
        localStorage.setItem('id',id);
    }
    $scope.cancelar = function(){
        $("#myModal").modal("hide");
        $scope.accion = "" 
        $scope.titulo_1 = "";
        $scope.contenido_1="";
        $scope.nombreCuenta="";
        $scope.contenido_2="";
        $scope.nom_cuenta ="";
        $scope.hide ="";   
    }
    $scope.actualizaGrid = function(run){
        $("#myModal").modal('hide'); 
        var des = run; 
        var id = localStorage.getItem("id");
        
        var nombre_cuenta = $(".input_valor").val();

        $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion: opcion, run: des, cod_cuenta : id, nom_cuenta : nombre_cuenta
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {

                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                
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
                $scope.accion = "" 
                $scope.titulo_1 = "";
                $scope.contenido_1="";
                $scope.nombreCuenta="";
                $scope.contenido_2="";
                $scope.nom_cuenta ="";
                $scope.hide =""; 
                $scope.filterOptions.filterText = "";  
            }
        });
        //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

});
//      LISTAR EMPRESA

app.controller("listarEmpresaCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "EMPRESA";
    var opcion = "empresa";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";

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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idEmpresa', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idEmpresa,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idEmpresa', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idEmpresa,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idEmpresa', displayName: 'CÓDIGO', width:100}, 
                     {field: 'nit_empresa', displayName: 'NIT', width:150},
                     {field:'nom_empresa', displayName:'NOMBRE', width: 150}, 
                     {field:'tipo_empresa', displayName:'TIPO EMPRESA', width:150}
                     ]

    };

    //Funcion para AGREGAR, MODIFICAR Y ELIMINAR
    $scope.action = function(id,run){
        $("#myModalForm").modal();
        $scope.id_modal = id;
        //seleccion de tipo de evento a realizar Insert, Update , Delete
        switch(run) {
            case 1:
                $scope.titulo_accion = "AGREGAR"; 
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo" 
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log($scope.formModal);
                    
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
                break;
            case 2:
                $scope.titulo_accion = "MODIFICAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            case 3:
                $scope.titulo_accion = "ELIMINAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            default:
            
        }

        
    }
    $scope.cancelar = function(){
        $("#myModalForm").modal("hide");
        $scope.formModal = []; 
    }
    $scope.actualizaGrid = function(run,id){
        $("#myModalForm").modal('hide'); 
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "insertar"
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            case 2:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "modificar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            case 3:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            default:
        }
        
    }

});

//      LISTAR CICLO CONTABLE

app.controller("listarCicloContableCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "CICLO CONTABLE";
    var opcion = "cicloContable";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";

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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idCicloContable', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idCicloContable,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idCicloContable', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idCicloContable,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idCicloContable', displayName: 'CÓDIGO', width:100}, 
                     {field: 'gestion_ccontable', displayName: 'GESTIÓN CONTABLE', width:200},
                     {field:'obs_ccontable', displayName:'OBSEVACIÓN', width: 150}, 
                     {field:'Empresa_idEmpresa', displayName:'CÓDIGO EMPRESA', width:150}
                     ]

    };

    //Funcion para AGREGAR, MODIFICAR Y ELIMINAR
    $scope.action = function(id,run){
        $("#myModalForm").modal();
        $scope.id_modal = id;
        //seleccion de tipo de evento a realizar Insert, Update , Delete
        switch(run) {
            case 1:
                $scope.titulo_accion = "AGREGAR"; 
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo" 
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log($scope.formModal);
                    
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
                break;
            case 2:
                $scope.titulo_accion = "MODIFICAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            case 3:
                $scope.titulo_accion = "ELIMINAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            default:
            
        }

        
    }
    $scope.cancelar = function(){
        $("#myModalForm").modal("hide");
        $scope.formModal = []; 
    }
    $scope.actualizaGrid = function(run,id){
        $("#myModalForm").modal('hide'); 
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "insertar"
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            case 2:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "modificar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            case 3:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {
                
                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            default:
        }
        
    }

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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idMoneda', displayName:'', cellTemplate: '<a href="" ng-click="modificar(row.entity.idMoneda)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idMoneda', displayName:'', cellTemplate: '<a href="" ng-click="eliminar(row.entity.idMoneda)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idtipocambio', displayName:'', cellTemplate: '<a href="" ng-click="modificar(row.entity.idtipocambio)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idtipocambio', displayName:'', cellTemplate: '<a href="" ng-click="eliminar(row.entity.idtipocambio)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idUsuario', displayName:'', cellTemplate: '<a href="" ng-click="modificar(row.entity.idUsuario)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idUsuario', displayName:'', cellTemplate: '<a href="" ng-click="eliminar(row.entity.idUsuario)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idGrupoUsu', displayName:'', cellTemplate: '<a href="" ng-click="modificar(row.entity.idGrupoUsu)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idGrupoUsu', displayName:'', cellTemplate: '<a href="" ng-click="eliminar(row.entity.idGrupoUsu)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idClaseCuenta', displayName:'', cellTemplate: '<a href="" ng-click="modificar(row.entity.idClaseCuenta)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idClaseCuenta', displayName:'', cellTemplate: '<a href="" ng-click="eliminar(row.entity.idClaseCuenta)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idClaseCuenta', displayName: 'ID', width:100}, 
                     {field: 'cod_ccuenta', displayName: 'CÓDIGO', width:200},
                     {field: 'nom_ccuenta', displayName: 'NOMBRE', width:200},
                     {field: 'digito_ccuenta', displayName: 'DIGITO', width:200},
                     {field: 'antecesor_ccuenta', displayName: 'ANTECESOR', width:200},

                     
                     ]

    };

});

//      LISTAR TIPO CLIENTE

app.controller("listarClienteCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "CLIENTE";
    var opcion = "cliente";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";

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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idCliente', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idCliente,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idCliente', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idCliente,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idCliente', displayName: 'ID', width:100},
                     {field: 'cod_cliente', displayName: 'CÓDIGO', width:100}, 
                     {field: 'tipo_codcliente', displayName: 'TIPO CÓDIGO CLIENTE', width:200},
                     {field: 'nom_cliente', displayName: 'NOMBRE', width:200},
                     {field: 'dir_cliente', displayName: 'DIRECCIÓN', width:200},
                     {field: 'telef_cliente', displayName: 'TELÉFONO', width:200},
                     {field: 'fax_cliente', displayName: 'FAX', width:200},
                     {field: 'cel_cliente', displayName: 'CELULAR', width:200},
                     {field: 'pais_cliente', displayName: 'PAÍS', width:200},
                     {field: 'ciudad_cliente', displayName: 'CIUDAD', width:200}
                     ]

    };


    //Funcion para AGREGAR, MODIFICAR Y ELIMINAR
    $scope.action = function(id,run){
        $("#myModalForm").modal();
        $scope.id_modal = id;
        //seleccion de tipo de evento a realizar Insert, Update , Delete
        switch(run) {
            case 1:
                $scope.titulo_accion = "AGREGAR"; 
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo" 
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log($scope.formModal);
                    
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
                break;
            case 2:
                $scope.titulo_accion = "MODIFICAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            case 3:
                $scope.titulo_accion = "ELIMINAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            default:
            
        }

        
    }
    $scope.cancelar = function(){
        $("#myModalForm").modal("hide");
        $scope.formModal = []; 
    }
    $scope.actualizaGrid = function(run,id){
        $("#myModalForm").modal('hide'); 
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "insertar"
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            case 2:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "modificar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            case 3:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            default:
        }
        
    }

});

//      LISTAR PROVEEDOR

app.controller("listarProveedorCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "PROVEEDOR";
    var opcion = "proveedor";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";

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
                data : {opcion: opcion, run: '0'},
 
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
                data : {opcion: opcion, run: '0'},
 
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
                     {field: 'idProveedor', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idProveedor,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idProveedor', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idProveedor,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idProveedor', displayName: 'CÓDIGO', width:100}, 
                     {field: 'cod_prov', displayName: 'CÓDIGO PROVEEDOR', width:200},
                     {field: 'nom_prov', displayName: 'NOMBRE', width:200},
                     {field: 'dir_prov', displayName: 'DIRECCIÓN', width:200},
                     {field: 'telef_prov', displayName: 'TELÉFONO', width:200},
                     {field: 'fax_prov', displayName: 'FAX', width:200},
                     {field: 'cel_prov', displayName: 'CELULAR', width:200},
                     {field: 'email_prov', displayName: 'CORREO ELECTRÓNICO', width:200},
                     {field: 'pais_prov', displayName: 'PAÍS', width:200},
                     {field: 'ciudad_prov', displayName: 'CIUDAD', width:200}
                     ]

    };

    //Funcion para AGREGAR, MODIFICAR Y ELIMINAR
    $scope.action = function(id,run){
        $("#myModalForm").modal();
        $scope.id_modal = id;
        //seleccion de tipo de evento a realizar Insert, Update , Delete
        switch(run) {
            case 1:
                $scope.titulo_accion = "AGREGAR"; 
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo" 
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log($scope.formModal);
                    
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
                break;
            case 2:
                $scope.titulo_accion = "MODIFICAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            case 3:
                $scope.titulo_accion = "ELIMINAR";
                $scope.run = run;
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, run: run, tipo: "campo", id: id
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.formModal = data;
                            console.log("Modificar campo: "+$scope.formModal);
                    
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
                break;
            default:
            
        }

        
    }
    $scope.cancelar = function(){
        $("#myModalForm").modal("hide");
        $scope.formModal = []; 
    }
    $scope.actualizaGrid = function(run,id){
        $("#myModalForm").modal('hide'); 
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "insertar"
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            case 2:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run, 
                            data : $scope.formModal, 
                            tipo: "modificar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            case 3:
                $.ajax({
                        // la URL para la petición
                        url : '../php/main.php',
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            opcion: opcion, 
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal
                        },
             
                        // especifica si será una petición POST o GET
                        type : 'POST',
             
                        // el tipo de información que se espera de respuesta
                        dataType : 'json',
             
                        // código a ejecutar si la petición es satisfactoria;
                        // la respuesta es pasada como argumento a la función
                        success : function(data) {

                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            
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
                    //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                break;
            
            default:
        }
        
    }


});


//      LISTAR, AGREGAR, MODIFICAR  COMPROBANTE

app.controller("libroDiarioCtrl", function($scope, $http) {

    //Creacion de las variables a usar
    $scope.selectDecContable = [
                                    {
                                        id: "1",
                                        value: "Traspaso"
                                    },
                                    {
                                        id: "2",
                                        value: "Ingreso"
                                    },
                                    {
                                        id: "3",
                                        value: "Egreso"
                                    }

                                ];
        //variable para ocultar cuando se escoge traspaso
        $scope.hide_traspaso = "";
        $scope.dataRegistroComprobante = [];
        $scope.selectedMoneda = [];
        $scope.formData = []; 
        $scope.debe_bs = "";
        $scope.haber_bs = "";
        $scope.debe_sus = "";
        $scope.haber_sus = "";  
        $scope.suma_debe_bs = 0;
        $scope.glosa = "";
        $scope.nro_asiento = 0;
        $scope.nro_comprobante = 0;

    // fecha del sistema del lado del cliente
    var f=new Date();
    $scope.fechaUsuario = f.getDate() + "/" + (f.getMonth()+1) + "/" + f.getFullYear();
    console.log($scope.fechaUsuario);
    $scope.fecha_ld = $scope.fechaUsuario;
    //Permite crear pequena ventan de fecha
    $( ".fecha_comprobante" ).datepicker({
        //configura lo que debe mostrarse en la ventana de fecha
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        dateFormat: "d/m/yy"
    });

    // Pregunta Nro de asiento y comprobante
    $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "librodiario", run : "5", order: "nro_ld"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("cuenta tamano: "+data.length);

                switch(data.length){
                    case 0:

                            $scope.nro_asiento = 1;
                            $scope.nro_comprobante = 1;

                        break;
                    default:
                            $scope.nro_asiento = parseInt(data[0].nro_ld) + 1;
                            $scope.nro_comprobante = $scope.nro_asiento;
                }

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

    // ajax de llenado de cuenta
    $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "cuenta", run : "0"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("cuenta"+data.length);

                $scope.dataCuenta = data;

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

    // ajax de llenado de moneda
    $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "moneda", run : "0"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("moneda"+data.length);

                $scope.dataMoneda = data;

                angular.forEach($scope.dataMoneda, function(value, key) {
                  if ($scope.dataMoneda[key].idMoneda == "2") {
                    $scope.selectedMoneda = $scope.dataMoneda[key];
                  }
                });
                

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
    // ajax de llenado de tipo de cambio por defecto $us
    $.ajax({
            // la URL para la petición
            url : '../php/main.php',
     
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "tipocambio", run : "4" , nom_id: "Moneda_idMoneda" , id : "2", order: "idtipocambio DESC"
            },
     
            // especifica si será una petición POST o GET
            type : 'POST',
     
            // el tipo de información que se espera de respuesta
            dataType : 'json',
     
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("tipo cambio llenado: "+data.length);

                $scope.dataTipoCambio = data;
                $scope.selectedTipoCambio = data;
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
    
    // ajax de llenado de tipo pago
    $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "tipopago", run : "0"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("cuenta"+data.length);

                $scope.dataTipoPago = data;
                $scope.selectedTipoPago = data;

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
    
    //funcion para adicionar una fila registro comprobante
    $scope.agregarFila = function() {

        $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "tipocambio", run : "0"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("Registro comprobante "+$scope.dataRegistroComprobante.length);
                var count = $scope.dataRegistroComprobante.length;
                count = count + 1;
                $scope.dataRegistroComprobante.push({id:count , cod_cuenta: "", nom_cuenta: "", debe_bs: 0, haber_bs: 0, debe_sus: 0, haber_sus: 0, ng_modal: 0});  
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

    //funcion para eliminar una fila registro comprobante
    $scope.eliminarFila = function() {

        $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "tipocambio", run : "0"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("Registro comprobante "+$scope.dataRegistroComprobante.length);
                $scope.dataRegistroComprobante.pop();  
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

    //funcion para adicionar una fila registro comprobante
    $scope.buscarFila = function(id_fila) {
        //localStorage.setItem("id_fila",id_fila);
        console.log("id_fila->" +id_fila);
        $("#myModal").modal();
        $.ajax({
            // la URL para la petición
            url : '../php/main.php',
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                opcion : "cuenta", run : "0"
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                console.log("Cuenta"+ data.length);
                $scope.dataCuenta = data; 
                $scope.id_fila_detalle =  id_fila;
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
    }


    // push a cuenta
    $scope.pushCuenta = function (cod_cuenta, nom_cuenta, id_fila){
        console.log("(2)id_fila->" +id_fila);
        $("#myModal").modal("hide");
        console.log("cod_cuenta: "+cod_cuenta);
        if ($scope.dataRegistroComprobante[id_fila - 1].id == id_fila) {
            $scope.dataRegistroComprobante[id_fila - 1].cod_cuenta = cod_cuenta;
            $scope.dataRegistroComprobante[id_fila - 1].nom_cuenta = nom_cuenta;
        }
        
    }

    //funcion cuando se selecciona un tipo de cambio diferente
    $scope.hasChangedTipoCambio = function(){
        console.log("id: "+$scope.selectedTipoCambio.tc_venta); 
    }

    //funcion cuando se selecciona una moneda diferente
    $scope.hasChangedMoneda = function(){
        console.log("id: "+$scope.selectedMoneda.idMoneda); 
        // ajax de llenado de tipo de cambio
        $.ajax({
                // la URL para la petición
                url : '../php/main.php',
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                    opcion : "tipocambio", run : "4" , nom_id: "Moneda_idMoneda" , id : $scope.selectedMoneda.idMoneda, order: "idtipocambio DESC"
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {
                    console.log("tipo cambio llenado: "+data.length);

                    $scope.dataTipoCambio = data;
                    $scope.selectedTipoCambio = data;
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

    }

    //funcion para habilitar campo para adicionar nuevo tipo de cambio de moneda
    $scope.adicionarTipoCambio = function(){
        $("#adicionarTipoCambio_1").addClass("hide");
        $("#adicionarTipoCambio_2").removeClass("hide");
    }

    //funcion para habilitar campo para adicionar nuevo tipo de cambio de moneda
    $scope.cancelarAdicionarTipoCambio = function(){
        $("#adicionarTipoCambio_2").addClass("hide");
        $("#adicionarTipoCambio_1").removeClass("hide");
    }

    //funcion para adicionar un nuevo tipo cambio
    $scope.actionTipoCambio =function(){
        $scope.formData = [
                            {"id": "tc_venta", "value": $scope.fechaUsuario}, 
                            {"id": "tc_compra" , "value": ""}, 
                            {"id": "tc_venta" , "value": $scope.valorTipoCambio}, 
                            {"id": "Moneda_idMoneda", "value" : $scope.selectedMoneda.idMoneda}
                            ];
        var myJsonString = JSON.stringify($scope.formData);
        $.ajax({
                // la URL para la petición
                url : '../php/main.php',
             
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                    opcion: "tipocambio", 
                    run: "1", 
                    data : myJsonString, 
                    tipo: "insertar"
                },
             
                // especifica si será una petición POST o GET
                type : 'POST',
             
                // el tipo de información que se espera de respuesta
                dataType : 'json',
             
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    console.log("tipo cambio llenado: "+data.length);

                    // ajax de llenado de tipo de cambio
                    $.ajax({
                            // la URL para la petición
                            url : '../php/main.php',
                 
                            // la información a enviar
                            // (también es posible utilizar una cadena de datos)
                            data : { 
                                opcion : "tipocambio", run : "4" , nom_id: "Moneda_idMoneda" , id : $scope.selectedMoneda.idMoneda, order: "idtipocambio DESC"
                            },
                 
                            // especifica si será una petición POST o GET
                            type : 'POST',
                 
                            // el tipo de información que se espera de respuesta
                            dataType : 'json',
                 
                            // código a ejecutar si la petición es satisfactoria;
                            // la respuesta es pasada como argumento a la función
                            success : function(data) {
                                console.log("tipo cambio llenado: "+data.length);

                                $scope.dataTipoCambio = data;
                                $scope.selectedTipoCambio = data;
                                $scope.valorTipoCambio = "";
                                $("#adicionarTipoCambio_2").addClass("hide");
                                $("#adicionarTipoCambio_1").removeClass("hide");
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
            //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

    //funcion para el select de Dec. contable
    $scope.hasChangedDecContableo = function() {
      
        switch($scope.selectedDecContable.id) {
            case "1":
                $scope.hide_traspaso = "hide";
                break;
            case "2":
                console.log("escoge 2");
                break;
            case "3":
                console.log("escoge 3");
                break;
            default:
                console.log("error con $scope.selectedDecContable.id");
        }


      
        
    };

    $scope.suma_debe_bs = function(){
                var total = 0;
                for(var i = 0; i < $scope.dataRegistroComprobante.length; i++){
                    var item = $scope.dataRegistroComprobante[i];
                    console.log("debe valor: "+item.debe_bs);
                    total += parseFloat(item.debe_bs);
                }
                return total;
                
    }

    $scope.suma_haber_bs = function(){
                var total = 0;
                for(var i = 0; i < $scope.dataRegistroComprobante.length; i++){
                    var item = $scope.dataRegistroComprobante[i];
                    console.log("debe valor: "+item.haber_bs);
                    total += parseFloat(item.haber_bs);
                }
                return total;
    }

    $scope.suma_debe_sus = function(){
                var total = 0;
                for(var i = 0; i < $scope.dataRegistroComprobante.length; i++){
                    var item = $scope.dataRegistroComprobante[i];
                    console.log("debe valor: "+item.debe_sus);
                    total += parseFloat(item.debe_sus);
                }
                return total;
    }

    $scope.suma_haber_sus = function(){
                var total = 0;
                for(var i = 0; i < $scope.dataRegistroComprobante.length; i++){
                    var item = $scope.dataRegistroComprobante[i];
                    console.log("debe valor: "+item.haber_sus);
                    total += parseFloat(item.haber_sus);
                }
                return total;
    }

    //guardar registros
    $scope.guardar = function(){
        //$scope.nro_asiento
        //$scope.nro_comprobante
        //$scope.selectedMoneda
        //$scope.selectedDecContable
        //$scope.fecha_ld
        //$scope.selectedTipoCambio
        //$scope.selectedTipoPago

        //$scope.glosa

        $.ajax({
                // la URL para la petición
                url : '../php/libroDiario.php',
             
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                    glosa: $scope.glosa, 
                    fecha: $scope.fecha_ld, 
                    TipoPago_idTipoPago : $scope.selectedTipoPago.idTipoPago, 
                    Moneda_idMoneda: $scope.selectedMoneda.idMoneda,
                    nro_ld: $scope.nro_asiento,
                    Usuario_idUsuario: 1,
                    CicloContable_idCicloContable : 1
                },
             
                // especifica si será una petición POST o GET
                type : 'POST',
             
                // el tipo de información que se espera de respuesta
                dataType : 'json',
             
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    console.log(data);

                    location.reload();           
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
    }


     
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
    .when("/cliente", {
        templateUrl : "../template/listar.html",
        controller : "listarClienteCtrl"
    })
    .when("/proveedor", {
        templateUrl : "../template/listar.html",
        controller : "listarProveedorCtrl"
    })
    .when("/libro_diario", {
        templateUrl : "../template/libroDiario.html",
        controller : "libroDiarioCtrl"
    })
    .when("/libro_mayor", {
        templateUrl : "../template/libroMayor.html"
    })
    .when("/libro_compra", {
        templateUrl : "../template/libroCompras.html"
    })
    .when("/libro_venta", {
        templateUrl : "../template/libroVentas.html"
    })
    ;
});
