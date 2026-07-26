// ===== Scroll Animation =====
const observer = new IntersectionObserver((entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});

document.querySelectorAll(".card").forEach((el)=>{
observer.observe(el);
});

// ===== Counter Animation =====
const counters=document.querySelectorAll(".counter h2");

counters.forEach(counter=>{

const update=()=>{

const target=parseInt(counter.innerText);

let count=parseInt(counter.getAttribute("data-count"))||0;

const increment=Math.ceil(target/100);

if(count<target){

count+=increment;

counter.setAttribute("data-count",count);

counter.innerText=count+"+";

setTimeout(update,20);

}else{

counter.innerText=target+"+";

}

};

update();

});

// ===== Back To Top =====

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="25px";
topBtn.style.right="20px";
topBtn.style.width="50px";
topBtn.style.height="50px";
topBtn.style.borderRadius="50%";
topBtn.style.border="none";
topBtn.style.background="#0b6b3a";
topBtn.style.color="#fff";
topBtn.style.cursor="pointer";
topBtn.style.display="none";

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ===== WhatsApp Button =====

const wa=document.createElement("a");

wa.href="https://wa.me/917860106009";

wa.innerHTML="💬";

wa.target="_blank";

wa.style.position="fixed";

wa.style.bottom="90px";

wa.style.right="20px";

wa.style.width="55px";

wa.style.height="55px";

wa.style.borderRadius="50%";

wa.style.background="#25D366";

wa.style.color="#fff";

wa.style.display="flex";

wa.style.alignItems="center";

wa.style.justifyContent="center";

wa.style.fontSize="28px";

wa.style.textDecoration="none";

document.body.appendChild(wa);// Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Back To Top Button
const topBtn = document.createElement("button");
topBtn.innerHTML = "⬆";
topBtn.id = "topBtn";
document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "20px";
topBtn.style.right = "20px";
topBtn.style.padding = "12px 15px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#0b6b3a";
topBtn.style.color = "#fff";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";

window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};
.card{
opacity:0;
transform:translateY(40px);
transition:.6s;
}

.card.show{
opacity:1;
transform:translateY(0);
}

#topBtn:hover{
background:#ff9800;
}

html{
scroll-behavior:smooth;
}
