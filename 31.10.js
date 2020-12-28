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
 var kassa = new Audio();
 kassa.src ="audio/kassa.mp3";
 var explosionsound = new Audio();
 explosionsound.src ="audio/battle-city-sfx-7.mp3";
  var fenceFall = new Audio();
 fenceFall.src ="audio/fenceFall.mp3";
 var cowMyyy = new Audio();
 cowMyyy.src ="audio/cow-moo.mp3";
 var mainTheme = new Audio();
 mainTheme.src ="audio/westernmusic.mp3";
 



//условия удаления моба
let collisian= false;
let explousionAnimate= false;


const keys = [];
//money/ammo
let storage = [500,10]; 


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
    kassa.play()//sound

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
mobSprite.src = "img/cuphead2.png";
const explSprite = new Image();
explSprite.src = "img/explosion.png";
const smokeSprite = new Image();
smokeSprite.src = "img/vzrivi.png";
const fence = new Image();
fence.src="img/fenceold.png";
const fence1 = new Image();
fence1.src="img/fenceold.png";
const fence3 = new Image();
fence3.src="img/fenceold3.png";
const cowSprite = new Image();
cowSprite.src = "img/Cow.png";
const tree = new Image();
tree.src = "img/klipartz.com (2).png";

//Параметры мобов
const mobAct = ['up', 'top right', 'right', 'down right', 'down'];
const numberofcharacters = 8;
const characters = [];
let action1 = mobAct[Math.floor(Math.random() * mobAct.length)];
let mobsNumber=0;
let fenceAlive=true// переменная указывающая жив ли забор

class Mobs {
    constructor(){
        this.width = 103.0625;
        this.height = 113.125;
        this.frameX = 3;
        this.number=mobsNumber++
        this.now2=1;
        this.deadEnter=false
        this.deadEnter2=false
        this.secondLag=false
        
        this.randomValue=(Math.floor((Math.random())*3));
                                                
        this.x = canvas.width  
        this.y = 160+Math.random()*(545-140);       
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
    }
    draw(){
        drawSprite(mobSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height,  this.x, this.y, this.width * 0.38, this.height * 0.38,);
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = this.minFrame;
    }
    update(){
        if(cantMove==false && Cows.length!=0){
            if(fenceAlive==true){
                
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
            }
            if(!Cows[this.randomValue]){
                    this.randomValue=0
                }
            if(fenceAlive==false){
                

                if (this.x-20>Cows[this.randomValue].x && this.y-20>Cows[this.randomValue].y){
                    this.y-=this.speed
                    this.x-=this.speed
                    this.action = 'top left'
                    this.frameY = 1; 
                    this.minFrame = 4;
                    this.maxFrame = 14;
                }
                else  {
                    if (this.y-20>Cows[this.randomValue].y){
                    this.y-=this.speed
                    }  
                    if (this.x-20>Cows[this.randomValue].x){
                    this.action = 'left'
                    this.frameY = 3; 
                    this.minFrame = 3;
                    this.maxFrame = 13;
                    this.x-=this.speed
                    }  
                }
                if (this.x-20<Cows[this.randomValue].x && this.y-20<Cows[this.randomValue].y){
                    this.y+=this.speed
                    this.x+=this.speed
                    this.action = 'left'
                    this.frameY = 3; 
                    this.minFrame = 3;
                    this.maxFrame = 13;
                }
                else  {
                    if (this.y-20<Cows[this.randomValue].y){
                    this.y+=this.speed
                    this.action = 'left'
                    this.frameY = 3; 
                    this.minFrame = 3;
                    this.maxFrame = 13;
                    }  
                    if (this.x-20<Cows[this.randomValue].x){
                    this.action = 'left'
                    this.frameY = 3; 
                    this.minFrame = 3;
                    this.maxFrame = 13;
                    this.x+=this.speed
                    }  
                }
            }
            
        }
    }
    CollisionsWithFence(){
        if(Cows.length!=0){
            if(this.x <= 230 && !this.deadEnter && fenceAlive==true){
                //elementId=characters.indexOf(this);
                this.deadEnter=true
                //console.log('удаляю чела №'+this.number+"    "+this.x)
                shotings(characters.indexOf(this));
                fenseHealth++
                if (fenseHealth==5){
                        fenceFall.play();
                    let newfence = document.getElementById('fence');
                    fenceAlive=false
                    setTimeout(() => newfence.src='img/GunS&W.jpg', 2500);
                    
                }
                
            }
            
            if(this.x > Cows[this.randomValue].x && this.x <Cows[this.randomValue].x+ Cows[this.randomValue].width*0.6-50
                && this.y > Cows[this.randomValue].y && this.y <Cows[this.randomValue].y+ Cows[this.randomValue].height*0.6
                && this.deadEnter2==false && fenceAlive==false){
                    this.deadEnter2=true
                shotings(characters.indexOf(this));
                
            }
        }
    }
    CollisionsWithPlayer(){
        if(Cows.length!=0){
            if(this.x+20 > player.x && this.x+20 <player.x+ player.width*0.7
                && this.y+24 > player.y && this.y+24 <player.y+ player.height*0.7){
                
                playerDead=true;
                
                shotings(characters.indexOf(this));
                
                
                
            }
        }
    }
}

let fenseHealth=0;
let playerDead=false;

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
        if(player.x<238){
            player.y += player.speed;
            player.frameY=1;
            player.moving = true;
            vector = "downleft";
        } else{
            player.x -= player.speed;
            player.y += player.speed;
            player.frameY=1;
            player.moving = true;
            vector = "downleft";
        }
    }
    else if(keys[38] &&  keys[39] && goFurther==true ){
        player.x += player.speed;
        player.y -= player.speed;
        player.frameY=2;
        player.moving = true;
        vector = "upright";
    }
    else if(keys[37] &&  keys[38] && goFurther==true){
        if(player.x<238){
            player.y -= player.speed;
            player.frameY=3;
            player.moving = true;
            vector = "upleft";
        } else{
            player.x -= player.speed;
            player.y -= player.speed;
            player.frameY=3;
            player.moving = true;
            vector = "upleft";
        }
    }
    else if(keys[38] && player.y > 10 && goFurther==true){
        player.y -= player.speed;
        player.frameY=3;
        player.moving = true;
        vector = "up";
        
    }
    else if(keys[37] && player.x > 238){
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
let thenShop=2;//две переменные для фикса бага с заходом в магазин
let nowShop=1; //

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
                if(characters.length < numberofcharacters &&player.haveGun==true) {setTimeout(characters.push(new Mobs()), 2000)}
                //}

    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height,  player.x, player.y, player.width*0.7, player.height*0.7,);
    
    for (i = 0; i < characters.length; i++){
    characters[i].draw();
    characters[i].update();
    characters[i].CollisionsWithFence();
    characters[i].CollisionsWithPlayer();
    }
    mainTheme.play()
    var blur = document.getElementById('blur');
    (blur.classList.contains('active') || playerDead==true) ? cantMove= true : cantMove= false;
    thenShop=Date.now();
    if (player.x === 715 && player.y <= 75 && cantMove == false
        && thenShop-nowShop>2000){ 
        
        
        
        shope()
    };
    
    if(cantMove==false){movePlayer()}
    
    Loose();//следим не проиграли ли мы
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
        

}
//modal box hidden/visible
function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    nowShop=Date.now();
    
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
                
                Bullets.splice(i,1); 

                let time=new Date();
                time.getSeconds();
                
            }
        }
    }
      //                                     Collisions! (with bullets)
        Collisions(){
        characters.forEach(element => {
            if(Bullets[i]){
                if (element.x < Bullets[i].x && Bullets[i].x < element.x + 51) {
                    if (element.y + 57 > Bullets[i].y && Bullets[i].y > element.y){
                        
                        if(!element.deadEnter){
                            element.deadEnter=true
                            shotings(characters.indexOf(element))
                        }

                        Bullets.splice(i,1);
                        return;
                    }
                }
            }
        });
        } 
}

//переменные для регулирования скорости отрисовки
let now2, then2;
then2=Number.MAX_SAFE_INTEGER;
let aNow=-1

//функция shotings отвечает за отрисовку взрыва

function shotings(elementId) {
    
    
    if(characters[elementId].now2){
        if(then2-characters[elementId].now2 >= 30){
            
            let aNew=elementId;
            
            drawSprite(explSprite, explousion.width*explousion.frameX, explousion.height*explousion.frameY, explousion.width, explousion.height, characters[elementId].x-6, characters[elementId].y-6, explousion.width*0.7,explousion.height*0.7); 
            characters[elementId].speed=0;
            
                            if(aNow!=-1){
                                    if(aNew>aNow){  characters[elementId].secondLag=true
                                }}
            if(explousion.frameX<explousion.maxFrame) {
            explosionsound.play()
            
            explousion.frameX++;
            console.log(characters[elementId].number+"это номер персонажа"+elementId)
            characters[elementId].now2=Date.now();
            
            }
            if (explousion.frameX > 6){ 
                
                explousion.frameX=0, explousion.frameY =1; 
            }
            if(explousion.frameX==6 && explousion.frameY ==1){
            console.log(characters[elementId].number+"это номер персонажа2222"+elementId);
            aNow=elementId;
                if(characters[elementId].secondLag=false){
                    characters.splice(elementId,1)//убиваем каперхеда
                    storage[0]+=20
                    document.getElementById("money").innerHTML = storage[0];
                    
                };
                if(characters[elementId].deadEnter2==true){ 
                    Cows.splice(characters[elementId].randomValue, 1)  // убиваем корову
                    cowMyyy.play()
                }
                if(characters[elementId].secondLag=true){
                    storage[0]+=20
                    document.getElementById("money").innerHTML = storage[0];
                    characters[elementId].x = canvas.width
                    characters[elementId].y = 160+Math.random()*(545-140);
                    characters[elementId].now2=1
                    characters[elementId].speed=(Math.random() * 1.2) + 2.5;
                    characters[elementId].deadEnter=false
                    characters[elementId].deadEnter2=false
            }
                
                
                console.log('убиваем человечка № '+elementId);
                explousion.frameX= 0; explousion.frameY= 0;
                return; 
            }  
        } 
    }
            then2=Date.now();

    requestAnimationFrame (function() {
    shotings(elementId)
    })
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

 if (smoke.frameX < smoke.maxFrame) smoke.frameX++;
     else {smoke.frameX = smoke.minFrame; return;}
requestAnimationFrame(fug);
}  




function shot(e){

switch (e.keyCode) {
                case 32:  // если нажата клавиша пробел
                    if (storage[1] > 0 && player.haveGun == true){
                        Bullets.push(new bullet(vector));
                        storage[1]--;
                        audioshot.play();
                        fug();
                        document.getElementById("ammonition").innerHTML = storage[1];
                    break;
                    }
}}
addEventListener("keyup", shot);


function ammoNull(){
    var ammonull = document.getElementById('ammonition');
    if(storage[1] == 0) {
                        
                        ammonull.style.color='red';
                        ammonull.style.fontWeight='bolder';
                    }
    else{
        ammonull.style.color='white';
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
        
            drawSprite(cowSprite, this.width*this.frameX, this.height*this.frameY, this.width, this.height,  this.x, this.y, this.width*0.6, this.height*0.6);
            if(then4-now6 >= 500 && this.eating ==true){
                if (this.frameX < 3) {
                    
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
}


for (i = 0; i < numberofcows; i++){
        Cows.push(new Cow());
    };
    animate2();
function animate2(){
    then3=Date.now();
    requestAnimationFrame(animate2);
        if(then3-now3 >= 8){
            for (i = 0; i < Cows.length; i++){
                
                Cows[i].draw2();
                Cows[i].update();
                Cows[i].cowsActions();
                
            }
        }
        
}

function Loose(){
    if(Cows.length==0){
        console.log('YOU ARE LOOSE!!!')
        document.getElementById('wrapperLoose').style.visibility= 'visible';
    }
    if(playerDead==true){
        setTimeout(() =>
        document.getElementById('wrapperLoose2').style.visibility= 'visible', 500);
    }
}