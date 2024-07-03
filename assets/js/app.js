'use strict';

(function ($) {
    $.fn.removeClassWild = function (mask) {
        return this.removeClass(function (index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})(jQuery);

const QUESTION_PER_BLOCK = 3;
var isQuestionModalOpen = false;
var player_should_point = 0;
var dice_audio = new Audio('./assets/sfx/roll_dice.mp3');
var dice_a = 0;
var dice_b = 0;
var dice = 0;
var posisi_player_number_sementara = []
var poin_player = [
    0,
    0,
    0,
    0,
    0,
    0,
]
var turn_sekarang = 0
const jawaban = {
    '1_1': 'A',
    '1_2': 'C',
    '1_3': 'D',
    '2_1': 'B',
    '2_2': 'B',
    '2_3': 'A',
    '3_1': 'C',
    '3_2': 'C',
    '3_3': 'B',
    '4_1': 'A',
    '4_2': 'D',
    '4_3': 'B',
    '5_1': 'A',
    '5_2': 'C',
    '5_3': 'B',
    '6_1': 'A',
    '6_2': 'D',
    '6_3': 'A',
    '7_1': 'B',
    '7_2': 'A',
    '7_3': 'A',
    '8_1': 'D',
    '8_2': 'B',
    '8_3': 'D',
    '9_1': 'C',
    '9_2': 'C',
    '9_3': 'B',
    '10_1': 'A',
    '10_2': 'C',
    '10_3': 'B',
    '11_1': 'C',
    '11_2': 'B',
    '11_3': 'B',
    '12_1': 'A',
    '12_2': 'D',
    '12_3': 'C',
    '13_1': 'D',
    '13_2': 'B',
    '13_3': 'A',
    '14_1': 'C',
    '14_2': 'B',
    '14_3': 'A',
    '15_1': 'C',
    '15_2': 'D',
    '15_3': 'B',
    '16_1': 'B',
    '16_2': 'A',
    '16_3': 'D',
    '17_1': 'B',
    '17_2': 'A',
    '17_3': 'A',
    '18_1': 'A',
    '18_2': 'B',
    '18_3': 'C',
    '19_1': 'A',
    '19_2': 'C',
    '19_3': 'D',
    '20_1': 'D',
    '20_2': 'A',
    '20_3': 'C',
    '21_1': 'C',
    '21_2': 'B',
    '21_3': 'B',
    '22_1': 'D',
    '22_2': 'B',
    '22_3': 'A',
    '23_1': 'D',
    '23_2': 'A',
    '23_3': 'B',
    '24_1': 'A',
    '24_2': 'C',
    '24_3': 'C',
    '25_1': 'D',
    '25_2': 'A',
    '25_3': 'B',
    '26_1': 'D',
    '26_2': 'C',
    '26_3': 'A',
    '27_1': 'A',
    '27_2': 'D',
    '27_3': 'B',
    '28_1': 'A',
    '28_2': 'A',
    '28_3': 'C',
    '29_1': 'C',
    '29_2': 'B',
    '29_3': 'A',
    '30_1': 'C',
    '30_2': 'A',
    '30_3': 'D',
    '31_1': 'B',
    '31_2': 'D',
    '31_3': 'D',
    '32_1': 'A',
    '32_2': 'C',
    '32_3': 'C',
    '33_1': 'B',
    '33_2': 'A',
    '33_3': 'D',
    '34_1': 'B',
    '34_2': 'A',
    '34_3': 'C',
    '35_1': 'C',
    '35_2': 'A',
    '35_3': 'D',
    '36_1': 'B',
    '36_2': 'A',
    '36_3': 'C',
    '37_1': 'A',
    '37_2': 'D',
    '37_3': 'A',
    '38_1': 'B',
    '38_2': 'C',
    '38_3': 'C',
    '39_1': 'D',
    '39_2': 'A',
    '39_3': 'B',
    '40_1': 'C',
    '40_2': 'B',
    '40_3': 'C',
    '41_1': 'D',
    '41_2': 'D',
    '41_3': 'C',
    '42_1': 'A',
    '42_2': 'B',
    '42_3': 'A',
    '43_1': 'C',
    '43_2': 'B',
    '43_3': 'D',
    '44_1': 'D',
    '44_2': 'C',
    '44_3': 'A',
    '45_1': 'B',
    '45_2': 'B',
    '45_3': 'A',
    '46_1': 'C',
    '46_2': 'B',
    '46_3': 'A',
    '47_1': 'A',
    '47_2': 'C',
    '47_3': 'B',
    '48_1': 'D',
    '48_2': 'B',
    '48_3': 'C',
    '49_1': 'C',
    '49_2': 'A',
    '49_3': 'D',
    '50_1': 'A',
    '50_2': 'B',
    '50_3': 'A',
}

const color = [
    'red', 'blue', 'purple', 'deepPurple', 'indigo', 'pink', 'lightBlue', 'cyan', 'teal', 'green', 'lightGreen', 'lime',
    'yellow', 'amber', 'orange', 'deepOrange', 'brow', 'grey', 'blueGrey'
];
const ficha = [
    {
        position: -1,
        point: 0,
        isFinish: false,
    }
];
var turn = 0;
var turn_before = turn;
var gameIsFinish = false;
const snakes = {
    snake_16: 4,
    snake_29: 10,
    snake_39: 20,
    s2nake_45: 34,
};
const laders = {
    lader_6: 14,
    lader_17: 23,
    lader_27: 33,
    lader_38: 43,
}

// loadQuestion();
updatePlayer();
$('#random-dice').attr('disabled', true);
$('.reset-game').attr('disabled', true);

dice_audio.onended = function () {
    $('#roll').attr('checked', false);
    $('#dice-result').text(dice_a + dice_b);

    if (ficha[turn].position === -1) {
        if ((dice_a + dice_b) === 6) {
            ficha[turn].position = 0;
            updatePosition(ficha[turn]);
            $('#random-dice').attr('disabled', false);
        } else {
            updateTurn(1);
            $('#random-dice').attr('disabled', false);
        }
    } else {
        randomDiceAndMoveFiche(dice_a, dice_b);
    }
}

var percobaan_ke = 0
$('#random-dice').click(function () {
    $('#roll').attr('checked', true);
    $(this).attr('disabled', true);
    dice_audio.play();
    // console.log(console.log(percobaan_ke))
    if (percobaan_ke == 0) {
        percobaan_ke = 1;
        dice_a = 6;
        dice_b = 0;//Math.ceil(Math.random() * 6);
    } else {
        dice_a = Math.ceil(Math.random() * 6);
        dice_b = 0;
    }
});

$('.add-player').click(function () {
    var player = {
        position: -1,
        point: 0,
        isFinish: false,
    }

    ficha.push(player);
    updatePlayer();

    if (ficha.length >= 3) {
        $('button.add-player').attr('disabled', true);
    }
});

$('.start-game').click(function () {
    $('#random-dice').attr('disabled', false);
    $('.reset-game').attr('disabled', false);
    $('.add-player').attr('disabled', true);
    $(this).attr('disabled', true);
});

$('.reset-game').click(function () {
    window.localStorage.clear();
    document.location.reload();
});

function randomDiceAndMoveFiche(a = 0, b = 0) {
    dice = a + b;
    var move = 1;

    var anim = setInterval(function () {
        ficha[turn].position += 1;
        updatePosition(ficha[turn]);

        if (ficha[turn].position >= 50 && move !== dice) {
            clearInterval(anim);
            rewindPosition(dice - move);
            return;
        }

        if (move === dice) {
            $('#random-dice').attr('disabled', false);
            var isSnake = snakes['snake_' + ficha[turn].position];
            if (isSnake) {
                ficha[turn].position = isSnake;
            }

            var isLaders = laders['lader_' + ficha[turn].position];
            if (isLaders) {
                ficha[turn].position = isLaders;
            }

            updatePosition(ficha[turn]);

            if (ficha[turn].position === 50) {
                ficha[turn].isFinish = true;
                alert('Player-' + turn + ' winner with point: ' + ficha[turn].point);
                updateTurn(1);
                clearInterval(anim);
                return;
            }

            player_should_point = turn;
            openQuestionModal(ficha[turn]);

            if (dice !== 6) {
                updateTurn(1);
            }

            clearInterval(anim);
        }

        move++;
    }, 250);
}

$('[data-action=modal]').click(function () {
    var target = $(this).data('target');
    window.localStorage.setItem('opened_modal', target);
    $(target).addClass('open');
});

$('[data-action=close]').click(function () {
    var target = window.localStorage.getItem('opened_modal');
    $(target).removeClass('open');
    window.localStorage.removeItem('opened_modal');
    if (isQuestionModalOpen) {
        var point = prompt('Point yang didapat player:');
        point = parseInt(point);
        ficha[player_should_point].point += point;
        updatePlayer(false);
        isQuestionModalOpen = false;
    }
});

function posisiFicha(posisi) {
    const board = document.querySelector('#board');
    const ficha = document.querySelector('.position-' + posisi);
    if (ficha == null) {
      return  
    }
    const boardWidth = board.offsetWidth;
    const boardHeight = board.offsetHeight;
    const fontSize = (5 / 100) * boardWidth;
    if (posisi == 0) {
        console.log(boardWidth, 35, 'hehe')
        const pL = (35/950) * boardWidth - (fontSize/2);
        const pT = (62/600) * boardHeight;
        ficha.style.left = pL + 'px';
        ficha.style.bottom = pT + 'px';
        console.log(pL)
    } else if (posisi == 1){
        console.log(boardWidth, 170, 'hehe')
        const pL = (170/950) * boardWidth - (fontSize/2);
        const pT = (47/600) * boardHeight;
        ficha.style.left = pL + 'px';
        ficha.style.bottom = pT + 'px';
        console.log(pL)
    } else if(posisi == 2) {
        console.log(boardWidth, 247, 'hehe')
        const pL = (247/950) * boardWidth - (fontSize/2);
        const pT = (40/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 3) {
        console.log(boardWidth, 327, 'hehe')
        const pL = (327/950) * boardWidth - (fontSize/2);
        const pT = (30/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 4) {
        console.log(boardWidth, 410, 'hehe')
        const pL = (410/950) * boardWidth - (fontSize/2);
        const pT = (20/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 5) {
        console.log(boardWidth, 485, 'hehe')
        const pL = (485/950) * boardWidth - (fontSize/2);
        const pT = (15/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 6) {
        console.log(boardWidth, 570, 'hehe')
        const pL = (570/950) * boardWidth - (fontSize/2);
        const pT = (15/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 7) {
        console.log(boardWidth, 647, 'hehe')
        const pL = (647/950) * boardWidth - (fontSize/2);
        const pT = (18/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 8) {
        console.log(boardWidth, 727, 'hehe')
        const pL = (727/950) * boardWidth - (fontSize/2);
        const pT = (27/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 9) {
        console.log(boardWidth, 800, 'hehe')
        const pL = (800/950) * boardWidth - (fontSize/2);
        const pT = (47/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 10) {
        console.log(boardWidth, 845, 'hehe')
        const pL = (845/950) * boardWidth - (fontSize/2);
        const pT = (115/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 11) {
        console.log(boardWidth, 778, 'hehe')
        const pL = (778/950) * boardWidth - (fontSize/2);
        const pT = (160/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 12) {
        console.log(boardWidth, 698, 'hehe')
        const pL = (698/950) * boardWidth - (fontSize/2);
        const pT = (170/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 13) {
        console.log(boardWidth, 620, 'hehe')
        const pL = (620/950) * boardWidth - (fontSize/2);
        const pT = (170/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 14) {
        console.log(boardWidth, 540, 'hehe')
        const pL = (540/950) * boardWidth - (fontSize/2);
        const pT = (168/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 15) {
        console.log(boardWidth, 462, 'hehe')
        const pL = (462/950) * boardWidth - (fontSize/2);
        const pT = (162/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 16) {
        console.log(boardWidth, 382, 'hehe')
        const pL = (382/950) * boardWidth - (fontSize/2);
        const pT = (161/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 17) {
        console.log(boardWidth, 300, 'hehe')
        const pL = (300/950) * boardWidth - (fontSize/2);
        const pT = (158/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 18) {
        console.log(boardWidth, 220, 'hehe')
        const pL = (220/950) * boardWidth - (fontSize/2);
        const pT = (165/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 19) {
        console.log(boardWidth, 145, 'hehe')
        const pL = (145/950) * boardWidth - (fontSize/2);
        const pT = (178/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 20) {
        console.log(boardWidth, 90, 'hehe')
        const pL = (90/950) * boardWidth - (fontSize/2);
        const pT = (240/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 21) {
        console.log(boardWidth, 168, 'hehe')
        const pL = (168/950) * boardWidth - (fontSize/2);
        const pT = (287/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 22) {
        console.log(boardWidth, 240, 'hehe')
        const pL = (240/950) * boardWidth - (fontSize/2);
        const pT = (297/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 23) {
        console.log(boardWidth, 320, 'hehe')
        const pL = (320/950) * boardWidth - (fontSize/2);
        const pT = (300/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 24) {
        console.log(boardWidth, 399, 'hehe')
        const pL = (399/950) * boardWidth - (fontSize/2);
        const pT = (295/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 25) {
        console.log(boardWidth, 477, 'hehe')
        const pL = (477/950) * boardWidth - (fontSize/2);
        const pT = (289/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 26) {
        console.log(boardWidth, 558, 'hehe')
        const pL = (558/950) * boardWidth - (fontSize/2);
        const pT = (285/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 27) {
        console.log(boardWidth, 640, 'hehe')
        const pL = (640/950) * boardWidth - (fontSize/2);
        const pT = (275/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 28) {
        console.log(boardWidth, 720, 'hehe')
        const pL = (720/950) * boardWidth - (fontSize/2);
        const pT = (275/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 29) {
        console.log(boardWidth, 800, 'hehe')
        const pL = (800/950) * boardWidth - (fontSize/2);
        const pT = (285/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 30) {
        console.log(boardWidth, 845, 'hehe')
        const pL = (845/950) * boardWidth - (fontSize/2);
        const pT = (345/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 31) {
        console.log(boardWidth, 785, 'hehe')
        const pL = (785/950) * boardWidth - (fontSize/2);
        const pT = (397/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 32) {
        console.log(boardWidth, 708, 'hehe')
        const pL = (708/950) * boardWidth - (fontSize/2);
        const pT = (413/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 33) {
        console.log(boardWidth, 628, 'hehe')
        const pL = (628/950) * boardWidth - (fontSize/2);
        const pT = (415/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 34) {
        console.log(boardWidth, 550, 'hehe')
        const pL = (550/950) * boardWidth - (fontSize/2);
        const pT = (410/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 35) {
        console.log(boardWidth, 468, 'hehe')
        const pL = (468/950) * boardWidth - (fontSize/2);
        const pT = (407/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 36) {
        console.log(boardWidth, 387, 'hehe')
        const pL = (387/950) * boardWidth - (fontSize/2);
        const pT = (400/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 37) {
        console.log(boardWidth, 309, 'hehe')
        const pL = (309/950) * boardWidth - (fontSize/2);
        const pT = (395/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 38) {
        console.log(boardWidth, 232, 'hehe')
        const pL = (232/950) * boardWidth - (fontSize/2);
        const pT = (389/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 39) {
        console.log(boardWidth, 152, 'hehe')
        const pL = (152/950) * boardWidth - (fontSize/2);
        const pT = (400/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 40) {
        console.log(boardWidth, 72, 'hehe')
        const pL = (72/950) * boardWidth - (fontSize/2);
        const pT = (430/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 41) {
        console.log(boardWidth, 92, 'hehe')
        const pL = (92/950) * boardWidth - (fontSize/2);
        const pT = (505/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 42) {
        console.log(boardWidth, 172, 'hehe')
        const pL = (172/950) * boardWidth - (fontSize/2);
        const pT = (525/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 43) {
        console.log(boardWidth, 242, 'hehe')
        const pL = (242/950) * boardWidth - (fontSize/2);
        const pT = (535/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 44) {
        console.log(boardWidth, 328, 'hehe')
        const pL = (328/950) * boardWidth - (fontSize/2);
        const pT = (535/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 45) {
        console.log(boardWidth, 410, 'hehe')
        const pL = (410/950) * boardWidth - (fontSize/2);
        const pT = (530/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 46) {
        console.log(boardWidth, 490, 'hehe')
        const pL = (490/950) * boardWidth - (fontSize/2);
        const pT = (527/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 47) {
        console.log(boardWidth, 565, 'hehe')
        const pL = (565/950) * boardWidth - (fontSize/2);
        const pT = (525/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 48) {
        console.log(boardWidth, 649, 'hehe')
        const pL = (649/950) * boardWidth - (fontSize/2);
        const pT = (525/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 49) {
        console.log(boardWidth, 728, 'hehe')
        const pL = (728/950) * boardWidth - (fontSize/2);
        const pT = (527/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    } else if(posisi == 50) {
        console.log(boardWidth, 808, 'hehe')
        const pL = (808/950) * boardWidth - (fontSize/2);
        const pT = (525/600) * boardHeight;
        ficha.style.left = pL + 'px'
        ficha.style.bottom = pT + 'px'
    }
}

function updatePlayer(isUpdatePosition = true) {
    $('.player-list').empty();
    $('#board').empty();
    ficha.map(function (player, index) {
        var wrapper = '<div class="player ' + color[index] + ' ' + (index == turn ? 'active' : '') + '">' +
            '<p>' +
            // contenteditable: untuk bisa diedit
            '<span contenteditable="true">Player-' + (index + 1) + '</span>:' +
            '<span id="point-' + (index + 1) + '">' + player.point + '</span>' +
            '</p>' +
            '</div>';
        $('#board').append('<i id="player-' + index + '" class="fa-solid fa-chess-pawn ficha ' + color[index] + ' position-' + player.position + '"></i>');
        posisiFicha(player.position)
        $('.player-list').append(wrapper);

        if (isUpdatePosition) {
            updatePosition(player);
        }
    });
}

function updatePosition(ficha_player = null) {
    $('#player-' + turn).removeClassWild('position-*');
    $('#player-' + turn).addClass('position-' + (ficha_player.position));
    posisiFicha(ficha_player.position)
}

function rewindPosition(block = 0) {
    var anim_rewind = setInterval(function () {
        ficha[turn].position -= 1;
        updatePosition(ficha[turn]);

        if (block === 1) {
            $('#random-dice').attr('disabled', false);
            var isSnake = snakes['snake_' + ficha[turn].position];
            if (isSnake) {
                ficha[turn].position = isSnake;
            }

            var isLaders = laders['lader_' + ficha[turn].position];
            if (isLaders) {
                ficha[turn].position = isLaders;
            }

            updatePosition(ficha[turn]);

            if (dice !== 6) {
                updateTurn(1);
            }

            clearInterval(anim_rewind);
        }

        block--;
    }, 250);
}

function updateTurn(number, max = 0) {
    turn_sekarang = turn
    turn = number === 0 ? 0 : (turn + number);

    if (max === 3) {
        gameIsFinish = true;
        $('#random-dice').attr('disabled', true);
        alert('game finished');
        return;
    }

    if (number === 0)
        return;

    if (turn === ficha.length) {
        updateTurn(0, max++);
    }

    if (ficha[turn].isFinish) {
        updateTurn(1, max++);
    }

    $('.player.active').removeClass('active');
    var player_list = document.getElementsByClassName('player');
    $(player_list[turn]).addClass('active');

}

function loadQuestion(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './assets/question/question.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            window.localStorage.setItem('question', xobj.responseText);
        }
    };
    xobj.send(null);
}

function openQuestionModal(player) {
    if (player.position === 0) {
        return;
    }
    window.localStorage.setItem('opened_modal', '#question-modal');
    var number_question = window.localStorage.getItem('question_' + player.position);
    if (!number_question) {
        window.localStorage.setItem('question_' + player.position, '1');
        number_question = 1;
    } else {
        number_question = parseInt(number_question);
        if (number_question >= QUESTION_PER_BLOCK) {
            window.localStorage.setItem('question_' + player.position, '1');
        } else {
            window.localStorage.setItem('question_' + player.position, (number_question + 1));
            number_question += 1;
        }
    }

    $('#modalSoal').modal('show')
    // append menambah elemen didalamnya
    $('#box-soal-img').html('')
    $('#box-soal-img').append(`<img src="./assets/question/${player.position}_${number_question}.PNG" alt="" style="max-width: 100%;" srcset="" class="gambar-soal-box">`)
    posisi_player_number_sementara[0] = player.position
    posisi_player_number_sementara[1] = number_question
    isQuestionModalOpen = true;
}

function prosesJawab(jawab) {
    // sembunyikan modal
    $('#modalSoal').modal('hide')
    console.log(player_should_point)
    if (jawab == jawaban[posisi_player_number_sementara[0] + '_' + posisi_player_number_sementara[1]]) {
        $('#modalBenar').modal('show');
        poin_player[player_should_point] += 5
        $('#point-' + (player_should_point + 1)).text(poin_player[player_should_point])
    } else {
        $('#modalSalah').modal('show');
        poin_player[player_should_point] -= 3
        $('#point-' + (player_should_point + 1)).text(poin_player[player_should_point])
    }
}