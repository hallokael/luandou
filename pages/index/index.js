//index.js
//获取应用实例
const app = getApp()
const ctx = wx.createCanvasContext('canvas1')
const ctx2 = wx.createCanvasContext('canvas2')
const ctx3 = wx.createCanvasContext('canvas3')
var Cx = 155, Cy = 345, Vx = 0, Vy = 0, R = 45, x = 15, y = 15, r = 15, r1 = 25, Cx1 = 255, Cy1 = 65,ok=0,saveX=10,saveY=10
var Cx2=155,Cy2=65,r2=25
var BoomR=50
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    Vx:0,
    Vy:0,
    Cx:65,
    Cy:445,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  RectCheck:function(x,y,x1,y1,Rr){
    if((x-x1)*(x-x1)+(y-y1)*(y-y1)<=Rr*Rr){
      console.log('true')
      return true
    }
    else return false
  },
  rangeCalc:function(Px,Py,x1,y1,Rr){
    return Math.sqrt(((Px-x1)*(Px-x1)+(Py-y1)*(Py-y1))/(Rr*Rr))
  },
  onLoad: function () {
    var temp = 'http://593951.freep.cn/593951/2222.png'
    wx.saveFile({
      tempFilePath: temp[0],
      success: function (res) {
        console.log(res.savedFilePath)
        var savedFilePath = res.savedFilePath
      }
    })

    ctx.drawImage('http://593951.freep.cn/593951/2222.png', x-r, y-r, 2*r, 2*r)
    ctx.draw()
    ctx2.drawImage('http://593951.freep.cn/593951/2222.png', Cx-R, Cy-R, 2*R, 2*R)
    ctx2.drawImage('http://593951.freep.cn/593951/2222.png', Cx1-r1, Cy1-r1, 2*r1, 2*r1)
    ctx2.drawImage('http://593951.freep.cn/593951/2222.png', Cx2 - r2, Cy2 - r2, 2 * r2, 2 * r2)
    ctx2.draw()
    this.update()
  },
  update:function(){
    this.ball_run(Vx/15,Vy/15)
    // console.log("add")
    ctx.drawImage('http://593951.freep.cn/593951/2222.png', x - r, y - r, 2 * r, 2 * r)
    ctx.draw()
    // console.log(x,y)
    var that = this
    setTimeout(function () {
     // console.log("asd")
      that.update();
    }, 10);
  },
  ball_run:function(vx,vy){
    // console.log(vx,vy)
    x=x+vx
    if(x<r)
      x=r
    if(x>300-r)
      x=300-r
    y=y+vy
    if (y < r)
      y = r
    if (y > 500 - r)
      y = 500 - r   
  },
  ball_attack:function(xx,yy,kind){
    if(kind==1){
      ctx3.drawImage('http://593951.freep.cn/593951/2222.png', xx - BoomR, yy - BoomR, 2 * BoomR, 2 * BoomR)
      ctx3.draw()
      setTimeout(function () {
        // console.log("asd")
        ctx3.draw()
      }, 200);
    }else if (kind==2){
      
    }

  },
  start: function (e) {
    console.log(">>" + e.touches[0].x ,e.touches[0].y)
    if (this.RectCheck(e.touches[0].x, e.touches[0].y,Cx,Cy,R)){
      Vx=e.touches[0].x - Cx
      Vy=e.touches[0].y - Cy
    }
    else if (this.RectCheck(e.touches[0].x, e.touches[0].y,Cx1,Cy1,r1)){
      let a,b;
      if(Vx==0&& Vy==0)
        a=saveX,b=saveY;
      else
        a=Vx,b=Vy
      let ra = this.rangeCalc(a,b, 0, 0, 80)
      this.ball_run(a/ra,b/ra)
      console.log("??",x,y)
    } else if (this.RectCheck(e.touches[0].x, e.touches[0].y, Cx2, Cy2, r2)){
      this.ball_attack(x,y,1)
      console.log("!!", x, y)
    }
  },
  move: function (e) {
    if (e.touches[0].y<200)
      return
    if (this.RectCheck(e.touches[0].x, e.touches[0].y,Cx,Cy,R)) {
      Vx=e.touches[0].x - Cx
      Vy=e.touches[0].y - Cy
      // console.log(e.touches[0].x)
      }else{
        let ra=this.rangeCalc(e.touches[0].x, e.touches[0].y,Cx,Cy,R)
        console.log(ra)
        Vx = (e.touches[0].x - Cx)/ra
        Vy = (e.touches[0].y - Cy)/ra
      }
  },
  end: function (e) {
    if(Vx!=0||Vy!=0){
      saveX = Vx
      saveY = Vy
    }
    Vx=0
    Vy=0
  },
})
