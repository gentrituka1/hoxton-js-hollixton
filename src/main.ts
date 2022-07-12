import './style.css'

type StoreItem = {
    id: number,
    type: string,
    name: string,
    image: string,
    price: number,
    discountedPrice: number,
    dateEntered: string,
    stock: number
}

type State = {
    storeItems: StoreItem[]
}

const state = {
    storeItems: {},
}

function getStoreItems(){
    fetch('http://localhost:3001/store')
    .then(res => res.json())
    .then(data => {
        state.storeItems = data
        render()
    })
}

function renderStoreItems(){
    let mainEl = document.querySelector('main')
    let storeItems = state.storeItems
    let storeItemsHtml = ''
    for(let item of storeItems){
        storeItemsHtml += `
            <div class="store-item">
                <img src="${item.image}" alt="${item.name}" width="250">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            </div>
        `
        if(item.discountedPrice){
            storeItemsHtml += `
            <div class="store-item">
            <img src="${item.image}" alt="${item.name}" width="250">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
            <span>$${item.discountedPrice}</span>
        </div>
            `
        }
    }
    mainEl.innerHTML = storeItemsHtml
}


function render(){
    let mainEl = document.querySelector('main')
    mainEl.innerHTML = ''

    renderStoreItems()
}
getStoreItems()
render()


