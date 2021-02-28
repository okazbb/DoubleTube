<?php
include_once('setting.php');
if($CONST_USE_HTTP_REDIRECT){
    if (empty($_SERVER['HTTPS']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] != 'https') {
        header("Location: https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
        exit();
    }   
}
?>
<!DOCTYPE html>
<html lang="ja" xmlns:og="http://ogp.me/ns#">
<head>
    <meta charset="utf-8">
    <title>比較動画メーカー(仮) V2.0</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>
        videoIdParam = {
            1: '<?=isset($_GET['v1']) && !empty($_GET['v1']) ? $_GET['v1'] : ''?>',
            2: '<?=isset($_GET['v2']) && !empty($_GET['v2']) ? $_GET['v2'] : ''?>'
        }
        videoOffsetParam = {
            1: <?=isset($_GET['v1o']) && !empty($_GET['v1o']) ? $_GET['v1o'] : '0'?>,
            2: <?=isset($_GET['v2o']) && !empty($_GET['v2o']) ? $_GET['v2o'] : '0'?>
        }
    </script>
    <script src="js/video_control.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/hikaku.css" rel="stylesheet">
    <?php
    if($CONST_USE_ANALYTICS){
        include_once('analytics.php');
    }?>
    <meta name="description" content="Youtube動画を2つ同時に再生します。動画を読み込み後にコマ送りボタンで開始位置を合わせてか>ら同時再生すれば比較動画のように表示できます。">
    <meta name="twitter:card" content="summary" />
    <meta property="og:title" content="比較動画メーカー" />
    <meta property="og:image" content="https://www.riders.ws/hikaku/image/ogp-600-315.png" />
    <meta property="og:url" content="https://www.riders.ws/hikaku/" />
    <meta property="og:description" content="Youtube動画を比較動画のように表示します。読み込み後にコマ送りボタンで開始位置を合わせてから再生してください。" />
</head>
<body>
<?php for($i = 1; $i <=2 ; $i++):?>
<div id="window<?=$i?>" class="window">
    <div id="info<?=$i?>" class="info">
        <input type="text" id="source<?=$i?>" value="<?=$CONST_DEFAULT_URL[$i]?>"  class="url" placeholder="Youtube Video URL"　/>
        <button id="load<?=$i?>" class="load btn info_btn" index="<?=$i?>"><i class="glyphicon glyphicon-search"></i></button>
    </div>

    <div id="player<?=$i?>" class="player" index="<?=$i?>"> 
        <!-- video<?=$i?> -->
    </div>

    <div id="control<?=$i?>" class="control">
        <button id="seek<?=$i?>-1" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="-2"><i class="glyphicon glyphicon-backward"></i>&nbsp;2s</button>
        <button id="seek<?=$i?>-2" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="-1"><i class="glyphicon glyphicon-backward"></i>&nbsp;1s</button>
        <button id="seek<?=$i?>-3" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="-0.1"><i class="glyphicon glyphicon-backward"></i>&nbsp;0.1s</button>
        <button id="seek<?=$i?>-4" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="-0.02"><i class="glyphicon glyphicon-backward"></i>&nbsp;0.02s</button>

        <button id="play<?=$i?>" class="play btn control_btn" index="<?=$i?>"><i class="playIcon<?=$i?> glyphicon glyphicon-play"></i></button>

        <button id="seek<?=$i?>-5" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+0.02">0.02s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-6" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+0.1">0.1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-7" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+1">1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-8" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+2">2s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
    </div>
</div>
<?php endfor;?>
<div id="dual-control">
        <button id="seek-comm-1" class="seek-comm btn common_seek_btn" index="0" data-sec="-2"><i class="glyphicon glyphicon-backward"></i>&nbsp;2s</button>
        <button id="seek-comm-2" class="seek-comm btn common_seek_btn" index="0" data-sec="-1"><i class="glyphicon glyphicon-backward"></i>&nbsp;1s</button>
        <button id="seek-comm-3" class="seek-comm btn common_seek_btn" index="0" data-sec="-0.1"><i class="glyphicon glyphicon-backward"></i>&nbsp;0.1s</button>

        <button id="play-comm" class="btn common_control_btn" index="0"><i class="playIcon-comm glyphicon glyphicon-play"></i></button>

        <button id="seek-comm-4" class="seek-comm btn common_seek_btn" index="0" data-sec="+0.1">0.1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek-comm-5" class="seek-comm btn common_seek_btn" index="0" data-sec="+1">1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek-comm-6" class="seek-comm btn common_seek_btn" index="0" data-sec="+2">2s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
</div>
<div id="time_control" class="clearfix">
    <input type="text" readonly id="offset1" value="0.00" class="txt" />
    <button id="reset" class="btn reset_btn"><i class="glyphicon glyphicon-refresh"></i></button>
    <input type="text" readonly id="offset2" value="0.00" class="txt" />
</div>

<div id="footer">
    <ul>
        <li><a href="https://www.riders.ws/hikaku/">比較動画メーカー(仮)</a></li>
        <li><a href="https://github.com/okazbb/DoubleTube"><img src="image/github-icon.png"></a></li>
        <li><a href="https://twitter.com/okazbb"><img src="image/twitter-icon.png"></a></li>
        <!-- ShiroKuro Social Icons https://hail2u.net/blog/webdesign/shirokuro-social-icons-v1.5.html -->
    </ul>
</div>

</body>
</html>
