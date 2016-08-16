$(document).ready(function(){
    $("#play").click(function(event) {
        startVideo();
    }),
        $("#pause").click(function(event) {
            pauseVideo();
        }),
        $(".seekprev").click(function(event) {
            num = $(this).attr('num');
            video['video'+num].seekTo(video['video'+num].getCurrentTime() - 0.1, true);
        }),
        $(".seeknext").click(function(event) {
            num = $(this).attr('num');
            video['video'+num].seekTo(video['video'+num].getCurrentTime() + 0.1, true);
        }),
        $(".seekprev2s").click(function(event) {
            num = $(this).attr('num');
            video['video'+num].seekTo(video['video'+num].getCurrentTime() - 2.0, true);
        }),
        $(".seeknext2s").click(function(event) {
            num = $(this).attr('num');
            video['video'+num].seekTo(video['video'+num].getCurrentTime() + 2.0, true);
        }),
        $(".button_load").click(function(event){
            video_id = $(this).parent().find('.video_id');
            if(video_id.val().trim() != ''){
                num = video_id.attr('num');
                switch(num){
                    case '1':
                        video['video'+num] = null;
                        video['video'+num] = new YT.Player('player'+num, {
                            height: '390',
                            width: '640',
                            videoId: video_id.val(),
                            events: {
                                'onReady': onPlayerReady,
                                'onStateChange': onPlayerStateChange1
                            }
                        });
                        break;
                    case '2':
                        video['video'+num] = new YT.Player('player'+num, {
                            height: '390',
                            width: '640',
                            videoId: video_id.val(),
                            events: {
                                'onReady': onPlayerReady,
                                'onStateChange': onPlayerStateChange2
                            }
                        });
                        break;
                }
            }
        })
});
var tag = document.createElement('script');
// YT.PlayerState.ENDED
// YT.PlayerState.PLAYING
// YT.PlayerState.PAUSED
// YT.PlayerState.BUFFERING
// YT.PlayerState.CUED
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var video = {
    'video1': null ,
    'video2': null
};
var first_play = {
    'video1': true,
    'video2': true
}

function onYouTubeIframeAPIReady() {
    $(".loding").toggle('slow');
    $(".content").toggle('slow');
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange1(event) {
    firstPlay(event.data, 1);
    // setPlayButtonEnabled(1);
}

function onPlayerStateChange2(event) {
    firstPlay(event.data, 2);
    // setPlayButtonEnabled(2);


}

function firstPlay(data, num) {
    if (first_play['video' + num]) {
        if (data == YT.PlayerState.PLAYING) {
            setTimeout(pauseVideo, 1100);
            first_play['video' + num] = false;
        }
    }
}

//        function setPlayButtonEnabled(num){
//            if(
//                    video['video1'].getPlayerState() == YT.PlayerState.PAUSED
//                    && video['video2'].getPlayerState() == YT.PlayerState.PAUSED
//            ) {
//                $("#play").prop('disable', false);
//                alert('再生有効');
//            } else {
//                $("#play").prop('disable', true);
//                alert('再生無効');
//                if(
//                        video['video1'].getPlayerState() == YT.PlayerState.PLAYING
//                        || video['video2'].getPlayerState() == YT.PlayerState.PLAYING
//                ) {
//                    $("#pause").prop('disable', false);
//                    alert('停止無効');
//                } else {
//                    $("#pause").prop('disable', true);
//                    alert('停止有効');
//                }
//
//            }
//        }

function startVideo(){
    if((first_play['video1'] && first_play['video2']) == false){
        if(
            video['video1'].getPlayerState() == YT.PlayerState.PAUSED
            && video['video2'].getPlayerState() == YT.PlayerState.PAUSED
        ) {
            video['video1'].playVideo();
            video['video2'].playVideo();
        }

    }
}

function pauseVideo() {
    video['video1'] .pauseVideo();
    video['video2'] .pauseVideo();
}