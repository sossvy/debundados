

//elementos do html
let campo_tabela = document.querySelector("#campo_lista");// div da tabela
let tabela = document.querySelector("#tabela");
let ppd = document.querySelector("#pesquisa_por_deputado");//input de texto
let ppp = document.querySelector("#pesquisa_por_partido");//select
let pps = document.querySelector("#pesquisa_por_sigla");//select
let dbutt = document.querySelector("#botao_deputado");//botao
let pbutt = document.querySelector("#botao_partido");//botao
let sbutt = document.querySelector("#botao_sigla");//botao
let lgbutt = document.querySelector("#botao_geral");//botao
let foto = document.querySelector("#foto");
let tabela_despesas = document.querySelector("#tabela_despesas");

//variaveis para outras coisas
let deputados_url = "https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome";
let deputado_url = "https://dadosabertos.camara.leg.br/api/v2/deputados/";// depois da barra, colocar o id do deputado  
let partidos_url = "https://dadosabertos.camara.leg.br/api/v2/partidos?ordem=ASC&ordenarPor=sigla&itens=100";
let partido_url = "https://dadosabertos.camara.leg.br/api/v2/partidos/"// depois da barra, colocar o id do partido;
const lista_partidoEsigla = [];
let valor_total_despesas = 0;





let requi = new XMLHttpRequest();
requi.open("GET", partidos_url, "true");
requi.onload = function () {

    if (requi.status === 200 && requi.readyState === 4) {

        jay = JSON.parse(requi.response);
        tam = jay.dados.length;
        let j = 0;
        for (i = 0; i < tam; i++) {

            let opo = document.createElement("option");
            opo.value = jay.dados[i].nome;
            opo.innerHTML = jay.dados[i].nome;
            ppp.appendChild(opo);

            let opi = document.createElement("option");
            opi.value = jay.dados[i].sigla;
            opi.innerHTML = jay.dados[i].sigla;
            pps.appendChild(opi);

            j = i * 2;
            lista_partidoEsigla[j] = jay.dados[i].nome;
            lista_partidoEsigla[j + 1] = jay.dados[i].sigla;

        }


    } else {
        alert("erro de status:" + requi.status)
    }

}
requi.onerror = function () { }
requi.send(null);






pbutt.onclick = function () {



    tam = lista_partidoEsigla.length
    for (i = 0; i < tam; i++) {
        if (ppp.value === lista_partidoEsigla[i]) {
            var partido_escolhido = lista_partidoEsigla[i + 1];



        }

    }

    let quest = new XMLHttpRequest();
    quest.open("GET", deputados_url, "true");
    quest.onload = function () {

        if (quest.status === 200 && quest.readyState === 4) {

            jay = JSON.parse(quest.response);
            lista_por_partido(partido_escolhido, jay);
            selecionaLinha(dados_deputado, jay);


        } else {
            alert("error de status :" + quest.status);
        }
    }
    quest.onerror = function () { }
    quest.send(null);

    tabela.classList.add(".tabelalegal");
}



sbutt.onclick = function () {
    tabela_despesas.classList.remove("tabelalegal");
    foto.src = ""
    foto.classList.remove("bordafoto");
    tabela_despesas.innerHTML = "";
    let sigla = pps.value;

    let id;
    let uest = new XMLHttpRequest();
    uest.open("GET", partidos_url, "true");
    uest.onload = function () {

        if (uest.status === 200 && uest.readyState === 4) {

            jay = JSON.parse(uest.response);
            tam = jay.dados.length;
            for (i = 0; i < tam; i++) {

                if (sigla === jay.dados[i].sigla) {

                    id = jay.dados[i].id;

                    let quest = new XMLHttpRequest();
                    quest.open("GET", partido_url + id, "true");
                    quest.onload = function () {

                        if (quest.status === 200 && quest.readyState === 4) {
                            let jay = JSON.parse(quest.response);
                            tabela.innerHTML = "";
                            let cabeca = tabela.createTHead();
                            let pl = cabeca.insertRow();

                            let cel_nome = pl.insertCell(0);
                            cel_nome.innerHTML = "nome";

                            let cel_sigla = pl.insertCell(1);
                            cel_sigla.innerHTML = "sigla";

                            let cel_membros = pl.insertCell(2);
                            cel_membros.innerHTML = "quantidade de deputados membros";

                            let cel_nomlider = pl.insertCell(3);
                            cel_nomlider.innerHTML = "nome do lider";

                            let cel_situacao = pl.insertCell(4);
                            cel_situacao.innerHTML = "situação";




                            let lr = tabela.insertRow();
                            let cel_nomer = lr.insertCell(0);
                            cel_nomer.innerHTML = jay.dados.nome;

                            let cel_siglar = lr.insertCell(1);
                            cel_siglar.innerHTML = jay.dados.sigla;

                            let cel_membrosr = lr.insertCell(2);
                            cel_membrosr.innerHTML = jay.dados.status.totalMembros;

                            let cel_nomliderr = lr.insertCell(3);
                            cel_nomliderr.innerHTML = jay.dados.status.lider.nome;

                            let cel_situacaor = lr.insertCell(4);
                            cel_situacaor.innerHTML = jay.dados.status.situacao;




                            foto.src = jay.dados.urlLogo;



                        } else {
                            alert("erro de status:" + quest.status)

                        }

                    }
                    quest.onerror = function () { }
                    quest.send(null);



                }


            }

        } else {
            alert("erro de status:" + uest.status)

        }

    }
    uest.onerror = function () { }
    uest.send(null);







    tabela.classList.add("tabelalegal");


}









lgbutt.onclick = function () {
    tabela.innerHTML = "";
    tabela_despesas.classList.remove("tabelalegal");
    foto.src = ""
    foto.classList.remove("bordafoto");
    tabela_despesas.innerHTML = "";
    let reque = new XMLHttpRequest;
    reque.open("GET", deputados_url, "true");

    reque.onload = function (e) {

        if (reque.readyState === 4 && reque.status === 200) {
            jay = JSON.parse(reque.response)

            impressao_geral(jay);

            selecionaLinha(dados_deputado, jay);


        } else {

            alert("erro ao abrir a requisisão de estatus: " + reque.status);
        }

    }

    reque.onerror = function (e) {

    }

    reque.send(null)

    tabela.classList.add("tabelalegal");
}

dbutt.onclick = function () {
    tabela_despesas.classList.remove("tabelalegal");

    nome = ppd.value;

    let reque = new XMLHttpRequest;
    reque.open("GET", deputados_url, "true");

    reque.onload = function (e) {

        if (reque.readyState === 4 && reque.status === 200) {
            jay = JSON.parse(reque.response)

            lista_selecionada(nome, jay);
            selecionaLinha(dados_deputado, jay);


        } else {

            alert("erro ao abrir a requisisão de estatus: " + reque.status);
        }

    }

    reque.onerror = function (e) {

    }

    reque.send(null)





    tabela.classList.add("tabelalegal");
}


















function impressao_geral(jay) {

    tam = jay.dados.length;


    tabela.innerHTML = "";



    let primer_row = tabela.createTHead();

    let cabelho = primer_row.insertRow();

    let l1_c1 = cabelho.insertCell(0);
    let l1_c2 = cabelho.insertCell(1);
    l1_c1.innerHTML = "Deputados";
    l1_c2.innerHTML = "Partidos";

    for (i = 0; i < tam; i++) {
        let nova_linha = tabela.insertRow();
        let cell_deputado = nova_linha.insertCell(0);
        let cell_sigla = nova_linha.insertCell(1);

        cell_deputado.innerHTML = jay.dados[i].nome;
        cell_sigla.innerHTML = jay.dados[i].siglaPartido;

    }



}




function lista_selecionada(nome, jay) {
    let achou = 0;
    let tam = jay.dados.length;

    for (let i = 0; i < tam; i++) {

        if (comparatexto(nome, jay.dados[i].nome) != -1) {

            if (achou === 0) {
                tabela.innerHTML = "";
                tabela_despesas.innerHTML = "";
                foto.src = "";
                foto.classList.remove("bordafoto");


                let primer_row = tabela.createTHead();

                let cabelho = primer_row.insertRow();

                let l1_c1 = cabelho.insertCell(0);
                let l1_c2 = cabelho.insertCell(1);
                l1_c1.innerHTML = "Deputados";
                l1_c2.innerHTML = "Partidos";
            }
            let nova_linha = tabela.insertRow();
            let cell_deputado = nova_linha.insertCell(0);
            let cell_sigla = nova_linha.insertCell(1);

            cell_deputado.innerHTML = jay.dados[i].nome;
            cell_sigla.innerHTML = jay.dados[i].siglaPartido;

            achou = 1;
        }
    }
    if (achou === 0) {
        alert("esse nome não esta na lista de deputados")
    }
}



function selecionaLinha(func, jay) {
    rows = tabela.rows;
    tam = rows.length;

    for (i = 1; i < tam; i++) {


        rows[i].classList.add("selecionavel");
        rows[i].onclick = function () {

            func(rows[this.rowIndex].cells[0].innerHTML, jay);


        }

    }
}







function pegaIdPorNome(jay, nome) {
    let id;
    tam = jay.dados.length;
    for (i = 0; i < tam; i++) {

        if (nome === jay.dados[i].nome) {
            id = jay.dados[i].id;
            return id;
        }


    }

}


function dados_deputado(nome_deputado, jay) {


    valor_total_despesas = 0;
    let id = pegaIdPorNome(jay, nome_deputado);

    reque = new XMLHttpRequest;
    reque.open("GET", deputado_url + id, "true");

    reque.onload = function (e) {
        if (reque.readyState === 4 && reque.status === 200) {

            let jay = JSON.parse(reque.response);

            let tam = jay.dados.length;
            tabela.innerHTML = "";

            let cabeca = tabela.createTHead();
            let primeiraLinha = cabeca.insertRow();

            let cell1 = primeiraLinha.insertCell(0);
            let cell2 = primeiraLinha.insertCell(1);
            let cell3 = primeiraLinha.insertCell(2);
            let cell4 = primeiraLinha.insertCell(3);
            let cell5 = primeiraLinha.insertCell(4);
            let cell6 = primeiraLinha.insertCell(5);
            let cell7 = primeiraLinha.insertCell(6);
            let cell8 = primeiraLinha.insertCell(7);
            let cell9 = primeiraLinha.insertCell(8);
            let cell10 = primeiraLinha.insertCell(9);
            let cell11 = primeiraLinha.insertCell(10);
            let cell12 = primeiraLinha.insertCell(11);
            let cell13 = primeiraLinha.insertCell(12);
            let cell14 = primeiraLinha.insertCell(13);

            cell1.innerHTML = "CPF";
            cell2.innerHTML = "Gasto Total de Despesas";
            cell3.innerHTML = "Data de Nascimento";
            cell4.innerHTML = "Escolaridade";
            cell5.innerHTML = "Id";
            cell6.innerHTML = "Municipio de Nascimento";
            cell7.innerHTML = "Nome Civil";
            cell8.innerHTML = "Redes sociais";
            cell9.innerHTML = "Sexo";
            cell10.innerHTML = "Estado de nascimento";
            cell11.innerHTML = "Uri(É oq ???)";
            cell12.innerHTML = "Url do website"
            cell13.innerHTML = "nome";
            cell14.innerHTML = "sigla do partido";

            let linha_resposta = tabela.insertRow();

            let cel_cpf = linha_resposta.insertCell(0);
            let cel_gas = linha_resposta.insertCell(1);
            let cel_datnasc = linha_resposta.insertCell(2);
            let cel_esc = linha_resposta.insertCell(3);
            let cel_id = linha_resposta.insertCell(4);
            let cel_munasc = linha_resposta.insertCell(5);
            let cel_nomciv = linha_resposta.insertCell(6);
            let cel_reds = linha_resposta.insertCell(7);
            let cel_sex = linha_resposta.insertCell(8);
            let cel_estnasc = linha_resposta.insertCell(9);
            let cel_uri = linha_resposta.insertCell(10);
            let cel_urlweb = linha_resposta.insertCell(11);
            let cel_nome = linha_resposta.insertCell(12);
            let cel_sigla = linha_resposta.insertCell(13);

            cel_cpf.innerHTML = jay.dados.cpf;
            cel_gas.innerHTML = "";
            cel_datnasc.innerHTML = jay.dados.dataNascimento
            cel_esc.innerHTML = jay.dados.escolaridade
            cel_id.innerHTML = jay.dados.id
            cel_munasc.innerHTML = jay.dados.municipioNascimento
            cel_nomciv.innerHTML = jay.dados.nomeCivil



            cel_reds.innerHTML = textin();
            function textin() {
                texto = ""
                tami = jay.dados.redeSocial.length;
                for (i = 0; i < tami; i++) {
                    texto += jay.dados.redeSocial[i] + "<br>";
                }
                return texto;
            };

            cel_sex.innerHTML = jay.dados.sexo
            cel_estnasc.innerHTML = jay.dados.ufNascimento
            cel_uri.innerHTML = jay.dados.uri
            cel_urlweb.innerHTML = jay.dados.urlWebsite
            cel_nome.innerHTML = jay.dados.ultimoStatus.nome;
            cel_sigla.innerHTML = jay.dados.ultimoStatus.siglaPartido;

            foto.src = jay.dados.ultimoStatus.urlFoto;
            foto.classList.add("bordafoto");


            let quest = new XMLHttpRequest();
            quest.open("GET", deputado_url + id + "/despesas?pagina=1&itens=100", "true")

            quest.onload = function () {
                let jay = JSON.parse(quest.response);


                let quanPagi = retornaNumOfPages(jay);


                criacabecadespesas();

                for (let i = 1; i < quanPagi + 1; i++) {
                    let pagi = i;
                    let que = new XMLHttpRequest();
                    que.open("GET", deputado_url + id + "/despesas?pagina=" + pagi + "&itens=100", "true");
                    que.onload = function () {
                        if (que.readyState === 4 && que.status === 200) {
                            let jay = JSON.parse(que.response);
                            console.log(jay);
                            preencheTabelaDespesas(jay);
                            cel_gas.innerHTML = valor_total_despesas.toFixed(2);
                            cel_gas.innerHTML = "R$ " + cel_gas.innerHTML;

                        } else { alert("erro de status:" + que.status) }


                    }
                    que.onerror = function () { }
                    que.send(null);


                }





            }

            quest.onerror = function () { }

            quest.send(null);



            tabela_despesas.classList.add("tabelalegal");


        } else {
            alert("erro ao abrir a requição:" + reque.status);
        }

    }

    reque.onerror = function (e) { }
    reque.send(null);



}


function lista_por_partido(partido, jay) {
    achou = 0;
    tam = jay.dados.length;
    for (i = 0; i < tam; i++) {

        if (partido === jay.dados[i].siglaPartido) {

            if (achou === 0) {
                tabela.innerHTML = "";



                let primer_row = tabela.createTHead();

                let cabelho = primer_row.insertRow();

                let l1_c1 = cabelho.insertCell(0);
                let l1_c2 = cabelho.insertCell(1);
                l1_c1.innerHTML = "Deputados";
                l1_c2.innerHTML = "Partidos";
            }
            let nova_linha = tabela.insertRow();
            let cell_deputado = nova_linha.insertCell(0);
            let cell_sigla = nova_linha.insertCell(1);

            cell_deputado.innerHTML = jay.dados[i].nome;
            cell_sigla.innerHTML = jay.dados[i].siglaPartido;

            achou = 1;
            tabela_despesas.innerHTML = "";
            foto.src = "";
            foto.classList.remove("bordafoto");
            tabela_despesas.classList.remove("tabelalegal");
        }
    }
    if (achou === 0) {
        alert("no momento não tem nenhum deputado com esse partido");
    }
}


function comparatexto(digitado, texto) {

    digitado = digitado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    texto = texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    digitado = digitado.toLowerCase();
    texto = texto.toLowerCase();

    return texto.indexOf(digitado);

}



function preencheTabelaDespesas(jay) {



    //pegando os dados da despesa e colocando eles na tabela

    tam = jay.dados.length;
    for (let i = 0; i < tam; i++) {

        novalinha = tabela_despesas.insertRow();

        let tipodespesa = novalinha.insertCell(0);
        let valor = novalinha.insertCell(1);
        let data = novalinha.insertCell(2);
        let tipodoc = novalinha.insertCell(3);
        let fornec = novalinha.insertCell(4);
        let url = novalinha.insertCell(5);

        tipodespesa.innerHTML = jay.dados[i].tipoDespesa;
        valor.innerHTML = jay.dados[i].valorLiquido;
        valor_total_despesas += jay.dados[i].valorLiquido;

        data.innerHTML = jay.dados[i].dataDocumento;
        tipodoc.innerHTML = jay.dados[i].tipoDocumento;
        fornec.innerHTML = jay.dados[i].nomeFornecedor;
        url.innerHTML = jay.dados[i].urlDocumento;



    }





}


function criacabecadespesas() {

    tabela_despesas.innerHTML = "";

    //criando o cabeçalho
    let cabeca = tabela_despesas.createTHead();

    //criando titulo
    let titulo = cabeca.insertRow();
    let conteudo_titulo = titulo.insertCell(0);
    conteudo_titulo.innerHTML = "lista de despesas";

    //criando as colunas
    let colunas = cabeca.insertRow();
    let coluna1 = colunas.insertCell(0);
    let coluna2 = colunas.insertCell(1);
    let coluna3 = colunas.insertCell(2);
    let coluna4 = colunas.insertCell(3);
    let coluna5 = colunas.insertCell(4);
    let coluna6 = colunas.insertCell(5);

    coluna1.innerHTML = "tipo de despesa";
    coluna2.innerHTML = "valor liquido (R$)";
    coluna3.innerHTML = "data";
    coluna4.innerHTML = "tipo de documento";
    coluna5.innerHTML = "fornecedor";
    coluna6.innerHTML = "link do documento";

}

function retornaNumOfPages(jay) {
    tam = jay.links.length;
    let texto = "";
    let nume = 1;
    let pos_ecoma;
    let pos_igual;


    for (let i = 0; i < tam; i++) {
        if (jay.links[i].rel === "last") {
            texto = jay.links[i].href;

        }



    }

    pos_igual = texto.indexOf("=");
    pos_ecoma = texto.indexOf("&");

    let numtexto = texto.substring(pos_igual + 1, pos_ecoma);
    nume = parseInt(numtexto);
    return nume;

}


