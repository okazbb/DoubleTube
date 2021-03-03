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
