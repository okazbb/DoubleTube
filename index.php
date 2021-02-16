<!DOCTYPE html>
<html lang="ja">
<?php include_once('setting.php');?>
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

        <button id="play<?=$i?>" class="play btn control_btn" index="<?=$i?>"><i class="playIcon<?=$i?> glyphicon glyphicon-play"></i></button>

        <button id="seek<?=$i?>-4" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+0.1">0.1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-5" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+1">1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-6" class="seek seek<?=$i?> btn seek_btn" index="<?=$i?>" data-sec="+2">2s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
    </div>
</div>
<?php endfor;?>
<div id="dual-control" class="clearfix">
        <button id="seek-comm-1" class="seek-comm btn common_seek_btn" index="0" data-sec="-2"><i class="glyphicon glyphicon-backward"></i>&nbsp;2s</button>
        <button id="seek-comm-2" class="seek-comm btn common_seek_btn" index="0" data-sec="-1"><i class="glyphicon glyphicon-backward"></i>&nbsp;1s</button>
        <button id="seek-comm-3" class="seek-comm btn common_seek_btn" index="0" data-sec="-0.1"><i class="glyphicon glyphicon-backward"></i>&nbsp;0.1s</button>

        <button id="play-comm" class="btn common_control_btn" index="0"><i class="playIcon-comm glyphicon glyphicon-play"></i></button>

        <button id="seek-comm-4" class="seek-comm btn common_seek_btn" index="0" data-sec="+0.1">0.1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek-comm-5" class="seek-comm btn common_seek_btn" index="0" data-sec="+1">1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek-comm-6" class="seek-comm btn common_seek_btn" index="0" data-sec="+2">2s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
</div>

<div id="footer">
    <ul>
        <li><input type="text" id="share_url" value="" placeholder="Share URL" /></input></li>
        <li>比較動画メーカー(仮)</li>
        <li><a href="https://github.com/okazbb/DoubleTube"><img src="image/github-icon.png"></a></li>
        <li><a href="https://twitter.com/okazbb"><img src="image/twitter-icon.png"></a></li>
        <!-- ShiroKuro Social Icons https://hail2u.net/blog/webdesign/shirokuro-social-icons-v1.5.html -->
    </ul>
</div>

</body>
</html>
