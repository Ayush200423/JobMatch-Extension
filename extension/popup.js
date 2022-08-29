document.addEventListener("DOMContentLoaded", async () => {
    jobmatchLink = await document.querySelector('.jobmatch-link')
    jobmatchLink.addEventListener('click', () => {
        chrome.tabs.create({ url: "http://localhost:5000" });
    })

    logout = await document.querySelector('.sign-out')
    logout.addEventListener('click', () => {
        chrome.storage.sync.set({logged_in: false});
        chrome.tabs.create({ url: "http://localhost:5000" });
    })
})

function createPending(posting, callback) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logged-in').style.display = 'flex';
    const postingTemplate = document.querySelector('#posting-template').content;
    const templateCopy = document.importNode(postingTemplate, true);
    templateCopy.querySelector('.title').textContent = posting['title'];
    templateCopy.querySelector('.company').textContent = posting['company'];
    templateCopy.querySelector('.location').textContent = posting['location'];
    templateCopy.querySelector('.apply').id = posting['link'];
    document.querySelector('.postings').appendChild(templateCopy);
    callback()
}

function waitForBtnClick() {
    apply = document.querySelectorAll('.apply')
    for (btn of apply) {
        btn.addEventListener('click', createTab);
    }
}

function createTab(e) {
    posting_url = e.target.getAttribute('id');
    chrome.tabs.create({ url: posting_url });
}