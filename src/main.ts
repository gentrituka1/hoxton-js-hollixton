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
    storeItems: StoreItem[]
    byType: string;
    users: User[]
}

const state: State = {
    storeItems: [],
    byType: '',
    users: [],
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
        else {
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
}

function renderLogin(){
    let mainEl = document.querySelector('main')
    let loginEl = document.querySelector('.log-in')
    loginEl?.addEventListener('click', function(){
        let loginHtml = `
        <div class="login-form-div" id="popup">
            <h2>Log In</h2>
            <form class="login-form">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password">
                <button type="submit">Log In</button>
            </form>
        </div>
        `
        mainEl.innerHTML = loginHtml
    })

}

function blurBackground(){
    let blur = document.querySelector('.blur')
    blur?.classList.toggle('active')
}

function render(){
    let mainEl = document.querySelector('main')
    mainEl.innerHTML = ''

    let logoEl = document.querySelector('.the-logo')
    logoEl?.addEventListener('click', function (){
        renderStoreItems()
    })

    renderStoreItems()
    renderStoreItemsByTypeGirls()
    renderStoreItemsByTypeGuys()
    renderStoreItemsByTypeSale()
    renderLogin()
}
renderFilteredStoreItems()
getStoreItems()
render()


