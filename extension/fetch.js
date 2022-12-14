document.addEventListener("DOMContentLoaded", async () => {
    chrome.storage.sync.get(['logged_in']).then((data) => {
        if (data['logged_in']) {
            getUserData()
        }
    })
    btn = await document.querySelector('.auth-submit');
    btn.addEventListener('click', () => {
        email = document.querySelector('#email').value;
        password = document.querySelector('#password').value;
        fetch('http://127.0.0.1:5000/api/authenticate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"email":email, "password":password}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data['auth'] == true) {
                chrome.storage.sync.set({logged_in: true});
                chrome.storage.sync.set({email: email});
                getUserData();
            } else {
                authError();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
})

function getUserData() {
    fetch('http://127.0.0.1:5000/api/resume-data')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        extractData(data)
        retrievePosting(data)
    })
}

function extractData(data) {
    const keysToSave = ['fname', 'lname', 'phone', 'role', 'location']
    for (key of keysToSave) {
        chrome.storage.sync.set({[key]: data[key]})
    }
}

function retrievePosting(data) {
    fetch('http://127.0.0.1:5000/api/posting-details', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"data": data}),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data['results'].length != 0) {
            chrome.storage.sync.get(['email']).then((email) => {
                for (posting of data['results']) {
                    createPending(posting, email['email'], waitForBtnClick)
                }
            })
        } else {
            chrome.storage.sync.get(['email']).then((email) => {
                displayError(email['email'])
            })
        }
    })
}

function updatePending(url) {
    fetch('http://127.0.0.1:5000/api/resume-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"pending": url}),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
}