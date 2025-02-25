    let heroBlock = document.querySelector('.hero__block');
    let heroVideo = document.getElementById('heroVideo');
    let aroundContainer = document.querySelector('.around-container');
    let aroundContainerPaddingTop = window.getComputedStyle(aroundContainer).paddingTop;
    

    //Размеры видео в зависимости от экрана пользователя
    if(heroBlock) {
        heroBlock.style.minHeight = `calc(100svh - ${header.clientHeight}px - ${aroundContainerPaddingTop})`;
    }
    if(heroVideo) {
        heroVideo.style.minHeight = `calc(100svh - ${header.clientHeight}px - ${aroundContainerPaddingTop})`;
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (heroVideo) {
            heroVideo.play()
        }
    });
     

    if(innerWidth < 576) {
        document.body.addEventListener('click', function () {
            if (!heroVideo.paused) {
            } else {
                
                heroVideo.play();
            }
        });
        
        document.body.addEventListener('touchstart', function () {
            if (!heroVideo.paused) {
                
            } else {
                
                heroVideo.play();
            }
        });
    }