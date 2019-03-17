console.log('Touch Nums');

var gNums = [...Array(16).keys()];
// console.log(gNums);
var gCount = 1;
var gMs = 0;
var gGameInterval;

function init() {
    gCount = 1;
    gMs = 0;
    stopTime();
    gGameInterval = 0;
    document.querySelector('.time').innerText = 'Time: 00:00:00';
    // document.querySelector('.last-num').innerText = 'Last number: ' + gCount;
    renderBoard();
}

function renderBoard() {
    var nums = shuffleNums(gNums);
    var sqrt = Math.sqrt(nums.length);
    // console.log(sqrt);
    var strHTML = '';
    for (var i = 0; i < nums.length; i++) {
        var item = nums[i];
        // if (i % 4 === 0) strHTML += '<tr>';
        if (i % sqrt === 0) strHTML += '<tr>';
        strHTML += `<td onclick="cellClicked(this)">${item}</td>`;
        // if (i % 4 === 3) strHTML += '</tr>';
        if (i % sqrt === sqrt - 1) strHTML += '</tr>';
    }

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elTD) {
    if (parseInt(elTD.innerText) === gCount) {
        elTD.classList.toggle('clicked');
        if (gCount === 1) startTime();
        if (gCount === gNums.length) stopTime();
        document.querySelector('.last-num').innerText = 'Last number: ' + gCount;
        gCount++;
        // console.log(gCount, gNums.length);
    }
}

function shuffleNums(nums) {
    var tempNums = [...nums];
    var res = [];
    while (tempNums.length > 0) {
        var random = Math.floor(Math.random() * tempNums.length);
        var num = tempNums.splice(random, 1);
        res.push(num.pop() + 1);
    }
    return res;
}

function startTime() {
    gGameInterval = setInterval(incrementTime, 10);
}

function stopTime() {
    clearInterval(gGameInterval);
}

function incrementTime() {
    gMs++;
    var seconds = Math.floor(gMs / 100) % 60;
    var minutes = Math.floor(gMs / 100 / 60) % 60;

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    var ms = gMs % 100;
    document.querySelector('.time').innerText = 'Time: ' + minutes + ':' + seconds + ':' + ms;
}

function radioClicked(elRadio) {
    elRadio.checked = true;

    var elLevels = document.querySelectorAll('.level');
    for (var i = 0; i < elLevels.length; i++) {
        var elLevel = elLevels[i];
        if (elLevel.checked) {
            gNums = [...Array(parseInt(elLevel.value)).keys()];
        }
    }
    init();
}
