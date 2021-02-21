/**
 * player
 */
var playerObject = {1: null,　2: null};
var plaeyer_width;
var player_height;

/**
 * 自動再生フラグ
 */
var autoPlay = {1: false,2: false}

/**
 * YoutubeAPI
 */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

/**
 * ready
 */
$(function(){  

    setScreenDefault();

    /**
     * 再生ボタン
     */
    $(".play").click(function(event) {
        
        index = $(this).attr('index');
        togglePlayButton(index);

    }),
    /**
     * 共通再生ボタン
     */
    $("#play-comm").click(function(event) {
        state1 = playerObject[1].getPlayerState();
        state2 = playerObject[2].getPlayerState();
    
        if(state1 == state2){
            togglePlayButton(1);
            togglePlayButton(2);
        } else {
            togglePlayButton(1, true);
            togglePlayButton(2, true);
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

            autoPlay[index] = true;
            if(playerObject[index]){
                //2回目以降
                playerObject[index].cueVideoById(videoId);

            } else {
                autoPlay[index] = true;
                videoIdParam[index] = videoId,
                playerObject[index] = new YT.Player(
                    'player' + index, 
                    { // playerはiframeに置き換えるdivタグのid
                        height: player_height, // プレイヤーの高さ
                        width: plaeyer_width, // プレイヤーの幅
                        // videoId: videoId,
                        playerVars: {
                            'rel': 0,
                            'showinfo': 0,
                            'autoplay': 0
                        },            
                        events:{
                            'onError': onPlayerError,
                            'onStateChange': onStateChange,
                            'onReady': onPlayerReady,
                        }
                    }
                );
            }            
        }
       
    }),
    /**
     * コマ送りボタン
     */
    $(".seek").click(function(event) {
        index = $(this).attr('index');
        t = parseFloat($(this).data('sec'));
        playerObject[index].seekTo(playerObject[index].getCurrentTime() + t, true);
        setShareUrl();
    }),
    /**
     * 共通コマ送りボタン
     */
    $(".seek-comm").click(function(event) {
        t = parseFloat($(this).data('sec'));

        for(i = 1; i <= 2; i++){
            playerObject[i].seekTo(playerObject[i].getCurrentTime() + t, true);
        }
        setShareUrl();
    })
}); 

/**
 * API初期設定
 * @see <a href="https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5&hl=ja">IFrame Player API Params</a>
 */
function onYouTubePlayerAPIReady() {

    for(i = 1; i <=2; i++){
        //GETパラメータ有ならPlayerをロード
        if(videoIdParam[i] != ''){
        
            autoPlay[i] = true;
            playerObject[i] = new YT.Player(
                'player' + i, 
                { // playerはiframeに置き換えるdivタグのid
                    height: player_height, // プレイヤーの高さ
                    width: plaeyer_width, // プレイヤーの幅
                    // videoId: videoIdParam[i],
                    playerVars: {
                        'rel': 0,
                        'showinfo': 0,
                        'autoplay': 0
                    },            
                    events:{
                        'onError': onPlayerError,
                        'onStateChange': onStateChange,
                        'onReady': onPlayerReady,
                    }
                }
            );
        }
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
    
    dom =event.target.getIframe();
    i = dom.getAttribute('index');

    if(videoIdParam[i] != ''){
        autoPlay[i] = true;
        playerObject[i].cueVideoById(
            videoIdParam[i],
            videoOffsetParam[i]
        );        
    }
}

/**
 * 再生ステータスに応じてボタン状態を変更
 */
function changePlayButtonStatus(i){

    state = playerObject[i].getPlayerState();
    
    switch(state){
        case 3: //バッファリング中
            break;

        case -1: //未開始

        case YT.PlayerState.CUED: //5
            $('#source' + i).val(playerObject[i].getVideoUrl());
            if(autoPlay[i]){
                //自動再生
                playerObject[i].playVideo();
            }
            $("#play" + i).prop('disabled', false);   
            break;

        case YT.PlayerState.PLAYING: //1
            //再生中は中央ボタンを停止ボタンに
            $(".playIcon" + i).removeClass('glyphicon-play'); 
            $(".playIcon" + i).addClass('glyphicon-pause');

            if(autoPlay[i]){
                //自動再生時は停止後にフラグオフ
                autoPlay[i] = false;
                playerObject[i].pauseVideo();
                
            }
            break;

        case YT.PlayerState.PAUSED: //2
            //一時停止中は中央ボタンを再生ボタンに
            $(".playIcon" + i).removeClass('glyphicon-pause');
            $(".playIcon" + i).addClass('glyphicon-play');
            setShareUrl();
            break; 
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
    
    dom =event.target.getIframe();
    i = dom.getAttribute('index');

    changePlayButtonStatus(i);
    checkSeekButtonProp();
    // togglePlayButton(index);
}

/**
 * 再生ボタン切替
 * @param index 
 * @param stop true指定時は停止状態にする
 */ 
function togglePlayButton(index, stop = false){

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
function checkSeekButtonProp(){

    if(playerObject[1]){
        state1 = playerObject[1].getPlayerState();
    } else {
        state1 = -1;
    }
    if(playerObject[2]){
        state2 = playerObject[2].getPlayerState();
    } else {
        state2 = -1;
    }
    //一時停止中ならコマ送りを使用可
    $(".seek1").prop('disabled', !(state1 == YT.PlayerState.PAUSED));   
    $(".seek2").prop('disabled', !(state2 == YT.PlayerState.PAUSED));

    if(state1 == YT.PlayerState.PAUSED && state2 == YT.PlayerState.PAUSED){
        //両方停止
        $(".seek-comm").prop('disabled', false);
        $("#play-comm").prop('disabled', false);
        $(".playIcon-comm").removeClass('glyphicon-pause');
        $(".playIcon-comm").addClass('glyphicon-play');

    }
    
    if(state1 == YT.PlayerState.PLAYING || state2 == YT.PlayerState.PLAYING){
        if(state1 == YT.PlayerState.PLAYING && state2 == YT.PlayerState.PLAYING){
            //両方再生
            $(".seek-comm").prop('disabled', true);
            $("#play-comm").prop('disabled', false);
        } else {
            //どちらかが再生
            $(".playIcon-comm").removeClass('glyphicon-play');
            $(".playIcon-comm").addClass('glyphicon-pause');
        }
    }
}

/**
 * 共有用リンク更新
 */
function setShareUrl(){
    if(playerObject[1] && playerObject[1].getPlayerState() != YT.PlayerState.PAUSED){
        return;
    } 
    if(playerObject[2] && playerObject[2].getPlayerState() != YT.PlayerState.PAUSED){
        return;
    } 
    
    videoId = {1: null, 2: null};
    videoOffset = {1: null, 2: null};

    for(i = 1; i <= 2; i++){
        if(!playerObject[i]) continue; 
        u = new URL(playerObject[i].getVideoUrl());
        videoId[i] = u.searchParams.get('v');

        w = playerObject[i].getCurrentTime();
        w = w * 100;
        w = Math.round(w)
        videoOffset[i] = w / 100;
    }
    
    url = new URL(location.href);
    for(i = 1; i <=2; i++){
        if(videoId[i]) url.searchParams.set('v'+i, videoId[i]);
        if(videoOffset[i]) url.searchParams.set('v'+i+'o', videoOffset[i])
    }
    history.replaceState(null, '', url.href);

}
/**
 * 要素の初期状態
 */
function setScreenDefault(){
    $(".play").prop('disabled', true);
    $(".seek1").prop('disabled', true);   
    $(".seek2").prop('disabled', true);
    $(".seek-comm").prop('disabled', true);
    $("#play-comm").prop('disabled', true);

    for(i = 1; i <=2; i++){
        plaeyer_width = $("#player" + i).width();
        player_height = plaeyer_width * 0.57;
        $("#player" + i).height(player_height);
    }
}