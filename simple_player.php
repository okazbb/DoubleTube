<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>YoutubePlayerSample</title>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>
    var playerObject;
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /**
     * ロード完了
     */
    function onPlayerReady(event) {
        console.log('ready');
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

    /**
     * 表示
     */
    $(document).ready(function(){

        $("#play").click(function(event) {
            
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
        $("#load").click(function(event){
            
            source = $('#source').val();
            console.log(source);
            
            playerObject = new YT.Player('player', {
                height: 640,
                width: 480,
                videoId: source,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onStateChange
                }
            });
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
</script>
</head>
<body>
    <div id="player" style="border: solid 1px; width:640px; height: 480px; background-coloe: gray;"> 
        <!-- 動画表示エリア -->
    </div>
    <div>
        ID or URL <input type="text" id="source" value="xyVCXQqTZfE" />
        <button id="load">読込</button>
    </div>
    <div class="navi">
        <button id="seek1" class="seek" data-sec="-3" disabled="disabled"> 3sec <<</button>
        <button id="seek2" class="seek" data-sec="-1" disabled="disabled"> 1sec <<</button>
        <button id="seek3" class="seek" data-sec="-0.1" disabled="disabled"> 0.1sec <<</button>
        <button id="play" class="control" disabled="disabled">再生</button>
        <button id="seek4" class="seek" data-sec="+0.1" disabled="disabled"> >> 0.1sec</button>
        <button id="seek5" class="seek" data-sec="+1" disabled="disabled"> >> 1sec</button>
        <button id="seek6" class="seek" data-sec="+3" disabled="disabled"> >> 3sec</button>
    </div>
    
</body>
</html>
