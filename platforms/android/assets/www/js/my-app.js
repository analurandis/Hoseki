﻿var Tempoajax = 30000;

var ip = '192.168.0.27';
//var ip = 'localhost:56747';


//BANCO DE DADOS
var user;
var guid;
var model;
var carteiras; 
var transferencia;
var saque;



var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    swipeBackPage: true,
    pushState: true,
    template7Pages: true
});


var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: false,
});

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}
// Handle the back button
//
function onBackKeyDown() {
    navigator.app.exitApp();
}

$$('.open-login').on('click', function () {
    myApp.loginScreen();
});

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
/*Detalhe dos parametros
n = numero a converter
c = numero de casas decimais
d = separador decimal
t = separador milhar*/
function numeroParaMoeda(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

$$(document).on('pageInit', function (e) {
    var page = e.detail.page;

    $$('.panel-close').on('click', function (e) {
        myApp.closePanel();
    });
    
    if (page.name === 'dadosBancarioFormCriar') {
        $('#formDadosBancarioCriar').validate({
            rules: {
                agencian: { required: true, minlength: 3 },
                agenciad: { required: true, minlength: 1 },
                contan: { required: true, minlength: 3 },
                contad: { required: true, minlength: 1 }
            },
            messages: {

                agencian: { required: 'Número da Agência', minlength: 'No mínimo 3 caracteres' },
                agenciad: { required: 'Digito da Agência', minlength: 'No mínimo 1 caracteres' },
                contan: { required: 'Número da Conta', minlength: 'No mínimo 3 caracteres' },
                contad: { required: 'Digito da Conta', minlength: 'No mínimo 1 caracteres' }

            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
            submitHandler: function (form) {
                renderDadosBancariosCriarSalvar();
                return false;
            }
        });
    }
    if (page.name === 'dadosBancarioForm') {
        $('#formDadosBancario').validate({
            rules: {
                agencian: { required: true, minlength: 3 },
                agenciad: { required: true, minlength: 1 },
                contan: { required: true, minlength: 3 },
                contad: { required: true, minlength: 1 }
            },
            messages: {
                
                agencian: { required: 'Número da Agência', minlength: 'No mínimo 3 caracteres' },
                agenciad: { required: 'Digito da Agência', minlength: 'No mínimo 1 caracteres' },
                contan: { required: 'Número da Conta', minlength: 'No mínimo 3 caracteres' },
                contad: { required: 'Digito da Conta', minlength: 'No mínimo 1 caracteres' }

            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
            submitHandler: function (form) {
                renderDadosBancariosEditarSalvar();
                return false;
            }
        });
    }

    if (page.name === 'dadosRegistro') {
        $('#formDadosRegistro').validate({
            rules: {
                nome: { required: true, minlength: 3 }          
            },
            messages: {
                nome: { required: 'Informe seu nome', minlength: 'No mínimo 3 caracteres' }
              
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
            submitHandler: function (form) {
                renderDadosRegistroSalvar();
                return false;
            }
        });
    }
    if (page.name === 'senha') {
        $('#formSenha').validate({
            rules: {
                senhaatual: { required: true, minlength: 3 },
                senhanova: { required: true, minlength: 3 },
                senhanovaconfirma: { required: true, minlength: 3 }
            },
            messages: {
                senhaatual: { required: 'Informe sua senha atual', minlength: 'No mínimo 3 caracteres' },
                senhanova: { required: 'Informe sua nova senha', minlength: 'No mínimo 3 caracteres' },
                senhanovaconfirma: { required: 'Confirme sua nova senha', minlength: 'No mínimo 3 caracteres' }
                

            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
            submitHandler: function (form) {
                renderAlterarSenha();
                return false;
            }
        });
    }
    if (page.name === 'senhaSecundaria') {
        $('#formSenhaSecundaria').validate({
            rules: {
                senhaatual: { required: true, minlength: 3 },
                senhanova: { required: true, minlength: 3 },
                senhanovaconfirma: { required: true, minlength: 3 }
            },
            messages: {
                senhaatual: { required: 'Informe sua senha atual', minlength: 'No mínimo 3 caracteres' },
                senhanova: { required: 'Informe sua nova senha', minlength: 'No mínimo 3 caracteres' },
                senhanovaconfirma: { required: 'Confirme sua nova senha', minlength: 'No mínimo 3 caracteres' }


            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },
            submitHandler: function (form) {
                renderAlterarSenhaSecundaria();
                return false;
            }
        });
    }
    if (page.name != 'index') 
    {
        $("#index").attr("href", "index.html")
        
    }
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
                valor: { required: true }
            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' },
                valor: { required: 'Valor de transferência necessário' }
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
                    myApp.hidePreloader();
                    myApp.alert('Erro de Conexão', 'Tela Financeiro', function () {
                        fecharApp();
                    });
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
                    myApp.hidePreloader();
                    myApp.alert('Erro de Conexão', 'Tela Financeiro', function () {
                        fecharApp();
                    });
                }

            });
        });

    }
    if (page.name === 'saque') {
        $('#formSaque').validate({
            rules: {
                senha: { required: true, minlength: 3 },
                valor: { required: true },
                select_carteira: { required: true }
            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' },
                valor: { required: 'Valor de transferência necessário' },
                select_carteira: { required: 'Selecione uma opção de saque' }
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },


            submitHandler: function (form) {
                renderEfetivarSaque();


                return false;
            }
        });

        if ($('#select-carteira option:selected').text() == "BitCoin") {
            $.ajax({
                type: "post",
                data: {
                    'Valor': valor,
                    'Guid': saque['Guid']
                },
                url: 'http://' + ip + '/Financeiro/BitCoinToDolarTaxa',
                timeout: Tempoajax,
                success: function (resultado) {
                    $('#valor_bitcoin').val(resultado);

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    myApp.hidePreloader();
                    myApp.alert('Erro de Conexão', 'Valor do Bitcoin', function () {
                        fecharApp();
                    });
                }

            });
        }

        $('#select-carteira').on('change', function (e) {

            if ($('#select-carteira option:selected').text() == "Conta Bancária") {
                $('#carteira_conta').removeClass('show');
                $('#valor_bitcoin').addClass('hidden');
                $('#valor_bitcoin').removeClass('show');
                $('#carteira_conta').addClass('hidden');
                $('#conta_corrente').removeClass('hidden');
                $('#conta_corrente').addClass('show');
                $('#conta').removeAttr('required');
                $("#conta").rules("remove");
                $('#select_conta_corrente').each(function () {
                    $(this).rules('add', {
                        required: true,
                        messages: {
                            required: "É necessário uma conta corrente para deposito"
                        }
                    });

                });

            } else {
                if ($('#select-carteira option:selected').text() == "BitCoin") {
                    $('#conta_corrente').removeClass('show');
                    $('#conta_corrente').addClass('hidden');
                    $('#carteira_conta').removeClass('hidden');
                    $('#carteira_conta').addClass('show');
                    $('#valor_bitcoin').addClass('show');
                    $('#valor_bitcoin').removeClass('hidden');
                    $('#valor_bitcoin').removeClass('hidden');
                    $("#select_conta_corrente").rules("remove");
                    $('#conta').attr('required', 'required');
                    $('#conta').each(function () {
                        $(this).rules('add', {
                            required: true,
                            messages: {
                                required: "É necessário uma carteira de Bitcoin"
                            }
                        });
                    });


                } else {
                    $('#valor_bitcoin').addClass('hidden');
                    $('#valor_bitcoin').removeClass('show');
                    $('#conta_corrente').removeClass('show');
                    $('#conta_corrente').addClass('hidden');
                    $('#carteira_conta').removeClass('show');
                    $('#carteira_conta').addClass('hidden');
                    $('#conta').removeAttr('required');
                    $("#conta").rules("remove");
                    $("#select_conta_corrente").rules("remove");

                }
            }
            if ($('#select-carteira option:selected').text() == "BitCoin") {
                var valor = $('#valor').val().split(',')[0].replace(".", "");
                $.ajax({
                    type: "post",
                    data: {
                        'Valor': valor,
                        'Guid': saque['Guid']
                    },
                    url: 'http://' + ip + '/Financeiro/BitCoinToDolarTaxa',
                    timeout: Tempoajax,
                    success: function (resultado) {
                        $('#valorbitcoin').val(resultado);

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        myApp.hidePreloader();
                        myApp.alert('Erro de Conexão', 'Valor do Bitcoin', function () {
                            fecharApp();
                        });
                    }
                });
            }
        });
        $('#valor').on('change', function (e) {
            var valor = $('#valor').val();
            $('#valor').val(numeroParaMoeda(valor, 2, ',', '.'));
            var IDCarteira = $('#select-carteira option:selected').val();
            $.ajax({
                type: "post",
                data: {
                    'Valor': valor,
                    'Guid': saque['Guid']
                },
                url: 'http://' + ip + '/Financeiro/GetTaxaSaque',
                timeout: Tempoajax,
                success: function (resultado) {
                    $('#taxa').val(resultado);

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    myApp.hidePreloader();
                    myApp.alert('Erro de Conexão', 'Taxa de saque', function () {
                        fecharApp();
                    });
                }

            });

            if ($('#select-carteira option:selected').text() == "BitCoin") {
                var valor = $('#valor').val().split(',')[0].replace(".", "");
                $.ajax({
                    type: "post",
                    data: {
                        'Valor': valor,
                        'Guid': saque['Guid']
                    },
                    url: 'http://' + ip + '/Financeiro/BitCoinToDolarTaxa',
                    timeout: Tempoajax,
                    success: function (resultado) {
                        $('#valorbitcoin').val(resultado);

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        myApp.hidePreloader();
                        myApp.alert('Erro de Conexão', 'Taxa de Saque', function () {
                            fecharApp();
                        });
                    }
                });
            }
        });

    }
    if (page.name === 'pagamento') {
        $('#formPagamento').validate({
            rules: {
                senha: { required: true, minlength: 3 },
                codigo: { required: true }
            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' },
                codigo: { required: 'Digite o codigo a ser pago' }
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },

            submitHandler: function (form) {

                renderEfetivarPagamento();

                return false;
            }
        });

        $('#codigo').on('change', function (e) {
            var valor = $('#codigo').val();
            $.ajax({
                type: "post",
                data: {
                    'ID': valor,
                    'IDCarteira': model['ID']
                },
                url: 'http://' + ip + '/Financeiro/SearchFatura',
                success: function (resultado) {

                    if (resultado['hasError'] == true) {
                        myApp.alert(resultado['Error'], '');
                    }
                    else {
                        $('#login').val(resultado['Login']);
                        $('#valor').val(resultado['Valor']);
                        $('#descricao').val(resultado['Descricao']);
                        $('#taxa').val(resultado['ValorTaxa']);

                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    myApp.hidePreloader();
                    myApp.alert('Erro de Conexão', 'Buscar codigo', function () {
                        fecharApp();
                    });
                }

            });
        });
    }
    if (page.name === 'rede') {
        $(document).ready(function () {
            $("#tree").explr();
        });
    }
    if (page.name === 'upgradepagar') {
        $('#formUpgrade').validate({
            rules: {
                senha: { required: true, minlength: 3 },

            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' },
               
            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },

            submitHandler: function (form) {
                model['SenhaSecundaria'] = $('#senha').val();
                renderEfetivarUpgrade();

                return false;
            }
        });

    }
    if (page.name === 'upgradecancel') {
        $('#formUpgradeCancel').validate({
            rules: {
                senha: { required: true, minlength: 3 },

            },
            messages: {
                senha: { required: 'Informe sua senha', minlength: 'No mínimo 3 caracteres' },

            },
            errorPlacement: function (error, element) {
                error.insertBefore(element);
            },

            submitHandler: function (form) {
                model['SenhaSecundaria'] = $('#senha').val();
                renderEfetivarCancelUpgrade();

                return false;
            }
        });

    }
});

function renderPaginaInicial() {
  
        myApp.showIndicator();
        var pes = user['NomePessoa'];
        $('.dados-usuario p').html(pes);
        id = user['IDContrato'];
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
                $('#diretos').html(resultado['TotalDireto']);
                $('#binario-ativo').html(resultado['model']['DadosRede']['QualificadoBinario']);
                if (resultado['model']['DadosRede']['QualificadoBinario'] == "Sim") {
                    $('#binario').addClass('bg-ativo');
                } else {
                    $('#binario').addClass('bg-negativo');
                }
                var totalInv = numeroParaMoeda(resultado['model']['DadosPessoa']['ValorTotalInvestido'], 2, ',', '.');
               // $('#total-investido').html("Total Investido: " + totalInv);
                
                $('#situacao').html(resultado['model']['DadosRede']['Situacao']);

                if (resultado['model']['DadosRede']['Situacao'] == "Ativo") {
                    $('#situ').addClass('bg-ativo');
                } else {
                    $('#situ').addClass('bg-negativo');
                }

                myApp.hideIndicator();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                myApp.hideIndicator();
                myApp.alert('Tela Inicial', 'Erro de Conexão')

            }

        });

};

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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });

           
  
        }

    });
};

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
            if (resultado["retorno"] != null && resultado["retorno"] != "sucesso" ) {
                myApp.alert(resultado['retorno'], 'Pagamento');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
           
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Pagamento');


        }

    });
};

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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Investimento', function () {
                fecharApp();
            });
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
                                    myApp.hidePreloader();
                                    myApp.alert('Erro de Conexão', 'Tela de Investimento', function () {
                                        fecharApp();
                                    });
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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Investimento', function () {
                fecharApp();
            });
        }

    });
}

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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Financeiro', function () {
                fecharApp();
            });
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
                    + '<li><a href= "financeiroPagamento.html" onclick= "renderPagamento(' + ID + ');" class="button   " id= "" > <i class="fa-icon fa fa-money"></i>Pagamento</a > </li>'
                    + '<li><a href="financeiroSaque.html" onclick="renderRequisitarSaque(' + ID + ');" class="button  " id="" > <i class="fa-icon fa fa-money"></i>Requisitar Saque</a > </li></div>';
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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Financeiro', function () {
                fecharApp();
            });
        }

    });
}

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
            alert(JSON.stringify(resultado));
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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Transferência', function () {
                fecharApp();
            });
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
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Transferência', function () {
                fecharApp();
            });
        }

    });
}

function renderPagamento(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Financeiro/Pagamento',
        timeout: Tempoajax,
        data: {
            'ID': ID,
            'IDOperador':  user['IDContrato']
        },
        dataType: "json",
        success: function (resultado) {
            if (resultado['model']) {
                model = resultado['model'];
                var valor = resultado['model']['Valor'];
                var val = numeroParaMoeda(valor, 2, ',', '.');
                $('#saldo').val(numeroParaMoeda(model['Saldo'], 2, ',', '.'));
                $('#taxa').val(numeroParaMoeda(model['ValorTaxa'], 2, ',', '.'));
            }
            myApp.hidePreloader();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Pagamento Financeiro');


        }

    });

}

function renderEfetivarPagamento() {

    myApp.showPreloader();
    model['CodigoFatura'] = $('#codigo').val()
    model['Valor'] = numeroParaMoeda($('#valor').val(), 2, ',', '.');
    model['Senha'] = $('#senha').val();
    model['ValorTaxa'] = numeroParaMoeda($('#taxa').val(), 2, ',', '.');
    model['Login'] = $('#login').val();
    model['Descricao'] = $('#descricao').val()

    model['Senha'] = $('#senha').val();
    $.ajax({
        type: "post",
        data: {
            'model': model,
            'IDOperador': user['IDContrato'],
        },
        url: 'http://' + ip + '/Financeiro/EfetivarPagamento',
        timeout: Tempoajax,
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg']) {
                myApp.alert('Pagamento realizado com sucesso', 'Financeiro', function () {
                    mainView.router.loadPage('financeiro.html');
                    renderFinanceiro();
                });
            }
            else {
                myApp.alert(resultado['retorno'], 'Financeiro');
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de pagamentos', function () {
                fecharApp();
            });
        }

    });
}

function renderRequisitarSaque(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        data: {
            'IDOperador': user['IDContrato'],
            'ID':ID,
            'IDPessoa': user['IDPessoa']
        },
        url: 'http://' + ip + '/Financeiro/RequisitarSaque',
        timeout: Tempoajax,
        success: function (resultado) {
          
           
            if (resultado['model'] != null) {
                saque = resultado['model'];
                var valor = resultado['model']['Saldo'];
                var val = numeroParaMoeda(valor, 2, ',', '.');
                
                $('#saldo').val(val);
                $('#taxa').val(numeroParaMoeda(resultado['model']['Taxa'], 2, ',', '.'));
                $('#valor').val(numeroParaMoeda(resultado['model']['Valor'], 2, ',', '.'));
                $('#valorbitcoin').val(resultado['ValorBitCoin']);
                $('#conta').val(resultado['model']['Carteira']);
                if (resultado['ContaCorrente'] != null) {
                   
                    var obj = (resultado['ContaCorrente']);
                    $.each(obj, function (key, value) {
                        $('#select_conta_corrente').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                    });
                }
                if (resultado['Tipo'] != null) {
                    var obj = (resultado['Tipo']);
                    $.each(obj, function (key, value) {

                        $('#select-carteira').append('<option value="' + value.Value + '">' + value.Text + '</option>');

                    });
                }
               
            }
            if (resultado['retorno']) {
                myApp.alert(resultado['retorno'], 'Requisiçao de Saque', function () {
                    mainView.router.loadPage('financeiro.html');
                    renderFinanceiro();
                });
            }
            

            myApp.hidePreloader();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Requisição de Saque', function () {
                fecharApp();
            });
        }

    });
}

function renderEfetivarSaque() {
    var valor = $('#valor').val().split(',')[0].replace(".", "");
    saque['Valor'] = valor;
    saque['IDContaCorrente'] = $('#select_conta_corrente').val();
    saque['Senha'] = $('#senha').val();
    saque['IDTipo'] = $('#select-carteira option:selected').val()
    myApp.showPreloader();

    $.ajax({
        type: "post",
        data: {
            'model': saque,
            'IDOperador': user['IDContrato'],
            'IDPessoa': user['IDPessoa']
        },
        url: 'http://' + ip + '/Financeiro/EfetivarSaque',
        timeout: Tempoajax,
        success: function (resultado) {
            myApp.hidePreloader();

            if (resultado == "Sucesso") {
                myApp.alert('Requisição de Saque realizada com sucesso', 'Financeiro', function () {
                    mainView.router.loadPage('financeiro.html');
                    renderFinanceiro();
                });
            }
            else {
                myApp.alert(resultado['retorno'], 'Financeiro');
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Requisição de Saque', function () {
                fecharApp();
            });
        }

    });
}

function renderRedeLinear(){
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Rede/Linear',
        timeout: Tempoajax,
        data: { 'IDOperador': user['IDContrato']},
        dataType: "json",
        success: function (resultado) {

            $('#rede ul').empty();
            if ((resultado['model']['Lista'] == "") || (resultado['model']['Lista'] == null)) { 
                li = '<li><div><h5>Você não possue rede</h5></div></li>'
                $('#rede ul').append(li);
        }
            else {

                var obj = (resultado['model']['Lista']);
                $.each(obj, function (key, value) {
                    obj[key]['tamanho'] = 1;
                    if (value.Graduacao == null) {
                        value.Graduacao = "";
                    }
                    switch (value.Perna) {
                        case "E":
                            value.Perna = "Esquerda";
                            break;
                        case "D":
                            value.Perna = "Direita";
                            break;
                        default:
                            value.Perna = "";
                    }

                    var li =
                        '<li id="' + value.ID + '"class="' + value.ID + ' 0" onclick="renderLinhaLinear(' + value.ID + ')">'
                        + '<div class="dados">'
                        + '<div class="tamanho hidden">'
                        + value.tamanho
                        + '</div>'
                        + '<div class=row>'
                        + '<div class="col-20">'
                        + '<img src="' + value.Icone + '" title="" />'
                        + '</div>'
                        + '<div class="col-80" id="">'
                        + '<h4>Login</h4>' + value.Descricao
                        + '</div></div></div>'

                        + '<div class="data-table data-table-init ">'
                        + '<table>'
                        + '<thead>'
                        + '<tr>'
                        + '<th>Perna</th>'
                        + '<th>Graduação</th>'
                        + '<th>Situação</th>'
                        + '<th>Ativo Mensal</th>'
                        + '<th>Direto</th>'
                        + '</tr>'
                        + '</thead>'
                        + '<tbody>'
                        + '<tr>'
                        + '<td>' + value.Perna + '</td>'
                        + '<td>' + value.Graduacao + '</td>'
                        + '<td>' + value.Situacao + '</td>'
                        + '<td>' + value.AtivoMensal + '</td>'
                        + '<td>' + value.TotalDiretos + '</td>'
                        + '</tr>'
                        + ' </tbody>'
                        + '</table>'
                        + '</div>  '
                        + '</li >'
                    $('#rede ul').append(li);
                });
               
        }
          

            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });



        }

    });
};

function renderLinhaLinear(ID) {
    
    if ($("#" + ID).hasClass("pai"+ID)) {
        // $("#" + ID).remove("ul");
        $("ul #filho" + ID).remove();
        $("#" + ID).removeClass("pai"+ID)
    } else {
        var tamanho = $("#" + ID + " .tamanho").html();
      
        myApp.showIndicator();
  //  var IDContrato = user['IDContrato'];
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Rede/GetLinha',
        timeout: Tempoajax,
        data: { 'ID':ID },
        dataType: "json",
        success: function (resultado) {
            if (resultado['Lista']!=null){
                var obj = (resultado['Lista']);
                var children = '#' + ID;
                $(children).addClass("pai"+ID);
            $.each(obj, function (key, value) {
                obj[key]['tamanho'] = parseInt(tamanho) + 5;
                var li =' <ul id="filho'+ID+'"><li id="' + value.ID + '" class=" children ' + value.ID + '" onclick="renderLinhaLinear(' + value.ID + ')">'
                    + '<div class="dados-children">'
                    + '<div class="tamanho hidden">'
                    + value.tamanho
                    + '</div>'
                    + '<div class="row">'
                    + '<div class="col-15">'
                    + '<img src="' + value.Icone + '" title="" />'
                    + '</div>'
                    + '<div class="col-80">'
                    + value.Descricao
                    + '<h4>Diretos: ' + value.TotalDiretos
                    + '</h4></div></div ></div >'
                    + '</li><ul>';

                $(li).insertAfter($(children));
                $('#' + value.ID).css("margin-left", value.tamanho );
                
                if ($(children).hasClass("impar")) {
                    $('#' + value.ID).addClass('par');
                }
                else {
                    $('#' + value.ID).addClass('impar');
                }
               
        });
           
            }

            myApp.hideIndicator();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hideIndicator();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });



        }


        });

    }
}

function renderUpgrade() {
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/UpgradeApp/AjaxHandler',
        timeout: Tempoajax,
        data: { 'IDOperador': IDContrato },
        dataType: "json",
        success: function (resultado) {
            $('#upgrade1 ul').empty();
            var obj = (resultado['lista']);
            var li = '';
            if (obj == null || obj == "") {
                li = '<li><div><h5>Você não possue upgrade feitos</h5></div></li>'
                $('#upgrade1 ul').append(li);
            }
            else {
                $.each(obj, function (key, value) {
                   
                    li = '<li id=""> '
                        + '<div> <div class="faturatitulo grupo"> Data:  </div> <div class="esquerda">' + value.Data + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Plano de:  </div> <div class="esquerda">' + value.PlanoDe + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Plano para:  </div>  <div class=" esquerda">' + value.PlanoPara + '</div></div>'
                        + '<div> <div class="faturatitulo grupo"> Situação: </div>  <div class="esquerda">' + value.Situacao + '</div></div>'
                        + '<div> <div class="faturatitulo grupo">Valor: </div>  <div class="esquerda">' + value.Valor + '</div></div>'
                        + '</div>';

                    if (value.IDSituacao == 1) {

                        $('#upgrade1 ul').append(li + '<a href="upgradeFormCancel.html" onclick="renderCancelarUpgradeForm(' + value.ID + ');" class="button_small " id="btn_cancelar" ><i class="fa-icon fa fa-exclamation-triangle"></i>Cancelar</a> </div>');
                    }

                    else {

                        $('#upgrade1 ul').append(li + '</li>');

                    }

                 

                });
            }
            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });



        }

    });
}

function renderRealizarUpgrade() {
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/UpgradeApp/FazerUpgrade',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            "Login": user['Login']},
        dataType: "json",
        success: function (resultado) {
            if (resultado['model']['Lista'] == null || resultado['model']['Lista'] == "") {
               
                li = '<li><div><h5>Você não possue upgrade para fazer</h5></div></li>'
                $('#upgrade ul').append(li);
            }else{
            $('#upgrade ul').empty();
            var obj = (resultado['model']['Lista']);

            $.each(obj, function (key, value) {
                var valor = numeroParaMoeda(value.Valor, 2, ',', '.');
                var li = '<li><div class="row">'
                    + '<div class="col-50" > '
                    + ' <img src="' + value.Imagem + '" />'
                    + '</div >'
                    + '<div class="col-50">'
                    + '<p>' + value.Plano + '</p >'
                    + '<p>' + valor + '</p >'
                    + '<p> <a href="upgradeform.html" onclick="renderUpgradeForm(' + value.IDPlano + ');" class="button-fill button " id="btn_comprar" ><i class="fa-icon fa fa-arrow-up"></i>Selecionar</a> </p >'
                    + ' </div>'
                    + '</div></li>'
                $('#upgrade ul').append(li);
            });
            }
            myApp.hidePreloader();


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });



        }

    });
}

function renderUpgradeForm(ID) {
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/UpgradeApp/RealizarForm',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            "ID": ID
        },
        dataType: "json",
        success: function (resultado) {
            model = resultado;
            if (resultado['model']) {
                model = resultado['model'];
                $('#plano_atual').val(resultado['model']['PlanoAtual']);
                $('#plano').val(resultado['model']['Plano']);
                $('#observacao').val(resultado['model']['Observacao']);
                $('#valor_total').val(numeroParaMoeda(model['ValorTotal'], 2, ',', '.'));
                $('#valor').val(numeroParaMoeda(model['Valor'], 2, ',', '.'));
                $('#taxa').val(numeroParaMoeda(model['ValorTaxa'], 2, ',', '.'));
                myApp.hidePreloader();
            } else {
                myApp.hidePreloader();
                mainView.router.loadPage('upgrade.html');
                myApp.alert(resultado['Message'], 'Erro', function () {
                    renderUpgrade();
                });
            }
           
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Upgrade', function () {
                fecharApp();
            });

        }

    });
}

function renderEfetivarUpgrade() {
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/UpgradeApp/Realizar',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            "model": model
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('fatura.html');
                myApp.alert('Efetue o pagamento', 'Upgrade selecionado com sucesso', function () {
                    renderFatura();
                });

            }
            else {
                myApp.alert(resultado['Message'], 'Erro');
            }
            
      

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Upgrade', function () {
                fecharApp();
            });



        }

    });
}

function renderCancelarUpgradeForm(ID){
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/UpgradeApp/CancelForm',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            "ID": ID
        },
        dataType: "json",
        success: function (resultado) {
            model = resultado;
            if (resultado['model']) {
                model = resultado['model'];
                $('#plano_atual').val(resultado['model']['PlanoAtual']);
                $('#plano').val(resultado['model']['Plano']);
                $('#valor').val(numeroParaMoeda(model['Valor'], 2, ',', '.'));
                myApp.hidePreloader();
            } else {
                myApp.hidePreloader();
                mainView.router.loadPage('upgrade.html');
                myApp.alert(resultado['Message'], 'Erro', function () {
                    renderUpgrade();
                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Upgrade', function () {
                fecharApp();
            });



        }

    });
}

function renderEfetivarCancelUpgrade() {
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/UpgradeApp/Cancel',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            "model": model
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('upgrade.html');
                myApp.alert('Upgrade cancelado com sucesso', '', function () {
                    renderUpgrade();
                });

            }
            else {
                myApp.alert(resultado['Message'], 'Erro');
            }



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Upgrade', function () {
                fecharApp();
            });



        }

    });
}

function renderDadosRegistro() {
    $('#navbarUnico').addClass('hidden');
    $('#navbarUnico').removeClass('show');
    $('#navbarLink').addClass('show');
    $('#navbarLink').removeClass('hidden');
    $('#editarDados').addClass('show');
    $('#editarDados').removeClass('hidden')
    $('#dadosform').removeClass('show');
    $('#dadosform').addClass('hidden')
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/MinhaConta/RegistrationData',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
        },
        dataType: "json",
        success: function (resultado) {
            model = resultado;
            if (resultado['model']) {
                model = resultado['model'];
                $('#nome').val(model['DadosPessoa']['NomePessoa']).prop("disabled", true) ;
                $('#documento').val(model['DadosPessoa']['TaxID']).prop("disabled", true);
                $('#email').val(model['DadosPessoa']['Email']).prop("disabled", true);
                $('#endereco').val(model['DadosEndereco']['Endereco']).prop("disabled", true);
                $('#numero').val(model['DadosEndereco']['Numero']).prop("disabled", true);
                $('#cep').val(model['DadosEndereco']['CEP']).prop("disabled", true);
                $('#cidade').val(model['DadosEndereco']['Cidade']).prop("disabled", true);
                $('#bairro').val(model['DadosEndereco']['Bairro']).prop("disabled", true);
                $('#complemento').val(model['DadosEndereco']['Complemento']).prop("disabled", true);
                $('#estado').val(model['DadosEndereco']['Estado']).prop("disabled", true);
                $('#pais').prop("disabled", true);
                if (resultado['pais']){
                    pais = resultado['pais'];
                    $.each(pais, function (key, value) {
                        if (model['DadosEndereco']['IDPais'] == value.Value){
                            $('#pais').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                        }
                        else{
                            $('#pais').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                        }
                    });
                };
                
                myApp.hidePreloader();
            } else {
                myApp.hidePreloader();
                mainView.router.loadPage('dados.html');
                myApp.alert('Erro ao recuperar dados de registro', 'Erro', function () {
                    renderUpgrade();
                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderDadosRegistroEditar() {
    $('#navbarUnico').removeClass('hidden');
    $('#navbarUnico').removeClass('show');
    $('#navbarLink').addClass('hidden');
    $('#editarDados').addClass('hidden')
    $('#dadosform').removeClass('hidden');
    $('#dadosform').addClass('show')
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/MinhaConta/EditRegistrationData',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
        },
        dataType: "json",
        success: function (resultado) {
            //model = resultado;
            if (resultado['model']) {
                model = resultado['model'];
                $('#nome').val(model['DadosPessoa']['NomePessoa']).prop("disabled", false);    
                $('#documento').val(model['DadosPessoa']['TaxID']);
                $('#email').val(model['DadosPessoa']['Email']);
                $('#endereco').val(model['DadosEndereco']['Endereco']).prop("disabled", false);;
                $('#numero').val(model['DadosEndereco']['Numero']).prop("disabled", false);;
                $('#cep').val(model['DadosEndereco']['CEP']).prop("disabled", false);;
                $('#cidade').val(model['DadosEndereco']['Cidade']).prop("disabled", false);;
                $('#bairro').val(model['DadosEndereco']['Bairro']).prop("disabled", false);;
                $('#complemento').val(model['DadosEndereco']['Complemento']).prop("disabled", false);;
                $('#estado').val(model['DadosEndereco']['Estado']).prop("disabled", false);;
                $('#pais').prop("disabled", false);
                if (resultado['pais']) {
                    pais = resultado['pais'];
                    $.each(pais, function (key, value) {
                        if (model['DadosEndereco']['IDPais'] == value.Value) {
                            $('#pais').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                        }
                        else {
                            $('#pais').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                        }
                    });
                };

                myApp.hidePreloader();
            } else {
                myApp.hidePreloader();
                mainView.router.loadPage('dados.html');
                myApp.alert('Erro ao recuperar dados de registro', 'Erro', function () {
                    renderUpgrade();
                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderDadosRegistroSalvar() {
    myApp.showPreloader();
    model['DadosPessoa']['NomePessoa'] = $('#nome').val();
    model['DadosEndereco']['Endereco'] = $('#endereco').val();
    model['DadosEndereco']['Numero'] = $('#numero').val();
    model['DadosEndereco']['CEP'] =  $('#cep').val();
    model['DadosEndereco']['Cidade'] = $('#cidade').val();
    model['DadosEndereco']['Bairro'] = $('#bairro').val();
    model['DadosEndereco']['Complemento']=  $('#complemento').val();
    model['DadosEndereco']['Estado']= $('#estado').val();
    model['DadosEndereco']['IDPais'] = $('#pais').val();
    var Login = user['Login'];
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/MinhaConta/SaveRegistrationData',
        timeout: Tempoajax,
        data: {
            'Login': Login,
            'pessoa': model['DadosPessoa'],
            'endereco': model['DadosEndereco']
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('dadosRegistro.html');
                myApp.alert('Dados alterados com sucesso', '', function () {
                    renderDadosRegistro();
                });

            }
            else {
                myApp.alert('Erro ao salvar dados', 'Erro');
            }


               
           

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderMeuContrato() {
    
    var IDContrato = user['IDContrato'];
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/MinhaConta/MyContract',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
        },
        dataType: "json",
        success: function (resultado) {
            model = resultado;
            if (resultado['model']) {
                model = resultado['model'];
                $('#login').val(model['DadosRede']['Login']).prop("disabled", true);
                $('#patrocinador').val(model['DadosPatrocinador']['Login']).prop("disabled", true);
                $('#data').val(model['DadosRede']['DataCadastro']).prop("disabled", true);
                $('#plano').val(model['DadosRede']['Plano']).prop("disabled", true);
                $('#situacaoc').val(model['DadosRede']['Situacao']).prop("disabled", true);
                

                myApp.hidePreloader();
            } else {
                myApp.hidePreloader();
                mainView.router.loadPage('dados.html');
                myApp.alert('Erro ao recuperar dados de registro', 'Erro', function () {
                    renderUpgrade();
                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderDadosBancarios() {
  
    myApp.showPreloader();
    var IDContrato = user['IDContrato'];

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/AjaxHandler',
        timeout: Tempoajax,
        data: { 'Login': user['Login'],},
        dataType: "json",
        success: function (resultado) {
            $('#dadosBancarios ul').empty();
            var obj = (resultado['lista']);
            var li = '';
            if (obj == null || obj == "") {
                
                li = '<li><div><h5>Você não possue dados bancários cadastrados</h5></div></li>'
                $('#dadosBancarios ul').append(li);
            }
            else {
                model = obj;
                $.each(obj, function (key, value) {

                    li = '<li id="" class="dados-acao"> '
                        + '<div> <div class="faturatitulo grupo"> Banco:  </div> <div class="esquerda">' + value.Banco + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Tipo de Conta:  </div> <div class="esquerda">' + value.TipoConta + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Conta:  </div>  <div class=" esquerda">' + value.Conta + '</div></div>'
                        + '<div> <div class="faturatitulo grupo"> Padrão: </div>  <div class="esquerda">' + value.Padrao + '</div></div>'
                        + '<div> <div class="faturatitulo grupo">Situação: </div>  <div class="esquerda">' + value.Ativo + '</div></div>'
                        + '</div> <a href="#" onclick="renderDadosBancoConfig(' + value.ID + ');" class="button_small dados-acao" id="acao" ><i class="fa-icon fa fa-cog "></i>Configuração</a> </div >'
                    $('#dadosBancarios ul').append(li);

                });
            }
            myApp.hidePreloader();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });
        }
    });
}
function renderDadosBancoConfig(ID) {
    var ativo = "";
    $.each(model, function (key, value) {
        if (value.ID == ID) {
            if (value.Ativo=="Ativo") {
                ativo = "Desativar";
            } else {
                ativo = "ativar";
            }
        }
    });
    
    var buttons = [
        {
            text: '<div id="conf_dados">Configuração dos Dados Bancários</div>',
            label: true,
           
        },
        {
            text: '<div id="btn_editar">Editar</div>',
            bold: true,
            onClick: function () {
                mainView.router.loadPage('dadosBancarioForm.html');
                renderDadosBancariosEditar(ID);
            }
        },
        {
            text: '<div id="btn_excluir">Excluir</div>',
            bold: true,
            onClick: function () {
                mainView.router.loadPage('dadosFormExcluir.html');
                renderDadosBancariosExcluir(ID);
            }
        },
        {
            text: '<div id="btn_ativo">'+ativo+'</div>',
            bold: true,
            onClick: function () {
                renderDadosBancariosAtivar(ID);
            }
        },
        {
            text: '<div id="btn_padrao">Definir Padrão',
            bold: true,
            onClick: function () {
                renderDadosBancariosPadrao(ID);
            }
        },
    ];
    myApp.actions(buttons);
}
function renderDadosBancariosEditar(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/Editar',
        timeout: Tempoajax,
        data: { 'id': ID, },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['model']) {
                model = resultado['model'];
                $('#agencian').val(resultado['model']['NumeroAgencia']);
                $('#agenciad').val(resultado['model']['DigitoAgencia']);
                $('#contan').val(resultado['model']['NumeroConta']);
                $('#contad').val(resultado['model']['DigitoConta']);

                banco = resultado['Banco'];
                $.each(banco, function (key, value) {
                    
                    if (value.Value==resultado['model']['IDBanco']) {
                        $('#select-banco').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                    } else {
                        $('#select-banco').append('<option  value="' + value.Value + '">' + value.Text + '</option>');
                    }

                });
                conta = resultado['TipoConta'];
                $.each(conta, function (key, value) {
                    if (value.Value == resultado['model']['IDBanco']) {
                        $('#select-conta').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                    } else {
                        $('#select-conta').append('<option  value="' + value.Value + '">' + value.Text + '</option>');
                    }
                 

                });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });
        }
    });
}
function renderDadosBancariosEditarSalvar(){
    myApp.showPreloader();
    model['NumeroAgencia'] = $('#agencian').val();
    model['DigitoAgencia'] = $('#agenciad').val();
    model['NumeroConta'] = $('#contan').val();
    model['DigitoConta'] = $('#contad').val();
    model['DigitoConta'] = $('#contad').val();
    model['IDTipoConta'] = $('#select-conta option:selected').val();
    model['IDBanco'] = $('#select-banco option:selected').val()
   
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/EditarSalvar',
        timeout: Tempoajax,
        data: { 
            'IDOperador': user['IDContrato'],
            'model': model
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('dados.html');
                myApp.alert('Dados alterados com sucesso','');

            }
            else {
                myApp.alert(resultado['msg'], 'Erro');
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}
function renderDadosBancariosExcluir(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/Excluir',
        timeout: Tempoajax,
        data: { 'id': ID, },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['model']) {
                model = resultado['model'];
                $('#agencian').val(resultado['model']['NumeroAgencia']);
                $('#agenciad').val(resultado['model']['DigitoAgencia']);
                $('#contan').val(resultado['model']['NumeroConta']);
                $('#contad').val(resultado['model']['DigitoConta']);

                banco = resultado['Banco'];
                $.each(banco, function (key, value) {

                    if (value.Value == resultado['model']['IDBanco']) {
                        $('#select-banco').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                    } else {
                        $('#select-banco').append('<option  value="' + value.Value + '">' + value.Text + '</option>');
                    }

                });
                conta = resultado['TipoConta'];
                $.each(conta, function (key, value) {
                    if (value.Value == resultado['model']['IDBanco']) {
                        $('#select-conta').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                    } else {
                        $('#select-conta').append('<option  value="' + value.Value + '">' + value.Text + '</option>');
                    }


                });
            }


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });
        }
    });
}

function renderDadosBancariosFormExcluir() {
    myApp.showPreloader();

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/ExcluirDados',
        timeout: Tempoajax,
        data: {
            'IDOperador': user['IDContrato'],
            'model': model
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('dados.html');
                myApp.alert('Dados bancários excluidos com sucesso', '');

            }
            else {
                myApp.alert(resultado['msg'], 'Erro');
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });
        }

    });

}

function renderDadosBancariosAtivar(ID) {
    
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/AtivarInativar',
        timeout: Tempoajax,
        data: {
            'id': ID,
            'IDOperador': user['IDContrato'],
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('dadosBancarios.html');
                renderDadosBancarios();
                myApp.alert('Dados alterados com sucesso', '');

            }
            else {
                myApp.alert(resultado['msg'], 'Erro');
            }
     


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });
        }
    });

}
function renderDadosBancariosPadrao(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/DefinirPadrao',
        timeout: Tempoajax,
        data: {
            'id': ID,
            'IDOperador': user['IDContrato'],
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('dadosBancarios.html');
                renderDadosBancarios();
                myApp.alert('Dados alterados com sucesso', '');

            }
            else {
                myApp.alert(resultado['msg'], 'Erro');
            }



        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });
        }
    });
}

function renderDadosBancarioCriarForm() {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/Criar',
        timeout: Tempoajax,
        data: { },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            model = resultado['model'];
                banco = resultado['Banco'];
                $.each(banco, function (key, value) {

                    if (value.Value == resultado['model']['IDBanco']) {
                        $('#select-banco').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                    } else {
                        $('#select-banco').append('<option  value="' + value.Value + '">' + value.Text + '</option>');
                    }

                });
                conta = resultado['TipoConta'];
                $.each(conta, function (key, value) {
                    if (value.Value == resultado['model']['IDBanco']) {
                        $('#select-conta').append('<option selected="true" value="' + value.Value + '">' + value.Text + '</option>');
                    } else {
                        $('#select-conta').append('<option  value="' + value.Value + '">' + value.Text + '</option>');
                    }


                });
            

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });
        }
    });
}

function renderDadosBancariosCriarSalvar() {
    myApp.showPreloader();
    model['NumeroAgencia'] = $('#agencian').val();
    model['DigitoAgencia'] = $('#agenciad').val();
    model['NumeroConta'] = $('#contan').val();
    model['DigitoConta'] = $('#contad').val();
    model['DigitoConta'] = $('#contad').val();
    model['IDTipoConta'] = $('#select-conta option:selected').val();
    model['IDBanco'] = $('#select-banco option:selected').val()
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Banco/CriarSalvar',
        timeout: Tempoajax,
        data: {
            'IDOperador': user['IDContrato'],
            'Login': user['Login'],
            'model': model
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == "sucesso") {
                mainView.router.loadPage('dadosBancarios.html');
                renderDadosBancarios();
                myApp.alert('Banco criado com sucesso', '');

            }
            else {
                myApp.alert(resultado['msg'], 'Erro');
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderAlterarSenha() {
    var IDContrato = user['IDContrato'];
    var SenhaAtual = $('#senhaatual').val();
    var SenhaNova = $('#senhanova').val();
    var ConfirmaSenha = $('#senhanovaconfirma').val();
    var model = {}
    model['SenhaAtual'] = SenhaAtual;
    model['Senha'] = SenhaNova;
    model['ConfirmaSenha'] = ConfirmaSenha;

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/MinhaConta/Password',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            'model':model
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == 'sucesso') {
                mainView.router.loadPage('dados.html');
                myApp.alert('Senha alterada com sucesso', '');
                
               
            }
            else {
                if (resultado['model']) {
                    myApp.alert('Dados inválido', '');


                } else {
                    myApp.alert(resultado['msg'], 'Erro');
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderAlterarSenhaSecundaria() {
    var IDContrato = user['IDContrato'];
    var SenhaAtual = $('#senhaatual').val();
    var SenhaNova = $('#senhanova').val();
    var ConfirmaSenha = $('#senhanovaconfirma').val();
    var model = {}
    model['SenhaAtual'] = SenhaAtual;
    model['Senha'] = SenhaNova;
    model['ConfirmaSenha'] = ConfirmaSenha;

    $.ajax({
        type: "post",
        url: 'http://' + ip + '/MinhaConta/SecondaryPassword',
        timeout: Tempoajax,
        data: {
            'IDOperador': IDContrato,
            'model': model,
            'Login': user['Login'],
        },
        dataType: "json",
        success: function (resultado) {
            myApp.hidePreloader();
            if (resultado['msg'] == 'sucesso') {
                mainView.router.loadPage('dados.html');
                myApp.alert('Senha alterada com sucesso', '');


            }
            else {
                if (resultado['model']) {
                    myApp.alert('Dados inválido', '');


                } else {
                    myApp.alert(resultado['msg'], 'Erro');
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela de Dados', function () {
                fecharApp();
            });



        }

    });
}

function renderDadosRecuperarSenha() {
    myApp.prompt('E-Mail', 'Recuperação de senha',
        function (value) {
            
        },
        function (value) {
            
        }
    );
}

function renderRendimentos() {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Rendimentos/AjaxHandler',
        timeout: Tempoajax,
        data: { 'IDOperador': user['IDContrato'] },
        dataType: "json",
        success: function (resultado) {


            $('#rendimentos ul').empty();
            if ((resultado['model'] == null) || (resultado['model'] == '')) {
                $('#rendimentos ul').append("<li><h4>Você não possui rendimentos no período<h4></li>");
            }
            else {
                $('#select-tipo').empty();
                $.each(resultado['lista'], function (key, value) {
                    $('#select-tipo').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                    });
                var obj = (resultado['model']);
                $.each(obj, function (key, value) {
                    var li = '<li>'
                        + '<div> <div class="faturatitulo grupo"> Descrição:  </div> <div class="esquerda" id="IDFatura">' + value.Descricao + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Data:  </div> <div class="esquerda">' + value.Data + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Situaçao:  </div>  <div class=" esquerda">' + value.Situacao + '</div></div>'
                        + '<div> <div class="faturatitulo grupo"> Valor: </div>  <div class="esquerda">' + value.Valor + '</div></div>'
                        + '</div>';
                    if (value.tagResgatar == true) {

                        $('#rendimentos ul').append(li + '<a href="#" onclick="renderRendimentosResgatar(' + value.ID +');" class="button_small " id="btn_resgatar" ><i class="fa-icon fa fa-credit-card "></i>Resgatar</a> </div>');
                    }

                    else {

                        $('#rendimentos ul').append(li + '</li>');

                    }
                });
                $("#select-tipo option[value=" + obj[0]['IDSituacao'] + "]").prop('selected', true);
            }

            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });



        }

    });
}
function renderRendimentosResgatar(ID) {
    myApp.showPreloader();
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Rendimentos/Request',
        timeout: Tempoajax,
        data: {
            'IDOperador': user['IDContrato'],
            'id':ID 
        },
        dataType: "json",
        success: function (resultado) {

            if (resultado['msg'] == "sucesso") {
                renderRendimentos();
                myApp.alert('Valor resgatado com sucesso', '');

            } else {
                renderRendimentos();
                myApp.alert(resultado['msg'], 'Erro');
            }

            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Rendimentos', function () {
                fecharApp();
            });



        }

    });

}

function renderRendimentosBuscar() {
    myApp.showPreloader();

    var rendimentoModel = {
        'IDSituacao': $('#select-tipo option:selected').val(),
        'DataInicio': $('#datainicio').val(),
        'DataFinal': $('#datafinal ').val()
    }
    $.ajax({
        type: "post",
        url: 'http://' + ip + '/Rendimentos/BuscarRendimento',
        timeout: Tempoajax,
        data: {
            'IDOperador': user['IDContrato'],
            'model': rendimentoModel
        },
        dataType: "json",
        success: function (resultado) {

            $('#rendimentos ul').empty();
            if ((resultado['model'] == null) || (resultado['model'] == '')) {
                $('#rendimentos ul').append("<li><h4>Você não possui rendimentos no período<h4></li>");
            }
            else {
                $('#select-tipo').empty();
                $.each(resultado['lista'], function (key, value) {
                    $('#select-tipo').append('<option value="' + value.Value + '">' + value.Text + '</option>');
                });
                var obj = (resultado['model']);
                $.each(obj, function (key, value) {
                    var li = '<li>'
                        + '<div> <div class="faturatitulo grupo"> Descrição:  </div> <div class="esquerda" id="IDFatura">' + value.Descricao + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Data:  </div> <div class="esquerda">' + value.Data + '</div> </div > '
                        + '<div> <div class="faturatitulo grupo"> Situaçao:  </div>  <div class=" esquerda">' + value.Situacao + '</div></div>'
                        + '<div> <div class="faturatitulo grupo"> Valor: </div>  <div class="esquerda">' + value.Valor + '</div></div>'
                        + '</div>';
                    if (value.Situacao == "Pendente") {

                        $('#rendimentos ul').append(li + '<a href="#" onclick="renderRendimentosResgatar(' + value.ID + ');" class="button_small " id="btn_resgatar" ><i class="fa-icon fa fa-credit-card "></i>Resgatar</a> </div>');
                    }

                    else {

                        $('#rendimentos ul').append(li + '</li>');

                    }
                }); 
                $("#select-tipo option[value=" + obj[0]['IDSituacao']+"]").prop('selected', true);

            }

            myApp.hidePreloader();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            myApp.hidePreloader();
            myApp.alert('Erro de Conexão', 'Tela Inicial', function () {
                fecharApp();
            });



        }

    });
}