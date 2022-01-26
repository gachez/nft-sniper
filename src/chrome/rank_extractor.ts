const lowerAndStrip = (str:string) => str.toLowerCase().replace(/\s/g, '')

interface RanksData {
    collection: {pieces: number};
    mints: {rank: number}[] 
}

const extractRank = (itemName: string, collectionMoonRankData: RanksData) => {	
		const ranksData = collectionMoonRankData
		const ranksObj = {
			pieces: ranksData.collection.pieces,
			collection: ranksData.mints.filter((item:any) => lowerAndStrip(item.name) === lowerAndStrip(itemName.toLowerCase())).map(item => item.rank)
		}
		console.log(ranksObj)
		return ranksObj.collection[0]
}

export { extractRank }