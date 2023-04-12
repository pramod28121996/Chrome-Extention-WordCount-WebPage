const btn = document.getElementById("btnClick");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    chrome.scripting
      .executeScript({
        target: {
          tabId: tab.id,
        },
        func: getWords,
      })
      .then((injectionResults) => {
        const { frameId, result } = injectionResults[0];
        document.getElementById("word").innerHTML = result;
      });
  } catch (err) {
    console.error(`failed to execute script: ${err}`);
  }
});

function getWords() {
  var text = document.body.innerText;
  var words = text.split(/[\s,.!?]+/);
  return words.length;
}