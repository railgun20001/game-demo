  var Scene = function(game){
    var s = {
      game: game,
    }
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
      }
    })
    s.update = function(){
      if (game.status.paused) {           // 暂停功能
        return
      }
      ball.move()
      if (ball.collide(paddle)) {
        ball.rebound()
      }
      if (ball.y > paddle.y) {
        for (var i in game.status) {
          game.status[i] = false
        }
        game.status.end = true
        var end = SceneEnd(game)
        game.replaceScene(end)
      }
      for (var i = 0; i < bricks.length; i++) {
        var brick = bricks[i]
        if (ball.collide(brick)) {
          brick.kill()
          ball.rebound()
        }
      }
    }
    s.draw = function(){
      // 设置背景
      // game.context.fillStyle = '#564'
      // game.context.fillRect(0, 0, game.canvas.width, game.canvas.height)
      game.drawImage(paddle)
      game.drawImage(ball)
      for (var i = 0; i < bricks.length; i++) {
        var brick = bricks[i]
        if (brick.alive) {
          game.drawImage(brick)
        }
      }
        game.context.fillText('分数：' + game.score, 10, game.canvas.height - 10)
    }
    window.addEventListener('mousedown', function(event){
      var x = event.offsetX
      var y = event.offsetY
      if (containMouse(x, y)) {
        ball.isDrag = true
      }
    })
    window.addEventListener('mousemove', function(event){
      var x = event.offsetX
      var y = event.offsetY
      if (ball.isDrag && game.status.paused) {
        ball.x = x
        ball.y = y
      }
    })
    window.addEventListener('mouseup', function(event){
      ball.isDrag = false
    })
    var containMouse = function(x, y){
      if (x  > ball.x && x < ball.x + ball.image.width) {
        if(y > ball.y && y < ball.y + ball.image.height) {
          return true
        }
      }
      return false
    }
    // window.removeEventListener('mousedown', titleToMain())
    return s
  }
