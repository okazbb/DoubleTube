$(document).ready(function(){
    $("#play").click(function(event) {
        startVideo();
    }),
    $("#pause").click(function(event) {
        pauseVideo();
    }),
    $("#seekprev_a").click(function(event) {
        for(i=1; i<=2; i++) {
            video['video' + i].seekTo(video['video' + i].getCurrentTime() - 0.1, true);
        }
        setShareUrl();
    }),
    $("#seeknext_a").click(function(event) {
        for(i=1; i<=2; i++) {
            video['video' + i].seekTo(video['video' + i].getCurrentTime() + 0.1, true);
        }
        setShareUrl();
    }),
    $("#seekprev2s_a").click(function(event) {
        for(i=1; i<=2; i++) {
            video['video' + i].seekTo(video['video' + i].getCurrentTime() - 2.0, true);
        }
        setShareUrl();
    }),
    $("#seeknext2s_a").click(function(event) {
        for(i=1; i<=2; i++) {
            video['video' + i].seekTo(video['video' + i].getCurrentTime() + 2.0, true);
        }
        setShareUrl();
    }),

    $(".seekprev").click(function(event) {
        num = $(this).attr('num');
        video['video'+num].seekTo(video['video'+num].getCurrentTime() - 0.1, true);
        setShareUrl();
    }),
    $(".seeknext").click(function(event) {
        num = $(this).attr('num');
        video['video'+num].seekTo(video['video'+num].getCurrentTime() + 0.1, true);
        setShareUrl();
    }),
    $(".seekprev2s").click(function(event) {
        num = $(this).attr('num');
        video['video'+num].seekTo(video['video'+num].getCurrentTime() - 2.0, true);
        setShareUrl();
    }),
    $(".seeknext2s").click(function(event) {
        num = $(this).attr('num');
        video['video'+num].seekTo(video['video'+num].getCurrentTime() + 2.0, true);
        setShareUrl();
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
                            'onReady': onPlayerReady1,
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
                            'onReady': onPlayerReady2,
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

/**
 * APIロード済
 */
function onYouTubeIframeAPIReady() {
    $(".loding").toggle('slow');
    $(".content").toggle('slow');

    if(v1 != ''){
        $("#button1").trigger("click");
    }

    if(v2 != ''){
        $("#button2").trigger("click");
    }
}

function onPlayerReady1(event) {
    event.target.playVideo();
}

function onPlayerReady2(event) {
    event.target.playVideo();
}

function onPlayerStateChange1(event) {
    firstPlay(event.data, 1);
    setShareUrl();
    // setPlayButtonEnabled(1);
    setPlayButtonStatus();
}

function onPlayerStateChange2(event) {
    firstPlay(event.data, 2);
    // setPlayButtonEnabled(2);
    setShareUrl();
    setPlayButtonStatus();

}

/**
 * 同時再生ボタンの表示
 */

function setPlayButtonStatus(){
    for(i=1;i<=2;i++) {
        console.log('v' + num + " status= " + video['video' + num].getPlayerState());
    }
   if(
       video['video1'].getPlayerState() == YT.PlayerState.PAUSED
       && video['video2'].getPlayerState() == YT.PlayerState.PAUSED
   ) {
       enableBtn("#play");

   } else {
       disableBtn("#play");

       if(
               video['video1'].getPlayerState() == YT.PlayerState.PLAYING
               || video['video2'].getPlayerState() == YT.PlayerState.PLAYING
       ) {
           enableBtn("#pause");
       } else {
           disableBtn("#pause");
       }

   }

}

/**
 * ボタンを有効
 * @param id
 */
function enableBtn(id){
    $(id).removeAttr('disabled');
    $(id).removeClass('disabled');
}

/**
 * ボタンを無効
 * @param id
 */
function disableBtn(id){
    $(id).attr('disabled', true);
    $(id).addClass('disabled');
}

/**
 * 同時再生
 */
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

/**
 * 同時停止
 */
function pauseVideo() {
    for(i=1; i<=2; i++){
        video['video'+i].pauseVideo();
    }
    setShareUrl();
}