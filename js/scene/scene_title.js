var SceneTitle = function(game){
  var s = {
    game: game,
  }
  s.update = function(){
  }
  s.draw = function(){
    game.context.font = "30px Georgia"
    game.context.fillText('打砖块', (game.canvas.width - 90)/2, game.canvas.height/2)
    game.context.font = "10px Georgia"
    game.context.fillText('点击鼠标或按k开始游戏', (game.canvas.width - 130)/2, (game.canvas.height + 50)/2)
  }
  var titleToMain = function(){
    for (var i in game.status) {
      game.status[i] = false
    }
    game.status.main = true
    var main = Scene(game)
    game.replaceScene(main)
  }
  if (game.status.title) {
    game.registerAction('k', 'K',function(){
      titleToMain()
    })
    window.addEventListener('mousedown', function(event){
      titleToMain()
    })
  }

  return s
}
