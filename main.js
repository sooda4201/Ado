//ゲーム設定
const canvas=
document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

const shipWidth=30;
const shipHeight=30;
let shipX=canvas.width/2-shipWidth/2;
const shipY=canvas.height-shipHeight-10;

let ship=
{
    x: shipX,y:shipY,width:shipWidth,height:shipHeight,dx:0
};
let bullets=[];

//...(イベントリスナー登録)

function keyDownHandler(e)
{
    if(e.key==="Right"||e.key==="ArrowRoght")
    {
        ship.dx=5;
    }else if(e.key==="Left"||e.key==="ArrowLeft")
    {
        ship.dx=-5;
    }
}

function keyUpHandler(e)
{
    if(e.key==="Right"||e.key==="ArrowRight"
        ||e.key==="Lfet"||e.key==="ArrowLeft")
        {
            ship.dx=0;
        }
}

function keyPressHandler(e)
{
    if(e.key===" "||e.key==="Spacebar")
    {
        bullets.push
        ({
            x:ship.x+ship.width/2-2.5,y:ship.y,width:5,height:10,dy:-5});
    }
}