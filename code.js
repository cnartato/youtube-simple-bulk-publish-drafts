const CONFIG = {
    Audience: `VIDEO_MADE_FOR_KIDS_NOT_MFK`, //VIDEO_MADE_FOR_KIDS_MFK, VIDEO_MADE_FOR_KIDS_NOT_MFK
    Visibility: `PRIVATE`, // PRIVATE, UNLISTED, PUBLIC
}

function waitForElm(selector, container) {
    container = container || document.body

    return new Promise(resolve => {
        console.log(container, selector)
        if (container.querySelector(selector)) {
            return resolve(container.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            console.log(selector)
            if (container.querySelector(selector)) {
                observer.disconnect();
                resolve(container.querySelector(selector));
            }
        });

        observer.observe(container, {
            childList: true,
            subtree: true
        });
    });
}
async function publishTop()
{
    const videoParentContainer = await waitForElm(`ytcp-video-list-cell-video:has(.draft-thumbnail)`)
    console.log({...videoParentContainer})
    const videoLinkElement = await waitForElm(`#video-title`, videoParentContainer)
    videoLinkElement.click()
    
    const notMadeForKidsRadioElement = await waitForElm(`*[name=${CONFIG.Audience}]`)
    notMadeForKidsRadioElement.click()
    
    const nextButtonElement = await waitForElm(`#next-button`)
    nextButtonElement.click()
    nextButtonElement.click()
    nextButtonElement.click()
    
    const privateRadioElement = await waitForElm(`*[name=${CONFIG.Visibility}]`)
    privateRadioElement.click()
    
    const doneButtonElement = await waitForElm(`#done-button`)
    doneButtonElement.click()
    
    await waitForElm(`#video-thumbnail-container:not(.draft-thumbnail)`, videoParentContainer)

    publishTop()
}

publishTop()