document.addEventListener("DOMContentLoaded", async () => {
    jobmatchLink = await document.querySelector('.jobmatch-link')
    jobmatchLink.addEventListener('click', () => {
        chrome.tabs.create({ url: "http://localhost:5000" });
    })

    logoutBtns = document.querySelectorAll('.sign-out')
    for (logoutBtn of logoutBtns) {
        logoutBtn.addEventListener('click', () => {
            chrome.storage.sync.set({logged_in: false});
            chrome.tabs.create({ url: "http://localhost:5000" });
        })
    }

    applyAllBtns = document.querySelectorAll('.apply-all')
    for (applyAllBtn of applyAllBtns) {
        applyAllBtn.addEventListener('click', () => {
            allPending = document.querySelectorAll('.apply')
            for (pending of allPending) {
                postingId = pending.getAttribute('id');
                chrome.tabs.create({ url: postingId });
            }
        })
    }
})

function displayError(email) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('error-page').style.display = 'flex';
    document.querySelector('.email-heading').textContent = email;
}

function createPending(posting, email, callback) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('logged-in').style.display = 'flex';
    document.querySelector('.email-heading').textContent = email;
    const postingTemplate = document.querySelector('#posting-template').content;
    const templateCopy = document.importNode(postingTemplate, true);
    templateCopy.querySelector('.container').id = posting['link'].replace('https://www.careerjet.ca/jobad/', '');
    templateCopy.querySelector('.title').textContent = posting['title'];
    templateCopy.querySelector('.company').textContent = posting['company'];
    templateCopy.querySelector('.location').textContent = posting['location'];
    templateCopy.querySelector('.apply').id = posting['link'];
    templateCopy.querySelector('.cancel').id = posting['link'];
    document.querySelector('.postings').appendChild(templateCopy);
    callback()
}

function waitForBtnClick() {
    apply = document.querySelectorAll('.apply')
    for (applyBtn of apply) {
        applyBtn.addEventListener('click', createTab);
    }

    cancel = document.querySelectorAll('.cancel')
    for (cancelBtn of cancel) {
        cancelBtn.addEventListener('click', deletePending);
    }
}

function createTab(e) {
    postingUrl = e.target.getAttribute('id');
    chrome.tabs.create({ url: postingUrl });
    updatePending(postingUrl);
}

function deletePending(e) {
    postingUrl = e.target.getAttribute('id');
    updatePending(postingUrl);
    document.getElementById(postingUrl.replace('https://www.careerjet.ca/jobad/', '')).style.display = 'none';
}