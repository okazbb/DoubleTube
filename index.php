<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>比較動画メーカー(仮) V2.0</title>
    <script src="js/video_control.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/hikaku.css" rel="stylesheet">
</head>
<body>
<?php for($i = 1; $i <=2 ; $i++):?>
<div id="window<?=$i?>" class="window">
    
    <div class="info">
        <input type="text" id="source<?=$i?>" value="" class="url" placeholder="Youtube Video URL or ID "　/>
        <button id="load<?=$i?>" class="btn info_btn"><i class="glyphicon glyphicon-search"></i></button>
    </div>

    <div id="player<?=$i?>" class="player"> 
        <!-- video<?=$i?> -->
    </div>
    <div class="control">
        <button id="seeek<?=$i?>-1" class="seek btn control_btn" data-sec="-2"><i class="glyphicon glyphicon-backward"></i>&nbsp;2s</button>
        <button id="seek<?=$i?>-2" class="seek btn control_btn" data-sec="-1"><i class="glyphicon glyphicon-backward"></i>&nbsp;1s</button>
        <button id="seek<?=$i?>-3" class="seek btn control_btn" data-sec="-0.1"><i class="glyphicon glyphicon-backward"></i>&nbsp;0.1s</button>

        <button id="play" class="play btn control_btn"><i class="glyphicon glyphicon-play"></i></button>

        <button id="seek<?=$i?>-4" class="seek btn control_btn" data-sec="+0.1">0.1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-5" class="seek btn control_btn" data-sec="+1">1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-6" class="seek btn control_btn" data-sec="+2">2s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
    </div>
    
</div>
<?php endfor;?>
<div class="dual-control">
        <button id="seeek<?=$i?>-1" class="seek btn common_btn" data-sec="-2"><i class="glyphicon glyphicon-backward"></i>&nbsp;2s</button>
        <button id="seek<?=$i?>-2" class="seek btn common_btn" data-sec="-1"><i class="glyphicon glyphicon-backward"></i>&nbsp;1s</button>
        <button id="seek<?=$i?>-3" class="seek btn common_btn" data-sec="-0.1"><i class="glyphicon glyphicon-backward"></i>&nbsp;0.1s</button>

        <button id="play" class="play btn common_btn"><i class="glyphicon glyphicon-play"></i></button>

        <button id="seek<?=$i?>-4" class="seek btn common_btn" data-sec="+0.1">0.1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-5" class="seek btn common_btn" data-sec="+1">1s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
        <button id="seek<?=$i?>-6" class="seek btn common_btn" data-sec="+2">2s&nbsp;<i class="glyphicon glyphicon-forward"></i></button>
</div>

<div class="footer">
    
    <ul>
        <li>比較動画メーカー(仮)</li>
        <li><a href="https://github.com/okazbb/DoubleTube"><img src="image/github-icon.png"></a></li>
        <li><a href="https://twitter.com/okazbb"><img src="image/twitter-icon.png"></a></li>
    </ul>
</div>

</body>
</html>
