window.addEventListener('scroll',e=>{
    let navbar=document.getElementById('navbar')
    let links=document.querySelectorAll('#navbar a')
    let icons=document.querySelectorAll('.small-icons')
   if(scrollY>50){
    links.forEach(elem=>{
        elem.style.color='white'
    })
    icons.forEach(elem=>{
        elem.style.color='white'
    })
    navbar.style.backgroundColor='black';
   }
   else{
    links.forEach(elem=>{
        elem.style.color='black'
    })
    icons.forEach(elem=>{
        elem.style.color='black'
    })
    navbar.style.backgroundColor='transparent'
   }
})
