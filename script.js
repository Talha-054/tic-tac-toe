let display = document.getElementById('text-area');
let boxes = document.querySelectorAll('.box');
let restart = document.getElementById('restart');
let score_1 = document.getElementById('score-1');
let score_2 = document.getElementById('score-2');

let cross = '<span class="text-2xl text-white font-bold"><i class="fa-solid fa-xmark"></i></span>';
let tic = '<span class="text-2xl text-white font-bold"><i class="fa-solid fa-check"></i></span>';
let cross2 = '<span class="text-2xl  font-bold"><i class="fa-solid fa-xmark"></i></span>';
let tic2 = '<span class="text-2xl  font-bold"><i class="fa-solid fa-check"></i></span>';

let player_1 = true;

let player_1_moves = [];
let player_2_moves = [];

let player_1_score = 0;
let player_2_score = 0;

let winning_moves = [
                    ['1','2','3'],['4','5','6'],['7','8','9'],
                    ['1','4','7'],['2','5','8'],['3','6','9'],
                    ['1','5','9'],['3','5','7']
                    ]

let winnning_pattern = []





function userChoice(e){
    
    if (player_1){
        e.target.innerHTML = tic
        player_1 = !player_1
        player_1_moves.push(e.target.id)
        display.innerHTML = cross2 + " " + 'turn'
    }else{
        e.target.innerHTML = cross
        player_1 = !player_1
        player_2_moves.push(e.target.id)
        display.innerHTML = tic2 + " " + 'turn'

    }
    boxes.forEach((box)=>{
        if(e.target.id == box.id){
            box.removeEventListener('click',userChoice);
        }
    })
}


function win_check(){
    let streak = 0
    if (player_1){
        if (player_2_moves.length >= 1){
            for (let pattern of winning_moves){
                for (let no of player_2_moves){
                    if (pattern.includes(no)){
                        streak++
                        
                    }else{
                        continue
                    }
                }
                if(streak == 3){
                    display.innerHTML = cross2 + ' ' + 'win'
                    restart.classList.remove('hidden')
                    player_1_score ++;
                    score_1.innerText = player_1_score
                    winnning_pattern = JSON.parse(JSON.stringify(pattern))
                    gameOver()
                }
                streak = 0 
            }
        }
        
    }else{
        
        if (player_1_moves.length >= 1){
            for (let pattern of winning_moves){
                for (let no of player_1_moves){
                    if (pattern.includes(no)){
                        streak++
                    }else{
                        continue
                    }
                }
                if(streak == 3){
                    display.innerHTML = tic2 + ' ' + 'win'
                    restart.classList.remove('hidden')
                    player_2_score ++;
                    score_2.innerText = player_2_score
                    winnning_pattern = JSON.parse(JSON.stringify(pattern))
                    gameOver()
                }
                streak = 0
            }
        }
        
    }
    
}


function gameOver(){
    boxes.forEach((box)=>{
        box.removeEventListener('click', userChoice);
        box.removeEventListener('click', win_check);
        winnning_pattern.forEach((no)=>{
            if (no == box.id){
                box.classList.add('bg-blue-800')

            }
        })
    })
}







boxes.forEach((box)=>{
    box.addEventListener('click', userChoice);
    box.addEventListener('click', win_check);
})


restart.addEventListener('click',()=>{
    boxes.forEach((box)=>{
        box.innerHTML = ''
        box.addEventListener('click', userChoice);
        box.addEventListener('click', win_check);
        winnning_pattern.forEach((no)=>{
            if (no == box.id){
                box.classList.remove('bg-blue-800')
            }
        })
    })
    display.innerHTML = tic2 + " " + 'turn'
    restart.classList.add('hidden')
    player_1_moves = []
    player_2_moves = []
})
