var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var playerObject = {
    1: null,
    2: null
};

/**
 * 初期
 */
$(document).ready(function(){
    
    /**
     * 再生ボタン
     */
    $(".play").click(function(event) {
        
        player_status = playerObject.getPlayerState();
        // console.log(player_status);

        switch(player_status){
            case YT.PlayerState.PLAYING:
                playerObject.pauseVideo();
                break;
            
            case YT.PlayerState.ENDED:
                playerObject.seekTo(0);

            default:
                playerObject.playVideo();
                
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
        // if(playerObject[videoId]){
            //動画変更
        playerObject[index].cueVideoById(videoId); //loadVideoByIDは再生もセット
        // playerObject[videoId].playVideo();
        // }
    }),
    /**
     * コマ送りボタン
     */
    $(".seek").click(function(event) {
        // console.log($(this).data('sec'));
        t = parseFloat($(this).data('sec'));
        playerObject.seekTo(playerObject.getCurrentTime() + t, true);
    })
}); 


function onYouTubePlayerAPIReady() {
    playerObject[1] = new YT.Player('player1', { // playerはiframeに置き換えるdivタグのid
                // height: '360', // プレイヤーの高さ
                // width: '640', // プレイヤーの幅
                events:{
                    'onError': onPlayerError
                }
        });
    playerObject[2] = new YT.Player('player2', { // playerはiframeに置き換えるdivタグのid
        // height: '360', // プレイヤーの高さ
        // width: '640', // プレイヤーの幅
    });
    
}

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
    // -1 – 未開始
    // 0 – 終了
    // 1 – 再生中
    // 2 – 一時停止
    // 3 – バッファリング中
    // 5 – 頭出し済み
    player_status = playerObject.getPlayerState();

    switch(player_status){    
        case YT.PlayerState.PLAYING:
            $("#play").text('停止');
            $(".seek").prop('disabled', true);
            break;

        case YT.PlayerState.PAUSED:
            $(".seek").prop('disabled', false);

        default:
            $("#play").text('再生');	   
    }
}


