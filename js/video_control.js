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
        console.log(index);

        sourceUrl = $('#source' + index).val();
        console.log(sourceUrl);

        videoId = sourceUrl.split('v=')[1];
        console.log(videoId);

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
        console.log($(this).data('sec'));
        t = parseFloat($(this).data('sec'));
        playerObject[index].seekTo(playerObject[index].getCurrentTime() + t, true);
    })
}); 

/**
 * API初期設定
 */
function onYouTubePlayerAPIReady() {
    playerObject[1] = new YT.Player('player1', { // playerはiframeに置き換えるdivタグのid
                // height: '360', // プレイヤーの高さ
                // width: '640', // プレイヤーの幅
                events:{
                    'onError': onPlayerError,
                    'onStateChange': onStateChange,
                }
        });
    playerObject[2] = new YT.Player('player2', { // playerはiframeに置き換えるdivタグのid
        // height: '360', // プレイヤーの高さ
        // width: '640', // プレイヤーの幅
        events:{
            'onError': onPlayerError,
            'onStateChange': onStateChange,
        }
    });
    
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
    console.dir(event);
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


