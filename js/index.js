window.addEventListener('load', () => {
    var loader = document.querySelector(".loader"); //on class 'loader'
    loader.classList.add('display-off-loader');
});

//global variables
var newsSection = document.querySelector('.news')
var cSlection = document.querySelector('.cont-selection')
var changeCountry = document.querySelector('nav .chng-country')
//here's an event listener to change country
changeCountry.addEventListener('click', formSubmitScreen)

//functions

function printNews(articlesArr) {
    
    //setting display to be true
    changeCountry.classList.remove('display-none')
    newsSection.classList.remove('display-none')
    
    //setting form screen to off
    cSlection.classList.remove('display-true')
    
    //doing this in order to prevent the text from adding up
    newsSection.innerText = ""
    
    for (let i = 0; i < articlesArr.length; i++) {
        newsSection.innerHTML += `<a href="${articlesArr[i].url}">
                                        <div class="news-card">
                                            <div class="newsImg">
                                                <img src="${articlesArr[i].urlToImage}" alt=${articlesArr[i].title}>
                                            </div>
                                            <div class="card-body">
                                                <div class="title-grp">
                                                    <div class="ttl-auth">
                                                        <h2>${articlesArr[i].title}</h2>
                                                        <p id="time">(${articlesArr[i].publishedAt})</p>
                                                </div>
                                            </div>
                                            <p class="content">${articlesArr[i].description}</p>
                                            <p class="src"><strong>Source: </strong>${articlesArr[i].source.name}</p>
                                        </div>
                                    </div>
                                </a>`
    }

}

function setLocalStorage(country) {

    //storing country choice in browser
    window.localStorage.setItem('country', JSON.stringify(country))
    setCountry(country)

}

function countrySel(e) {

    e.preventDefault();
    var countryVal = document.querySelector('select').value

    //to send values to the local storage of the browser
    if (countryVal !== 'nil') {
        setLocalStorage(countryVal)
    }
    else {
        alert('Submit a valid country')
        //sending user back to the form screen
        formSubmitScreen()
    }

}

function formSubmitScreen() {

    //clearing browser if form submit screen is on
    window.localStorage.clear()

    //making submit screen visible
    //cSelection is country selection block
    cSlection.classList.add('display-true')

    //setting display to be off when form screen is on
    //changeCountry is change BUTTON
    changeCountry.classList.add('display-none')
    newsSection.classList.add('display-none')

    //checking submit event of the form
    var form = document.querySelector('form')
    form.addEventListener('submit', countrySel)
}

function setCountry(country) {

    //making an call to the API
    var countryVal = 'nil'
    switch (country) {
        case 'us':
            countryVal = `https://newsapi.org/v2/top-headlines?country=us&apiKey=cb1e0df2ab854320b6090d4947f1cbf2`
            break;
        case 'ind':
            countryVal = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cb1e0df2ab854320b6090d4947f1cbf2`
            break;
        case 'de':
            countryVal = `https://newsapi.org/v2/top-headlines?country=de&apiKey=cb1e0df2ab854320b6090d4947f1cbf2`
            break;
        default:
            break;
    }

    fetch(countryVal)
        .then((response) => response.json())
        .then((data) => {
            printNews(data.articles)
        })
        .catch(err => {
            console.log('Error:', err);
        })
}

//check if the country is already selected by the user
function checkCountry(){

    if (JSON.parse(window.localStorage.getItem('country'))) {
        var country = JSON.parse(window.localStorage.getItem('country'))
        setCountry(country)
    } 
    else{
        formSubmitScreen()
    }
}

//first function to be invoked
checkCountry()

