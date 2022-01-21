chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.collectionName){
        const urlMoonRank = `https://moonrank.app/mints/${request.collectionName}?after=0&complete=${true}` 
        const urlHowRare = `https://howrare.is/${request.collectionName}`
        Promise.all([
            fetch(urlMoonRank).then(value => value.json()),
            fetch(urlHowRare).then(value => value.text())
            ])
            .then(([moonRankData, howRareRank]) => {
                sendResponse({
                    moonRankData: moonRankData,
                    howRareRank: howRareRank
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }   
    return true 
})