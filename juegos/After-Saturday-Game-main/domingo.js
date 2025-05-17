function Player(x, y, parent, enemyY){
    var player = this
    this.height = 72
    this.width = 72
    this.x = x
    this.y = y
    this.sprite = document.createElement("div")
    this.directionX = 0
    this.directionY = 0
    this.speed = 18
    this.remainingLife = 3 
    this.insertPlayer = function(){
        console.log(parent)
        this.sprite.setAttribute("id", "player")
        this.sprite.style.left = this.x + "px"
        this.sprite.style.top = this.y + "px"
        parent.appendChild(this.sprite)
    }

    this.moveX = function (){
        console.log(player.x)
        var newMoveX = player.x +(18 * player.directionX)
        if (newMoveX >= 0 && newMoveX <= 648){
            player.x = newMoveX
            player.sprite.style.left = player.x + "px"
        }
    }
    
    this.moveY = function (){
        var newMoveY = player.y + (18 * player.directionY)
        if (newMoveY >= 0 && newMoveY <= 648){
            player.y = newMoveY
            player.sprite.style.top = player.y + "px"
        }
    }
}

export {Player}