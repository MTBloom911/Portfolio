var heart = document.getElementsByClassName("life");
var board = document.getElementById("board");
function EnemyY(x, y, parent, player, enemies) {
  var enemyY = this;
  this.height = 55;
  this.width = 55;
  this.x = x;
  this.y = y;
  this.sprite = document.createElement("div");
  this.directionY = 0;
  this.speed = 12;
  this.timerId;
  var musicBad = new Audio ("./images/badcollision.mp3")

  this.insertEnemy = function () {
    this.sprite.setAttribute("id", "enemyY");
    this.sprite.style.left = this.x + "px";
    this.sprite.style.top = this.y + "px";
    parent.appendChild(this.sprite);
    this.timerId = setInterval(enemyY.enemyMoveY, 100);
  };

  this.enemyMoveY = function () {
    enemyY.checkCollision();
    if (enemyY.y >= 0 && enemyY.y <= 720) {
      enemyY.y += enemyY.speed;
      enemyY.sprite.style.top = enemyY.y + "px";
    } //movimiento del enemigo en caida libre
    if (enemyY.y > 670) {
      enemyY.removeEnemy();
      enemies.splice(enemies.indexOf(enemyY), 1)
    }
  };

  this.removeEnemy = function () {
    parent.removeChild(enemyY.sprite);
    clearInterval(enemyY.timerId);
  };

  this.checkCollision = function () {
    if (
      enemyY.x < player.x + player.width &&
      enemyY.y < player.y + player.height &&
      enemyY.x + enemyY.width > player.x &&
      enemyY.y + enemyY.height > player.y
    ) {
      enemyY.removeEnemy();
      enemies.splice(enemies.indexOf(enemyY), 1)
      
      heart[0].parentNode.removeChild(heart[0]);
      player.remainingLife = player.remainingLife - 1;
      musicBad.play()
      if (player.remainingLife <= 0) {
      }
    }
  };
}

export { EnemyY };
