console.log('content started');

/* chrome.storage.sync.get(['currenturl'], function(result) {
    try {
        if (result['currenturl'].includes('careerjet') && result['currenturl'].includes('jobad')) {
            console.log('new job ad found', result['currenturl'])
        } else {
            throw 'Error - Not careerjet jobad'
        }
    } catch (e) {
    console.log('url not jobad', e)
    }
}); */

/* 
chrome.storage.sync.get(['currenturl'], function(result) {
    console.log(result['currenturl'])
}) */

/* 
chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("change recived!");
}); */