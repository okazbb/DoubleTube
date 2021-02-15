$(document).ready(function(){
    $("#play").click(function(event) {
        start_or_pause();
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
	//再生
	$(".play").click(function(event) {

		num = $(this).attr('num');
		if(first_play['video' + num] == false){
			player_state = video['video' + num].getPlayerState();
			switch(player_state){
				case YT.PlayerState.PAUSED:
					//再生状態へ
					video['video' + num].playVideo();
					break;
					
				case YT.PlayerState.PLAYING:
				default:
					//停止状態へ
					video['video' + num].pauseVideo();
			}

        }
    }),
    $(".button_load").click(function(event){
        video_id = $(this).parent().find('.video_id');
        if(video_id.val().trim() != ''){
            num = video_id.attr('num');

            if(video['video'+num]){

                video['video'+num].clearVideo();
                first_play['video'+num] = true;
                video['video'+num].cueVideoById(video_id.val());
                video['video'+num].playVideo();
                // video['video'+num].pauseVideo();

            } else {

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
    setPlayButtonStatus(1);
	setShareUrl();
}

function onPlayerStateChange2(event) {
    firstPlay(event.data, 2);
    setPlayButtonStatus(2);
	setShareUrl();

}

/**
 * 同時再生ボタンの表示
 */

function setPlayButtonStatus(i){

	//個別ボタン
	player_status = video['video' + i].getPlayerState();
	switch(player_status){
		case YT.PlayerState.PAUSED:
			$("#control" + i).removeClass('glyphicon-pause');
			$("#control" + i).addClass('glyphicon-play');
			$("#control-label" + i).text('再生');
			
			break;
			
		case YT.PlayerState.PLAYING:
			$("#control" + i).removeClass('glyphicon-play');
			$("#control" + i).addClass('glyphicon-pause');
			$("#control-label" + i).text('停止');

	}

	//同時再生ボタン
	if(first_play['video1'] || first_play['video2']) return;
	if(
		video['video1'].getPlayerState() == YT.PlayerState.PAUSED
		&& video['video2'].getPlayerState() == YT.PlayerState.PAUSED
	) {
			$("#control").removeClass('glyphicon-pause');
			$("#control").addClass('glyphicon-play');
			$("#control-label").text('再生');
	
	} else {
	
		if(
				video['video1'].getPlayerState() == YT.PlayerState.PLAYING
				|| video['video2'].getPlayerState() == YT.PlayerState.PLAYING
		) {
				$("#control").removeClass('glyphicon-play');
				$("#control").addClass('glyphicon-pause');
				$("#control-label").text('停止');
	
		}
	
	}
}

/**
 * 同時再生・停止
 */
function start_or_pause(){
    if(first_play['video1'] || first_play['video2']) return;
	
	if(
		video['video1'].getPlayerState() == YT.PlayerState.PAUSED
		&& video['video2'].getPlayerState() == YT.PlayerState.PAUSED
	) {
		//両方停止なら再生
		video['video1'].playVideo();
		video['video2'].playVideo();
		
	} else {
		//再生中なら停止
		video['video1'].pauseVideo();
		video['video2'].pauseVideo();
		setShareUrl();
	}
}
