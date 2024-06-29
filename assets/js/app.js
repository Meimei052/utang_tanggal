'use strict';

(function($) {
    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
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
    'red','blue','purple','deepPurple','indigo','pink','lightBlue','cyan','teal','green','lightGreen','lime',
    'yellow','amber','orange','deepOrange','brow','grey','blueGrey'
];
const ficha = [
    {
        position: -1,
        point: 0,
        isFinish: false,
    }
];
var turn = 0;
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

dice_audio.onended = function() {
    $('#roll').attr('checked', false);
    $('#dice-result').text(dice_a + dice_b);

    if(ficha[turn].position === -1) {
        if((dice_a + dice_b) === 6) {
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

var percobaan_ke = 1
$('#random-dice').click(function() {
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

$('.add-player').click(function() {
    var player = {
        position: -1,
        point: 0,
        isFinish: false,
    }

    ficha.push(player);
    updatePlayer();

    if(ficha.length >= 3) {
        $('button.add-player').attr('disabled', true);
    }
});

$('.start-game').click(function() {
    $('#random-dice').attr('disabled', false);
    $('.reset-game').attr('disabled', false);
    $('.add-player').attr('disabled', true);
    $(this).attr('disabled', true);
});

$('.reset-game').click(function() {
    window.localStorage.clear();
    document.location.reload();
});

function randomDiceAndMoveFiche(a = 0, b = 0) {
    dice = a + b;
    var move = 1;
    
    var anim = setInterval(function() {
        ficha[turn].position += 1;
        updatePosition(ficha[turn]);

        if(ficha[turn].position >= 50 && move !== dice) {
            clearInterval(anim);
            rewindPosition(dice - move);
            return;
        }

        if(move === dice) {
            $('#random-dice').attr('disabled', false);
            var isSnake = snakes['snake_'+ficha[turn].position];
            if (isSnake) {
                ficha[turn].position = isSnake;
            }

            var isLaders = laders['lader_'+ficha[turn].position];
            if (isLaders) {
                ficha[turn].position = isLaders;
            }

            updatePosition(ficha[turn]);

            if(ficha[turn].position === 50) {
                ficha[turn].isFinish = true;
                alert('Player-'+ turn +' winner with point: '+ ficha[turn].point);
                updateTurn(1);
                clearInterval(anim);
                return;
            }

            player_should_point = turn;
            openQuestionModal(ficha[turn]);

            if(dice !== 6) {
                updateTurn(1);
            }

            clearInterval(anim);
        }

        move++;
    }, 250);
}

$('[data-action=modal]').click(function() {
    var target = $(this).data('target');
    window.localStorage.setItem('opened_modal', target);
    $(target).addClass('open');
});

$('[data-action=close]').click(function() {
    var target = window.localStorage.getItem('opened_modal');
    $(target).removeClass('open');
    window.localStorage.removeItem('opened_modal');
    if(isQuestionModalOpen) {
        var point = prompt('Point yang didapat player:');
        point = parseInt(point);
        ficha[player_should_point].point += point;
        updatePlayer(false);
        isQuestionModalOpen = false;
    }
});

function updatePlayer(isUpdatePosition = true) {
    $('.player-list').empty();
    $('#board').empty();
    ficha.map(function(player, index) {
        var wrapper =   '<div class="player '+ color[index] +' '+ (index == turn ? 'active' : '') +'">'+
                            '<p>'+
                                // contenteditable: untuk bisa diedit
                                '<span contenteditable="true">Player-'+ (index + 1) +'</span>:'+
                                '<span id="point-'+ (index + 1) +'">'+ player.point +'</span>'+
                            '</p>'+
                        '</div>';
        $('#board').append('<div id="player-'+index+'" class="ficha '+ color[index] +' position-'+player.position+'"></div>');
        $('.player-list').append(wrapper);

        if(isUpdatePosition) {
            updatePosition(player);
        }
    });
}

function updatePosition(ficha_player = null) {
    $('#player-'+turn).removeClassWild('position-*');
    $('#player-'+turn).addClass('position-'+ (ficha_player.position));
}

function rewindPosition(block = 0) {
    var anim_rewind = setInterval(function() {
        ficha[turn].position -= 1;
        updatePosition(ficha[turn]);

        if(block === 1) {
            $('#random-dice').attr('disabled', false);
            var isSnake = snakes['snake_'+ficha[turn].position];
            if (isSnake) {
                ficha[turn].position = isSnake;
            }

            var isLaders = laders['lader_'+ficha[turn].position];
            if (isLaders) {
                ficha[turn].position = isLaders;
            }

            updatePosition(ficha[turn]);

            if(dice !== 6) {
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

    if(max === 3) {
        gameIsFinish = true;
        $('#random-dice').attr('disabled', true);
        alert('game finished');
        return;
    }

    if(number === 0)
        return;

    if (turn === ficha.length) {
        updateTurn(0, max++);
    }

    if(ficha[turn].isFinish) {
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
    if(player.position === 0) {
        return;
    }
    window.localStorage.setItem('opened_modal', '#question-modal');
    var number_question = window.localStorage.getItem('question_'+ player.position);
    if(!number_question) {
        window.localStorage.setItem('question_'+ player.position, '1');
        number_question = 1;
    } else {
        number_question = parseInt(number_question);
        if (number_question >= QUESTION_PER_BLOCK) {
            window.localStorage.setItem('question_'+ player.position, '1');
        } else {
            window.localStorage.setItem('question_'+ player.position, (number_question + 1));
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
    console.log(posisi_player_number_sementara, turn_sekarang)
    var ts = (turn_sekarang == 3) ? 2 : turn_sekarang

    if (jawab == jawaban[posisi_player_number_sementara[0]+'_'+posisi_player_number_sementara[1]]) {
        $('#modalBenar').modal('show');
        poin_player[ts] += 5
        console.log(poin_player[ts])
        $('#point-'+(ts+1)).text(poin_player[ts])
    } else {
        $('#modalSalah').modal('show');
        poin_player[ts] -= 3
        console.log(poin_player[ts])
        $('#point-'+(ts+1)).text(poin_player[ts])
    }
}