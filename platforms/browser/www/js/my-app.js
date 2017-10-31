var Tempoajax = 30000;
    
var ip = '192.168.0.11';

//var ip = 'localhost:56747';

// Initialize your app7
/*var user = {
   IDContrato: 10038,
   NomePessoa : 'Day',
   Plano: 'Investidor',
   Login: 'Day'
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
   // mainView.router.loadPage('index.html');
    var pes = user['NomePessoa'];
    $('.dados-usuario p').html(pes);
    id = user['IDContrato']
    var JSONdata = {
        "id": id
    };
    $.ajax({
        type: "post",
        timeout: Tempoajax,
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
        timeout: Tempoajax,
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
                  
                    $('#pendentes #faturas ul').append(li + '<a href="pgFatura.html" onclick="renderTipoPagamento(' + value.IDFatura + ',' + value.Valor + ');" class="button_small " id="btn_pagar" ><i class="fa-icon fa fa-credit-card "></i>Pagar</a> </div>');
                  
                } 
                
                else {
                   
                    $('#pagas #faturas ul').append(li + '</li>');
                       
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
        timeout: Tempoajax,
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
        timeout: Tempoajax,
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

function somenteNumeros(num) {
    
}


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
        timeout: Tempoajax,
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
                mainView.router.loadPage('fatura.html');
                myApp.alert("Pagamento Realizado", 'Pagamento', function () {
                    
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

function renderInvestimentos() {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Compras/BuyOdds',
        timeout: Tempoajax,
        success: function (resultado) {
          
            $('#investimentos ul').empty();
            var obj = (resultado);
            $.each(obj, function (key, value) {
                var valor = numeroParaMoeda(value.Valor,2,',','.');
                var li = '<li><div class="row">'
                    +'<div class="col-50" > '
                        + ' <img src="' + value.Imagem + '" />'
                    + '</div >'
                        + '<div class="col-50">'
                        + '<p>' + value.Titulo + '</p >'
                    + '<p>' + valor + '</p >'
                    + '<p> <a href="#" onclick="renderComprarInvestimento(' + value.ID + ');" class="button-fill button " id="btn_comprar" ><i class="fa-icon fa fa-arrow-up"></i>Comprar</a> </p >'
                    +' </div>'
                    +'</div></li>'              
                    $('#investimentos ul').append(li);
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
function renderComprarInvestimento(id) {
    myApp.showPreloader();
    var JSONdata = {
        "id" : id,
        "userID": user['IDContrato'],
        "userLogin":user['Login']
    };
   
    $.ajax({
        type: "post",
        data: {
            'dados': JSONdata,
        },
        url: 'http://' + ip + '/Compras/ConfirmarCompra',
        timeout: Tempoajax,
        success: function (resultado) {
        
            myApp.hidePreloader();
            var msg = '<p class="Investimento-msg"> Descrição: ' + resultado["Titulo"] + '</p> <p class="Investimento-msg"> Valor: ' + resultado["Valor"] + '</p>';
            myApp.modal({
                title: 'Investimento',
                text: msg,
                verticalButtons: true,
                buttons: [
                    {
                        text: '<dir class="invest_ok upgrade-icon">Investir</div>',
                        onClick: function () {
                            var JSONdata = {
                                "ID": resultado["ID"],
                                "userID": user['IDContrato'],
                                "userLogin": user['Login']
                            };
                            $.ajax({

                                type: "post",
                                data: {
                                    'dados': JSONdata,
                                },
                                url: 'http://' + ip + '/Compras/CheckoutOdds',
                                timeout: Tempoajax,
                                success: function (resultado) {
                                    
                                    if (resultado == "Fatura gerada com sucesso") {
                                       
                                        mainView.router.loadPage('fatura.html');
                                        renderFatura();
                                        
                                    }
                                    else {
                                        myApp.alert(resultado, 'Investimento');
                                    }
                                                                      
                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    myApp.alert('Erro de Conexão', 'Investimento');

                                    myApp.hidePreloader();
                                    renderPaginaInicial();
                                }

                            });
                        }
                    },
                    {
                        text: '<dir class="invest_voltar voltar-icon">Voltar</div>', 
                        onClick: function () {
                            
                        }
                    },
                   
                ]
            })

          

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Investimento');

            myApp.hidePreloader();
            renderPaginaInicial();
        }

    });
}

var carteiras; 
function renderFinanceiro() {
    myApp.showPreloader();
    $('#financeiro ul').empty();
    $('#tipo_financeiro').html("");
    $('#retorno_financeiro').html("");
    $('#table-financeiro tbody').empty();
    $('#table-financeiro').addClass('hidden');
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/Carteiras',
        timeout: Tempoajax,
        success: function (resultado) {
           
            carteiras = resultado['model'];
            $.each(carteiras, function (key, value) {
                var li = '<li> <a href= "#" onclick= "renderRelatorioFinanceiro(' + value.ID + ');" class="button-fill button " id= "btn_comprar" > <i class="fa-icon fa fa-database"></i>' + value.Nome + '</a > </p > </li >'
                $('#financeiro ul').append(li);

            });
            myApp.hidePreloader();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Financeiro');

            myApp.hidePreloader();
            renderPaginaInicial();
        }

    });

}

function renderRelatorioFinanceiro(ID) {
    myApp.showPreloader();
    var JSONdata = {
        "ID": ID,
        "user": user['IDContrato'],
    };
    $.ajax({
        type: "post",
        data: {
            'dados': JSONdata,
        },
        url: 'http://' + ip + '/Financeiro/RelatorioFinanceiro',
        timeout: Tempoajax,
        success: function (resultado) {
            $.each(carteiras, function (key, value) {
                if (value.ID == ID) {

                    $('#tipo_financeiro').html(value.Nome);
                }

            });
           
            
           
            var obj = resultado['model'];
            if (resultado['iTotalRecords'] > 0) {
                $('#financeiro ul').empty();
                var li = '<div id="financeiro_botoes"><li> <a href= "FinanceiroTransfer.html" onclick= "renderTranferencia(' + ID + ');" class=" button  " id= "" > <i class="fa-icon fa fa-exchange"></i>Transferencia</a ></li>'
                    + '<li><a href= "#" onclick= "renderPagamento(' + ID + ');" class="button   " id= "" > <i class="fa-icon fa fa-money"></i>Pagamento</a > </li>'
                    + '<li><a href="#" onclick="renderRequisitarSaque(' + ID + ');" class="button  " id="" > <i class="fa-icon fa fa-money"></i>Requisitar Saque</a > </li></div>';
                $('#financeiro ul').append(li);


                $('#table-financeiro').removeClass('hidden');
                $('#table-financeiro tbody').empty();
                var tr;



                $.each(obj, function (key, value) {
                    var str = value.Descricao;
                    var res = str.replace("_", " ");
                    tr = '<tr>'
                        + '<td class="label-cell">' + value.Data + '</td>'
                        + '<td class="tablet-only">' + res + '</td>'
                        + '<td class="numeric-cell">' + value.Valor + '</td>'
                        + '<td class="numeric-cell">' + value.Saldo + '</td>'
                        + '</tr>'


                    $('#table-financeiro').append(tr);

                });
            }
            else {
                $('#retorno_financeiro').html("Sem dados registrados")
            }
            myApp.hidePreloader();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Financeiro');

            myApp.hidePreloader();
            renderPaginaInicial();
        }

    });
}
var transferencia;
function renderTranferencia(ID) {
    myApp.showPreloader();
    var JSONdata = {
        "ID": ID,
        "user": user['IDContrato'],
    };
    $.ajax({
        type: "post",
        data: {
            'dados': JSONdata,
        },
        url: 'http://' + ip + '/Financeiro/Transfer',
        timeout: Tempoajax,
        success: function (resultado) {
           
            if (resultado['model'] != null) {
                var valor = resultado['model']['Saldo'];
                var val = numeroParaMoeda(valor, 2, ',', '.');
                transferencia = resultado['model'];
                $('#saldo').val(val);

                var obj = (resultado['contas']);
                $.each(obj, function (key, value) {
                    $('#select-carteira').append('<option value="' + value.Value + '">' + value.Text + '</option>');

                });


             
                if ($('#select-carteira option:selected').text() != "Contrato") {
                    $('#login_Contrato').removeClass('show');
                    $('#login_Contrato').addClass('hidden');
                    $('#login').removeAttr('required');
                  
                    $("#login").rules("remove");
                }
                else {
                    $('#login_Contrato').removeClass('hidden');
                    $('#login_Contrato').addClass('show');
                  
                    $('#login').attr('required', 'required');
                    $('#login').each(function () {
                        $(this).rules('add', {
                            required: true,
                            messages: {
                                required: "Login Necessário"
                            }
                        });
                    });
                    
                }

            }
              


          
            
            myApp.hidePreloader();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Financeiro');

            myApp.hidePreloader();
            renderPaginaInicial();
        }

    });

}
function renderEfetivarTransferencia() {
    var valor = $('#valor').val().split(',')[0].replace(".", "");
    transferencia['Login'] = $('#login').val();
    transferencia['ValorTotal'] = valor;
    transferencia['Valor'] = valor;
    transferencia['Senha'] = $('#senha').val();
    transferencia['IDConta'] = $('#select-carteira option:selected').val()
    myApp.showPreloader();

    $.ajax({
        type: "post",
        data: {
            'model': transferencia,
            'IDOperador': user['IDContrato'],
            'Login': user['Login'],
        },
        url: 'http://' + ip + '/Financeiro/EfetivarTransfer',
        timeout: Tempoajax,
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado["retorno"] == "Transferido com Sucesso!") {
                myApp.alert(resultado['retorno'], 'Financeiro', function () {
                    mainView.router.loadPage('financeiro.html');
                    renderFinanceiro();
                });
            }
            else {
                myApp.alert(resultado['retorno'], 'Financeiro');
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.alert('Erro de Conexão', 'Financeiro');

            myApp.hidePreloader();
            renderPaginaInicial();
        }

    });
}
function renderPagamento() {

}
function renderRequisitarSaque() {


}



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
    if (page.name === 'transferencia') {
 
        $('#formTransferencia').validate({
            rules: {
                senha: { required: true, minlength: 3 },
                valor: { required: true}
            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' },
                valor: { required: 'Valor de transferência necessário'}
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },

           
            submitHandler: function (form) {
                renderEfetivarTransferencia();


                return false;
            }
        });
    
        
        $('#select-carteira').on('change', function (e) {
            
            if ($('#select-carteira option:selected').text() != "Contrato") {
                $('#login_Contrato').removeClass('show');
                $('#login_Contrato').addClass('hidden');
                $('#login').removeAttr('required');
                $("#login").rules("remove");
              
            }
            else {
                $('#login_Contrato').removeClass('hidden');
                $('#login_Contrato').addClass('show');
                $('#login').attr('required', 'required');
                $('#login').each(function () {
                    $(this).rules('add', {
                        required: true,
                        messages: {
                            required: "Login necessário"
                        }
                    });
                });
                
            }
         
            var valor = $('#valor').val().split(',')[0].replace(".", "");
            var IDCarteira = $('#select-carteira option:selected').val();
            $.ajax({
                type: "post",
                data: {
                    'IDCarteira': IDCarteira,
                    'Guid': transferencia['Guid'],
                    'ValorTransferencia': valor,
                },
                url: 'http://' + ip + '/Financeiro/GetTaxa',
                timeout: Tempoajax,
                success: function (resultado) {
                    $('#taxa').val(resultado['Valor']);


                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    myApp.alert('Erro de Conexão', 'Financeiro');

                    myApp.hidePreloader();
                    renderPaginaInicial();
                }

            });
        });
        $('#valor').on('change', function (e) {
            var valor = $('#valor').val();
            $('#valor').val(numeroParaMoeda(valor, 2, ',', '.'));
            var IDCarteira = $('#select-carteira option:selected').val();
            $.ajax({
                type: "post",
                data: {
                    'IDCarteira': IDCarteira,
                    'Guid': transferencia['Guid'],
                    'ValorTransferencia': valor,
                },
                url: 'http://' + ip + '/Financeiro/GetTaxa',
                timeout: Tempoajax,
                success: function (resultado) {
                    $('#taxa').val(resultado['Valor']);                

               
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    myApp.alert('Erro de Conexão', 'Financeiro');

                    myApp.hidePreloader();
                    renderPaginaInicial();
                }

            });
        });

    }
});
