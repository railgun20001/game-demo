
var log = console.log.bind(console)
// var log = function(text){
//   document.querySelector('#id-textarea-log').value += '\n' + text
// }

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
  var images = {
    ball: 'img/ball.png',
    brick: 'img/brick.png',
    paddle: 'img/paddle.png'
  }
  var game= PaddleGame(60, images, function(game){
    var s = SceneTitle(game)
    game.runWithScene(s)
  })
}
__main()
