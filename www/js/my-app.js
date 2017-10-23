﻿var ip = '192.168.0.11';

//var ip = 'localhost:56747';

// Initialize your app7
/*var user = {
   IDContrato: 10038,
   NomePessoa : 'Day',
   Plano : 'Investidor'
};*/
var user;
//var IDContrato = 10038;
//var id = 10038;
//var pes = 'Day'

var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    swipeBackPage: true,
    pushState: true,
    template7Pages: true
});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false,


});



$$(document).on('pageInit', function (e) {


    $(".swipebox").swipebox();
    $(".videocontainer").fitVids();




    $(".posts li").hide();
    size_li = $(".posts li").size();
    x = 3;
    $('.posts li:lt(' + x + ')').show();
    $('#loadMore').click(function () {
        x = (x + 1 <= size_li) ? x + 1 : size_li;
        $('.posts li:lt(' + x + ')').show();
        if (x == size_li) {
            $('#loadMore').hide();
            $('#showLess').show();
        }
    });



    $("a.switcher").bind("click", function (e) {
        $('#voltar_fatura').trigger('click');
        e.preventDefault();

        var theid = $(this).attr("id");
        var theproducts = $("ul#photoslist");
        var classNames = $(this).attr('class').split(' ');


        if ($(this).hasClass("active")) {
            // if currently clicked button has the active class
            // then we do nothing!
            return false;
        } else {
            // otherwise we are clicking on the inactive button
            // and in the process of switching views!

            if (theid == "view13") {
                $(this).addClass("active");
                $("#view11").removeClass("active");
                $("#view11").children("img").attr("src", "images/switch_11.png");

                $("#view12").removeClass("active");
                $("#view12").children("img").attr("src", "images/switch_12.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_13_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_11");
                theproducts.removeClass("photo_gallery_12");
                theproducts.addClass("photo_gallery_13");

            }

            else if (theid == "view12") {
                $(this).addClass("active");
                $("#view11").removeClass("active");
                $("#view11").children("img").attr("src", "images/switch_11.png");

                $("#view13").removeClass("active");
                $("#view13").children("img").attr("src", "images/switch_13.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_12_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_11");
                theproducts.removeClass("photo_gallery_13");
                theproducts.addClass("photo_gallery_12");

            }
            else if (theid == "view11") {
                $("#view12").removeClass("active");
                $("#view12").children("img").attr("src", "images/switch_12.png");

                $("#view13").removeClass("active");
                $("#view13").children("img").attr("src", "images/switch_13.png");

                var theimg = $(this).children("img");
                theimg.attr("src", "images/switch_11_active.png");

                // remove the list class and change to grid
                theproducts.removeClass("photo_gallery_12");
                theproducts.removeClass("photo_gallery_13");
                theproducts.addClass("photo_gallery_11");

            }

        }

    });

    document.addEventListener('touchmove', function (event) {
        if (event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1) {
            event.preventDefault();
        }
    }, false);

    // Add ScrollFix
    var scrollingContent = document.getElementById("pages_maincontent");
    new ScrollFix(scrollingContent);


    var ScrollFix = function (elem) {
        // Variables to track inputs
        var startY = startTopScroll = deltaY = undefined,

            elem = elem || elem.querySelector(elem);

        // If there is no element, then do nothing	
        if (!elem)
            return;

        // Handle the start of interactions
        elem.addEventListener('touchstart', function (event) {
            startY = event.touches[0].pageY;
            startTopScroll = elem.scrollTop;

            if (startTopScroll <= 0)
                elem.scrollTop = 1;

            if (startTopScroll + elem.offsetHeight >= elem.scrollHeight)
                elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
        }, false);
    };



})
function alerta() {

}
function fecharApp() {
    if (navigator.app) {
        myApp.openModal('.login-screen');
        navigator.app.exitApp();
      
    } else if (navigator.device) {
        myApp.openModal('.login-screen');
        navigator.device.exitApp();
      
    } else {
        myApp.openModal('.login-screen');
        window.close();
       
    }
}
/*Detalhe dos parametros
n = numero a converter
c = numero de casas decimais
d = separador decimal
t = separador milhar*/
function numeroParaMoeda(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function renderPaginaInicial() {

    var pes = user['NomePessoa'];
    $('.dados-usuario p').html(pes);
    id = user['IDContrato']
    var JSONdata = {
        "id": id
    };
    $.ajax({
        type: "post",

        url: 'http://' + ip + '/Inicial/Dashboard',
        data: { 'id': JSONdata },
        dataType: "json",
        success: function (resultado) {

            var plano = user['Plano'];

            $('#plano-atual').html(plano);
            $('#saldo').html(resultado['Saldo']);
            $('#binario-ativo').html(resultado['model']['DadosRede']['QualificadoBinario']);
            if (resultado['model']['DadosRede']['QualificadoBinario'] == "Sim") {
                $('#binario-ativo').css({ "background": "#47a447", "color": "white", "border-color": "#47a447" });
            } else {
                $('#binario-ativo').css({ "background": "#d2322d", "color": "white", "border-color": "#d2322d" });
            }
            var totalInv = numeroParaMoeda(resultado['model']['DadosPessoa']['ValorTotalInvestido'], 2, ',', '.');
            $('#total-investido').html("Total Investido: " + totalInv);
            $('#situacao').html(resultado['model']['DadosRede']['Situacao']);

            if (resultado['model']['DadosRede']['Situacao'] == "Ativo") {
                $('#situacao').css({ "background": "#47a447", "color": "white", "border-color": "#47a447" });
            } else {
                $('#situacao').css({ "background": "#d2322d", "color": "white", "border-color": "#d2322d" });
            }



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Tela Inicial', 'Erro de Conexão')

        }

    });
};

$$('.open-login').on('click', function () {
    myApp.loginScreen();
});
function renderFatura() {
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/FaturaMobile',
        data: { 'IDContrato': IDContrato },
        dataType: "json",
        success: function (resultado) {
            $('#faturas ul').empty();
            var obj = (resultado['query']);
            $.each(obj, function (key, value) {
                var li = '<li id=' + value.Situacao + '> '
                    + '<div> <div class="faturatitulo grupo"> Código:  </div> <div class="esquerda" id="IDFatura">' + value.IDFatura + '</div> </div > '
                    + '<div> <div class="faturatitulo grupo"> Descrição:  </div> <div class="esquerda">' + value.Descricao + '</div> </div > '
                    + '<div> <div class="faturatitulo grupo"> Data:  </div>  <div class=" esquerda">' + value.Data + '</div></div>'
                    + '<div> <div class="faturatitulo grupo"> Data Pagamento: </div>  <div class="esquerda">' + value.DtPagamento + '</div></div>'
                    + '<div> <div class="faturatitulo grupo">Valor: </div>  <div class="esquerda">' + value.Valor + '</div></div>'
                    + '<div> <div class="faturatitulo grupo">Situação: </div> <div class="esquerda">' + value.Situacao + '</div></div>'
                    + '</div>';
                if (value.IDSituacao == 1) {
                  
                    $('#faturas ul').append(li + '<a href="pgFatura.html" onclick="renderTipoPagamento(' + value.IDFatura + ',' + value.Valor + ');" class="button_small " id="btn_pagar" ><i class="fa-icon fa fa-credit-card "></i>Pagar</a> </div>');
                  
                } 
                
                else {
                   
                    $('#faturas ul').append(li + '</li>');
                       
                    }
          

            });

            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Tela Inicial');

            myApp.hidePreloader();
            renderPaginaInicial();
        }

    });
};

var guid;

function renderTipoPagamento(ID, Valor) {
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/TipoPagamento',
        data: { 'ID': ID },
        dataType: "json",
        success: function (resultado) {

            var cartao = resultado['Cartao'];

            if (cartao == false) {
                $('#tipopagamento').addClass('hidden');
            }
            guid = resultado['cookie'];



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Tela Pagamento');

        }

    });
};
var model;
function renderPagamentoCredito(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/FaturePay',
        data: { 'dados': guid },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            model = resultado['model'];

            var valor = resultado['model']['Valor'];

            var val = numeroParaMoeda(valor, 2, ',', '.');
            $('#descricao').val(resultado['model']['Descricao']);
            $('#valor').val(val);
            $('#login').val(resultado['model']['Login']);
            var obj = (resultado['ContaCorrente']);
            $.each(obj, function (key, value) {
                $('#select-carteira').append('<option value="' + value.Value + '">' + value.Text + '</option>');

            });
            
            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Pagamento');


        }

    });
};

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    
    if (page.name === 'sistema') {
        $('#formSistema').validate({

            rules: {
                senha: { required: true, minlength: 3 }
            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' }
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
            submitHandler: function (form) {

                var carteira = $("#select-carteira").val();
                var senha = $("#senha").val();
                renderPagamentoCreditoSistemaAvancar(senha, carteira);
                return false;
            }
        });
    }
});


function renderPagamentoCreditoSistemaAvancar(senha, carteira) {

    model['IDCarteira'] = carteira;
    model['Senha'] = senha;
    myApp.showPreloader();
    var JSONdata = {

        "user": user['IDContrato']
    };
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/FaturePayAvancar',
        data: {
            'dados': JSONdata,
            'model2': model
        },
        dataType: "json",
        success: function (resultado) {
           
            $('#voltar_fatura').trigger('click');
            $('#voltar_fatura').click(function () {
                renderFatura();
            });

            myApp.hidePreloader();
            if (resultado["retorno"] == "sucesso") {
                myApp.alert("Pagamento Realizado", 'Pagamento', function () {
                    $('voltar_fatura').trigger('click');
                    renderfaturapos();
                    mainView.goBack();
                    mainView.router.load('fatura.html');
                    renderFatura();

                });
            }
            if (resultado["retorno"] != null) {
                $('#form_erro').removeClass('hidden');
                $('#form_erro').html(resultado['retorno']);


            }
          

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Pagamento');


        }

    });
};

function renderfaturapos(){
    myApp.onPageInit('sistema', function (page) {

        myApp.alert('pagamento ok', function () {
            mainView.goBack();
            renderFatura();
        });
    });
    
};
/*
function renderPagamentoBoleto() {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/FaturePayAvancar',
        data: { 'dados': guid },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();

            var boleto = resultado['boleto'];
            var file = resultado['file'];
            var codigo = resultado['codigo'];

            var specialElementHandlers = {
                '#bypassme': function (element, renderer) {
                    return true;
                }
            };
            var doc = new jsPDF();
            doc.fromHTML(
                boleto, // HTML string or DOM elem ref.
                0.5, // x coord
                0.5, // y coord
                {
                    'width': 7.5, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                });

            doc.output();
            doc.save('pdf.pdf');


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            navigator.notification.alert(
                'Erro de Conexão',  // message
                alerta,         // callback
                'Tela Pagamento',            // title
                'ok'                  // buttonName
            );

        }

    });
};

*/

function getBase64Encode(rawStr) {
    var wordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(rawStr));
    var result = CryptoJS.enc.Base64.stringify(wordArray);
    return result;
};

function getBase64Decode(rawStr) {
    var wordArray = CryptoJS.enc.Base64.parse(rawStr);
    var result = wordArray.toString(CryptoJS.enc.Utf8);
    return result
};
function alertDismissed() {

}
function alertSucesso() {

    renderPaginaInicial();
    myApp.closeModal('.login-screen');

}

