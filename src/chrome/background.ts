export {}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.collectionName){
        const urlMoonRank = `https://moonrank.app/mints/${request.collectionName}?after=0&complete=${true}` 
        fetch(urlMoonRank).then(value => value.json())
            .then((moonRankData) => {
                sendResponse({
                    moonRankData: moonRankData
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }   
    return true 
})