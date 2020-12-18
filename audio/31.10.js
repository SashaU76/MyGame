const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

// Audio
var audioshot = new Audio();
var main = new Audio();
var Zombie = new Audio();
 audioshot.src ="audio/gun6.mp3";
 main.src ="audio/кафка 8 бит.mp3";
 Zombie.src ="audio/death.mp3"
//звуки смерти
var death1 = new Audio();
var death2 = new Audio();
var death3 = new Audio();
var death4 = new Audio();
var death5 = new Audio();
death1.src ="audio/death1.mp3"
death2.src ="audio/death2.mp3"
death3.src ="audio/death3.mp3"
death4.src ="audio/death4.mp3"
death5.src ="audio/death5.mp3"
var deathsounds = [death1, death2, death3, death4, death5, Zombie];
//условия удаления моба
let collisian= false;
let explousionAnimate= false;

// Рисуем фрагмент
//function draw() {
 // ctx.drawImage(document.getElementById('source'),
 //               73, 71, 104, 124, 21, 20, 87, 104);
// Рисуем фрагмент

const keys = [];
//money/ammo
let storage = [500,100]; 

/* let storage_str = JSON.stringify(storage);
localStorage.setItem("MyObj", storage_str);
let s_destr = localStorage.getItem("MyObj");
s_destr =  JSON.parse(s_destr);
console.log(s_destr+'proeb'); */
document.getElementById("money").innerHTML = storage[0];
document.getElementById("ammonition").innerHTML = storage[1];

// расчет стоимости в шопе
        let guncost = 0;
        let confirmbuygun;

let cantMove = false;// находимся ли мы в магазине
let goFurther=false; // можем ли двигатся далее
function resetcost(){
    guncost = 0
}

function buygun(){
            if (player.haveGun == false){
                player.haveGun = true;
                guncost = 400;
            }
}
function cost() {
        var val = document.getElementById('quantity').value;
        var gun = document.getElementById('gun');
       
		document.getElementById('str').innerHTML="Cost: "+((val*10)+guncost) +"$";
};
   
function ammo(){
    let val = document.getElementById('quantity').value;
    val = Number(val);
    if (player.haveGun == true) confirmbuygun=true;

    if((val*10+guncost)<=storage[0]){

    storage[1] += val;
    storage[0] -= (val*10+guncost);


    //player.y +=30;
    console.log(storage[1]+"стало патронов");
    console.log(storage[0]+"стало денег");
    document.getElementById("money").innerHTML = storage[0];
    document.getElementById("ammonition").innerHTML = storage[1];
toggle()
    } else {
    toggle2()
    }
    
}





// Player set
const player = {
    x: 400,
    y: 200,
    width: 32,
    height: 48,
    frameX: 1,
    frameY: 1,
    speed: 9,
    moving: false,
    haveGun: false
};

const playerSprite = new Image();
playerSprite.src = "henryjones.png";
const background = new Image();
background.src = "img/map.jpg";
const mobSprite = new Image();
mobSprite.src = "img/Cuphead2.png";
const explSprite = new Image();
explSprite.src = "img/explosion.png";
const smokeSprite = new Image();
smokeSprite.src = "img/vzrivi.png";
const fence = new Image();
fence.src="/img/fenceold.png";
const fence1 = new Image();
fence1.src="/img/fenceold.png";
const fence3 = new Image();
fence3.src="/img/fenceold3.png";
const cowSprite = new Image();
cowSprite.src = "/img/Cow.png";
const tree = new Image();
tree.src = "/img/klipartz.com (2).png";

//Параметры мобов
const mobAct = ['up', 'top right', 'right', 'down right', 'down'];
const numberofcharacters = 5;
const characters = [];
let action1 = mobAct[Math.floor(Math.random() * mobAct.length)];
let mobsNumber=0;
class Mobs {
    constructor(){
        this.width = 103.0625;
        this.height = 113.125;
        this.frameX = 3;
        this.number=mobsNumber++
                                                //min + Math.random() * (max - min);
        this.x = 500  //-5+Math.random() * (800 + 5);       // Math.random() * canvas.width - this.width;
        this.y = 160+Math.random()*(545-140);       //Math.random() * canvas.height - this.height;
        this.speed = (Math.random() * 1.2) + 2.5;
        this.minFrame = 0;
        this.action = mobAct[Math.floor(Math.random() * mobAct.length)];
        if (this.action === 'up') {
            this.frameY = 0; 
            this.minFrame = 4;
            this.maxFrame = 15;
        }
        else if (this.action === 'top left') {
            this.frameY = 1; 
            this.minFrame = 4;
            this.maxFrame = 14;
        }
        else if (this.action === 'left') {
            this.frameY = 3; 
            this.minFrame = 3;
            this.maxFrame = 13;
        } 
        /* else if (this.action === 'down right') {
            this.frameY = 4;
            this.minFrame = 4;
            this.maxFrame = 15;
        } 
        else if (this.action === 'down') {
            this.frameY = 6;
            this.minFrame = 0;
            this.maxFrame = 12;
        }
        else if (this.action === 'jump') {
            this.minFrame = 0;
            this.frameY = 7; 
            this.maxFrame = 9;
        } */
    }
    draw(){
        drawSprite(mobSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height,  this.x, this.y, this.width * 0.38, this.height * 0.38,);
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
    }
    update(){
        if(cantMove==false){
            
            if (this.x>223 && this.y>250){
                this.y-=this.speed
                this.x-=this.speed
                this.action = 'top left'
                this.frameY = 1; 
                this.minFrame = 4;
                this.maxFrame = 14;
            }
            else {
                if (this.y>250){
                this.y-=this.speed
                }  
                if (this.x>223){
                this.action = 'left'
                this.frameY = 3; 
                this.minFrame = 3;
                this.maxFrame = 13;
                this.x-=this.speed
                }  
            }
            
            
            
            /* if (this.action === 'up') {
                if (this.y < 0 - (this.height * 5)) {
                    this.y = canvas.height + this.height;
                    this.x = Math.random() * canvas.width;
                    this.speed = (Math.random() * 2) + 3;
                } 
                else {this.y -= this.speed;}
            }
            else if (this.action === 'top right') {
                if (this.y < 0 - this.height && this.x > canvas.width + this.width) {
                    this.y = canvas.height + this.height
                    this.x = Math.random() * canvas.width;
                    this.speed = (Math.random() * 2) + 3;
                    } 
                else {
                    this.y -= this.speed; 
                    this.x += this.speed; 
                    }
                }
            else if(this.action === 'right'){
                if (this.x > canvas.width + (this.width * 5)) {
                    this.x = 0 - this.width;
                    this.y = Math.random() * canvas.height;
                    this.speed = (Math.random() * 2) + 3;
                }
                else {
                    this.x += this.speed;
                }
            } 
            else if (this.action === 'down right') {
                if (this.y > canvas.height + this.height && this.x > canvas.width + this.width) {
                    this.y = 0 - this.height
                    this.x = Math.random() * canvas.width;
                    this.speed = (Math.random() * 2) + 3;
                } 
                else {
                    this.y += this.speed; 
                    this.x += this.speed; 
                }
            } 
            else if (this.action === 'down') {
                if (this.y > canvas.height + (this.height * 5)) {
                    this.y = 0 - this.height;
                    this.x = Math.random() * canvas.width;
                    this.speed = (Math.random() * 2) + 3;
                } 
                else {this.y += this.speed}
            } */
        }
    }
    /* CollisionsWithFence(){
        
            if(this.x <= 230){
                //elementId=characters.indexOf(element);
                //shotings();
                console.log('удаляю чела №'+this.number+"    "+this.x)
                characters.splice(this.i,1);
                return
            }

        
    } */
}




function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}



window.addEventListener("keydown", function(e){
     keys[e.keyCode] = true;
     player.moving = true;
    
});
window.addEventListener("keyup", function(e){
    delete keys[e.keyCode];
    player.moving = false;
});
// ввели вектор стрельбы
let vector
function movePlayer(){
    (player.x >630 && player.y<83) ? goFurther=false : goFurther=true
    if(keys[39] &&  keys[40] && goFurther==true){
        player.x += player.speed;
        player.y += player.speed;
        player.frameY=0;
        player.moving = true;
        vector = "downright";
    }
else if (keys[37] &&  keys[40] ){
        player.x -= player.speed;
        player.y += player.speed;
        player.frameY=1;
        player.moving = true;
        vector = "downleft";
    }
    else if(keys[38] &&  keys[39] && goFurther==true ){
        player.x += player.speed;
        player.y -= player.speed;
        player.frameY=2;
        player.moving = true;
        vector = "upright";
    }
    else if(keys[37] &&  keys[38] && goFurther==true){
        player.x -= player.speed;
        player.y -= player.speed;
        player.frameY=3;
        player.moving = true;
        vector = "upleft";
    }
    else if(keys[38] && player.y > 10 && goFurther==true){
        player.y -= player.speed;
        player.frameY=3;
        player.moving = true;
        vector = "up";
        
    }
    else if(keys[37] && player.x > 10){
        player.x -= player.speed;
        player.frameY=1;
        player.moving = true;
        vector = "left";
    }
    else if(keys[40] && player. y < canvas.height - player.height){
        player.y += player.speed;
        player.frameY=0;
        player.moving = true;
        vector = "down";
    }
    else if(keys[39] && player. x < canvas.width - player.width && goFurther==true){
        player.x += player.speed;
        player.frameY=2;
        player.moving = true;
        vector = "right";
    }
    
    //if(keys[32]){
    //    shot();
    //}
}
// анимация ходьбы
function handlePlayerFrame(){
    if(player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0;
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
 ctx.drawImage(document.getElementById('store'),
                305, 260, 155, 220, 645, -10, 130, 215);//магазин
                ctx.drawImage(document.getElementById('store'),
                255, 0, 180, 113, 50, -10, 140, 120);//амбар

//забор
//console.log(player.x+"x" + player.y+"y")
ctx.drawImage(document.getElementById('fence'),
                360, 40, 400, 844, 220, 160, 110, 200);
ctx.drawImage(fence, 0, 0, 649, 384, 115, 308, 649*0.17, 384*0.09);
ctx.drawImage(fence1, 0, 0, 649, 384, 3, 310, 649*0.17, 384*0.09);
ctx.drawImage(fence3, 100, 0, 60, 844, 248, 0, 5, 200);
// дерево

ctx.drawImage(tree, 0, 0, 473, 542, 170, 0, 473*0.25, 542*0.25);
ctx.drawImage(tree, 0, 0, 473, 542, -45, -30, 473*0.25, 542*0.25);
                //ctx.fillRect(50,50,6,3);
                for (i=0; i< Bullets.length;i++){
                Bullets[i].draw1();
                Bullets[i].moveBullet();
                Bullets[i].Collisions();
                if(Bullets[i])Bullets[i].delBullet();
                
                }

                //for (i = 0; i < numberofcharacters; i++){
                if(characters.length < numberofcharacters) characters.push(new Mobs());
                //}

    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,  player.x, player.y, player.width*0.7, player.height*0.7,);
    
    for (i = 0; i < characters.length; i++){
    characters[i].draw();
    characters[i].update();
    /* characters[i].CollisionsWithFence(); */
    }
    /* for (i = 0; i < Cows.length; i++){
    Cows[i].draw2();
    Cows[i].update();
    } */
    var blur = document.getElementById('blur');
    blur.classList.contains('active') ? cantMove= true : cantMove= false;
    if (player.x == 715 && player.y <= 75 && cantMove == false) shope();
    if(cantMove==false){movePlayer()}
    //fug();
    //delMob();
    handlePlayerFrame();
    ammoNull();// красим счетчик пуль
    cost()// считаем стоимостт в шопе
        }
}
startAnimating(13);

// invoke Shope menu
function shope(){
    var blur = document.getElementById('blur');
        blur.classList.toggle('active');
        player.y +=30;

}
//modal box hidden/visible
function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    //player.y +=30;
    if(player.haveGun==true && confirmbuygun !== true) {
        player.haveGun=false;
        guncost = 0;
    }
    if (player.haveGun==true) { 
            guncost = 0;
                var nogun = document.getElementById('gun');
                var nogun2 = document.getElementById('gunimg');
                nogun.classList.add('blur');
                nogun2.classList.add('blur');
                document.getElementById('gunmult').style.visibility= 'visible';
            }
    //
    
}

// Второе всплывающее окно(nomoney)
function toggle2(){
    var nomoneyimg = document.getElementById('nomoneyimg');
    nomoneyimg.classList.toggle('active')
};

// Выстрелы!

const bullets_max = 6;
const bullet_speed = 5; //pixels per sec

let Bullets= [];


class bullet  {
    constructor(vector){
    this.x = player.x+15;
    this.y = player.y+20;
    this.speed=10;
  this.color = "#00A";
  this.vectorBullet = vector;
  //this.number = this.index;

    };
    draw1() {
    canvas.fillStyle = this.color;
    
    ctx.fillRect(this.x,this.y,4,4);
    };
  
    moveBullet() {
    if(this.vectorBullet === "up")
       this.y-=this.speed*2;
       
    if(this.vectorBullet === "down")
       this.y+=this.speed*2;
    if(this.vectorBullet === "left")
       this.x-=this.speed*2;
    if(this.vectorBullet === "right")
       this.x+=this.speed*2;
    if(this.vectorBullet === "downleft"){
       this.x-=this.speed;
       this.y+=this.speed;
    }
    if(this.vectorBullet === "upright"){
       this.x+=this.speed;
       this.y-=this.speed;
      
    }
    if(this.vectorBullet === "upleft"){
       this.x-=this.speed;
       this.y-=this.speed;
       //console.log('upleft');
    }
    if(this.vectorBullet === "downright"){
       this.x+=this.speed;
       this.y+=this.speed;
       
    }
    
    };
        delBullet () {
        if(Bullets[i].x){
            if (this.x>canvas.width || this.y>canvas.height || this.x<0 || this.y<0){
                //console.log(i+" наша и");
                Bullets.splice(i,1); 

                let time=new Date();
                time.getSeconds();
                //console.log('pulia udalena'+ i + " время: " +time.getSeconds());
            }
        }
    }
      //                                     Collisions! (with bullets)
        Collisions(){
        characters.forEach(element => {
            if(Bullets[i]){
                if (element.x < Bullets[i].x && Bullets[i].x < element.x + 51) {
                    if (element.y + 57 > Bullets[i].y && Bullets[i].y > element.y){
                        elementId=characters.indexOf(element);
                        console.log(element.number+';kjklmdksfsd');
                        console.log(elementId);
                        //console.log('вызываем функцию отрисовки взрыва и удаляем пулю+ element№'+elementId);
                        //console.log(element.number);
                        deathsounds[Math.floor(Math.random() * deathsounds.length)].play();
                        shotings();// this animation
                        //collisian = true;
                        Bullets.splice(i,1);
                        return;
                    }
                }
            }
        });
        } 
}
let elementId // эта переменная содержит индекс моба который столкнулся с пулей

//переменные для регулирования скорости отрисовки
let now2, then2;
then2=Number.MAX_SAFE_INTEGER;
now2=1;
//функция shotings отвечает за отрисовку взрыва
function shotings() {
    //console.log(then2);
    //console.log(now2);
    if(then2-now2 >= 30){
        //console.log(this)
        console.log('отрисовка взрыва и чел №  '+elementId)
        drawSprite(explSprite, explousion.width*explousion.frameX, explousion.height*explousion.frameY, explousion.width, explousion.height, characters[elementId].x-6, characters[elementId].y-6, explousion.width*0.7,explousion.height*0.7); 
        characters[elementId].speed=0;
        if(explousion.frameX<explousion.maxFrame) {
        explousion.frameX++;
        
        now2=Date.now();
        }
        if (explousion.frameX > 6){ 
            
            explousion.frameX=0, explousion.frameY =1; 
        }
        if(explousion.frameX==6 && explousion.frameY ==1){
            characters.splice(elementId,1);
            console.log('убиваем человечка № '+elementId);
            explousion.frameX= 0; explousion.frameY= 0;
            return; 
            }  
        } 
            then2=Date.now();
requestAnimationFrame(shotings);
} 


//  Моя бездонная копилка в пустоте (Explousions)
let explousion = {
    x: 0,
    y: 0,
    width: 66,
    height: 64,
    frameX: 0,
    frameY: 0,
    maxFrame: 12,
}
let smoke = {
    x: 723,
    y: 172,
    width: 65,
    height: 65,
    frameX: 0,
    minFrame: 0,
    maxFrame: 4,
}
  function fug() {
     
drawSprite(smokeSprite, smoke.x+smoke.width*smoke.frameX, smoke.y, smoke.width, smoke.height, player.x, player.y+5, smoke.width*0.5, smoke.height*0.5); 
/* smoke.frameX=1; */
 if (smoke.frameX < smoke.maxFrame) smoke.frameX++;
     else {smoke.frameX = smoke.minFrame; return;}
requestAnimationFrame(fug);
    


}  




    // ПАТРИАРХАЛЬНАЯ СВАЛКА УСТАРЕВШИХ ПОНЯТИЙ
    


function shot(e){

   /*  let tempo = localStorage.getItem("MyObj");//получаем из локал сторидж колво патронов
    tempo =  JSON.parse(tempo);
    console.log(tempo[1]+" то что ты ищешь"); */
switch (e.keyCode) {
                case 32:  // если нажата клавиша пробел
                    if (storage[1] > 0 /* && player.haveGun == true */){
                        Bullets.push(new bullet(vector));
                        storage[1]--;
                        audioshot.play();
                        fug();
                        
                        /* let ammominus=[tempo[0],tempo[1]-1];
                        let ammominus_str = JSON.stringify(ammominus);
                        localStorage.setItem('MyObj',ammominus_str); */

                        
                        document.getElementById("ammonition").innerHTML = storage[1];
                        //console.log(ammominus);                       
                    break;
                    }
}}
addEventListener("keydown", shot);


function ammoNull(){
    var ammonull = document.getElementById('ammonition');
    if(storage[1] == 0) {
                        
                        ammonull.style.color='red';
                        ammonull.style.fontWeight='bolder';
                    }
    else{
        ammonull.style.color='black';
        ammonull.style.fontWeight='normal';
    }
};
    
// делаем коров

Cows=[];
numberofcows = 8;
cowAct=['up','down','right','left', 'upEat','downEat','rigthEat', 'leftEat'];
let eating;

let now3, then3;
then3=Number.MAX_SAFE_INTEGER;
now3=1;
let then4=Number.MAX_SAFE_INTEGER;
let now4=1;

let now6=1;


class Cow {
    constructor(){
        this.randomValue=(Math.floor((Math.random())*13000))+2000;
        this.width = 128;
        this.height =128;
        this.frameX = 0;
        this.frameY = 0;
        this.x =  10+this.randomValue*0.01;
        this.y = 100+this.randomValue*0.01;
        this.eating = false;
        this.speed = 0.25;
        this.number=i;
        this.now4=1;
        this.now5=1;
        
        //this.minFrame = 0;
        this.action = cowAct[Math.floor(Math.random() * cowAct.length)];
            if (this.action === 'up') {
                this.frameY = 4;                
            }
            else if (this.action === 'down') {
                this.frameY = 6;                 
            }
            else if (this.action === 'right') {
                this.frameY = 7;                 
            }
            else if (this.action === 'left') {
                this.frameY = 5;                 
            }
            else if (this.action === 'upEat') {
                this.frameY = 0;                 
            }
            else if (this.action === 'downEat') {
                this.frameY = 2;                 
            }
            else if (this.action === 'rigthEat') {
                this.frameY = 3;                 
            }
            else if (this.action === 'leftEat') {
                this.frameY = 1;                 
            }
    }
    
    draw2(){
        then4=Date.now();
        //if(then3-now3 >= 30){
            //console.log(now3+' dfsfsdf');
            //var then3 = animate2.getAttribute(then3);
            drawSprite(cowSprite, this.width*this.frameX, this.height*this.frameY, this.width, this.height,  this.x, this.y, this.width*0.6, this.height*0.6);
            if(then4-now6 >= 500 && this.eating ==true){
                if (this.frameX < 3) {
                    //console.log(this.number +' едим');
                    this.frameX++;
                    
                    now6=Date.now();
                }
                else {
                this.frameX = 0;
                    return
                }
            } 
            let b=this.number;
            let a=-1;
            //console.log(b + ' b на входе')
            if(then4-this.now4 >= 160 && this.eating ==false && b!=a){
                if (this.frameX < 3 ) {
                    //console.log("корова с индексом "+this.number +' сменила фрейм ходьбы');
                    this.frameX++;
                    a=this.number;
                    //console.log(a + ' a на выходе')
                    this.now4=Date.now();
                    
                    return
                }
                else {
                this.frameX = 0;
                    return
                }
            } 
            
    }
    
    
    update(){
        if(Cows[i].checkBox()){
            setTimeout(() => {
                now3=Date.now();
            }, 0);
            
            //console.log(Cows[i].checkBox())
            if (this.action === 'up') {
                this.eating = false;
                this.frameY = 4;
                this.y -= this.speed;                               
            }
            else if (this.action === 'down') {
                this.eating = false;
                this.frameY = 6; 
                this.y += this.speed;
            }
            else if (this.action === 'right') {
                this.eating = false;
                this.frameY = 7;
                this.x += this.speed;
            }
            else if (this.action === 'left') {
                this.eating = false;
                this.frameY = 5;
                this.x -= this.speed;
            }
            else if (this.action === 'upEat') {
                this.frameY = 0;  
                this.eating = true;
                //if (this.frameX < 3) this.frameX++;
                
            }
            else if (this.action === 'downEat') {
                this.frameY = 2; 
                this.eating = true;
                //if (this.frameX < 3) this.frameX++;
                
            }
            else if (this.action === 'rightEat') {
                this.frameY = 3;  
                this.eating = true;
                //if (this.frameX < 3) this.frameX++;
                
            }
            else if (this.action === 'leftEat') {
                this.frameY = 1;  
                this.eating = true;
                //if (this.frameX < 3) this.frameX++;
                //console.log(this.frameX);
                
            }
        }
    }

    checkBox(){
        let flag=false
        if (this.y > 70 && this.y < 255 && this.x >-10 && this.x <180){
            flag=true
        }
        else {
            if (this.action === 'up') {this.y +=5; this.action='upEat';}
            
            if (this.action === 'down'){ this.y -=5; this.action='downEat';} 
            
            if (this.action === 'right'){ this.x -=5; this.action='rightEat';}
            
            if (this.action === 'left'){ this.x +=5; this.action='leftEat';}
            
        }
        return flag
    }
    cowsActions(){
        if(Date.now() > this.now5 + this.randomValue){
            //console.log(this.number + "меняет направление")
                this.now5 =Date.now();
        this.action = cowAct[Math.floor(Math.random() * cowAct.length)];
        }            
    }
    /* clashOfCows(){
        let result = Cows.find((Cow) => {
            if(Cow.number!=this.number){
                if(Cow.x< this.x && this.x<Cow.x+this.width*0.3){
                    if(Cow.y + this.height*0.3 > this.y && this.y > Cow.y){
                    }
                        console.log("clash of cows")
                        return
                    }
                }
            }
        }
    } */
}


for (i = 0; i < numberofcows; i++){
        Cows.push(new Cow());
    };
    animate2();
function animate2(){
    then3=Date.now();
    requestAnimationFrame(animate2);
    //console.log(then3 +'then');
    //console.log(now3 + 'now');
        if(then3-now3 >= 8){
            for (i = 0; i < Cows.length; i++){
                //now3=Date.now();
                Cows[i].draw2();
                Cows[i].update();
                Cows[i].cowsActions();
                //Cows[i].clashOfCows();
            }
        }
        /* if(then3-now5 >= 5000){
            for (i = 0; i < Cows.length; i++){
                now5 =Date.now()
                
            }
            
        } */
}

