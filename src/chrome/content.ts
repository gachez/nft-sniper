import { extractRank } from "./rank_extractor";
import '../chrome/content.css'
export {}
const injectElements = (elementToBeInjected?: Node) => {
    const collectionName = window.location.toString().split("/")[4];
    var parser = new DOMParser();
    chrome.runtime.sendMessage(
      { collectionName: collectionName },
      function (response:any) {
        console.log(response)
        let magicEdenCardContainer = document.querySelectorAll(
          ".infinite-scroll-component > div.tw-flex.tw-flex-wrap.tw-overflow-hidden > div.grid-card"
        );
        const cards = magicEdenCardContainer;
  
        if (elementToBeInjected !== undefined) {
          console.log("called");
          injectRankToElement(elementToBeInjected, response.moonRankData);
          return;
        }
  
        for (let i = 0; i < cards.length; i++) {
          injectRankToElement(cards[i], response.moonRankData);
        }
      }
    );
  };

  const pinStyleLoad = (el:HTMLDivElement) => {
    el.style.paddingLeft = '8px'
    el.style.height = 'auto'
    el.style.cursor = 'pointer'
    el.style.bottom = '20px'
  }

  const pinImgStyleLoad = (el:HTMLImageElement) => {
    el.style.height = '32px'
    el.style.objectFit = 'contain'
  }

  const rankStyleLoad = (el:HTMLSpanElement, rank:number) => {
    
    el.style.fontSize = '1rem'
    el.style.zIndex = '99'
    if(rank < 100 ) el.style.color = '#51ff0d'
    el.style.color = 'yellow'
  }

  const parentDivStyleLoad = (el:HTMLDivElement) => {
    el.style.display = 'flex'
    el.style.paddingBottom = '1rem'
    el.style.width = 'fit-content'
  }
  var iterator = 0;   
  const injectRankToElement = (element: any, rankData:any ) => {

    //create elements
    let parentDiv = document.createElement("div")
    let rank = document.createElement("span");
    let pinIcon = document.createElement("div");
    let pinImg = document.createElement('img')

    const itemName:string = element.querySelector("div > a > h6").textContent;   
    pinIcon.setAttribute('id', `pinIcon${iterator}`)

    pinIcon.setAttribute('onclick', `(function() {
      chrome.storage.local.set({'itemSelected': '${itemName}'}, () => {
        console.log('item name: %s', JSON.stringify(value));
      }
      )
    })();
      `)
    
    //
    //link pin icon image
    pinImg.src = "https://cdn-user-icons.flaticon.com/17735/17735582/1642767925932.svg?token=exp=1642768833~hmac=7e432254be92fcd25cc5d8b6eac12a46"
    pinImg.alt = "pin NFT"
    element.style.gap = "10px";
    const rankNumberData:number = extractRank(itemName, rankData)
    //load styles
    pinStyleLoad(pinIcon)
    pinImgStyleLoad(pinImg)
    rankStyleLoad(rank,rankNumberData)
    parentDivStyleLoad(parentDiv)
    //

    pinIcon.appendChild(pinImg)
    parentDiv.appendChild(rank)
    parentDiv.appendChild(pinIcon)
    rank.innerHTML = `Rank ⍜ ${rankNumberData}`;
    const nodeToAppendTo = element.querySelector("div > .mt-auto > div.my-2");
    nodeToAppendTo.querySelector("span").style.width = "fit-content";
    nodeToAppendTo.style.display = "flex";
    nodeToAppendTo.style.justifyContent = "space-between";
    nodeToAppendTo.appendChild(parentDiv.cloneNode(true));
    
    iterator++
  };
  //main function
  setTimeout(function () {
    // it should work
    injectElements();
    const targetNode= document.querySelector(
      ".infinite-scroll-component > div.tw-flex.tw-flex-wrap.tw-overflow-hidden"
    );
  
    // Options for the observer (which mutations to observe)
    // Set attributes to false if you do not care if existing nodes have changed,
    //  otherwise set it true.
    const config = { childList: true };
  
    // Callback function to execute when mutations are observed
    const callback = function (mutationsList:any, observer:any) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          injectElements(mutation.addedNodes[0]);
        }
      }
    };
  
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    
    // Start observing the target node for configured mutations
    observer.observe(targetNode!, config);
  }, 3500);
