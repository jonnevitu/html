const player1 = "X";//representaçao do jogador 1
const player2 = "O";//representaçao do jogador 2
var playtime = player1;//define a vez de um player, como nao pode ser nula, por padrao esta como jogador 1
var gameover = false;//quando houver um vencedor o jogo eh definido como acabado a partir da variavel gameover

atualizarmostrador();
inicializarespacos();

function atualizarmostrador(){//muda a imagem de quem esta jogando de acordo com a vez de cada player
  if(gameover){
    return;
  }
if (playtime == player1){
  var player = document.querySelectorAll("div#mostradordeplayer img")[0];//procura a posiçao da div para adicionar uma imagem
  player.setAttribute("src","imagens/megu.jpg");
}
  else{
  var player = document.querySelectorAll("div#mostradordeplayer img")[0];
  player.setAttribute("src","imagens/aqua.jpg");
}
}
function inicializarespacos(){//funçao para identificar um click e adicionar uma imagem de acordo com o jogador da vez
  var espacos = document.getElementsByClassName('espaco');
  for (var i = 0; i < espacos.length; i++) {
    espacos[i].addEventListener("click",function(){
      if(gameover){return;}//se o jogo acabar, nao é mais possivel clicar para adicinar um posiçao

        if(this.getElementsByTagName("img").length == 0){//reconhece se o espaço está vazio e se for possibilita a adiçao de uma imagem

          if(playtime == player1){
            this.innerHTML = "<img src='imagens/megu.jpg' height='80' width='80'>";
            this.setAttribute("jogada",player1);
            playtime = player2;//troca a vez para o jogador 2

                }else{
                    this.innerHTML = "<img src='imagens/aqua.jpg' height='60' width='70'>";
                    this.setAttribute("jogada",player2);
                    playtime = player1;//troca a vez para o jogador 1

            }
          atualizarmostrador();
          verificarvencedor();


        }
      }
    )
  }
}
//funçao para verificar se houve um vencedor a partir do conjunto das posiçoes
async function verificarvencedor(){//"async" serve para fazer a funçao rodar em paralelo com o programa principal fazendo-o continuar rodando sem a conclusao da funçao

        var a1 = document.getElementById('a1').getAttribute("jogada");
        var a2 = document.getElementById('a2').getAttribute("jogada");
        var a3 = document.getElementById('a3').getAttribute("jogada");

        var b1 = document.getElementById('b1').getAttribute("jogada");
        var b2 = document.getElementById('b2').getAttribute("jogada");
        var b3 = document.getElementById('b3').getAttribute("jogada");

        var c1 = document.getElementById('c1').getAttribute("jogada");
        var c2 = document.getElementById('c2').getAttribute("jogada");
        var c3 = document.getElementById('c3').getAttribute("jogada");

        var vencedor ="";//declaraçao da variavel vencedor nula pois ainda n houve vencedor

  //verificaçao das posiçoes a,b e c
            if(( (a1==b1 && a1==c1) || (a1==a2 && a1==a3) || (a1==b2 && a1==c3) ) && a1!="")
            {
              vencedor=a1;
            }

            else if(( (b2==b1 && b2==b3) || (b2==a2 && b2==c2) || (b2==a3 && b2==c1) ) && b2!="")
            {
              vencedor=b2;
            }


            else if(( (c3==c2 && c3==c1) || (c3==a3 && c3==b3)) && c3!="")
            {
              vencedor=c3;
            }

if (vencedor !=""){
  gameover = true;
  await sleep(50);//faz o programa esperar alguns milisegundos para continuar a rodar
  alert("o ganhador foi o: '" + vencedor + "'");//alerta o vencedor
}
}
function sleep(ms){//emula uma funçao sleep ja que o javascript nao possui uma funçao sleep "nativa"
  return new Promise(resolve => setTimeout(resolve,ms))//condiçao que resolve a promise depois do tempo de await, o "ms" ter passado
}
