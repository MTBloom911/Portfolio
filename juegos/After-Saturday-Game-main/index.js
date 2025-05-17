import { Player } from './domingo.js'
import { EnemyY } from './enemyY.js'
import { EnemyX } from './enemyX.js'
import { Life } from './life.js'
import { JavaY } from './java.js'

var board = document.getElementById("board")
var player = new Player (324, 324, board)
var enemies = []
var javass = []
var life;
var gameOverId
var createEnemyInt
var createJavaInt
var musicGame = new Audio("./images/happy.mp3");


var initialInterval = 2500 // intervalo incial para crear enemigos
var increaseSpeed = 100 // con cada vuelta va aumentar en este valor 
var minSpeed = 500 // incremento llega hasta este valor 
var intervalToCreate = initialInterval


function createJava() {
    var coord2 = Math.floor(Math.random() * 10) * 72 // generacion de ramdon
    var javaY = new JavaY(coord2, 0, board, player, javass)
    javaY.insertJava()
    javass.push(javaY)
    
    
}


function createLife (n){
    for (var i = 0; i < n; i++) {
        life = new Life(30 * i, 15, board); 
        life.insertLife();
    }
}

function gameOver(){
    if (player.remainingLife <= 0){
        clearInterval(player)
        clearInterval(gameOverId)
        clearInterval(createEnemyInt)
        clearInterval(createJavaInt)
        enemies.forEach(function(enemy){
            enemy.removeEnemy()
        })
        javass.forEach(function(java){
            java.removeJavaY()
        })
        board.removeChild(player.sprite)
        gameover.style.opacity = 1
    } 
}


function gameStart(){ //función de creación de personaje + enemigo 
    musicGame.play();
    
    player.insertPlayer()
    createEnemyInt = setInterval(createEnemy, intervalToCreate)
    console.log(intervalToCreate)
    createJavaInt = setInterval(createJava, 10000)
    gameOverId = setInterval(gameOver, 500)
    createLife(3)
    count.style.opacity = 1;
    startscreen.style.opacity = 0;

    function createEnemy() {
        var coord = Math.floor(Math.random() * 10) * 72 // generacion de ramdon
        var coord1 = Math.floor(Math.random() * 10) * 72 // generacion de ramdon
        var enemyY = new EnemyY(coord, 0, board, player, enemies)
        var enemyX = new EnemyX(0, coord1, board, player, enemies)
        enemyY.insertEnemy() 
        enemyX.insertEnemy()
        enemies.push(enemyY, enemyX) 
        
          if (intervalToCreate > minSpeed) {
            intervalToCreate -= increaseSpeed
        }
        
        clearInterval(createEnemyInt); 
        createEnemyInt = setInterval(createEnemy, intervalToCreate);
      }

};


let refresh = document.getElementById("restart"); refresh.addEventListener('click', _ => {             location.reload(); }) 



window.onload=function(){
    document.getElementById("myBtn").addEventListener("click", function(){
        gameStart()
        myBtn.style.display= "none";
    })
}

window.addEventListener('keydown', function(e){

    switch(e.key){
case "a": 
player.directionX = -1
player.moveX()
break;
case "A": 
player.directionX = -1
player.moveX()
break;
case "d": 
player.directionX = 1
player.moveX()
break;
case "D": 
player.directionX = 1
player.moveX()
break;
case "w": 
player.directionY = -1
player.moveY()
break;
case "W": 
player.directionY = -1
player.moveY()
break;
case "s": 
player.directionY = 1
player.moveY()
break;
case "S": 
player.directionY = 1
player.moveY()
break;
    }
})

