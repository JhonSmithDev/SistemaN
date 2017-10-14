// BY: NELY M CH M
//Instancia del objeto modulo - para conectar con el html
var app = angular.module('sistema_contable', ['ngGrid' , 'ngRoute']);

// COMIENZO de Controladores 
//      LISTAR, AGREGAR, MODIFICAR  CUENTAS

app.controller("NavBarListarCtrl", function($scope, $http) {
   
    var url = '../php/navbar.php';
    var conteo = 0;
    var idUsuario = sessionStorage.getItem("id_user");

    $.ajax({
            // la URL para la petición
            url : url,
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                idUsuario : idUsuario
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                //console.log(data);

                $scope.dataNavbar = data;

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

    
     
});

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
    $scope.titulo = "PLAN DE CUENTAS";
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
                    //console.log(largeLoad);
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
    var url = '../php/empresa.php';

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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
    var url = '../php/cicloContable.php';

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";
    var url = '../php/moneda.php';
    
    

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                     {field: 'idMoneda', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idMoneda,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idMoneda', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idMoneda,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idMoneda', displayName: 'CÓDIGO', width:100}, 
                     {field: 'tipo_moneda', displayName: 'TIPO MONEDA', width:200},
                     {field: 'obs_moneda', displayName:'OBSEVACIÓN', width: 150}, 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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

//      LISTAR TIPO CAMBIO

app.controller("listarTipoCambioCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "TIPO DE CAMBIO";
    var opcion = "tipocambio";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";
    var url = '../php/tipocambio.php';

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : {run: '0'},
 
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
                     {field: 'idtipocambio', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idtipocambio,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idtipocambio', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idtipocambio,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idtipocambio', displayName: 'CÓDIGO', width:100}, 
                     {field: 'tc_fecha', displayName: 'TIPO CAMBIO FECHA', width:200},
                     {field: 'tc_compra', displayName:'TC. COMPRA', width: 150},
                     {field: 'tc_venta', displayName:'TC. VENTA', width: 150},
                     {field: 'Moneda_idMoneda', displayName:'CÓDIGO MONEDA', width: 150}, 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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

//      LISTAR TIPO USUARIO

app.controller("listarUsuarioCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "USUARIO";
    var opcion = "usuario";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";
    var url = '../php/usuario.php';

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                     {field: 'idUsuario', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idUsuario,2)"><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idUsuario', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idUsuario,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idUsuario', displayName: 'CÓDIGO', width:100}, 
                     {field: 'ci_usu', displayName: 'C.I.', width:200},
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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

//      LISTAR TIPO USUARIO

app.controller("listarGrupoUsuarioCtrl", function($scope, $http, $location) {
    
    // Dato para el titulo interfaz
    $scope.titulo = "GRUPO USUARIO";
    var opcion = "grupousu";
    $scope.hide_buttom = '';
    $scope.formModal=[];
    $scope.id_modal = "";
    var url = '../php/grupousu.php';

    

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                     {field: 'idGrupoUsu', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idGrupoUsu,2)""><span class="glyphicon glyphicon-pencil edita_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idGrupoUsu', displayName:'', cellTemplate: '<a href="" ng-click="action(row.entity.idGrupoUsu,3)"><span class="glyphicon glyphicon-remove elimina_css" aria-hidden="true"></span></a>',width:30},
                     {field: 'idGrupoUsu', displayName: 'CÓDIGO', width:100}, 
                     {field: 'nom_gu', displayName: 'NOMBRE', width:200},
                     
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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
    var url = '../php/cliente.php';

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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
    var url = '../php/proveedor.php';

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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                url : url,
 
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { run: '0'},
 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo" 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
                            run: run, tipo: "campo", id: id
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
        var user = sessionStorage.getItem("user");
        console.log( $scope.formModal + "esto es lo que agrega");
        console.log( run + "run");
        $scope.formModal = JSON.stringify($scope.formModal);

        //selecciona forma de actualizad si sera INSERT UPDATE DELETE
        switch(run) {
            case 1:
                $.ajax({
                        // la URL para la petición
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : { 
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {
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
                        url : url,
             
                        // la información a enviar
                        // (también es posible utilizar una cadena de datos)
                        data : {  
                            run: run,  
                            tipo: "eliminar",
                            id: $scope.id_modal,
                            user : user

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
    //definicion de variables
    var url = '../php/librodiario.php';
    //FECHA DATAPICKER
    $( ".fecha_comprobante" ).datepicker({
        //configura lo que debe mostrarse en la ventana de fecha
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
        dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" ],
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        dateFormat: "d/m/yy"
    });    


    //valor por defecto del titulo de Pagado por / recibido por
    $scope.titulo_llenar = "Por definir"; 

    //llenado de datos para interfaz
    $scope.formDataInterfaz = []; 

    //lenado para para detalle
    var formDataDetalle = [];

    //llenado de datos para el modal de busqueda
    $scope.formModalLlenar = [];

    //valores de nombre campo en la tabla que se muestra en modal
    $scope.valor1 = "";
    $scope.valor2 = "";

    //especifica que tabla se llenara en el modal venta debusqueda
    $scope.tablaIva = "";

    //bloqueo de boton guardar
    $("#boton_save").prop("disabled", true);

    //LIMPIA UN LIBRO DIARIO
    $scope.limpiaribroDiario = function(){
        //definicion de variables
        var url = '../php/librodiario.php';
        //FECHA DATAPICKER
        $( ".fecha_comprobante" ).datepicker({
            //configura lo que debe mostrarse en la ventana de fecha
            monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
            dayNames: [ "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado" ],
            dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
            dateFormat: "d/m/yy"
        });

        

        //valor por defecto del titulo de Pagado por / recibido por
        $scope.titulo_llenar = "Por definir"; 

        //llenado de datos para interfaz
        $scope.formDataInterfaz = []; 

        //lenado para para detalle
        var formDataDetalle = [];

        //llenado de datos para el modal de busqueda
        $scope.formModalLlenar = [];

        //valores de nombre campo en la tabla que se muestra en modal
        $scope.valor1 = "";
        $scope.valor2 = "";

        //especifica que tabla se llenara en el modal venta debusqueda
        $scope.tablaIva = "";

        $("#boton_save").prop("disabled", true);
        $("#boton_plus").prop("disabled", false);
        $("#boton_plus").focus();
    }

    // ADICIONA UN NUEVO LIBRO DIARIO
    $scope.nuevoLibroDiario = function(){
        $("#boton_save").prop("disabled", false);
        $("#boton_plus").prop("disabled", true);
        $("#focus-ini").focus();
        // ajax de llenado de interfaz
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "listar"
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz = data;

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

    
    //cambio de moneda hasChangedMoneda()
    $scope.hasChangedMoneda = function(){

        // ajax de llenado de interfaz
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "moneda", id: $scope.formDataInterfaz[2].valueSelect.id
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz[5].value = data;
                    $scope.formDataInterfaz[5].valueSelect = data;

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
    
    //cambio y adicion de un objeto IVA, mostrar y ocultar objeto recibido por y pagado por hasChangedDecContable
    $scope.hasChangedDocContable = function(){
        //console.log($scope.formDataInterfaz[3].valueSelect.id);
        //selecciona si estraspaso / ingreso / egreso
        var docContableGet = '';
        switch($scope.formDataInterfaz[3].valueSelect.id) {
            case '1'://traspaso
                //console.log($scope.formDataInterfaz[3].valueSelect.id);
                    
                $scope.DECCONTABLEiva = "hide"; 
                $scope.titulo_llenar = "Por definir"; 
                $scope.TITULOLIBROIVA = ""; 
                $scope.tablaIva = "";

                docContableGet = "traspaso";

                break;
            case '2'://ingreso
                     
                $scope.DECCONTABLEiva = "";
                $scope.TITULOLIBROIVA = "Libro Ventas";
                $scope.titulo_llenar = "Recibido por";
                $scope.tablaIva = "cliente";
                
                docContableGet = "ingreso";

   
                //console.log($scope.formDataInterfaz[3].valueSelect.id);
                break;
            case '3'://egreso
                    
                $scope.DECCONTABLEiva = "";
                $scope.TITULOLIBROIVA = "Libro Compras";
                $scope.titulo_llenar = "Pagado por";
                $scope.tablaIva = "proveedor";
                docContableGet = "egreso";

                //console.log($scope.formDataInterfaz[3].valueSelect.id);
                break;
            default:
        }

        // ajax para cambiar el numero de comprobante
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "crear_sigla_comprobante", docContableGet : docContableGet
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                   $scope.formDataInterfaz[1].valueSigla = data.value;

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

    //al escoger tipo cambio
    $scope.hasChangedTipoCambio = function(){
        var valor2 = parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2);

        
        //console.log("no null");
        for(var i = 0; i < $scope.formDataInterfaz[12].value.length; i++){
            var item = $scope.formDataInterfaz[12].value[i];


            if (item == "") {
                //console.log("vacio ");
                    //total += 0;
                //$scope.formDataInterfaz[12].value[id].debe_sus = 0.00;
            }else{
                //console.log("haber sus valor: "+item);
                $scope.formDataInterfaz[12].value[i].debe_sus = parseFloat((item.debe_bs/valor2)).toFixed(2);
                $scope.formDataInterfaz[12].value[i].haber_sus = parseFloat((item.haber_bs/valor2)).toFixed(2);
            }
                
        }


    }
    //funcion para adicionar un nuevo tipo de cambio - esconde el select de tipocambio
    $scope.adicionarTipoCambio = function(){
        $("#adicionarTipoCambio_1").addClass("hide");
        $("#adicionarTipoCambio_2").removeClass("hide");
    }
    //funcion para adicionar un nuevo tipo de cambio - cancela adicion y muestra el select de tipocambio
    $scope.cancelarAdicionarTipoCambio = function(){
        $("#adicionarTipoCambio_2").addClass("hide");
        $("#adicionarTipoCambio_1").removeClass("hide");
        $scope.valorTipoCambio = "";
    }
    
    $scope.actionTipoCambio = function(){
        // ajax de adicionar nuevo tipo de cambio
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "adicionar_tipocambio", value : $scope.valorTipoCambio, Moneda_idMoneda : $scope.formDataInterfaz[2].valueSelect.id
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz[5].value = data[0];
                    $scope.formDataInterfaz[5].valueSelect = data[1];

                    //volver al principio
                    $("#adicionarTipoCambio_2").addClass("hide");
                    $("#adicionarTipoCambio_1").removeClass("hide");
                    $scope.valorTipoCambio = "";

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

        
    //desplegar ventana para adicionar una nueva cuenta
    $scope.buscarFila = function(id, llenarSegun){
        //console.log(llenarSegun);
        //console.log($scope.tablaIva);
        $("#myModal").modal();

        //variable q se enviara para llenar
        var llenarSegunCCP = "";

        //escoje el tipo de llenado de cuenta o doc contable
        switch(llenarSegun){
            case 'cuenta':
                $scope.nro_filaNOW = id;
                $scope.valor1 = "CÓDIGO CUENTA";
                $scope.valor2 = "NOMBRE CUENTA";
                llenarSegunCCP = "cuenta";
                $scope.titulo_llenar_modal = "CUENTA";
                $scope.tipo_llenarData = "cuenta";

                break
            case 'docContable':
                $scope.tipo_llenarData = "clienteProveedor";
                //clasificacion de llenado, si sera cuenta o proveedor
                switch($scope.tablaIva){
                    case 'cliente':
                        $scope.nro_filaNOW = id;
                        $scope.valor1 = "Nombre de cliente";
                        $scope.valor2 = "CI / NIT";
                        llenarSegunCCP = "cliente";
                        $scope.titulo_llenar_modal = "CLIENTE";
                        break
                    case 'proveedor':
                        $scope.nro_filaNOW = id;
                        $scope.valor1 = "Nombre de proveedor";
                        $scope.valor2 = "CI / NIT";
                        llenarSegunCCP = "proveedor";
                        $scope.titulo_llenar_modal = "PROVEEDOR";
                        break
                }
                
                break
            default: 
                
        }

        
        // ajax de adicionar nuevo tipo de cambio
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "llenarSegunDocContable", llenarSegunDocContable : llenarSegunCCP
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formModalLlenar = data;

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
    //crear fila con datos de cuenta o llenar los input recibido por:/pagado por: y nit/ci
    $scope.pushDataInput = function(idData, value1Data, value2Data, idFilaCasoCuenta, llenaDataCaso){
        $("#myModal").modal("hide");
        //llenar en input valores 1 y 2 de Data
        switch(llenaDataCaso){
            case'cuenta':

                $scope.formDataInterfaz[12].value[idFilaCasoCuenta].id_cuenta = idData;
                $scope.formDataInterfaz[12].value[idFilaCasoCuenta].cod_cuenta = value1Data;
                $scope.formDataInterfaz[12].value[idFilaCasoCuenta].nom_cuenta = value2Data;
                break
            case'clienteProveedor':

                $scope.formDataInterfaz[6].value = value1Data;
                $scope.formDataInterfaz[8].value = value2Data;
                $scope.idIVACLIENTEPROVEEDOR = idData;

                break
            default:
        }
        
    }
    //agregar fila visualizada
    $scope.agregarFila = function(){
        //console.log($scope.formDataInterfaz[12].value);
        
        // ajax de adicionar nuevo detalle
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "crear_detalle", idFila : $scope.formDataInterfaz[12].value.length
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz[12].value.push(data);

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

    //eliminar fila de detalle del libro diario
    $scope.eliminarFila =function(idFila){
        $scope.formDataInterfaz[12].value.splice(idFila, 1);
        //console.log($scope.formDataInterfaz[12].value);

        angular.forEach($scope.formDataInterfaz[12].value, function(value, key) {
            //console.log(key);
            $scope.formDataInterfaz[12].value[key].id = key;
        });
        //console.log($scope.formDataInterfaz[12].value);
    }

    //ADICIONAR IVA
    //funcion para el checkbox
    $scope.hasChangedCheckbox = function(id, item){

        //console.log($scope.formDataInterfaz[12].value[id].checkboxSelected);
        if ($scope.formDataInterfaz[12].value[id].checkboxSelected) {//si fue selecciona y tickeada el check box de IVA
            $("#myModal_registro").modal();// abre ventana (modal)
        }else{
            $("#myModal_registro").modal("hide");// cierra ventana (modal)
        }
        
        //fila en la que se activo el checkbox
        $scope.checkboxFILA = id;

        // ajax de adicionar nuevo detalle
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "crear_iva", //que hara
                     idFila : id, // index de fila
                     idDecContable : $scope.formDataInterfaz[3].valueSelect.id, // que tipo de Doc. contable es 
                     idIVACLIENTEPROVEEDOR: $scope.idIVACLIENTEPROVEEDOR,// el id del cliente o proveeedor segun el doc contable
                     dataFila : JSON.stringify(item) //fila en el que se hizo checked
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.dato_registro = data;    

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

    //agregar Iva Ingreso / Egreso
    $scope.agregarInfo = function(idFilaIva, datoFilaIva){
        //console.log($scope.formDataInterfaz[12].value[idFilaIva]);
        $scope.formDataInterfaz[12].value[idFilaIva].registroIva = datoFilaIva;
        //console.log($scope.formDataInterfaz[12].value[idFilaIva]);
        $("#myModal_registro").modal("hide");// cierra ventana (modal)
        // ajax de adicionar nuevo detalle
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "crear_detalle_FISCAL", // que hara
                     idFila : $scope.formDataInterfaz[12].value.length, //index fila - en donde lo hara
                     datoFilaIva: JSON.stringify(datoFilaIva),  //informacion del iva para la fila
                     idDecContable : $scope.formDataInterfaz[3].valueSelect.id // tipo de doc contable
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {
                    //cuando el doc contable es ingreso se convierte la monedas de la columna haber
                    if ($scope.formDataInterfaz[3].valueSelect.id == "2") {//ingreso
                        $scope.formDataInterfaz[12].value[idFilaIva].haber_bs = datoFilaIva[10].value;
                        $scope.formDataInterfaz[12].value[idFilaIva].haber_sus = parseFloat(parseFloat($scope.formDataInterfaz[12].value[idFilaIva].haber_bs).toFixed(2)/parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2)).toFixed(2); 

                        $scope.formDataInterfaz[12].value.push(data);
                        $scope.formDataInterfaz[12].value[$scope.formDataInterfaz[12].value.length - 1].haber_sus = parseFloat(parseFloat($scope.formDataInterfaz[12].value[$scope.formDataInterfaz[12].value.length - 1].haber_bs).toFixed(2)/parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2)).toFixed(2); 
                    }

                    //cuando el doc contable es egreso se convierte la monedas de la columna debe
                    if ($scope.formDataInterfaz[3].valueSelect.id == "3") {//egreso
                        $scope.formDataInterfaz[12].value[idFilaIva].debe_bs = datoFilaIva[10].value;
                        $scope.formDataInterfaz[12].value[idFilaIva].debe_sus = parseFloat(parseFloat($scope.formDataInterfaz[12].value[idFilaIva].debe_bs).toFixed(2)/parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2)).toFixed(2); 

                        $scope.formDataInterfaz[12].value.push(data);
                        $scope.formDataInterfaz[12].value[$scope.formDataInterfaz[12].value.length - 1].debe_sus = parseFloat(parseFloat($scope.formDataInterfaz[12].value[$scope.formDataInterfaz[12].value.length - 1].debe_bs).toFixed(2)/parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2)).toFixed(2); 
                    }
                    

                    $scope.$apply();
                    console.log($scope.formDataInterfaz[12].value);
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

    //calcula el credito fiscal y el debito fiscal
    $scope.sumaIva = function(valor1, valor2, valor3, valor4){
        if(valor1 == ""){
            valor1 = 0.00;
        }
        if(valor2 == ""){
            valor2 = 0.00;
        }
        if(valor3 == ""){
            valor3 = 0.00;
        }
        if(valor4 == ""){
            valor4 = 0.00;
        }
        $scope.dato_registro[8].value = parseFloat(((valor1*1) + (valor2*1) + (valor3*1) + (valor4*1)) * 0.13).toFixed(2);
        $scope.dato_registro[10].value = parseFloat($scope.dato_registro[9].value - $scope.dato_registro[8].value);
        //operacion division para hallar la conversion de moneda boliviana a dolar americano
        
    }

    //funcion para convertir Bs a Sus debe
    $scope.valorDolar_debe_sus = function(valor, id){
        //console.log("!avisame : "+$scope.formDataInterfaz[5].valueSelect.value);
        //console.log("!avisame : "+valor);

        if (valor == "" || valor == null) {// en caso de que no estuviera escrito ningun valor se le asigna el 0.00
            //console.log("entro");
            valor = 0.00;
        }
        

        var valor2 = parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2);// es el valor del campo Tipo de Cambio
        var valor1 = parseFloat(valor).toFixed(2);// es el valor del campo Debe bs

        if (valor2 == "" || valor == null){// en caso de que no estuviera escrito ningun valor se le asigna el 0.00
            valor2 = 0.00;
        }


        //operacion division para hallar la conversion de moneda boliviana a dolar americano
        $scope.formDataInterfaz[12].value[id].debe_sus = parseFloat((valor1/valor2)).toFixed(2); 

               
    }
    //funcion para convertir Bs a Sus haber
    $scope.valorDolar_haber_sus = function(valor, id){
        //console.log("!avisame : "+$scope.formDataInterfaz[5].valueSelect.value);
        //console.log("!avisame : "+valor);

        if (valor == "" || valor == null) {// en caso de que no estuviera escrito ningun valor se le asigna el 0.00
            //console.log("entro");
            valor = 0.00;
        }
        

        var valor2 = parseFloat($scope.formDataInterfaz[5].valueSelect.value).toFixed(2);// es el valor del campo Tipo de Cambio
        var valor1 = parseFloat(valor).toFixed(2);// es el valor del campo Debe bs

        if (valor2 == "" || valor == null){// en caso de que no estuviera escrito ningun valor se le asigna el 0.00
            valor2 = 0.00;
        }


        //operacion division para hallar la conversion de moneda boliviana a dolar americano
        $scope.formDataInterfaz[12].value[id].haber_sus = parseFloat((valor1/valor2)).toFixed(2); 
    }



    $scope.suma_debe_bs = function(valor){
        var total = 0;
        if (valor != null) {
            //console.log("no null");
            for(var i = 0; i < $scope.formDataInterfaz[12].value.length; i++){
                var item = $scope.formDataInterfaz[12].value[i].debe_bs
                if (item == "" || item == null) {
                    //console.log("vacio ");
                    total += 0;
                }else{
                    //console.log("debe bs valor: "+item);
                    total += parseFloat(item);
                }
                
            }
            return parseFloat(total).toFixed(2);
        }
                
    }
    $scope.suma_haber_bs = function(valor){
        var total = 0;
        if (valor != null) {
            //console.log("no null");
            for(var i = 0; i < $scope.formDataInterfaz[12].value.length; i++){
                var item = $scope.formDataInterfaz[12].value[i].haber_bs
                if (item == "" || item == null) {
                    //console.log("vacio ");
                    total += 0;
                }else{
                    //console.log("haber bs valor: "+item);
                    total += parseFloat(item);
                }
                
            }
            return parseFloat(total).toFixed(2);
        }
                
    }
    $scope.suma_debe_sus = function(valor){
        var total = 0;
        if (valor != null) {
            //console.log("no null");
            for(var i = 0; i < $scope.formDataInterfaz[12].value.length; i++){
                var item = $scope.formDataInterfaz[12].value[i].debe_sus
                //console.log("suma"+item);
                if (item == "" || item == null) {
                    //console.log("vacio ");
                    total += 0;
                }else{
                    //console.log("debe sus valor: "+item);
                    total += parseFloat(item);
                }
                
            }
            return parseFloat(total).toFixed(2);
        }
                
    }
    $scope.suma_haber_sus = function(valor){
        var total = 0;
        if (valor != null) {
            //console.log("no null");
            for(var i = 0; i < $scope.formDataInterfaz[12].value.length; i++){
                var item = $scope.formDataInterfaz[12].value[i].haber_sus
                if (item == "" || item == null) {
                    //console.log("vacio ");
                    total += 0;
                }else{
                    //console.log("haber sus valor: "+item);
                    total += parseFloat(item);
                }
                
            }
            return parseFloat(total).toFixed(2);
        }
                
    }

    //diferencia de totales de haber, debe
    $scope.diferencia_debe_bs = function(valor1, valor2){
        //convertir valor nulo o vacio en 0
        if (valor1 == "" || valor1 == null) {
            valor1 = 0.00;
        }
        //convertir valor nulo o vacio en 0
        if (valor2 == "" || valor2 == null) {
            valor2 = 0.00;
        }
        if((valor1 - valor2) >= 0){
            return parseFloat(0).toFixed(2);
        }else{
            
            return Math.abs(parseFloat((valor1 - valor2)).toFixed(2));
        }
              
    }
    //diferencia de totales de haber, debe
    $scope.diferencia_haber_bs = function(valor1, valor2){
        //convertir valor nulo o vacio en 0
        if (valor1 == "" || valor1 == null) {
            valor1 = 0.00;
        }
        //convertir valor nulo o vacio en 0
        if (valor2 == "" || valor2 == null) {
            valor2 = 0.00;
        }
        if((valor1 - valor2) >= 0){
            return parseFloat(0).toFixed(2);
        }else{
            
            return Math.abs(parseFloat((valor1 - valor2)).toFixed(2));
        }
              
    }

    //diferencia de totales de haber, debe
    $scope.diferencia_debe_sus = function(valor1, valor2){
        //convertir valor nulo o vacio en 0
        if (valor1 == "" || valor1 == null) {
            valor1 = 0.00;
        }
        //convertir valor nulo o vacio en 0
        if (valor2 == "" || valor2 == null) {
            valor2 = 0.00;
        }
        if((valor1 - valor2) >= 0){
            return parseFloat(0).toFixed(2);
        }else{
            
            return Math.abs(parseFloat((valor1 - valor2)).toFixed(2));
        }
              
    }
    //diferencia de totales de haber, debe
    $scope.diferencia_haber_sus = function(valor1, valor2){
        //convertir valor nulo o vacio en 0
        if (valor1 == "" || valor1 == null) {
            valor1 = 0.00;
        }
        //convertir valor nulo o vacio en 0
        if (valor2 == "" || valor2 == null) {
            valor2 = 0.00;
        }
        if((valor1 - valor2) >= 0){
            return parseFloat(0).toFixed(2);
        }else{
            
            return Math.abs(parseFloat((valor1 - valor2)).toFixed(2));
        }
              
    }

    //agregar Ajuste de cambio
    $scope.agregarAjusteCambio = function(debe_sus, haber_sus){
        //console.log($scope.formDataInterfaz[12].value[idFilaIva]);
        
        // ajax de adicionar nuevo detalle
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "crear_detalle_ajuste_cambio", // que hara
                     idFila : $scope.formDataInterfaz[12].value.length, //index fila - en donde lo hara
                     debe_sus : debe_sus,
                     haber_sus : haber_sus
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz[12].value.push(data);

                    console.log($scope.formDataInterfaz[12].value);
                    

                    $scope.$apply();
                    //console.log($scope.formDataInterfaz[12].value);
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

    //funcion que guardara los datos de libro diario
    $scope.guardarLibroDiario = function(){
        //focus en boton nuevo agregar
        $("#boton_plus").focus();

        // ajax de adicionar nuevo tipo de cambio
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "guardar_libro_diario", value :  JSON.stringify($scope.formDataInterfaz), Usuario_idUsuario: sessionStorage.getItem("id_user")
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    console.log(data);
                    //definicion de variables

                    //valor por defecto del titulo de Pagado por / recibido por
                    $scope.titulo_llenar = "Por definir"; 

                    //llenado de datos para interfaz
                    $scope.formDataInterfaz = []; 

                    //lenado para para detalle
                    var formDataDetalle = [];

                    //llenado de datos para el modal de busqueda
                    $scope.formModalLlenar = [];

                    //valores de nombre campo en la tabla que se muestra en modal
                    $scope.valor1 = "";
                    $scope.valor2 = "";

                    //especifica que tabla se llenara en el modal venta debusqueda
                    $scope.tablaIva = "";

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

    
     
});


//      LISTAR LIBRO MAYOR
app.controller("listarLibroMayorCtrl", function($scope, $http) {

    //variables para la conexion a bd
    var url = "../php/libromayor.php"; 
    $scope.titulo = "REGISTRO DE MAYOR";

    // ajax de llenado de interfaz
    $.ajax({
            // la URL para la petición
            url : url,
     
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                    run : "0"
            },
     
            // especifica si será una petición POST o GET
            type : 'POST',
     
            // el tipo de información que se espera de respuesta
            dataType : 'json',
     
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {

                $scope.formDataInterfaz = data;

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



});


//      LISTAR COMPRAS IVA
app.controller("comprasIvaCtrl", function($scope, $http) {
    //cargar los datos por defecto de compras iva
    var url= "../php/lcompras.php"; 
    $scope.titulo= "LIBRO DE COMPRAS IVA";
    var razoSocial = "proveedor";
    var dimension = 0;
    var idUsuario = sessionStorage.getItem("id_user");

    // ajax de llenado de interfaz primer bloque
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "1", idUsuario: idUsuario
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfazPrimera = data;
                    dimension = data.length;

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

    // ajax de llenado de interfaz
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "0"
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz = data;
                    dimension = data.length;

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

    

    //funcion para sumar los total factura
    $scope.suma_total_factura = function(){

        //inicializar valor
        var total = 0;

        //recorrer los registros
        //console.log($scope.formDataInterfaz.length);

        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_factura
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total ICE
    $scope.suma_total_ice = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_ice
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los totales importe exento
    $scope.suma_importe_exento = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_exento
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total importe neto
    $scope.suma_importe_neto = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].importe_neto
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total iva
    $scope.suma_total_iva = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].fiscal
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

});


//      LISTAR VENTAS IVA
app.controller("ventasIvaCtrl", function($scope, $http) {
    //cargar los datos por defecto de compras iva
    var url= "../php/lventas.php"; 
    $scope.titulo= "LIBRO DE VENTAS IVA";
    var razoSocial = "cliente";
    var dimension = 0;
    var idUsuario = sessionStorage.getItem("id_user");

    // ajax de llenado de interfaz primer bloque
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "1", idUsuario: idUsuario
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfazPrimera = data;
                    dimension = data.length;

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

    // ajax de llenado de interfaz
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "0"
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz = data;
                    dimension = data.length;

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

    //funcion para sumar los total factura
    $scope.suma_total_factura = function(){

        //inicializar valor
        var total = 0;

        //recorrer los registros
        //console.log($scope.formDataInterfaz.length);

        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_factura
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total ICE
    $scope.suma_total_ice = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_ice
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los totales importe exento
    $scope.suma_importe_exento = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_exento
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total importe neto
    $scope.suma_importe_neto = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].importe_neto
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total iva
    $scope.suma_total_iva = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].fiscal
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

});


//      LISTAR  REPORTE INGRESOS SIMILAR A LIBRO VENTAS
app.controller("ingresosCtrl", function($scope, $http) {
    //cargar los datos por defecto de compras iva
    var url= "../php/lventas.php"; 
    $scope.titulo= "REPORTE INGRESOS";
    var razoSocial = "cliente";
    var dimension = 0;
    var idUsuario = sessionStorage.getItem("id_user");

    // ajax de llenado de interfaz primer bloque
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "1", idUsuario: idUsuario
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfazPrimera = data;
                    dimension = data.length;

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

    // ajax de llenado de interfaz
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "0"
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz = data;
                    dimension = data.length;

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

    //funcion para sumar los total factura
    $scope.suma_total_factura = function(){

        //inicializar valor
        var total = 0;

        //recorrer los registros
        //console.log($scope.formDataInterfaz.length);

        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_factura
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total ICE
    $scope.suma_total_ice = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_ice
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los totales importe exento
    $scope.suma_importe_exento = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_exento
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total importe neto
    $scope.suma_importe_neto = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].importe_neto
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total iva
    $scope.suma_total_iva = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].fiscal
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

});


//     LISTAR  REPORTE EGRESOS SIMILAR A LIBRO COMPRAS
app.controller("egresosCtrl", function($scope, $http) {
    //cargar los datos por defecto de compras iva
    var url= "../php/lcompras.php"; 
    $scope.titulo= "REPORTE EGRESOS";
    var razoSocial = "proveedor";
    var dimension = 0;
    var idUsuario = sessionStorage.getItem("id_user");

    // ajax de llenado de interfaz primer bloque
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "1", idUsuario: idUsuario
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfazPrimera = data;
                    dimension = data.length;

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

    // ajax de llenado de interfaz
        $.ajax({
                // la URL para la petición
                url : url,
     
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : { 
                     run : "0"
                },
     
                // especifica si será una petición POST o GET
                type : 'POST',
     
                // el tipo de información que se espera de respuesta
                dataType : 'json',
     
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(data) {

                    $scope.formDataInterfaz = data;
                    dimension = data.length;

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

    

    //funcion para sumar los total factura
    $scope.suma_total_factura = function(){

        //inicializar valor
        var total = 0;

        //recorrer los registros
        //console.log($scope.formDataInterfaz.length);

        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_factura
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total ICE
    $scope.suma_total_ice = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_ice
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los totales importe exento
    $scope.suma_importe_exento = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].total_exento
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total importe neto
    $scope.suma_importe_neto = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].importe_neto
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

    //funcion para sumar los total iva
    $scope.suma_total_iva = function(){
        var total = 0;
        for(var i = 0; i < dimension; i++){
            var item = $scope.formDataInterfaz[i].fiscal
            if (item == "" || item == null) {
                //console.log("vacio ");
                total += 0;
            }else{
                //console.log("haber sus valor: "+item);
                total += parseFloat(item);
            }
                
        }
        return parseFloat(total).toFixed(2);
                
    }

});


//  LISTAR BALANCE GENERAL
app.controller("balanceGeneralCtrl", function($scope, $http) {
    var url = "../php/balanceGeneral.php";     

    $.ajax({
            // la URL para la petición
            url : url,
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                    run: 0 // carga los datos necesarios como ciclocontable y clase cuenta
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                
                console.log(data);
                $scope.formDataInterfazBalanceGeneral = data;
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


    $scope.crearBalanceGeneral = function(){
        $.ajax({
            // la URL para la petición
            url : url,
 
            // la información a enviar
            // (también es posible utilizar una cadena de datos)
            data : { 
                        run: 1, 
                        ciclocontable: 2, 
                        nivel_1: 1, 
                        nivel_2: 4
            },
 
            // especifica si será una petición POST o GET
            type : 'POST',
 
            // el tipo de información que se espera de respuesta
            dataType : 'json',
 
            // código a ejecutar si la petición es satisfactoria;
            // la respuesta es pasada como argumento a la función
            success : function(data) {
                
                $scope.formDataBalanceGeneral = data;
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
    }
});


//     LISTAR  REPORTE EGRESOS SIMILAR A LIBRO COMPRAS
app.controller("vacioCtrl", function($scope, $http) {

});

//directivas para restringir los inputs
app.directive('numericOnly', function(){
    return {
        restrict : 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                //se restringe solo en numeros
                var transformedInput = inputValue ? inputValue.replace(/[^0-9.]/g, '') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
app.directive('stringOnly', function(){
    return {
        restrict : 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                //reemplaza, y se aceptan valores con acento y úüñ por lengua castellana
                var transformedInput = inputValue ? inputValue.replace(/[^ a-z0-9áéíóúüñ]+/g,"") : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});


//////----=============++++++++++++++++FIN de controladores



//RUTAS DE ACCeSO A LOS DISTINTAS VENTANAS DISPONIBLES
//***************************************controller*******************************
//***************************************router*******************************
app.config(function($routeProvider) {

     $routeProvider
                    .when("/", {
                        templateUrl : "../template/vacio.html",
                        controller : "vacioCtrl"
                        
                    })
                    .otherwise({redirectTo:'/'});
                    
    //var url = "../php/configura.php";
    //var rol = sessionStorage.getItem("id_rol");
    var jsonData = JSON.parse(sessionStorage.getItem("jsonDataViewSystem"));
    //console.log(sessionStorage.getItem("view_system"));
    angular.forEach(jsonData, function(value, key) {
        //Genera rutas 
        $routeProvider.when(value.url, {
                            templateUrl : value.template,
                            controller : value.controller
                            });
        });

});


