const canvas = document.getElementById("canva");
const ctx = canvas.getContext("2d");
const r = 30;
let speed = 2;
const colors = ["red","green","blue", "orange","purple","yellow","pink","white"];
let balloons = [];
let score = 0;
let over = false;
function printscore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 20, 40);
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newBalloon() {
    
    const bcolor = colors[Math.floor(Math.random() * colors.length)];
    const balloon = {
        x: Math.random() * (canvas.width - 2 * r) + r,
        y: canvas.height,
        color: bcolor,
       
    }
    balloons.push(balloon);
}
function updateGameArea() {
    if (over) 
    {
        ctx.font = "50px bold";
        ctx.fillStyle = "white";
        ctx.fillText(" Game over!",canvas.width / 2 - 150, canvas.height / 2);
        ctx.textAlign = "center";
        return;
    }
    else{
    clear();
    for (const balloon of balloons) {
        
        ctx.beginPath();
        ctx.arc(balloon.x, balloon.y, r, 0, Math.PI * 2);
        ctx.fillStyle = balloon.color;
        ctx.fill();
        ctx.closePath();
        balloon.y-=speed;

        if (balloon.y < 0) {
            over = true;
        }
    }
    
    printscore();
    setTimeout(updateGameArea,16);}
}
const popop = document.getElementById('pop_aud');
function popsd()
{
    popop.currentTime=0;
    popop.play();
}
canvas.addEventListener("click", pop);
function pop(event) {
    if(over)return;
    const mx = event.clientX - canvas.offsetLeft;
    const my = event.clientY - canvas.offsetTop;
    for (let i = balloons.length - 1; i >= 0; i--) {
        const balloon = balloons[i];
        const distance = Math.sqrt((mx - balloon.x)**2 + (my - balloon.y)**2);
            
            if (distance <= r) {
                balloons.splice(i, 1);
                if(speed<=4)
            { speed=1.07*speed;}
            score++;
            popsd();
            return;
        }
    }
    }

updateGameArea();
setInterval(newBalloon, 1500);
