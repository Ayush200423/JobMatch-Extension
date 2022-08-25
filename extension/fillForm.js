function clickButton(text) {
    allElem = document.querySelectorAll('button');
    for (let idx = 0; idx < allElem.length; idx++) {
        if (allElem[idx].textContent === text) {
            allElem[idx].click();
            break
        }
    }
}

function clickiFrameButton(text) {
    let iframe = document.querySelector('#apply');
    allElem = iframe.contentWindow.document.querySelectorAll('button');
    for (let idx = 0; idx < allElem.length; idx++) {
        if (allElem[idx].textContent.includes(text)) {
            setTimeout(() => {
                allElem[idx].removeAttribute('disabled');
                allElem[idx].click()
            }, 500)
        }
    }
}

function fillName(component) {
    let text = component[0];
    let value = component[1];
    let iframe = document.querySelector('#apply');
    allElem = iframe.contentWindow.document.querySelectorAll('label');
    for (let idx = 0; idx < allElem.length; idx++) {
        if (allElem[idx].textContent.includes(text)) {
            inputId = allElem[idx].getAttribute("for");
            inputBox = iframe.contentWindow.document.querySelector(`#${inputId}`);
            inputBox.value = value;
        }
    }
}

function fillInput(value, query) {
    let iframe = document.querySelector('#apply');
    inputBox = iframe.contentWindow.document.querySelector(query);
    if (inputBox.value === '') {
        inputBox.value = value;
    }
}

if (document.querySelector("a[href='/account']")) {
    let fname = 'dasidj'
    let lname = 'dsaioj'
    let phone = 219483
    let jobTitle = 'Software Engineer'
    let jobLocation = 'Toronto, ON'
    let iteration = 0
    const allElements = [
        // name -->
        ['First name', fname],
        ['Surname', lname],

        // other inputs ->
        [phone, "input[type='tel']"],
        [jobTitle, "input[placeholder='Your job title or qualification']"],
        [jobLocation, "input[placeholder='Your location']"]
    ]

    clickButton('Apply Now');
    let iframe = document.querySelector('#apply');
    iframe.addEventListener('load', () => {
        while (iteration < 1) {
            for (let idx = 0; idx < allElements.length; idx++) {
                if (idx < 2) {
                    try {
                        fillName(allElements[idx]);
                    } catch {
                        console.log('Applied')
                    }
                } else {
                    try {
                        fillInput(allElements[idx][0], allElements[idx][1])
                    } catch {
                        console.log('Applied')
                    }
                }
            }
            try {
                clickiFrameButton('Continue');
                clickiFrameButton('Send');
            } catch {
                console.log('An error occurred')
            }
            iteration++
        }
    })
}