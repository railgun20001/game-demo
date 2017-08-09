var log = console.log.bind(console)

var imageFromPath = function(path){
  var img = new Image()
  img.src = path
  return img
}

var loadLevel = function(n){
  n = n - 1
  var bricks = []
  var level = levels[n]
  for (var i = 0; i < level.length; i++) {
    var p = level[i]
    var brick = Brick(p)
    bricks.push(brick)
  }
  return bricks
}

var __main = function(){
  var game= PaddleGame(60)
  var paddle = Paddle()
  var ball = Ball()
  var bricks = loadLevel(1)
  game.registerAction('a', 'A', 'ArrowLeft', function(){
    paddle.moveLeft()
  })
  game.registerAction('d', 'D', 'ArrowRight', function(){
    paddle.moveRight()
  })
  game.registerAction('f', 'F', function(){
    ball.fire()
  })
  window.addEventListener('keydown', function(event){
    k = event.key
    if (k === 'p' || k === 'P') {
      game.status.paused = !game.status.paused
    } else if ('1234567'.includes(k)) {
      bricks = loadLevel(Number(k))
    } else if (k === 'g') {           // g和b是定时器的停止与开始，回来做成游戏结束与开始
      game.gameOver()
    } else if (k === 'b') {
      game.runloop()
    }
  })
  game.update = function(){
    if (game.status.paused) {           // 暂停功能
      return
    }
    ball.move()
    if (ball.collide(paddle)) {
      ball.rebound()
    }
    for (var i = 0; i < bricks.length; i++) {
      var brick = bricks[i]
      if (ball.collide(brick)) {
        brick.kill()
        ball.rebound()
      }
    }
  }
  game.draw = function(){
    game.drawImage(paddle)
    game.drawImage(ball)
    for (var i = 0; i < bricks.length; i++) {
      var brick = bricks[i]
      if (brick.alive) {
        game.drawImage(brick)
      }
    }
  }
}
__main()
