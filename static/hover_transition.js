document.querySelectorAll('.off-col').forEach(elem=>{
    elem.addEventListener('mouseover',e=>{
        // get layer div... to add hover animation on it...
       const layer=elem.lastElementChild;
       layer.style.background='linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7))'
   
       const link=layer.firstElementChild;
       link.style.bottom='49%';
       link.style.opacity='1';
    })
})

document.querySelectorAll('.off-col').forEach(elem=>{
    elem.addEventListener('mouseout',e=>{
        const layer=elem.lastElementChild;
        layer.style.background='transparent'
        console.log(layer.firstElementChild)

        const link=layer.firstElementChild;
        link.style.bottom='0';
        link.style.opacity='0';
    })
})

document.querySelectorAll('.cols').forEach(elem=>{

    elem.addEventListener('mouseover',e=>{
        elem.style.background='rgb(250, 222, 222)';
        elem.style.transform='translateY(-10%)';
    })

    elem.addEventListener('mouseout',e=>{
            elem.style.background='rgb(243 233 233)';
            elem.style.transform='translateY(10%)';
    })

})

