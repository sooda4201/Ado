//ゲームスピード
const GAME_SPEED=1000/60;

//画面サイズ
const SCREEN_W=180;
const SCREEN_H=320;

//キャンバスサイズ
const CANVAS_W=SCREEN_W*2;
const CANVAS_H=SCREEN_H*2;

//フィールドサイズ
const FIELD_W=SCREEN_W*2;
const FIELD_H=SCREEN_H*2;

//カメラの座標
let camera_x=0;
let camera_y=0;

 //星の実体
 let star=[];

//キャンバス
let can=document.getElementById("can");
let con=can.getContext("2d");
can.width=CANVAS_W;
can.height=CANVAS_H;

//仮想画面
let vcan=document.createElement("canvas"); 
let vcon=vcan.getContext("2d");
vcan.width=FIELD_W;
vcan.height=FIELD_H; 

//星の数
const STAR_MAX=300;

//
const image = new Image();
image.src = 'sprite.png';

image.onload = () =>{
    con.drawImaage(image,0,0);
};

//ランダム
function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}

//星クラス
class Star
{
    constructor()
    {
        this.x= rand(0,FIELD_W)<<8;
        this.y= rand(0,FIELD_H)<<8;
        this.vx= 0;
        this.vy= rand(30,200);
        this.sz=rand(1,2);
    }

    draw()
    {
        let x=this.x>>8;
        let y=this.y>>8;
        if(x<camera_x||x>=camera_x+SCREEN_W||
            y<camera_y||y>=camera_y+SCREEN_H
        )return;
        vcon.fillStyle=rand(0,2)!=0?"66f":"#8af";
        vcon.fillRect(x,y,this.sz,this.sz);
    }

    update()
    {
        this.x+=this.vx;
        this.y+=this.vy;
        if(this.y>FIELD_H<<8)
        {
            this.y=0;
            this.x=rand(0,FIELD_W)<<8;
        }
    }
}

//
function gameInit()
{
   
    for(let i=0;i<STAR_MAX;i++)star[i]=new Star();
    //
    setInterval(gameLoop,GAME_SPEED);

}


//
function gameLoop()
{
    //移動
    for(let i=0;i<STAR_MAX;i++)star[i].update();

    //描画
    vcon.fillStyle="black";
    vcon.fillRect(0,0,SCREEN_W,SCREEN_H);
    for(let i=0;i<STAR_MAX;i++)star[i].draw();

    //
    con.drawImage(vcan,camera_x,camera_y,SCREEN_W,SCREEN_H,
    0,0,CANVAS_W,CANVAS_H
    );
}

//
window.onload=function()
{
    gameInit();
}

