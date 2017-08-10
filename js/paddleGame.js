var PaddleGame = function(fps, images){
  // images是一个对象，里边是图片的引用名字和路径
  var timer = null
  var g = {
    actions: {},
    keydowns: {},
    images: {},
    status: {
      paused: false
    },
    score: 0
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
  g.registerAction = function(key,callback){           // 用次函数注册的按键，按下后会一直执行callback，可以传多个key
    if (arguments.length === 2) {
      g.actions[key] = callback
    } else if (arguments.length > 2) {
      for (let i = 0,j = arguments.length; i < j-1; i++) {
        g.actions[arguments[i]] = arguments[j-1]
      }
    }
  }
  g.runloop = function(){
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
    timer = setTimeout(function(){
      g.runloop()
    },1000/fps)
  }
  // 预先加载所以图片
  var loads = []
  var names = Object.keys(images)
  for (var i = 0; i < names.length; i++) {
    let name = names[i]
    var path = images[name]
    let img = new Image()
    img.src = path
    img.onload = function(){
      g.images[name] = img
      // 所以图片加载完后，调用run()
      loads.push(1)
      if (loads.length === names.length) {
        g.run()
      }
    }
  }
  // 程序开始运行
  g.run = function(){
    timer = setTimeout(function(){
      g.runloop()
    },1000/fps)
  }
  g.gameOver = function(){
    clearTimeout(timer)
  }
  return g
}
