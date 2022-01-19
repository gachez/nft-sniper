const lowerAndStrip = str => str.toLowerCase().replace(/\s/g, '')

const extractRank = (itemName, collectionData) => {	
		const ranksData = collectionData
		const ranksObj = {
			pieces: ranksData.collection.pieces,
			collection: ranksData.mints.filter(item => lowerAndStrip(item.name) === lowerAndStrip(itemName.toLowerCase())).map(item => item.rank)
		}
		return ranksObj.collection[0]
}

