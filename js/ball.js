var Ball = function(){                               // 定义球
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
  o.collide = function(rect){                 // 判断球是否与其它矩形相撞函数
    if (o.x > rect.x + rect.image.width) {
      return false;
    } else if (o.x + o.image.width < rect.x) {
      return false;
    } else if (o.y > rect.y + rect.image.height) {
      return false;
    } else if (o.y + o.image.height < rect.y) {
      return false;
    }
    return true && rect.alive;
  }
  o.rebound = function(){
    o.speedY = -o.speedY
  }
  return o
}
