'use strict';
var gNums;  
var gprev = 0;
var gLength;
var gTimeStart;
var ginterval;
var gBoardSize=4;
var gIsvictory = false;
function init()
{
    ginterval = setInterval(currTimeStopwatch,1);
    gNums = createArr(gBoardSize**2);
    gLength = gNums.length;
    shuffle(gNums);
    renderBoard(gBoardSize);
}

function sizeSet(elRadioBt)
{
   var val = elRadioBt.value;
   var elTable = document.querySelector('.board');
   var elTds = elTable.querySelectorAll('td');
   if(val === 'Easy(4x4)') 
   {
    if(gBoardSize!=4)
    {
        for(var i=0; i<elTds.length;i++)
        {
            elTds[0].style.width = '80px';
            elTds[0].style.height = '80px';
        }
        gBoardSize = 4;
        resetGame();
    }
   }
   else if(val === 'Medium(5x5)')
   {
    if(gBoardSize!=5)
    {
        for(var i=0; i<elTds.length;i++)
        {
            elTds[0].style.width = '60px';
            elTds[0].style.height = '60px';
        }
        gBoardSize = 5;
        resetGame();
    }
   }
   else{
    if(gBoardSize!=6)
    {
        for(var i=0; i<elTds.length;i++)
        {
            elTds[0].style.width = '45px';
            elTds[0].style.height = '45px';
        }
        gBoardSize = 6;
        resetGame();
    }
   }

   
}

function resetGame()
{
    gprev=0;
    gTimeStart = NaN;
    var elNum = document.querySelector('.num');
    var elH2 =elNum.querySelector('h2');
    elH2.innerText = 'Next number: 1';
    init();
}

function currTimeStopwatch() {
    var date = new Date();
    var time = Number(date) - Number(gTimeStart);
    var stopWatchTime = new Date(time);
    var s = stopWatchTime.getSeconds();
    var ms = stopWatchTime.getMilliseconds();
    var elTime = document.querySelector('.time');
    var elTimeH2 = elTime.querySelector('h2');
    if(gIsvictory) gTimeStart = 0;
    elTimeH2.innerText = (!gTimeStart)?'0:000':s +':'+ ms;
    
}

function shuffle(items) {
    var randIdx, keep
    for (var i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function createArr(nums)
{
    var arr = [];
    for(var i=1;i<=nums;i++)
    {
        arr.push(i);
    }
    return arr;
}

function cellClicked(elCell)
{
 if(gprev===0 && Number(elCell.innerText)===1)
 {
     gTimeStart = Number(Date.now());
 }   
 if((gprev+1) === Number(elCell.innerText))
 {
    gprev++;
     var elNum = document.querySelector('.num');
     var elH2 =elNum.querySelector('h2');
     if(gprev!=gLength) elH2.innerText = 'Next number: '+ (gprev+1);
    elCell.style.backgroundColor = 'rgb(8, 234, 5)'; 
    if(gprev===gLength) 
    {
        var end = Date.now();
        var x = Number(end);
        var score = x-gTimeStart
        score = score/1000;
        console.log(score);
        clearInterval(ginterval);
        alert('victory! The score is '+ score);
    }
    
 }
 
}

function renderBoard(num)
{
    var strHTML = '';
    var widthAndheight = 0;
    if(gBoardSize===4) widthAndheight =80;
    else if(gBoardSize===5) widthAndheight =60;
    else{
        widthAndheight =45;
    }
    for (var i = 0; i <num; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < num; j++) {
            var cell = gNums.pop();
            // var className = (cell) ? 'right' : '';
            strHTML += `<td style="width: ${widthAndheight}px; height:${widthAndheight}px;" data-i="${i}" data-j="${j}"
            onclick="cellClicked(this)">
            ${cell}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}