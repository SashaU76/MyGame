const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
let particlesArray = [];
const numberofparticles = 300;
let colours =[ '#6d676e','red', '#92B4F4','#f1c40f','#cfdee7'];
//audio
var main = new Audio();
main.src ="audio/stayAlive2.mp3";
var shot = new Audio();
shot.src ="audio/gun2.mp3";
var revolversound = new Audio();
revolversound.src ="audio/revolversound.mp3";
var revolversound2 = new Audio();
revolversound2.src ="audio/revolversound2.mp3";
var typingAudio = new Audio();
typingAudio.src ="audio/pechatanie1.mp3";


// measure title element
let titleElement = document.getElementById('title1');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top+360,
    width: titleMeasurements.width +5,
    height: 5,
}
console.log(titleMeasurements);


class Particle{
    constructor(x,y){
        let rand = Math.floor(Math.random() * 2);
        this.x =x;
        this.y =y;
        this.size = Math.random() * 25 + 10;
        this.weight = Math.random() * 5 + 1;
        this.directionX =[0,-2];
        this.colour = colours[rand];
    }
    update(){
        let rand = Math.floor(Math.random() * 2);
        if( this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 5 + 1;;
            this.x = Math.random()* canvas.width*1.3;
        }
        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX[rand];

        // check for collision between each particle and title
        if (
            this.x < title.x + title.width &&
            this.x + this.size > title.x &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ){
            this.y -=30;
            this.weight *= -0.5;
            //this.directionX =this.directionX =[1]; 
        }
    }
    draw(){

        ctx.fillStyle = this.colour;
        ctx.strokeStyle = "#FF0000";
        
        ctx.shadowOffsetX = 10; 
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI* 2);
        ctx.closePath();
        ctx.fill()
    }
}
function init(){
    particlesArray = [];
    for (let i =0; i < numberofparticles; i++){
        const x = Math.random() *canvas.width;
        const y = Math.random() *canvas.height;
        particlesArray.push(new Particle(x,y));
    }

}
init();

function animate(){
    ctx.fillStyle = 'rgba(255,255,255,0.01)';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for (let i =0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    titleMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleMeasurements.left,
    y: titleMeasurements.top+420,
    width: titleMeasurements.width +5,
    height: 5,
    }
    init();
})

function deletepage(){
    main.play();
        var myNode = document.getElementById("canvas1");
        var elem = document.querySelector("#title1");
        var elem2 = document.querySelector(".background");
var elem3 = document.getElementsByClassName(".portrait");
var elem4 = document.getElementById("div");
var elem5 = document.querySelector("background");
        myNode.remove();
        elem.remove();   
        elem2.remove(); 
        
        elem4.remove(); 
        
            
}


function keyboard(){
    revolversound.play();
    var blur = document.getElementById('keyboards');
        blur.classList.toggle('keyboardsShow'); 
        
}
function about(){
    revolversound.play();
    var blur = document.getElementById('about');
        blur.classList.toggle('active'); 
    var shadow = document.getElementById('about');    
        shadow.classList.toggle("shadow");
}
const card = document.getElementById('card');
const about2 =document.getElementById('about');

//movement animation event
about2.addEventListener('mousemove', (e) => {
let xAxis = ((window.innerWidth/ 2 - e.pageX)/25);
let yAxis = ((window.innerHeight/ 2 - e.pageY)/25);
console.log(xAxis);
if(xAxis<10 && yAxis<10){
card.style.transform=`rotateY(${xAxis+15}deg) rotateX(${yAxis}deg)`;
}
});
//
about2.addEventListener('mouseenter', (e) => {
    card.style.transition="none";
    var blur = document.querySelector('.info');
    blur.style.transform = "translateZ(100px)"; 
})
about2.addEventListener('mouseleave', (e) => {
    card.style.transition="all 0.7s ease";
    card.style.transform=`rotateY(0deg) rotateX(0deg)`;
    var blur = document.querySelector('.info');
    blur.style.transform = "translateZ(0px)"; 
})
// убираем окно about кликом вне окна
let b = document.getElementById('wrapedAbout');

b.addEventListener('click', ()=> {
    console.log('we cliked');
    var blur = document.getElementById('about');
    if(blur.classList.contains('active')) {
    about();
    }
})

// переход на кнопке start
function Start(){
    shot.play();
    let slidebox = document.getElementById('slidebox');
    let bulletimg = document.getElementById('bulletimg');
    bulletimg.style.transform = 'translateX(3000px)';
    slidebox.style.background = 'black';
    slidebox.style.transform = 'translateX(0)';
    

    let briffing = document.getElementById('briffing');
    let deadcow = document.getElementById('deadcow');
    let wolf = document.getElementById('wolf');
    let profile = document.getElementById('profile');
    let cow = document.getElementById('cow');
    let hrup =document.getElementById('hrup');
    let hrdown =document.getElementById('hrdown');

    setTimeout(() => { briffing.style.visibility='visible'},21000);
    setTimeout(() => { typingAudio.play()},1900);
    setTimeout(() => { hrup.style.opacity=1},3000);
    setTimeout(() => { hrdown.style.opacity=1},3000);
    setTimeout(() => { textEffect()},3000);
    setTimeout(() => { deadcow.style.opacity=1},4400);
    setTimeout(() => { deadcow.style.opacity=0},7000);
    setTimeout(() => { wolf.style.opacity=1},7900);
    setTimeout(() => { wolf.style.opacity=0},11900);
    setTimeout(() => { cow.style.opacity=1},13400);
    setTimeout(() => { cow.style.opacity=0},15800);
    setTimeout(() => { profile.style.opacity=1},16400);

    
    
    slidebox.addEventListener('click', () => { briffing.style.visibility='visible'});
}
function startplay() {
    
    setTimeout(function() {window.location ="31.10.html"}, 1500);
}

var index = 0; 
var text = 'Recently, there have been more cases \n of cupheads attacking livestock in the district. \n local authorities are worried and are sending \n rangers to protect several large farms. \n You, as one of the best in the department, \n will single-handedly take care of a small \n farm on the very border of the state.'; 
var speed = 10; 
  
function textEffect() { 
    if (index < text.length) { 
        document.getElementById("effect") 
                .innerHTML += text.charAt(index); 
        index++; 
        setTimeout(textEffect, speed); 
    } 
} 

