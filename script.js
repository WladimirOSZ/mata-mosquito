
//globalVariables
let screen = {
    width: window.innerWidth,
    height: window.innerHeight
};
let fly = {
    size: 0,
    distanceFromTop: 0,
    distanceFromLeft: 0
};
let click = {
    cPosVertical: 0,
    cPosHorizontal: 0
};
let gameInfo = {
    hearts: 2,
    timer: 30,
    timeToSpawn: 0,
    miss: false
};
let timeOutVariables = {
    spawner: undefined,
    timer: undefined
};

let gameSpace= document.getElementById("game");


function start(){
    // reseting gameInfo variables
    gameInfo.hearts=2;
    gameInfo.timer=30;
    gameInfo.timeToSpawn=0;
    gameInfo.miss=false;

    // getting the game difficulty 
    gameInfo.timeToSpawn= getGameDifficulty();

    // start listening to user clicks
    document.addEventListener("mousedown", gameClick);

    // showing the game screen
    document.getElementById("timer").innerHTML=gameInfo.timer;
    document.getElementById("hud").style.display="block";
    document.getElementById("game").innerHTML="";

    // spawn a fly at each 2 seconds, one second or 0.75 seconds
    spawnFly();
    timeOutVariables.spawner = setInterval(spawnFly, gameInfo.timeToSpawn);
    timeOutVariables.timer = setInterval(timer, 1000);
}

function getGameDifficulty(){
    if(document.getElementById("dificuldade").value==1){
        return timeToSpawn=2000;
    }else if(document.getElementById("dificuldade").value==2){
        return timeToSpawn=1000;
    }
    return timeToSpawn=750;
}

function stop(lostGame = false){
    // bringing lost or win screens
    if(lostGame){
        getHtml("lost.html");
    }else{
        getHtml("win.html")
    }
    
    // stopping loops
    clearInterval(timeOutVariables.spawner);
    clearInterval(timeOutVariables.timer);

    // hiding the hud
    document.getElementById("hud").style.display="none";
    gameSpace.innerHTML="";
    
    var images = document.getElementById("hud").getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        images[i].src = "images/heart_full.png" ;
    }
    
    // stoping the game click listener
    document.removeEventListener("click", gameClick);
}

function timer(){
    gameInfo.timer-= 1;
    document.getElementById("timer").innerHTML=gameInfo.timer;
    if(gameInfo.timer==0){
        stop();
    }
}

function spawnFly(){
    
    if(gameInfo.miss){
        document.getElementsByTagName("img")[gameInfo.hearts+1].src="images/heart_empty.png";
        if(gameInfo.hearts==0){
            stop(true);
            return;
        }
        gameInfo.hearts--;
    }

    gameInfo.miss= true;

    fly.size= 60+ (Math.floor(Math.random() * 30));//90

    fly.distanceFromTop=Math.floor(Math.random() * screen.height);
    fly.distanceFromLeft=Math.floor(Math.random() * screen.width);

    if(fly.distanceFromTop+fly.size>screen.height){
        fly.distanceFromTop-=fly.size;
    }
    if(fly.distanceFromLeft+fly.size>screen.width){
        fly.distanceFromLeft-=fly.size;
    }
    
    gameSpace.innerHTML= "<img src='images/fly.png' style='top:"+fly.distanceFromTop+"px; left: "+fly.distanceFromLeft+"px; width:"+fly.size+"px;'>";
}

function gameClick(event) {
    click.cPosHorizontal = event.pageX;
    click.cPosVertical = event.pageY;

    gameInfo.miss= true;

    if( (click.cPosVertical>= fly.distanceFromTop) && (click.cPosVertical<= (fly.distanceFromTop+fly.size)) ){
        if( (click.cPosHorizontal>= fly.distanceFromLeft) && (click.cPosHorizontal<= (fly.distanceFromLeft+fly.size)) ){
            gameInfo.miss = false;
            gameSpace.innerHTML= "<img src='images/slime.png' style='top:"+fly.distanceFromTop+"px; left: "+fly.distanceFromLeft+"px; width:"+fly.size+"px;'>";
        }
    }
}