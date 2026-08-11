// Smooth Scroll

document.querySelectorAll('nav a').forEach(link=>{

link.addEventListener('click',function(e){

e.preventDefault();

const target=document.querySelector(this.getAttribute('href'));

if(target){

target.scrollIntoView({

behavior:'smooth'

});

}

});

});

// Scroll Animation

const cards=document.querySelectorAll('.card');

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform="translateY(0)";

}

});

});

cards.forEach(card=>{

card.style.opacity=0;

card.style.transform="translateY(40px)";

card.style.transition=".6s";

observer.observe(card);

});
