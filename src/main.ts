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
    users: User[];
    searchTerm: string;
    selectedItem: StoreItem | null
    page: 'store' | 'item' | 'filtered'
    modal: 'search' | 'login' | 'bag' | ''
    cart: StoreItem[]
}

const state: State = {
    storeItems: [],
    users: [],
    searchTerm: "",
    selectedItem: null,
    modal: '',
    page: 'store',
    cart: []
}

function renderFilteredItems() {
    // find items with this name
    // put them in the state
    // rerender

    let filteredItems = state.storeItems.filter(item => {
        return item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    })
    return filteredItems
  }

function renderSearchModal () {
    let mainEl = document.querySelector('main')

    let wrapperEl = document.createElement('div')
    wrapperEl.className = 'modal-wrapper'
  
    let containerEl = document.createElement('div')
    containerEl.className = 'modal-container'
  
    let closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.className = 'modal-close-button'
    closeButton.addEventListener('click', function () {
      state.modal = ''
      render()
    })

    let divEl = document.createElement('div')
    divEl.className = 'modal-search'
  
    let titleEl = document.createElement('h2')
    titleEl.textContent = 'Search for your favourite items!'
  
    let formEl = document.createElement('form')
    formEl.className = 'search-form'
    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        state.searchTerm = inputEl.value
        state.page = 'filtered'
        state.modal = ''
        render()
    })



    let inputEl = document.createElement('input')
    inputEl.placeholder = 'Search...'
    inputEl.className = 'search-input'


    formEl.append(inputEl)
    divEl.append(titleEl, formEl)
    containerEl.append(closeButton, divEl)
    wrapperEl.append(containerEl)
    mainEl.append(wrapperEl)
  }

  
function renderProfileModal () {
    let mainEl = document.querySelector('main')

    let wrapperEl = document.createElement('div')
    wrapperEl.className = 'modal-wrapper'
  
    let containerEl = document.createElement('div')
    containerEl.className = 'modal-container'
  
    let closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.className = 'modal-close-button'
    closeButton.addEventListener('click', function () {
      state.modal = ''
      render()
    })
  
    let titleEl = document.createElement('h2')
    titleEl.textContent = 'Register'
  
    let formEl = document.createElement('form')
    formEl.className = 'register-form'
    formEl.addEventListener('submit', function (event) {
        event.preventDefault()
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: inputFirstNameEl.value,
                lastName: inputLastNameEl.value,
                id: inputIdEl.value,
                password: inputPasswordEl.value,
                bag: []
        })
    }).then(response => response.json())
    .then(user => {
        state.users.push(user)
        state.modal = ''
        render()
    })
})
    
    let firstName = document.createElement('a')
    firstName.textContent = 'Your First Name:'
    let inputFirstNameEl = document.createElement('input')
    inputFirstNameEl.placeholder = 'First Name...'
    inputFirstNameEl.className = 'search-input'

    let lastName = document.createElement('a')
    lastName.textContent = 'Your Last Name:'
    let inputLastNameEl = document.createElement('input')
    inputLastNameEl.placeholder = 'Last Name...'
    inputLastNameEl.className = 'search-input'

    let id = document.createElement('a')
    id.textContent = 'Your Email:'
    let inputIdEl = document.createElement('input')
    inputIdEl.placeholder = 'Email...'
    inputIdEl.className = 'search-input'

    let password = document.createElement('a')
    password.textContent = 'Your Password:'
    let inputPasswordEl = document.createElement('input')
    inputPasswordEl.placeholder = 'Password...'
    inputPasswordEl.className = 'search-input'

    let submitButton = document.createElement('button')
    submitButton.textContent = 'Register'
    submitButton.className = 'submit-button'
    
  
    formEl.append(firstName, inputFirstNameEl, lastName, inputLastNameEl, id, inputIdEl, password, inputPasswordEl, submitButton)
    containerEl.append(closeButton, titleEl, formEl)
    wrapperEl.append(containerEl)
    mainEl.append(wrapperEl)
  }



function renderBagModal () {
    let mainEl = document.querySelector('main')

    let wrapperEl = document.createElement('div')
    wrapperEl.className = 'modal-wrapper'
  
    let containerEl = document.createElement('div')
    containerEl.className = 'modal-container'
  
    let closeButton = document.createElement('button')
    closeButton.textContent = 'X'
    closeButton.className = 'modal-close-button'
    closeButton.addEventListener('click', function () {
      state.modal = ''
      render()
    })
  
    let ItemBag = document.createElement('h2')
    ItemBag.textContent = 'Your Item Bag:'
  
    let items = document.createElement('ul')
    items.className = 'item-bag'

    for(let item of state.cart) {
        let itemEl = document.createElement('li')

        let itemImg = document.createElement('img')
        itemImg.src = item.image
        
        let itemName = document.createElement('h3')
        itemName.textContent = item.name

        if(item.discountedPrice){

        let divEl = document.createElement('div')
        divEl.className = 'discounted-price'
            
        let itemPrice = document.createElement('p')
        itemPrice.textContent = `$${item.price}`

        let itemDiscount = document.createElement('p')
        itemDiscount.textContent = `$${item.discountedPrice}`

        divEl.append(itemPrice, itemDiscount)
        itemEl.append(itemImg, itemName, divEl)
        } 
        else{
            let itemPrice = document.createElement('p')
            itemPrice.textContent = `$${item.price}`

            itemEl.append(itemImg, itemName, itemPrice)
        }

        let removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.addEventListener('click', function () {
            state.cart.splice(state.cart.indexOf(item), 1)
            render()
        })
        
        items.append(itemEl)
    }
    
    containerEl.append(closeButton, ItemBag,)
    wrapperEl.append(containerEl)
    mainEl.append(wrapperEl)
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
    for(let item of renderFilteredItems()){
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
    buttonEl.addEventListener('click', function(){
        addtoCart(selectedItem)
        render()
    })

    
    infoEl.append(priceEl ,h3El, buttonEl)
    divEl.append(imgEl, infoEl)
    mainEl.append(divEl)
        
}

function addtoCart(){
    if(state.selectedItem !== null)
    state.cart.push(state.selectedItem)
    render()
}

function render(){
    let mainEl = document.querySelector('main')
    mainEl.innerHTML = ''

    

    let searchEl = document.querySelector('.search-bar')
    searchEl.addEventListener('click', function(){
        state.modal = 'search'
        render()
    })

    let loginEl = document.querySelector('.log-in')
    loginEl.addEventListener('click', function(){
        state.modal = 'login'
        render()
    })

    let bagEl = document.querySelector('.shopping-bag')
    bagEl.addEventListener('click', function(){
        state.modal = 'bag'
        render()
    })

    if (state.modal === 'search') renderSearchModal()
    if (state.modal === 'login') renderProfileModal()
    if (state.modal === 'bag') renderBagModal()

    if(state.page === 'item'){
        renderSelectedItemPage()
    } else{

    renderStoreItems()
    renderStoreItemsByTypeGirls()
    renderStoreItemsByTypeGuys()
    renderStoreItemsByTypeSale()
    }
}

let logoEl = document.querySelector('.the-logo')
    logoEl?.addEventListener('click', function (){
    deselectItem()
    state.page = 'store'
    state.modal = ""
    state.searchTerm = ""
    render()
})


getStoreItems()
render()

