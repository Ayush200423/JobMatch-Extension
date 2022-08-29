chrome.runtime.onInstalled.addListener(async () => {
    let url = chrome.runtime.getURL('welcome/index.html')
    await chrome.tabs.create({url})
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    url = tab.url
    if (changeInfo.url && (tab.url.includes("careerjet.ca/jobad") || tab.url.includes("careerjet.com/jobad"))) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id, allFrames: true},
            files: ['extension/fillForm.js']
        });
    }
});