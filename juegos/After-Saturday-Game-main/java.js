var heart = document.getElementsByClassName("life");
var board = document.getElementById("board");
var count = document.getElementById("count")
function JavaY(x, y, parent, player, javass) {
  var java = this;
  this.height = 55;
  this.width = 55;
  this.x = x;
  this.y = y;
  this.sprite = document.createElement("div");
  this.directionY = 0;
  this.speed = 12;
  this.timerId;
  var musicOk = new Audio ("./images/coin.mp3")

  this.insertJava = function () {
    this.sprite.setAttribute("id", "java");
    this.sprite.style.left = this.x + "px";
    this.sprite.style.top = this.y + "px";
    parent.appendChild(this.sprite);
    this.timerId = setInterval(java.javaMoveY, 100);
  };

  this.javaMoveY = function () {
    java.checkCollision();
    if (java.y >= 0 && java.y <= 720) {
      java.y += java.speed;
      java.sprite.style.top = java.y + "px";
    } //movimiento del del los puntos en caida libre
    if (java.y > 670) {
      java.removeJavaY();
      javass.splice(javass.indexOf(java), 1);
    }
  };
  this.removeJavaY = function () {
    board.removeChild(java.sprite);
    clearInterval(java.timerId);
  };

  this.checkCollision = function () {
    if (
      java.x < player.x + player.width &&
      java.y < player.y + player.height &&
      java.x + java.width > player.x &&
      java.y + java.height > player.y
    ) {
      java.removeJavaY();
      javass.splice(javass.indexOf(java), 1)
      count.innerText = parseInt(count.innerText) + 50 + " POINTS"// para igualar el texto de html a numnero 
      musicOk.play()
    }
  };
}

export { JavaY };