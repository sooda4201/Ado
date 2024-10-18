//ゲーム設定
const canvas=document.getElementById("gameCanvas");
const ctx=canvas.getContext("2d");

const shipWidth=30;
const shipHeight=30;
let shipX=canvas.width/2-shipWidth/2;
const shipY=canvas.height-shipHeight-10;

//自機操作
let ship={x: shipX,y:shipY,width:shipWidth,height:shipHeight,dx:0};

//弾丸発射
let bullets=[];

//出現する敵の情報
let enemies=[];

//ゲームのスコアの保持
let score=0;

//イベントリスナー登録
document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);
document.addEventListener("keypress",keyPressHandler);


//キーボードのキーを押した時と離した時の自機の動き
 

function keyUpHandler(e)
{
    if(e.key==="Right"||e.key==="ArrowRight"
        ||e.key==="Left"||e.key==="ArrowLeft")
        {
            ship.dx=0;
        }
}

//スペースキーを押したときに弾丸を発射
function keyPressHandler(e)
{
    if(e.key===" "||e.key==="Spacebar")
    {
        bullets.push
        ({ x:ship.x+ship.width/2-2.5,y:ship.y,width:5,height:10,dy:-5});
    }
}

//自機の描画
function drawShip()
{
    ctx.fillStyle="#0095DD";
    ctx.fillRect(ship.x,ship.y,ship.width,ship.height);
}

//弾丸の描画
function drawBullets()
{
    ctx.fillStyle="#FF0000";
    bullets.forEach((bullet,index)=>{
        ctx.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
        bullet.y += bullet.dy;
        if(bullet.y<0)
        {
            bullets.splice(index,1);
        }
    });
}

//敵の描画
function drawEnemies()
{
    ctx.fillStyle="#00FF00";
    enemies.forEach((enemy,index)=>
    {
        ctx.fillRect(enemy.x,enemy.y,enemy.width,enemy.height);
        enemy.y+=enemy.dy;
        if(enemy.y>canvas.height)
        {
            enemies.splice(index,1);
            score--;
        }
    });
}

//ランダムに敵を出現
function createEnemies()
{
    if(Math.random()<0.02)
        {
            let enemyX=Math.random()*(canvas.width-30);

            enemies.push({ x:enemyX,y:0,width:30,height:30,dy:2});
        }
}

//当たり判定
function detectCollisions()
{
    bullets,forEach((bullet,bulletIndex)=>
    {
        enemies.forEach((enemy,enemyIndex)=>
        {
            if(
                bullet.x<enemy.x+enemy.width&&
                bullet.x+bullet.width>enemy.x&&
                bullet.y<enemy.y+enemy.height&&
                bullet.y+bullet.height>enemy.y
            ){
                bullets.splice(bulletIndex,1);
                enemies.splice(enemyIndex,1);
                score++;
            }
        });
    });
}


//ゲームループ
function update()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ship.x+=ship.dx;
    if(ship.x<0)ship.x=0;
    if(ship.x+ship.width>canvas.width)ship.x=
    canvas.width-ship.width;

    drawShip();
    drawBullets();
    drawEnemies();
    createEnemies();
    detectCollisions();

    requestAnimationFrame(update);
}

//ゲーム開始
document.addEventListener("DOMContentLoaded",(event)=>
{
    update();
});