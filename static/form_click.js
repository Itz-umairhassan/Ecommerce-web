document.querySelectorAll('.in').forEach(elem=>{
    const label=elem.lastElementChild;
    elem.addEventListener('click',e=>{
        label.style.transform= 'translateY(-200%)';
        label.style.color='black';
    })
    elem.addEventListener('focusout',e=>{
       if(!elem.firstElementChild.value){
        label.style.transform='translateY(-100%)'
        label.style.color='gray'
       }
    })
})
