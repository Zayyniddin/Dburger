const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalPrice() {
            return this.amount * this.price
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalPrice() {
            return this.amount * this.price
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalPrice() {
            return this.amount * this.price
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalPrice() {
            return this.amount * this.price
        }
    }
}


const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    basketBtnCount = document.querySelector('.wrapper__navbar-count'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    modalChecklist = document.querySelector('.modal'),
    modalOverlay = document.querySelector('.overlay'),
    closeModalBtn = document.querySelector('.close__modal'),
    modalContent = document.querySelector('.content'),
    modalOrder = document.querySelector('.modal__order')


productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusOrMinus(btn)
    })
})

function plusOrMinus(btn) {
    //closest() берет ближайшего родителя обращается по селекторам 
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            parentIndecator.classList.add('active')
            parentIndecator.innerHTML = po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
    }
    basketChecklist.innerHTML = ''
    productArray.forEach((item) => {
        basketChecklist.innerHTML += cardItemBurger(item)
    })
    modalContent.innerHTML = ''
    productArray.forEach((item) => {
        modalContent.innerHTML += modalBurger(item)
    })
    
    const allCount = totalCountBasket()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummBasket()
    modalTotalPrice.innerHTML = totalSummBasket()
}

let modalTotalPrice = document.getElementById('modaltotalprice')

function totalCountBasket() {
    let totalCount = 0
    for (const key in product) {
        totalCount += product[key].amount
    }
    return totalCount
}
function totalSummBasket() {
    let totalCount = 0
    for (const key in product) {
        totalCount += product[key].totalPrice
    }
    return totalCount.toLocaleString()
}

basketBtn.addEventListener('click', () => basketModal.classList.add('active'))

closeBasketModal.addEventListener('click', () => basketModal.classList.remove('active'))


function cardItemBurger(product) {
    const { name, totalPrice: price, amount, img } = product
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src="${img}" class="wrapper__navbar-productImage" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice">${price.toLocaleString()} сум</p>
            </div>
        </div>
        <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
            <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
            <output class="wrapper__navbar-amount">${amount}</output>
            <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
        </div>
    </div>
    `
}


window.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idProduct].amount--
            else if (attr == '+') product[idProduct].amount++
            basket()
        }
    }
})

btnCard.addEventListener('click', () => {
    modalChecklist.classList.add('active')
    modalOverlay.style.display = 'block';
    basketModal.classList.remove('active')
});

closeModalBtn.addEventListener('click', () => {
    modalChecklist.classList.remove('active')
    modalOverlay.style.display = 'none';
})

modalOrder.addEventListener('click', () => {
    location.reload();
})

function modalBurger(product) {
    const { name:modalName, price:modalPrice, img:modalImg, amount:modalAmount, totalPrice:modalTotalPrice } = product;
    return `
        <div class="wrapper__navbar-product modal-product">
            <div class="wrapper__navbar-info modal-info-burger">
          
                <div class="wrapper__navbar-infoSub">
                    <p class="wrapper__navbar-infoName">${modalName}</p>
                    <p class="wrapper__navbar-infoPrice">${modalPrice.toLocaleString()} сум</p>
                </div>
                <p class="modal__burger-amount">${modalAmount} шт</p>
            </div>
        </div>
    `
}


// <img src="${modalImg}" class="wrapper__navbar-productImage modal-burger" alt="" />