const injectElements = (elementToBeInjected) => {
  const collectionName = window.location.toString().split("/")[4];
  var parser = new DOMParser();
  chrome.runtime.sendMessage(
    { collectionName: collectionName },
    function (response) {
      console.log(response)
      const howRareData = parser.parseFromString(response.howRareRank, 'text/html')
      const howRareRank = howRareData.querySelectorAll('div.nfts > div.featured_item > div.featured_image_desc > div.item_stats')
      let magicEdenCardContainer = document.querySelectorAll(
        ".infinite-scroll-component > div.tw-flex.tw-flex-wrap.tw-overflow-hidden > div.grid-card"
      );
      const cards = magicEdenCardContainer;

      if (elementToBeInjected !== undefined) {
        console.log("called");
        injectRankToElement(elementToBeInjected, response.moonRankData, howRareRank);
        return;
      }

      for (let i = 0; i < cards.length; i++) {
        injectRankToElement(cards[i], response.moonRankData);
      }
    }
  );
};

const injectRankToElement = (element, rankData, howRare) => {
  let parentDiv = document.createElement("div")
  let rank = document.createElement("span");
  let pinIcon = document.createElement("div");
  let pinImg = document.createElement('img')
  parentDiv.className = "parentDiv"
  rank.className = "rank";
  pinIcon.className = "pin"
  pinImg.className = "pinImg"
  pinImg.src = "https://cdn-user-icons.flaticon.com/17735/17735582/1642767925932.svg?token=exp=1642768833~hmac=7e432254be92fcd25cc5d8b6eac12a46"
  pinImg.alt = "pin NFT"
  pinIcon.appendChild(pinImg)
  parentDiv.appendChild(rank)
  parentDiv.appendChild(pinIcon)
  element.style.gap = "10px";
  const itemName = element.querySelector("div > a > h6").textContent;
  const rankNumberData = extractRank(itemName, rankData, howRare)
  rank.innerHTML = `Rank ⍜ ${rankNumberData}`;
  const nodeToAppendTo = element.querySelector("div > .mt-auto > div.my-2");
  nodeToAppendTo.querySelector("span").style.width = "fit-content";
  nodeToAppendTo.style.display = "flex";
  nodeToAppendTo.style.justifyContent = "space-between";
  nodeToAppendTo.appendChild(parentDiv.cloneNode(true));
  if(rankNumberData < 250){
    rank.classList.add(["rareRankColor", "rareRankBorder"])
  }
  rank.classList.add("commonRankColor")
};

setTimeout(function () {
  // it should work
  injectElements();
  const targetNode = document.querySelector(
    ".infinite-scroll-component > div.tw-flex.tw-flex-wrap.tw-overflow-hidden"
  );

  // Options for the observer (which mutations to observe)
  // Set attributes to false if you do not care if existing nodes have changed,
  //  otherwise set it true.
  const config = { childList: true };

  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("added nodes");
        injectElements(mutation.addedNodes[0]);
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}, 3500);
