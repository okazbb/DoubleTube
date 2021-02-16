/**
 * player
 */
var playerObject = {
    1: null,
    2: null
};

/**
 * 自動再生フラグ
 */
var autoPlay = {
    1: false,
    2: false
}

/**
 * YoutubeAPI
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(document).ready(function(){  
    /**
     * 再生ボタン
     */
    $(".play").click(function(event) {
        
        index = $(this).attr('index');
        if(index == 0){
            controlButton(1);
            controlButton(2);
        } else {
            controlButton(index);
        }
        
    }),
    /**
     * 読込ボタン
     */
    $(".load").click(function(event){
        
        index = $(this).attr('index');
        // console.log(index);

        sourceUrl = $('#source' + index).val();
        // console.log(sourceUrl);

        videoId = sourceUrl.split('v=')[1];
        // console.log(videoId);

        if(videoId){
            // クエリパラメータ除去
            queryStringPos = videoId.indexOf('&');
            if(queryStringPos != -1) {
                videoId = videoId.substring(0, queryStringPos);
            }
        }
        autoPlay[index] = true;
        playerObject[index].cueVideoById(videoId); //loadVideoByIDは再生もセット

    }),
    /**
     * コマ送りボタン
     */
    $(".seek").click(function(event) {
        index = $(this).attr('index');
        // console.log($(this).data('sec'));

        t = parseFloat($(this).data('sec'));
        playerObject[index].seekTo(playerObject[index].getCurrentTime() + t, true);
    })
}); 

/**
 * API初期設定
 * @see <a href="https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5&hl=ja">IFrame Player API Params</a>
 */
function onYouTubePlayerAPIReady() {

    for(i = 1; i <=2; i++){
        sec_w = $("#player" + i).width();
        sec_h = sec_w * 0.57;

        playerObject[i] = new YT.Player('player' + i, { // playerはiframeに置き換えるdivタグのid
            height: sec_h, // プレイヤーの高さ
            width: sec_w, // プレイヤーの幅
            playerVars: {
                'rel': 0,
                'showinfo': 0,
                'autoplay': 0
            },            
            events:{
                'onError': onPlayerError,
                'onStateChange': onStateChange,
            }
        });
    }
    
}

/**
 * エラー
 * @param {*} event 
 */
function onPlayerError(event){
    console.log('error');
}

/**
 * ロード完了
 */
function onPlayerReady(event) {
    $(".control").prop('disabled', false);
}

/**
 * 再生ステータス変更
 */
function onStateChange(event) {
    
    index = $(this).attr('index');

    // console.log('index='+index);
    // console.dir(event);
    player_status = playerObject[index].getPlayerState();

//    console.log('state='+player_status);

    //再生ステータスに応じてボタン状態を変更する
    switch(player_status){
        case YT.PlayerState.CUED:
            if(autoPlay[index]){
                //自動再生
                playerObject[index].playVideo();
            }
            break;

        case YT.PlayerState.PLAYING:
            //再生中は中央ボタンを停止ボタンに
            $(".playIcon" + index).removeClass('glyphicon-play'); 
            $(".playIcon" + index).addClass('glyphicon-pause');
            //再生中はコマ送り使用不可
            $(".seek").prop('disabled', true);

            if(autoPlay[index]){
                //自動再生時は停止後にフラグオフ
                playerObject[index].pauseVideo();
                autoPlay[index] = false;
            }
            break;

        case YT.PlayerState.PAUSED:
            //一時停止中は中央ボタンを再生ボタンに
            $(".playIcon" + index).removeClass('glyphicon-pause');
            $(".playIcon" + index).addClass('glyphicon-play');
            //一時停止中はコマ送りを使用可能に
            $(".seek").prop('disabled', false);

        default:
            //$(".play").text('再生');	   
    }

    // YT.PlayerState
    // -1 – 未開始
    // 0 – 終了 YT.PlayerState.ENDED
    // 1 – 再生中 YT.PlayerState.PLAYING
    // 2 – 一時停止 YT.PlayerState.PAUSED
    // 3 – バッファリング中 YT.PlayerState.BUFFERING
    // 5 – 頭出し済み YT.PlayerState.CUED
}

/**
 * 再生
 * @param {} index 
 */
function controlButton(index){

    player_status = playerObject[index].getPlayerState();
    // console.log(player_status);

    switch(player_status){
        case YT.PlayerState.PLAYING:
            playerObject[index].pauseVideo();
            break;
        
        case YT.PlayerState.ENDED:
            playerObject[index].seekTo(0);
            playerObject[index].playVideo();
            break;

        default:
            playerObject[index].playVideo();
            
    }
}


