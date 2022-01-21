const lowerAndStrip = str => str.toLowerCase().replace(/\s/g, '')

const extractRank = (itemName, collectionMoonRankData,  howRare) => {	
		const ranksData = collectionMoonRankData
		const ranksObj = {
			pieces: ranksData.collection.pieces,
			collection: ranksData.mints.filter(item => lowerAndStrip(item.name) === lowerAndStrip(itemName.toLowerCase())).map(item => item.rank),
			// collectionRankHowRare: Array.from(howRare.querySelectorAll('div.nfts > div.featured_item > div.featured_image_desc > div.item_stats'))
			// .map(item => {
			// 	return {
			// 		rank: Array.from(item)[0].textContent
			// 	}
			// })
		}
		console.log(ranksObj)
		return ranksObj.collection[0]
}

