let words=document.querySelectorAll(".word");
words.forEach((word)=>{
    let letters=word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span=document.createElement("span");
        span.textContent=letter;
        span.className="letter";
        word.append(span);
    });
});
let currentWordIndex=0;
let maxWordIndex=words.length -1;
words[currentWordIndex].style.opacity="1";

let changeText=()=>{
    let currentWord=words[currentWordIndex];
    let nextWord= currentWordIndex=== maxWordIndex?words[0]:words[currentWordIndex+1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className="letter out";
        },i*80);

    });
    nextWord.style.opacity="1"
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className="letter behind";
        setTimeout(()=>{
            letter.className="letter in";

        },340+i*80);
    });
    currentWordIndex  =currentWordIndex=== maxWordIndex ? 0: currentWordIndex+1;
};
changeText();
setInterval(changeText,3000)



/////////circle skills/////

const circles=document.querySelectorAll(".circle");
circles.forEach(elem=>{
    var dots=elem.getAttribute("data-dots");
    var marked=elem.getAttribute("data-percent");
    var percent=Math.floor(dots*marked/100);
    var points="";
    var rotate=360/dots;

    for(let i=0;i<dots;i++){
        points+=`<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;

    }
    elem.innerHTML=points;
    const pointsMarked=elem.querySelectorAll('.points');
    for (let i=0 ;i < percent;i++) {
        pointsMarked[i].classList.add('marked')
    }

})


/////////////////////////active menu
let menuLi=document.querySelectorAll('header ul li a');
let section=document.querySelectorAll('section');
function activeMenu(){
    let len=section.length;
    while(--len && window.scrollY+97<section[len].offsetTop){}
    menuLi.forEach(sec=> sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu()
window.addEventListener("scroll",activeMenu)

//////////////////////////////sticky navbar////////////

    
const header=document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50);
})

//////////////////////////////toggle icon navbar////////////
let menuIcon=document.querySelector("#menu-icon");
let navlist= document.querySelector(".navlist");
menuIcon.onclick=()=>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}
window.onscroll=()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open") ;
}
///////////////////parallax////////

    const observer=new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show-items");
            }else{
                entry.target.classList.remove("show-items");
            }
        });
    });

    const scrollScale=document.querySelectorAll(".scroll-scale");
    scrollScale.forEach((el)=>observer.observe(el));

    const scrollBottom=document.querySelectorAll(".scroll-bottom");
    scrollBottom.forEach((el)=>observer.observe(el));

    const scrollTop=document.querySelectorAll(".scroll-top");
    scrollTop.forEach((el)=>observer.observe(el));


///////////////////script of contact ///*css*/`
    
const contactForm=document.getElementById('contact-form'),
   contactMessage= document.getElementById('contact-message')

   const sendEmail  = (e) =>{
       e.preventDefault()
              // serviceID - templateID - #form - publicKey
       emailjs.sendForm('service_bannwk3','template_26g5nvg','#contact-form','GYojvqLQd_4EPjufS')
       .then(() =>{
       // Show sent message
         contactMessage.textContent="Message sent successfully ✅"
        
       //Remove message after five seconds
       setTimeout(() =>{
           contactMessage.textContent =""
       },5000)   
       
       // Clear input fields
       contactForm.reset()
   
   },()=>{
       //Show error message
       contactMessage.textCOntent='Message not sent (service error) ❌'
   })
   ///
   
   }
   
   contactForm.addEventListener('submit',sendEmail)

/////////////////carousel/////////////
    
document.querySelectorAll(".carousel").forEach(carousel =>{
    const items=carousel.querySelectorAll(".carousel--item");
    const buttonshtml=Array.from(items,()=>{
        return`<span class="carousel--button"></span>`;
    });
    carousel.insertAdjacentHTML("beforeend",
    `<div class="carousel--nav"> 
    ${buttonshtml.join("") } 
    </div>
`);
    const buttons=carousel.querySelectorAll(".carousel--button");
    buttons.forEach((button,i)=>{
        button.addEventListener("click",()=>{
            items.forEach(item=>item.classList.remove("carousel--item--selected"));
            buttons.forEach(button=>button.classList.remove("carousel--button--selected"));
            items[i].classList.add("carousel--item--selected");
            button.classList.add("carousel--button--selected");
        })
    })
    items[0].classList.add("carousel--item--selected");
    buttons[0].classList.add("carousel--button--selected");
});