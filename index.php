<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <title>比較動画メーカー(仮)</title>
    <meta name="description" content="Youtubeの動画を2つ並べて再生します。同時コマ送り機能付きでモトジムカーナのコース走行動画の比較などにどうぞ。">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <link href="css/hikaku.css" rel="stylesheet">
    <script>
        v1="<?=isset($_GET['v1']) && !empty($_GET['v1']) ? $_GET['v1'] : ''?>";
        v2="<?=isset($_GET['v2']) && !empty($_GET['v2']) ? $_GET['v2'] : ''?>";

        function firstPlay(data, num) {
            if (first_play['video' + num]) {
                if (data == YT.PlayerState.PLAYING) {
                    video['video' + num].pauseVideo();
//                    setTimeout(pauseVideo, 100);

                } else if(data == YT.PlayerState.PAUSED){

                    switch(num){
                        case 1:
                        <?php if(isset($_GET['v1o']) && !empty($_GET['v1o'])):?>
                            video['video' + num].seekTo(<?=$_GET['v1o']?>, true);
                        <?php endif;?>
                            break;
                        case 2:
                        <?php if(isset($_GET['v2o']) && !empty($_GET['v2o'])):?>
                            video['video' + num].seekTo(<?=$_GET['v2o']?>, true);
                        <?php endif;?>
                            break;
                    }
                    first_play['video' + num] = false;
                }
            }
        }

        function setShareUrl(){

            v1 = $("#video_id1").val();
            v2 = $("#video_id2").val();
            v1o =video['video1'].getCurrentTime();
            v2o =video['video2'].getCurrentTime();

            url = 'http://<?=$_SERVER["HTTP_HOST"]?>/hikaku?v1o='+v1o+'&v2o='+v2o+'&v1='+v1+'&v2='+v2;
            $("#share_url").val(url);
        }
    </script>
    <script src="js/video_control.js"></script>
    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-9797989-1']);
        _gaq.push(['_trackPageview']);
        (function () {
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(ga, s);
        })();
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
                    <li><a href="./help.php">使い方</a></li>
                    <li><a href="https://github.com/okazbb/DoubleTube">Github</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <div class="container">
        <div class="pageinfo">
            <h1>比較動画メーカー(仮)</h1>
            <h2>Youtube動画を2つ同時に再生して、比較動画っぽく表示してみます。</h2>
        </div>

        <div class="content">
            <div class="row">
                <?php for($i=1; $i<=2; $i++):?>
                <div class="panel col-md-5">
                    <div class="movie_url">
                        動画<?=$i?>のID&nbsp;<input type="text" class="video_id" num="<?=$i?>" id="video_id<?=$i?>" value="<?=isset($_GET['v'.$i]) ? $_GET['v'.$i] : ''?>" />
                        <button class="button_load btn btn-default" id="button<?=$i?>"><i class="glyphicon glyphicon-download"></i> 読込</button>
                    </div>

                    <div id="player<?=$i?>" class="player">
                    </div>

                    <div class="video_navi">
                        <button id="seek<?=$i?>prev2s" class="seekprev2s btn btn-default button_adjust" num="<?=$i?>"><i class="glyphicon glyphicon-backward"></i> -2.0秒</button>
                        <button id="seek<?=$i?>prev" class="seekprev btn btn-default button_adjust" num="<?=$i?>"><i class="glyphicon glyphicon-backward"></i> -0.1秒</button>
                        <span style="margin-left: 15px;"></span>
                        <button id="seek<?=$i?>next" class="seeknext btn btn-default button_adjust" num="<?=$i?>">+0.1秒 <i class="glyphicon glyphicon-forward"></i></button>
                        <button id="seek<?=$i?>next2s" class="seeknext2s btn btn-default button_adjust" num="<?=$i?>">+2.0秒 <i class="glyphicon glyphicon-forward"></i></button>
                    </div>
                </div>
                <?php endfor;?>
            </div>

            <div class="row">
                <div class="control col-xs-12 col-sm-4 col-md-4">
                    <button id="seekprev2s_a" class="btn button_player btn-default btn-lg" /><i class="glyphicon glyphicon glyphicon-backward"></i> -2.0秒</button>
                    <button id="seekprev_a" class="btn button_player btn-default btn-lg" /><i class="glyphicon glyphicon glyphicon-backward"></i> -0.1秒</button>
                </div>
                <div class="control col-xs-12  col-sm-4 col-md-4">
                    <button id="play" class="btn button_player btn-default btn-lg" /><i class="glyphicon glyphicon-play"></i> 再生</button>
                    <button id="pause" class="btn button_player btn-default btn-lg" /><i class="glyphicon glyphicon-pause"></i> 停止</button>
                </div>
                <div class="control col-xs-12 col-sm-4 col-md-4">
                    <button id="seeknext_a" class="btn button_player btn-default btn-lg" /><i class="glyphicon glyphicon-forward"></i> +0.1秒</button>
                    <button id="seeknext2s_a" class="btn button_player btn-default btn-lg" /><i class="glyphicon glyphicon-forward"></i> +2.0秒</button>
                </div>
            </div>

            <div class="row share">
                共有用リンク <input type="text" id="share_url" />
            </div>
        </div>

        <div class="loding">
            ロード中...
        </div>
    </div>
</body>
</html>
