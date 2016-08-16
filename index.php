<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>比較動画メーカー(仮)</title>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link href="css/hikaku.css" rel="stylesheet">
    <script src="js/video_control.js"></script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-9797989-2', 'auto');
        ga('send', 'pageview');

        <?php if(isset($_GET['L']) && isset($_GET['R'])):?>
        //        $("#button1").trigger("click");
        //        $("#button2").trigger("click");
        <?php endif;?>
    </script>
</head>
<body>
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="./">比較動画メーカー(仮)</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="./">ホーム</a></li>
                    <li><a href="./help.php">使い方</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <div class="container">
        <div class="pageinfo">
        <h1>比較動画メーカー(仮)</h1>
        <h2>Youtube動画を2つ同時に再生して、比較動画っぽく表示してみます。</h2>
</div>
        <div class="loding">
            ロード中...
        </div>

        <div class="content">
            <div class="row">
                <?php for($i=1; $i<=2; $i++):?>
                <div class="panel col-md-5">
                    動画<?=$i?>のID&nbsp;<input type="text" class="video_id" num="<?=$i?>" value="<?=isset($_GET['v'.$i]) ? $_GET['v'.$i] : ''?>" />
                    <button class="button_load btn btn-default" id="button<?=$i?>"><i class="glyphicon glyphicon-download"></i> 読込</button>
                    <br />
                    <div id="player<?=$i?>" class="player"></div>
                    <br />
                    <button id="seek<?=$i?>prev2s" class="seekprev2s btn btn-default button_adjust" num="<?=$i?>"><i class="glyphicon glyphicon-backward"></i> -2.0秒</button>
                    <button id="seek<?=$i?>prev" class="seekprev btn btn-default button_adjust" num="<?=$i?>"><i class="glyphicon glyphicon-backward"></i> -0.1秒</button>
                    <span style="margin-left: 20px;"></span>
                    <button id="seek<?=$i?>next" class="seeknext btn btn-default button_adjust" num="<?=$i?>">+0.1秒 <i class="glyphicon glyphicon-forward"></i></button>
                    <button id="seek<?=$i?>next2s" class="seeknext2s btn btn-default button_adjust" num="<?=$i?>">+2.0秒 <i class="glyphicon glyphicon-forward"></i></button>
                </div>
                <?php endfor;?>
            </div>

            <div class="row">
                <div class="control col-md-3">
                    <button id="play" class="button_player btn-lg btn-default" /><i class="glyphicon glyphicon-play"></i> 再　　生</button>
                </div>
                <div class="control col-md-3">
                    <button id="pause" class="button_player btn-lg btn-default" /><i class="glyphicon glyphicon-pause"></i> 一時停止</button>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
