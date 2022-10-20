// document.querySelectorAll('a').forEach((elem)=>{
//     elem.addEventListener('click',(e)=>{
//         e.preventDefault();
//     })
// })

document.querySelectorAll('.categ').forEach((elem)=>{
    elem.addEventListener('mouseover',(e)=>{
        e.preventDefault();
        console.log(elem.lastElementChild)
      elem.lastElementChild.style.display='block';
    })

    elem.addEventListener('mouseout',(e)=>{
        elem.lastElementChild.style.display='none';
    })
})
