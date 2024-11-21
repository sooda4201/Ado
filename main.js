//デバッグのフラグ
const DEBUG=true;

let drawCount=0;
let fps=0;
let lastTime=Date.now();

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

//
let key=[];

//
document.onkeydown = function(e)
{
    key[e.keyCode]=true;
}

//
document.onkeyup = function(e)
{
    key[e.keyCode]=false;
}

//弾クラス
class Tama
{
    constructor(x,y,vx,vy)
    {
        this.sn = 5;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.kill = false;
    }

    update()
    {
        this.x +=this.vx;
        this.y +=this.vy;

        if(this.x<0||this.x>FIELD_W<<8
            ||this.y<0||this.y>FIELD_H<<8)this.kill = true;
    }

    draw()
    {
        drawSprite(this.sn,this.x,this.y);
    }
}
let tama=[];

//
class Jiki
{
    constructor()
    {
        this.x = (FIELD_W/2)<<8;
        this.y = (FIELD_H/2)<<8;
        this.speed = 512;
        this.anime = 0;
        this.reload=0;
        this.relo2=0;
    }

    //自機の移動
    update()
    {
        if(key[32]&&this.reload==0)
        {
            tama.push(new Tama(this.x+(4<<8),this.y-(10<<8),0,-2000));
            tama.push(new Tama(this.x-(4<<8),this.y-(10<<8),0,-2000));
            tama.push(new Tama(this.x+(8<<8),this.y-(10<<8),80,-2000));
            tama.push(new Tama(this.x-(8<<8),this.y-(10<<8),-80,-2000));

            this.reload=4;
            if(++this.relo2==4)
            {
                this.reload=20;
                this.relo2=0;
            }
        }
        if(!key[32])this.reload=this.relo2=0;
        if(key[37]&&this.x>this.speed)
        {
            this.x -=this.speed;
            if(this.anime>-8)this.anime--;
        }
        else if(key[39]&&this.x<=(FIELD_W<<8)-this.speed)
        {
            this.x +=this.speed;
            if(this.anime<8)this.anime++;
        }
        else
        {
            if(this.anime>0)this.anime--;
            if(this.anime<0)this.anime++;
        }
        if(key[38]&&this.y>this.speed)
            this.y -=this.speed;
        if(key[40]&&this.y<=(FIELD_H<<8)-this.speed)
            this.y +=this.speed;

    }

    draw()
    {
        drawSprite(2+(this.anime>>2),this.x,this.y);
    }
}
let jiki = new Jiki();

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

//自機の描画
const image = new Image();
image.src = 'sprite1.png';

//
class Sprite
{
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

//
let sprite = [
    new Sprite(0,0,22,42),//0,自機,左２
    new Sprite(23,0,33,42),//1,自機,左１
    new Sprite(57,0,43,42),//2,自機,正面
    new Sprite(101,0,33,42),//3,自機,右１
    new Sprite(135,0,21,42),//4,自機,右２

    new Sprite(0,50,3,7),//５,弾１
    new Sprite(4,50,5,5),//６,弾２

    new Sprite(3,42,16,5),//7,噴射　左２
    new Sprite(29,42,21,5),//8,噴射　左１
    new Sprite(69,42,19,5),//9,噴射　正面
    new Sprite(108,42,21,5),//10,噴射　右１
    new Sprite(138,42,16,5),//11,噴射　右２

    new Sprite(11,50,7,7),//12　敵弾1-1
    new Sprite(19,50,7,7),//13　敵弾1-2
    new Sprite(32,42,8,8),//14　敵弾2-1
    new Sprite(42,42,12,12),//15　敵弾2-2

    new Sprite(3,42,16,5),//16 爆発1
    new Sprite(3,42,16,5),//17 爆発2
    new Sprite(3,42,16,5),//18 爆発3
    new Sprite(3,42,16,5),//19 爆発4
    new Sprite(3,42,16,5),//20 爆発5
    new Sprite(3,42,16,5),//21 爆発6
    new Sprite(3,42,16,5),//22 爆発7
    new Sprite(3,42,16,5),//23 爆発8
    new Sprite(3,42,16,5),//24 爆発9
    new Sprite(3,42,16,5),//25 爆発10
    new Sprite(3,42,16,5),//26 爆発11

    new Sprite(3,42,16,5),//27　ヒット1
    new Sprite(3,42,16,5),//28　ヒット2
    new Sprite(3,42,16,5),//29　ヒット3
    new Sprite(3,42,16,5),//30　ヒット4
    new Sprite(3,42,16,5),//31　ヒット5

    new Sprite(3,42,16,5),//32 黄色1
    new Sprite(3,42,16,5),//33 黄色2
    new Sprite(3,42,16,5),//34 黄色3
    new Sprite(3,42,16,5),//35 黄色4
    new Sprite(3,42,16,5),//36 黄色5
    new Sprite(3,42,16,5),//37 黄色6

    new Sprite(3,42,16,5),//38 ピンク1
    new Sprite(3,42,16,5),//39 ピンク2
    new Sprite(3,42,16,5),//40 ピンク3
    new Sprite(3,42,16,5),//41 ピンク4
    new Sprite(3,42,16,5),//42 ピンク5
    new Sprite(3,42,16,5),//43 ピンク6

    new Sprite(3,42,16,5),//44 青グラサン1
    new Sprite(3,42,16,5),//45 青グラサン2
    new Sprite(3,42,16,5),//46 青グラサン3
    new Sprite(3,42,16,5),//47 青グラサン4
    new Sprite(3,42,16,5),//48 青グラサン5
    new Sprite(3,42,16,5),//49 青グラサン6

    new Sprite(3,42,16,5),//50 ロボ1　
    new Sprite(3,42,16,5),//51 ロボ2
    new Sprite(3,42,16,5),//52 ロボ3
    new Sprite(3,42,16,5),//53 ロボ4
    new Sprite(3,42,16,5),//54 ロボ5
    new Sprite(3,42,16,5),//55 ロボ6

    new Sprite(3,42,16,5),//56 ニワトリ1
    new Sprite(3,42,16,5),//57 ニワトリ2
    new Sprite(3,42,16,5),//58 ニワトリ3
    new Sprite(3,42,16,5),//59 ニワトリ4
    new Sprite(3,42,16,5),//60 ニワトリ5
    new Sprite(3,42,16,5),//61 ニワトリ6

    new Sprite(3,42,16,5),//62 たまご1
    new Sprite(3,42,16,5),//63 たまご2
    new Sprite(3,42,16,5),//64 たまご3
    new Sprite(3,42,16,5),//65 たまご4
    new Sprite(3,42,16,5),//66 たまご5

    new Sprite(3,42,16,5),//67　
    new Sprite(3,42,16,5),//68
    new Sprite(3,42,16,5),//69
    new Sprite(3,42,16,5),//70
    new Sprite(3,42,16,5),//71

    new Sprite(3,42,16,5),//72 黄色（中）
    new Sprite(3,42,16,5),//73　ピンク（中）
    new Sprite(3,42,16,5),//74　青グラサン（中）

    new Sprite(3,42,16,5),//75　黄色（大）
    new Sprite(3,42,16,5),//76　ピンク（大）
    new Sprite(3,42,16,5),//77　青グラサン（大）


];

//
function drawSprite(snum,x,y)
{
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;
    
    let px = (x>>8) - sw/2;
    let py = (y>>8) - sh/2;

    if(px+sw/2<camera_x||px-sw/2>=camera_x+SCREEN_W
        ||py<camera_y||py>=camera_y+SCREEN_H)return;

    vcon.drawImage(image,sx,sy,sw,sh,px,py,sw,sh);
}

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


//ゲームループ
//
function gameLoop()
{
    //
    for (let i = 0; i < STAR_MAX; i++) star[i].update();
    for (let i =tama.length-1;i>=0;i--) 
    {
        tama[i].update();
        if(tama[i].kill)tama.splice(i,1);
    }
    jiki.update();
    //
    vcon.fillStyle = "black";
    vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);

    for (let i = 0; i < STAR_MAX; i++) star[i].draw();
    for(let i=0;i<tama.length;i++)tama[i].draw();
    jiki.draw();

    //自機の範囲　0~
    //カメラの範囲 0~
    camera_x = (jiki.x>>8)/FIELD_W*(FIELD_W-SCREEN_W);
    camera_y = (jiki.y>>8)/FIELD_H*(FIELD_H-SCREEN_H);
    //
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);
    
    if(DEBUG)
    {
        drawCount++;
        if(lastTime+1000<=Date.now())
        {
            fps=drawCount;
            drawCount=0;
            lastTime=Date.now();
        }
        con.font="20px 'Impact'";
        con.fillStyle="white";
        con.fillText("FPS:"+fps,20,20);
        con.fillText("Tama:"+tama.length,20,20);
    }
}

//
window.onload = function()
{
    gameInit();
}

