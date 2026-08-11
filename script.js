const header=document.querySelector('#header'),menu=document.querySelector('#menu');
menu.addEventListener('click',()=>{header.classList.toggle('open');menu.textContent=header.classList.contains('open')?'×':'☰'});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('open');menu.textContent='☰'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');observer.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
const sections=document.querySelectorAll('main section[id]'),links=document.querySelectorAll('.nav a');
function activeNav(){let current='home';sections.forEach(s=>{if(scrollY>=s.offsetTop-160)current=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current))}
addEventListener('scroll',activeNav,{passive:true});activeNav();
document.querySelectorAll('.faq-item').forEach(item=>item.addEventListener('click',()=>{item.classList.toggle('open');item.querySelector('b').textContent=item.classList.contains('open')?'−':'+'}));
const art=document.querySelector('.hero-art');addEventListener('mousemove',e=>{if(innerWidth<901)return;const x=(e.clientX/innerWidth-.5)*7,y=(e.clientY/innerHeight-.5)*7;art.style.transform=`translate(${x}px,${y}px)`});
