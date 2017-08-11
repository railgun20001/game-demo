var SceneEnd = function(game){
  var s = {
    game: game,
  }
  s.update = function(){
  }
  s.draw = function(){
    game.context.font = "30px Georgia"
    game.context.fillText('游戏结束', (game.canvas.width - 90)/2, game.canvas.height/2)
    game.context.font = "10px Georgia"
    game.context.fillText('点击鼠标或按r重新开始游戏', (game.canvas.width - 130)/2, (game.canvas.height + 50)/2)
  }
  // 从end跳转到title
  var endToTitle = function(){
    for (var i in game.status) {
      game.status[i] = false
    }
    game.status.title = true
    var title = SceneTitle(game)
    game.replaceScene(title)
  }
  if (game.status.end) {
    game.registerAction('r', 'R', function(){
      endToTitle()
    })
    window.addEventListener('mousedown', function(event){
      endToTitle()
    })
  }

  return s
}
