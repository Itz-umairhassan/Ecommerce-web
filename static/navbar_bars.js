let bars = document.getElementById('bars')
let nav = document.getElementById('list-cont')
let below = false;
let cross_cart=document.getElementById('cross-cart')

bars.addEventListener('click', e => {
    if (!below) {
        nav.style.display = 'block'
        nav.style.height = '47vh'
        below = true;
        cross_cart.classList.remove('fa-cart-shopping');
        cross_cart.classList.add('fa-xmark');
    }
    else {
        nav.style.height = '0vh'
        nav.style.display = 'none'
        below = false;
    }
})

cross_cart.addEventListener('click',e=>{
    if(below){
        cross_cart.classList.add('fa-cart-shopping');
        cross_cart.classList.remove('fa-xmark');
        nav.style.height = '0vh'
        nav.style.display = 'none'
        below = false;
    }
})
