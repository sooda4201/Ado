//
const GAME_SPEED=1000/60;

//
const SCREEN_W=180;
const SCREEN_H=320;

//
const CANVAS_W=SCREEN_W*2;
const CANVAS_H=SCREEN_H*2;

//
const FIELD_W=SCREEN_W*2;
const FIELD_H=SCREEN_H*2;

//
let can=document.getElementById("can");
let con=can.getContext("2d");
can.width=CANVAS_W;
can.height=CANVAS_H;

//
let vcan=document.createElement("canvas"); 
let vcon=vcan.getContext("2d");
vcan.width=FIELD_W;
vcan.height=FIELD_H; 

//
const STAR_MAX=300;

//
function rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}

//
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
        vcon.fillStyle=rand(0,2)!=0?"66f":"#8af";
        vcon.fillRect(this.x>>8,this.y>>8,this.sz,this.sz);
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
let star=[];
for(let i=0;i<STAR_MAX;i++)star[i]=new Star();

//
setInterval(gameLoop,GAME_SPEED);

//
function gameLoop()
{
    //移動
    for(let i=0;i<STAR_MAX;i++)star[i].update();

    //描画
    vcon.fillStyle="black";
    vcon.fillRect(0,0,SCREEN_W,SCREEN_H);
    for(let i=0;i<STAR_MAX;i++)star[i].draw();
}