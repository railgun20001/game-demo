var log = console.log.bind(console)

var imageFromPath = function(path){
  var img = new Image()
  img.src = path
  return img
}

var Paddle = function(){
  var canvas = document.querySelector('#id-canvas')
  var image = imageFromPath('img/paddle.png')

  var o = {
    image: image,
    speed: 5
  }
  image.onload =function(){
    o.x = (canvas.width - o.image.width) / 2
    o.y = canvas.height - o.image.height
  }
  o.moveLeft = function(){
    if (o.x > 0) {
      o.x -= o.speed
    }
  }
  o.moveRight = function(){
    if (o.x < canvas.width - o.image.width) {
      o.x += o.speed
    }
  }
  return o
}

var Ball = function(){
  var canvas = document.querySelector('#id-canvas')
  var BallImage = imageFromPath('img/ball.png')
  var PaddleImage = imageFromPath('img/paddle.png')
  var o = {
    image: BallImage,
    speedX: 6,
    speedY: -6,
    fired: false
  }
  BallImage.onload = function(){
    o.x = (canvas.width - o.image.width) / 2
    o.y = canvas.height - o.image.height - PaddleImage.height
  }
  o.fire = function(){
    o.fired = true
  }
  o.move = function(){
    if (o.fired) {
      if (o.x < 0 || o.x > canvas.width - o.image.width) {
        o.speedX = -o.speedX
      }
      if (o.y < 0 || o.y > canvas.height - o.image.height) {
        o.speedY = -o.speedY
      }
      o.x += o.speedX
      o.y += o.speedY
    }
  }
  // o.collideX = function(pb){
  //   if (o.y + o.image.height >= pb.y && o.y <= pb.y + pb.image.height) {     // 当球位于物体上下之间，碰撞左或右时
  //     if (!(o.x + o.image.width < pb.x || o.x > pb.x + pb.image.width)) {
  //       return true
  //     }
  //   }
  //   return false
  // }
  o.collideY = function(pb){
    if (o.x + o.image.width >= pb.x && o.x <= pb.x + pb.image.width) {     // 当球位于物体左右之间，碰撞上或下时
      if (!(o.y + o.image.height < pb.y || o.y > pb.y + pb.image.height)) {
        return true
      }
    }
    return false
  }
  // o.collideY = function(pb){
  //   if (o.x > pb.x + pb.image.width) {     // 球位于物体右侧
  //     return false
  //   } else if (o.x + o.image.width < pb.x) {     // 球位于物体左侧
  //     return false
  //   } else if (o.y > pb.y + pb.image.height) {     // 球位于物体下侧
  //     return false
  //   } else if (o.y + o.image.height < pb.y) {     // 球位于物体上侧
  //     return false
  //   }
  //   return true
  // }

  o.reboundX = function(){
    o.speedX = -o.speedX
  }
  o.reboundY = function(){
    o.speedY = -o.speedY
  }
  return o
}

var Brick = function(){
  var canvas = document.querySelector('#id-canvas')
  var image = imageFromPath('img/brick.png')
  var o = {
    image: image,
    x: 100,
    y: 100,
    w: 50,
    h: 20,
    alive: true
  }
  o.kill = function(){
    o.alive = false
  }
  return o
}

var PaddleGame = function(){
  var g = {
    actions: {},
    keydowns: {}
  }
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')
  g.canvas = canvas
  g.context = context

  g.drawImage = function(GamePaddle){
    g.context.drawImage(GamePaddle.image, GamePaddle.x, GamePaddle.y)
  }
  window.addEventListener('keydown', function(event){
    g.keydowns[event.key] = true    // 当按键按下时，存为true
  })
  window.addEventListener('keyup', function(event){
    g.keydowns[event.key] = false
  })
  g.registerAction = function(key,callback){           // 可以传多个key
    if (arguments.length === 2) {
      g.actions[key] = callback
    } else if (arguments.length > 2) {
      for (let i = 0,j = arguments.length; i < j-1; i++) {
        g.actions[arguments[i]] = arguments[j-1]
      }
    }
  }
  timer = setInterval(function(){
    var actions = Object.keys(g.actions)
    for (let i = 0; i < actions.length; i++) {
      var key = actions[i]
      if (g.keydowns[key]) {        // 如果按键按下，触发事件
        g.actions[key]()
      }
    }
    g.update()
    context.clearRect(0, 0, canvas.width, canvas.height)
    g.draw()
  },1000/60)
  return g
}
var __main = function(){
  var game= PaddleGame()
  var paddle = Paddle()
  var ball = Ball()
  var brick = Brick()

  game.registerAction('a', 'A', 'ArrowLeft', function(){
    paddle.moveLeft()
  })
  game.registerAction('d', 'D', 'ArrowRight', function(){
    paddle.moveRight()
  })
  game.registerAction('f', function(){
    ball.fire()
  })
  game.update = function(){
    ball.move()
    // if (ball.collideX(paddle)) {
    //   ball.reboundX()
    // }
    if (ball.collideY(paddle)) {
      ball.reboundY()
    }
    // if (ball.collideX(brick)) {
    //   brick.kill()
    //   ball.reboundX()
    // }
    if (ball.collideY(brick)) {
      brick.kill()
      ball.reboundY()
    }
  }
  game.draw = function(){
    game.drawImage(paddle)
    game.drawImage(ball)
    if (brick.alive) {
      game.drawImage(brick)
    }
  }
}
__main()
