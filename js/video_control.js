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
    $(".play").prop('disabled', true);
    $(".seek1").prop('disabled', true);   
    $(".seek2").prop('disabled', true);
    $(".seek-comm").prop('disabled', true);
    $("#play-comm").prop('disabled', true);

    /**
     * 再生ボタン
     */
    $(".play").click(function(event) {
        
        index = $(this).attr('index');
        controlButton(index);

    }),
    /**
     * 共通再生ボタン
     */
    $("#play-comm").click(function(event) {
        state1 = playerObject[1].getPlayerState();
        state2 = playerObject[2].getPlayerState();
    
        if(state1 == state2){
            controlButton(1);
            controlButton(2);
        } else {
            controlButton(1, true);
            controlButton(2, true);
        }
    }),
    /**
     * 読込ボタン
     */
    $(".load").click(function(event){
        
        index = $(this).attr('index');
        sourceUrl = $('#source' + index).val();
        videoId = sourceUrl.split('v=')[1];

        if(videoId){
            // クエリパラメータ除去
            queryStringPos = videoId.indexOf('&');
            if(queryStringPos != -1) {
                videoId = videoId.substring(0, queryStringPos);
            }
        }
        autoPlay[index] = true;
        playerObject[index].cueVideoById(videoId); //loadVideoByIDは再生もセット
        
        $("#play" + index).prop('disabled', false);   
    }),
    /**
     * コマ送りボタン
     */
    $(".seek").click(function(event) {
        index = $(this).attr('index');
        t = parseFloat($(this).data('sec'));
        playerObject[index].seekTo(playerObject[index].getCurrentTime() + t, true);
    }),
    /**
     * 共通コマ送りボタン
     */
    $(".seek-comm").click(function(event) {
        t = parseFloat($(this).data('sec'));
        // console.log($(this).data('sec'));

        for(i = 1; i <= 2; i++){
            playerObject[i].seekTo(playerObject[i].getCurrentTime() + t, true);
        }
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
        $("#player" + i).height(sec_h);
    
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
    // $(".control").prop('disabled', false);
    checkSeekProp();
}

/**
 * 再生ステータスに応じてボタン状態を変更
 */
function changePlayButton(){
    state = {1:null, 2:null};
    for(i = 1; i<= 2; i++){
        state[i] = playerObject[i].getPlayerState();

        switch(state[i]){
            case YT.PlayerState.CUED:
                if(autoPlay[i]){
                    //自動再生
                    playerObject[i].playVideo();
                }
                break;

            case YT.PlayerState.PLAYING:
                //再生中は中央ボタンを停止ボタンに
                $(".playIcon" + i).removeClass('glyphicon-play'); 
                $(".playIcon" + i).addClass('glyphicon-pause');

                if(autoPlay[i]){
                    //自動再生時は停止後にフラグオフ
                    playerObject[i].pauseVideo();
                    autoPlay[i] = false;
                }
                break;

            case YT.PlayerState.PAUSED:
                //一時停止中は中央ボタンを再生ボタンに
                $(".playIcon" + i).removeClass('glyphicon-pause');
                $(".playIcon" + i).addClass('glyphicon-play');
                break; 
        }
    }


    if(state[1] == YT.PlayerState.PAUSED && state[2] == YT.PlayerState.PAUSED){
        //両方停止
        $(".playIcon-comm").removeClass('glyphicon-pause');
        $(".playIcon-comm").addClass('glyphicon-play');

    } else if(state[1] == YT.PlayerState.PLAYING || state[2] == YT.PlayerState.PLAYING){
        //どちらかが再生
        $(".playIcon-comm").removeClass('glyphicon-play');
        $(".playIcon-comm").addClass('glyphicon-pause');
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
 * 再生ステータス変更
 */
function onStateChange(event) {
    
    index = $(this).attr('index');
    changePlayButton();
    checkSeekProp();
}

/**
 * 再生制御
 * @param {}} index 
 * @param {*} stop  true指定時は停止状態にする
 */
function controlButton(index, stop = false){

    player_status = playerObject[index].getPlayerState();

    if(stop){
        playerObject[index].pauseVideo();
        return;
    }

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

/**
 * コマ送りボタン使用不可制御
 */
function checkSeekProp(){

    state1 = playerObject[1].getPlayerState();
    state2 = playerObject[2].getPlayerState();

    //一時停止中ならコマ送りを使用可
    $(".seek1").prop('disabled', !(state1 == YT.PlayerState.PAUSED));   
    $(".seek2").prop('disabled', !(state2 == YT.PlayerState.PAUSED));

    if(state1 == YT.PlayerState.PAUSED && state2 == YT.PlayerState.PAUSED){
        //両方停止
        $(".seek-comm").prop('disabled', false);
        $("#play-comm").prop('disabled', false);
    }
    if(state1 == YT.PlayerState.PLAYING && state2 == YT.PlayerState.PLAYING){
        //両方再生
        $(".seek-comm").prop('disabled', true);
        $("#play-comm").prop('disabled', false);
    }
    
}


