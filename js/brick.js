var Brick = function(position){                               // 定义砖块
  var canvas = document.querySelector('#id-canvas')
  var image = imageFromPath('img/brick.png')
  var o = {
    image: image,
    x: position[0],
    y: position[1],
    w: 50,
    h: 20,
    alive: true,
    lives: position[2] || 1
  }
  o.kill = function(){
    o.lives -= 1
    if (o.lives < 1) {
      o.alive = false
    }
  }
  return o
}
