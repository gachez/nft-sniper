chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.collectionName){
        const url = `https://moonrank.app/mints/${request.collectionName}?after=0&complete=${true}` 
        fetch(url).then(function(res) {
            res.json().then(function(data) {
                sendResponse({rankData: data})
            })
        })
        .catch(err => {
            sendResponse({rankData: err})
        })
    }   
    return true 
})