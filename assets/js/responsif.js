function setFichaFontSize() {
    const board = document.querySelector('#board');
    const ficha = document.querySelector('.ficha');

    if (board && ficha) {
        const boardWidth = board.offsetWidth;
        const fontSize = (5 / 100) * boardWidth;
        ficha.style.fontSize = fontSize + 'px';
    }
}

// Atur font-size .ficha saat halaman dimuat
window.addEventListener('load', setFichaFontSize);

// Atur ulang font-size .ficha saat ukuran jendela berubah
window.addEventListener('resize', setFichaFontSize);

// function posisiPlayerWrapper() {
//     const pw = document.querySelector('.player-wrapper');
//     let lebarJendela = window.outerWidth;
//     let tinggiJendela = window.outerHeight;
//     if (lebarJendela < 1190) {
//         pw.style.float = 'left';
//         $('.player-wrapper').addClass('col-11 d-flex')
//         $('.player-wrapper').children().css('width', '213px');
//         if (lebarJendela > 950) {
//             pw.style.marginTop = 600 + 'px'
//         } else {
//             pw.style.marginTop = 64 + "vw";
//             console.log('disana')
//         }
//     } else {
//         pw.style.marginTop = 0
//         $('.player-wrapper').removeClass('col-11 d-flex')
//         $('.player-wrapper').children().css('width', 'auto');
//         pw.style.float = 'right';
//     }
// }

// // Atur font-size .ficha saat halaman dimuat
// window.addEventListener('load', posisiPlayerWrapper);

// // Atur ulang font-size .ficha saat ukuran jendela berubah
// window.addEventListener('resize', posisiPlayerWrapper);


for (let i = 0; i <= 50; i++) {
    window.addEventListener('resize', function() {
        posisiFicha(i);
    });
}

