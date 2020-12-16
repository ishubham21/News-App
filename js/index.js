// window.addEventListener('load', () => {
//     var loader = document.querySelector(".loader"); //on class 'loader'
//     loader.classList.add('display-off-loader');
// });

//global variables
var newsSection = document.querySelector('.news')
var changeCountry = document.querySelector('.chng-country')
changeCountry.addEventListener('click', formSubmitScreen)

function setLocalStorage(country){
    //storing country choice in browser
    window.localStorage.setItem('country', JSON.stringify(country))
    setCountry(country)
}

function countrySel(e){
    e.preventDefault();
    var countryVal = document.querySelector('select').value
    setLocalStorage(countryVal)
}

function formSubmitScreen(){
    var cSlection = document.querySelector('.cont-selection')
    cSlection.classList.add('display-true')

    var form = document.querySelector('form')
    form.addEventListener('submit', countrySel)
}

function printNews(articlesArr) {
    newsSection.innerHTML = ""
    for (let i = 0; i < articlesArr.length; i++) {
        newsSection.innerHTML += `<div>${articlesArr[i].description}</div>`
    }
}

function setCountry(country){

    var countryVal = 'nil'
    switch (country) {
        case 'us':
            countryVal = `http://newsapi.org/v2/top-headlines?country=us&apiKey=cb1e0df2ab854320b6090d4947f1cbf2`
            break;
        case 'ind': 
            countryVal = `http://newsapi.org/v2/top-headlines?country=in&apiKey=cb1e0df2ab854320b6090d4947f1cbf2`
            break;
        case 'de':
            countryVal = `http://newsapi.org/v2/top-headlines?country=de&apiKey=cb1e0df2ab854320b6090d4947f1cbf2`
            break;
        default:
            break;
    }

    fetch(countryVal)
    .then((response) => response.json())
    .then((user) => {
        printNews(user.articles)
        console.log(user.articles);
    })
    .catch(err => {
        console.log('Error:', err);
    })
}

function checkCountry(){
    if (JSON.parse(window.localStorage.getItem('country'))) {
        var country = JSON.parse(window.localStorage.getItem('country'))
        console.log(country);
        setCountry(country)
    } 
    else{
        formSubmitScreen()
    }
}

checkCountry()

