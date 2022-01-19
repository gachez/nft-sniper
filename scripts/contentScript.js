const injectElements = (elementToBeInjected) => {
  const collectionName = window.location.toString().split("/")[4];
  chrome.runtime.sendMessage(
    { collectionName: collectionName },
    function (response) {
      let magicEdenCardContainer = document.querySelectorAll(
        ".infinite-scroll-component > div.tw-flex.tw-flex-wrap.tw-overflow-hidden > div.grid-card"
      );
      const cards = magicEdenCardContainer;

      if (elementToBeInjected !== undefined) {
        console.log("called");
        injectRankToElement(elementToBeInjected, response.rankData);
        return;
      }

      for (let i = 0; i < cards.length; i++) {
        injectRankToElement(cards[i], response.rankData);
      }
    }
  );
};

const injectRankToElement = (element, rankData) => {
  let rankDiv = document.createElement("span");
  rankDiv.className = "gachezZone";
  element.style.gap = "10px";
  const itemName = element.querySelector("div > a > h6").textContent;
  rankDiv.innerHTML = `RANK: ${extractRank(itemName, rankData)}`;
  const nodeToAppendTo = element.querySelector("div > .mt-auto > div.my-2");
  nodeToAppendTo.querySelector("span").style.width = "fit-content";
  nodeToAppendTo.style.display = "flex";
  nodeToAppendTo.style.justifyContent = "space-between";
  nodeToAppendTo.appendChild(rankDiv.cloneNode(true));
};

// window.addEventListener(
//   "load",
//   (ev) => {
//     ev.preventDefault();
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
}, 4500);
// );
