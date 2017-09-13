$(document).ready(function(){

    //**para menu
    $("#activa_nota").click(function() {
        $("#menu_nota").toggle();
    });
    $("#activa_reporte").click(function() {
        $("#menu_reporte").toggle();
    });

    //**------seion for user    
    if (sessionStorage.getItem("activo") == "1") {
    	$(".contenido").css("display","block");
    	$(".nombre_usuario_head").prepend(sessionStorage.getItem("user"));
    	$(".nombre_usuario_head").click(function() {
    		$("#myModalProgram").modal("show");
		});
        if (sessionStorage.getItem("rol") == "otros") {
            $(".rol-otros").css("display","none");
        }
        if (sessionStorage.getItem("rol") == "administrador") {
            $(".rol-otros").css("display","block");
        }
        $(".nombre_usuario_head_2").click(function() {
            $("#myModalProgram").modal("show");
        });
		$(".salir_sesion").click(function(){
			$("#myModalProgram").modal("hide");
			sessionStorage.setItem("user", "0");
            sessionStorage.setItem("activo", "0");                    
            location.href = '../index.html';
		});
    }else{
    	$(".contenido").css("display","none");
    }; 

    /***para cambiar el teclado enter por tab en la pagina***/
    /*$('body').on('keydown', 'input, select, textarea', function(e) {
        var self = $(this)
        , form = self.parents('form:eq(0)')
        , focusable
        , next
        ;
        if (e.keyCode == 13) {
            focusable = form.find('input,a,select,button,textarea').filter(':visible');
            next = focusable.eq(focusable.index(this)+1);
            if (next.length) {
                next.focus();
            } else {
                form.submit();
            }
            return false;
        }
    });*/


    /***para cambiar el teclado enter por tab en la pagina***/
    $('body').on('keydown', 'input, select, textarea', function(e) {
        var self = $(this)
        , form = self.parents('form:eq(0)')
        , focusable
        , next
        ;
        if (e.keyCode == 13) {  
            focusable = form.find('input,select,button').filter(':visible');
            next = focusable.eq(focusable.index(this)+1);
            if (next.length) {
                next.focus();
            } else {
                form.submit();
            }
            return false;
        }

    });







    
});