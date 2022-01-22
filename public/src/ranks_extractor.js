const lowerAndStrip = str => str.toLowerCase().replace(/\s/g, '')

const extractRank = (itemName, collectionMoonRankData) => {	
		const ranksData = collectionMoonRankData
		const ranksObj = {
			pieces: ranksData.collection.pieces,
			collection: ranksData.mints.filter(item => lowerAndStrip(item.name) === lowerAndStrip(itemName.toLowerCase())).map(item => item.rank)
		}
		console.log(ranksObj)
		return ranksObj.collection[0]
}

