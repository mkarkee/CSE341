

let pageNumber = 0
let prev = null 
let next = null


const pokeList = document.getElementById('pokemon')
const page = document.getElementById('pageNumber') 
const getFirstbtn = document.getElementById('first')
getFirstbtn.style.visibility = 'hidden'

const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json() 
}

const getList = url => {
    const data = getData(url)
    clearList()
    pokeList.style.counterReset= "li " + pageNumber * 10;
    page.innerHTML = pageNumber + 1;

    if(pageNumber > 0) {
        getFirstbtn.style.visibility = 'visible'
    } else {
        getFirstbtn.style.visibility = 'hidden'
    }
   
    data.then(json => {
        for (const i in json.results) {
            pokeList.innerHTML += `<li>${json.results[i].name}</li>`
            next = json.next
            prev = json.previous
        }
    })
    
}

const clearList = () => {
    pokeList.innerHTML = ''
}

const showNext = () => {
    
    if (next !== null) {
        pageNumber += 1;
       getList(next)
    } else {
        return
    }
    
}

const showPrevious = () => {
    
    if (prev !== null) {
        pageNumber -=1;
        getList(prev)
    } else {
        return
    }
}

const showFirst = () => {
    pageNumber = 0;
    getList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');
}

getList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10');

