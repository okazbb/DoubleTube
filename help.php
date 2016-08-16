<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>比較動画メーカー(仮)ヘルプ</title>
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
                    <li><a href="./">ホーム</a></li>
                    <li class="active"><a href="#">使い方</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

    <div class="container">
        <div class="pageinfo">
            <h1>比較動画メーカー(仮)の使い方</h1>
        </div>


        <hr size="1" />

        <p>
            <b>1)動画1の読み込み</b><br />
            「動画1のID」にYoutubeの動画IDを貼り付けて、「読み込み」をクリックしてください。<br />
            動画IDが正しければ動画が表示され、1秒間だけ再生して一時停止します。<br />
            <img src="image/m1.png" />
        </p>

        <hr size="1" />

        <p>
            <b>2)動画2の読み込み</b><br />
            「動画2のID」も同じようにして動画を読み込んでください。<br />
            <img src="image/m2.png" />
        </p>

        <hr size="1" />
        <p>
            <b>3)動画の基準ポイントの調整</b><br />
            動画の下にある「-0.1秒」「+0.1秒」のコマ送りボタンを使って、2つの動画の基準位置を合わせます。<br />
            この例では、スタート直後のパイロンを通過する瞬間に合わせてみました。<br />
            <img src="image/m3.png" />
        </p>

        <hr size="1" />

        <p>
            <b>4)同時再生</b><br />
            位置合わせ後に「同時再生」ボタンを押すと、2つの動画が同時に再生開始します。<br />
            比較動画っぽい！<br />
            <img src="image/m4.png" />
        </p>

        <hr size="1" />

        <p>
            ※同時再生ボタンを押すタイミングによっては、再生がズレてしまう場合もあります。<br />
            その時は停止して、3)の調整を再度行ってください。
        </p>

        <p>
            ※以下のサンプルのように、URLに動画IDを埋め込むこともできます<br />
            <a href="./?v1=W99hdYsNNYg&v2=QHMgfVxvXhY">hikaku/?v1=W99hdYsNNYg&v2=QHMgfVxvXhY</a>
        </p>
    </div>
</body>