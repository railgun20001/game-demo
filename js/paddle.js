var Paddle = function(){                               // 定义移动板
  var canvas = document.querySelector('#id-canvas')
  var image = imageFromPath('img/paddle.png')

  var o = {
    image: image,
    speed: 5,
    alive: true
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
