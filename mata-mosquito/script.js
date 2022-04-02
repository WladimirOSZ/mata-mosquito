
//globalVariables
let w = window.innerWidth;
let h = window.innerHeight;

let gameSpace = document.getElementById("game");
let timer= 60;
let size;
let pTop;
let pLeft;
let lose=2;
let hearts;
let firstClick=true;
let timeToSpawn;
//setTimeout loop var
let spawn;




function start(){
    document.getElementById("timer").innerHTML=timer;
    if(document.getElementById("dificuldade").value==1){
        timerRate = 2;
        timeToSpawn=2000;
    }else if(document.getElementById("dificuldade").value==2){
        timerRate = 1;
        timeToSpawn=1000;
    }else if(document.getElementById("dificuldade").value==3){
        timerRate = 0.75;
        timeToSpawn=750;
    }
    document.addEventListener("click", gameClick);
    document.addEventListener("mousedown", gameClick);
    document.getElementById("hud").style.display="block";
    hearts = 3;
    document.getElementById("game").innerHTML="";
    spawnFly();
    spawn = setInterval(spawnFly, timeToSpawn);
    setTimeout(stop, 60000);//stop the function after 60seconds
    
    
    
}
function stop(loseGame = false){
    if(loseGame){
        getHtml("derrota.html");
    }else{
        getHtml("vitoria.html")
    }
    
    clearInterval(spawn);
    document.getElementById("hud").style.display="none";
    timer=60;
    hearts=3;
    firstClick=true;
    var images = document.getElementById("hud").getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        images[i].src = "imagens/coracao_cheio.png" ;
    }
    document.removeEventListener("click", gameClick);
}

function spawnFly(){
    //code
    size= 60+ (Math.floor(Math.random() * 30));//90
    pTop=Math.floor(Math.random() * h);
    pLeft=Math.floor(Math.random() * w);

    if(pTop+size>h){
        pTop-=size;
    }
    if(pLeft+size>w){
        pLeft-=size;
    }
    gameSpace.innerHTML= "<img src='imagens/mosca.png' style='top:"+pTop+"px; left: "+pLeft+"px; width:"+size+"px;'>";
    if(firstClick){
        lose=false;
        firstClick=false;
        return;
    }
    if(lose){
        document.getElementsByTagName("img")[hearts].src="imagens/coracao_vazio.png";
        
        if(hearts==0){
            stop(true);
            return;
        }
        hearts--;
    }
    lose = true;
    timer-=1;
    document.getElementById("timer").innerHTML=timer;
}



function gameClick(event) {
    
    cHorizontal = event.pageX;
    cVertical = event.pageY;
    
    lose = true;
    
    if( (cVertical>= pTop) && (cVertical<= (pTop+size)) ){
        if( (cHorizontal>= pLeft) && (cHorizontal<= (pLeft+size)) ){
            lose = false;
            gameSpace.innerHTML= "<img src='imagens/slime.png' style='top:"+pTop+"px; left: "+pLeft+"px; width:"+size+"px;'>";
        }
    }
    
}


