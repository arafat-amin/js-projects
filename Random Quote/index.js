const newQuoteButton = document.querySelector('#js-new-quote');

const twitterButton = document.querySelector('#js-tweet');

newQuoteButton.addEventListener('click', getQuote)

const spinner = document.querySelector('#js-spinner');

const endpoint = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

async function getQuote() {

    spinner.classList.remove('hidden');
    newQuoteButton.disabled = true;

    try {
        const response = await fetch(endpoint);

        if(!response.ok){
            throw Error(response.statusText)
        }

        const json = await response.json();
        displayQuote(json.message)
        setTweetButton(json.message)

    } catch(error) {
        console.log(error)
        alert('failed to get new quote')
    } finally {
        
    spinner.classList.add('hidden');
    newQuoteButton.disabled = false;
    }
}


function displayQuote(text) {
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = text;
}

function setTweetButton(quote) {
    twitterButton.setAttribute('href', `https://twitter.com/share?text=$${quote} - Donald Trump`)
}