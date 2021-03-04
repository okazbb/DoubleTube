/**
 * 動画ID指定時にロードボタン押下のヘルプ
 * @param {} videoIdParam 
 */
function showRecommend(videoIdParam = {}){
    
    if(videoIdParam){
        if(videoIdParam[1] != '' && videoIdParam[2] != ''){
            
            introJs().addSteps([{
                    element: '#play1',
                    intro: "Youtube動画の再生ボタンを押してください。<br />一瞬再生して一時停止状態になりコマ送りボタンが使用できるようになります。"                
                },
                {
                    element: '#play2',
                    intro: "右の動画も同様に再生ボタンを押してください。"                
                }]).start();

        } else if(videoIdParam[1] == ''){
            
            introJs().addSteps([{
                element: '#play2',
                intro: "Youtube動画の再生ボタンを押してください。<br />一瞬再生して一時停止状態になりコマ送りボタンが使用できるようになります。"                
            }]).start();

        } else if(videoIdParam[2] == ''){
            
            introJs().addSteps([{
                element: '#play1',
                intro: "Youtube動画の再生ボタンを押してください。<br />一瞬再生して一時停止状態になりコマ送りボタンが使用できるようになります。"                
            }]).start();
    
        }
        introJs().start();
    }
}

/**
 * ヘルプ
 */
function startTutorial(){

    introJs().addSteps([{
        element: '#source1',
        intro: "再生したいYoutube動画のURLを貼り付けてください。<br /><br />虫眼鏡ボタンを押すと動画を読み込み、一瞬再生後に一時停止状態になります。"                
    },
    {
        element: '#play1',
        intro: "コマ送りボタンを使用して、動画の再生位置を調整してください。"                
    },
    {
        element: '#source2',
        intro: "右の動画も同様に読み込んで再生位置を調整してください。"                
    },
    {
        element: '#play-comm',
        intro: "再生ボタンを押すと、左右同時に動画を再生します。<br />(中央のボタンは左右の動画を同時に操作します)<br /><br />ラグなどでズレが出た場合は一時停止し、コマ送りなどで再生位置を調整してください。"                
    },
    {
        element: '#reset',
        intro: "左右の動画の時間差を表示しています。<br /><br />リセットボタンを押すと、現在の位置を基準とした時間差を表示します。"                
    }
]).start();

}