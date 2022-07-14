import './style.css'

type StoreItem = {
    id: number,
    type: string,
    name: string,
    image: string,
    price: number,
    discountedPrice?: number,
    dateEntered: string,
    stock: number
}

type User = {
    firstName: string,
    lastName: string,
    id: string,
    password: string | number,
    bag: []
  }

type State = {
    storeItems: StoreItem[];
    byType: string;
    users: User[];
    selectedItem: StoreItem | null
    page: 'store' | 'item'
}

const state: State = {
    storeItems: [],
    byType: '',
    users: [],
    selectedItem: null,
    page: 'store'
}


function selectedItem(item: StoreItem) {
    state.selectedItem = item;
  }
  function deselectItem() {
    state.selectedItem = null;
  }

function renderStoreItemsByTypeGirls(){
    let mainEl = document.querySelector('main')
    let girlsEl = document.querySelector('.girls-page')
    girlsEl?.addEventListener('click', function (){
    let storeItems = state.storeItems
    let storeItemsHtml = ''
    for(let item of storeItems){
        if(item.type.toLowerCase() === 'girls' && item.discountedPrice){
            storeItemsHtml += `
            <div class="store-item">
            <img src="${item.image}" alt="${item.name}" width="250">
            <h3>${item.name}</h3>
            <div class="discounted-price">
            <p>$${item.price}</p>
            <span>$${item.discountedPrice}</span>
            </div>
        </div>
            `
        }   
        else if(item.type.toLowerCase() === 'girls' && item.discountedPrice === undefined){
            storeItemsHtml += `
            <div class="store-item">
                <img src="${item.image}" alt="${item.name}" width="250">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            </div>
            `
            }
        }
        
        mainEl.innerHTML = storeItemsHtml
    })
    
}

function renderStoreItemsByTypeGuys(){
    let mainEl = document.querySelector('main')
    let guysEl = document.querySelector('.guys-page')
    guysEl?.addEventListener('click', function (){
    let storeItems = state.storeItems
    let storeItemsHtml = ''
    for(let item of storeItems){
        if(item.type.toLowerCase() === 'guys' && item.discountedPrice){
            storeItemsHtml += `
            <div class="store-item">
            <img src="${item.image}" alt="${item.name}" width="250">
            <h3>${item.name}</h3>
            <div class="discounted-price">
            <p>$${item.price}</p>
            <span>$${item.discountedPrice}</span>
            </div>
        </div>
            `
        }   
        else if(item.type.toLowerCase() === 'guys' && item.discountedPrice === undefined){
            storeItemsHtml += `
            <div class="store-item">
                <img src="${item.image}" alt="${item.name}" width="250">
                <h3>${item.name}</h3>
                <p>$${item.price}</p>
            </div>
            `
            }
        }
        
        mainEl.innerHTML = storeItemsHtml
    
})
}

function renderStoreItemsByTypeSale(){
    let mainEl = document.querySelector('main')
    let saleEl = document.querySelector('.sale-page')
    saleEl?.addEventListener('click', function (){
    let storeItems = state.storeItems
    let storeItemsHtml = ''
    for(let item of storeItems){
        if(item.discountedPrice){
            storeItemsHtml += `
            <div class="store-item">
            <img src="${item.image}" alt="${item.name}" width="250">
            <h3>${item.name}</h3>
            <div class="discounted-price">
            <p>$${item.price}</p>
            <span>$${item.discountedPrice}</span>
            </div>
        </div>
            `
        }
    }
    mainEl.innerHTML = storeItemsHtml
    })
}

function renderFilteredStoreItems(){
    let mainEl = document.querySelector('main')
    let searchEl = document.querySelector('.search-bar')
    searchEl?.addEventListener('click', function(){
        let searchInputEl = document.createElement('input')
        searchInputEl.type = 'text';
        searchInputEl.placeholder = 'Search the item name';
        searchInputEl.className = 'search-input'
        searchEl?.appendChild(searchInputEl)
        searchInputEl.addEventListener('keyup', function(){
            let searchInput = searchInputEl.value.toLowerCase()
            let storeItems = state.storeItems
            let storeItemsHtml = ''
            for(let item of storeItems){
                if(item.name.toLowerCase().includes(searchInput) && item.discountedPrice){
                    storeItemsHtml += `
                    <div class="store-item">
                    <img src="${item.image}" alt="${item.name}" width="250">
                    <h3>${item.name}</h3>
                    <div class="discounted-price">
                    <p>$${item.price}</p>
                    <span>$${item.discountedPrice}</span>
                    </div>
                </div>
                    `
                } else if(item.name.toLowerCase().includes(searchInput) && item.discountedPrice === undefined){
                    storeItemsHtml += `
                    <div class="store-item">
                        <img src="${item.image}" alt="${item.name}" width="250">
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                    </div>
                    `
                    }
                }
            
            mainEl.innerHTML = storeItemsHtml
        })
}, {once : true})

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
    for(let item of storeItems){
        if(item.discountedPrice){
        let divEl = document.createElement('div')
        divEl.className = 'store-item'
        divEl.addEventListener('click', function(){
            state.page = 'item'
            selectedItem(item)
            render()
        })

        let imgEl = document.createElement('img')
        imgEl.src = item.image
        imgEl.alt = item.name
        imgEl.width = 250
        let h3El = document.createElement('h3')
        h3El.innerText = item.name
        let div2El = document.createElement('div')
        div2El.className = 'discounted-price'
        let pEl = document.createElement('p')
        pEl.innerText = `$${item.price}`
        let spanEl = document.createElement('span')
        spanEl.innerText = `$${item.discountedPrice}`
        div2El.append(pEl, spanEl)
        divEl.append(imgEl, h3El, div2El)
        mainEl.append(divEl)
        }
        else {

        let divEl = document.createElement('div')
        divEl.className = 'store-item'
        divEl.addEventListener('click', function(){
            state.page = 'item'
            selectedItem(item)
            render()
        })
        let imgEl = document.createElement('img')
        imgEl.src = item.image
        imgEl.alt = item.name
        imgEl.width = 250
        let h3El = document.createElement('h3')
        h3El.innerText = item.name
        let pEl = document.createElement('p')
        pEl.innerText = `$${item.price}`
        divEl.append(imgEl, h3El, pEl)
        mainEl.append(divEl)
        }
    }
    state.page = 'store'
}

function renderSelectedItemPage(){
    let mainEl = document.querySelector('main')
    let selectedItem = state.selectedItem

    let divEl = document.createElement('div')
    divEl.className = 'selected-item'

    let imgEl = document.createElement('img')
    imgEl.src = selectedItem.image
    imgEl.alt = selectedItem.name
    imgEl.width = 500

    

    let infoEl = document.createElement('div')
    infoEl.className = 'selected-item-info'

    

    let h3El = document.createElement('h3')
    h3El.innerText = selectedItem.name
    h3El.className = 'selected-item-name'

    let priceEl = document.createElement('div')
    priceEl.className = 'selected-item-price'

    if(selectedItem?.dateEntered === "2021/07/10"){
        let pEl = document.createElement('p')
        pEl.innerText = `New!`
        pEl.className = "recently-added"
        priceEl.append(pEl)
    }

    if(selectedItem.discountedPrice){

    let pEl = document.createElement('p')
    pEl.innerText = `$${selectedItem.price}`
    pEl.className = 'selected-item-price-alone'

    let spanEl = document.createElement('span')
    spanEl.innerText = `$${selectedItem.discountedPrice}`
    spanEl.className = 'selected-discounted-price'
    priceEl.append(pEl, spanEl)
    } else {
        let pEl = document.createElement('p')
        pEl.innerText = `$${selectedItem.price}`
        priceEl.append(pEl)
    }

    let buttonEl = document.createElement('button')
    buttonEl.innerText = 'Add to Cart'
    buttonEl.className = 'add-to-cart-button'

    
    infoEl.append(priceEl ,h3El, buttonEl)
    divEl.append(imgEl, infoEl)
    mainEl.append(divEl)
        
}

function renderLogin(){
    let mainEl = document.querySelector('main')
    let loginEl = document.querySelector('.log-in')
    loginEl?.addEventListener('click', function(){
        let loginHtml = `
        <div class="login-form">
        <h2>Log In</h2>
        <form>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password">
        <button type="submit">Log In</button>
        </form>
        </div>
        `
        mainEl.innerHTML = loginHtml
    })
}


function render(){
    let mainEl = document.querySelector('main')
    mainEl.innerHTML = ''

   

    if(state.page === 'item'){
        renderSelectedItemPage()
    } else{

    renderStoreItems()
    renderStoreItemsByTypeGirls()
    renderStoreItemsByTypeGuys()
    renderStoreItemsByTypeSale()
    renderLogin()
    }
}


let logoEl = document.querySelector('.the-logo')
logoEl?.addEventListener('click', function (){
    deselectItem()
    state.page = 'store'
    render()
})

renderFilteredStoreItems()
getStoreItems()
render()


