(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  // console log the book info
  console.log('Title:' + window.wrappedJSObject.bookConfig.bookTitle);
  console.log('Pages:' + window.wrappedJSObject.bookConfig.totalPageCount)
  if (window.hasRun) {
    console.log('Already running');
    return;
  }
  function bookInfo() {
    browser.runtime.sendMessage({
      command: 'sendbookconfig',
      title: window.wrappedJSObject.bookConfig.bookTitle,
      count: window.wrappedJSObject.bookConfig.totalPageCount
    });
    // console.log('test message')
  }
  // window.bookConfig1 = window.wrappedJSObject.bookConfig
  // window.hasRun = true;
  // window.wrappedJSObject.TestbookConfig = cloneInto(window.bookConfig, window);
  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertBeast(beastURL) {
    removeExistingBeasts();
    let beastImage = document.createElement("img");
    beastImage.setAttribute("src", beastURL);
    beastImage.style.height = "100vh";
    beastImage.className = "beastify-image";
    document.body.appendChild(beastImage);
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingBeasts() {
    let existingBeasts = document.querySelectorAll(".beastify-image");
    for (let beast of existingBeasts) {
      beast.remove();
    }
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
    } else if (message.command === "reset") {
      removeExistingBeasts();
    } else if (message.command === "getbookconfig") {
      bookInfo();
    }
  });

})();

