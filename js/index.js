// window.addEventListener('load', () => {
//     var loader = document.querySelector(".loader"); //on class 'loader'
//     loader.classList.add('display-off-loader');
// });

// fetch('http://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=cb1e0df2ab854320b6090d4947f1cbf2')
//     .then((response) => response.json())
//     .then((user) => {
//         console.log(user.articles);
//     })
//     .catch(err => {
//         console.log('Error:', err);
//     })

function setLocalStorage(country){
    //storing country choice in browser
    window.localStorage.setItem('country', JSON.stringify(country))
}

function countrySel(e){
    e.preventDefault();
    var countryVal = document.querySelector('select').value
    setLocalStorage(countryVal)
}

function formSubmitScreen(){
    var cSlection = document.querySelector('.cont-selection')
    var form = document.querySelector('form')
    form.addEventListener('submit', countrySel)
}