let navLinks = [];
let formInputs = [];
let selectInputs = [];
let scrollToTop = document.querySelector("#scroll-to-top")
let textArea = document.querySelector("#project-details")
let navLinksChildren = document.querySelector(".nav-links").children;
let FormInputChildren = document.querySelector("form").children
let navLinksHtml = document.querySelector(".nav-links");
let bodyChildren = document.querySelector("main").children;
let ThemeToggle = document.querySelector("#theme-toggle-button");
let sideSettings = document.querySelector("#settings-sidebar");
let sideSettingsToggle = document.querySelector("#settings-toggle");
let sideSettingsExit = document.querySelector("#close-settings");
let themeColorContainer = document.querySelector("#theme-colors-grid");
let resetSettings = document.querySelector("#reset-settings");
let mobileMenu = document.querySelector(".mobile-menu-btn")
let html = document.querySelector("html");
let body = document.querySelector("body");
let carouselindicators = document.querySelectorAll(".carousel-indicator")
let fontButtons = document.querySelectorAll(".font-option")
let filters = document.querySelectorAll(".portfolio-filter")
let fonts = ["alexandria" , "tajawal" , "cairo"]
let portofolioGrid = document.querySelector("#portfolio-grid")
let carousel = document.querySelector("#testimonials-carousel")
let nextCarousel = document.querySelector("#next-testimonial")
let formButton = FormInputChildren.item(6)
let prevCarousel = document.querySelector("#prev-testimonial")
let carouselPosition = 0;
let regExps = [/\w+@(gmail|yahoo|hotmail)\.com$/ , /^01[0-25][0-9]{8}$/  ]
let themeColors = [
    {
        title : "Purple Blue",
        primaryColor : "rgb(99, 102, 241)",
        secondaryColor : "rgb(139, 92, 246)",
        accentColor : "rgb(168, 85, 247)",
    },
    {
        title : "Pink Orange",
        primaryColor : "#ec4899",
        secondaryColor : "#f97316",
        accentColor : "#fb923c",
    },
    {
        title : "Green Emerald",
        primaryColor : "#10b981",
        secondaryColor : "#059669",
        accentColor : "#34d399",
    },
    {
        title : "Blue Cyan",
        primaryColor : "#3b82f6",
        secondaryColor : "#06b6d4",
        accentColor : "#22d3ee",
    },
    {
        title : "Red Rose",
        primaryColor : "#ef4444",
        secondaryColor : "#f43f5e",
        accentColor : "#fb7185",
    },
    {
        title : "Amber Orange",
        primaryColor : "#f59e0b",
        secondaryColor : "#ea580c",
        accentColor : "#fbbf24",
    },
];
for(let i = 0;i<fontButtons.length;i++){
    fontButtons.item(i).addEventListener("click" , () =>{
        fonts.forEach((n)=> {body.classList.remove(`font-${n}`)})
        body.classList.add(`font-${fonts[i]}`)
        localStorage.setItem("selectedFont" , fonts[i])
        for(let i =0;i<fontButtons.length;i++){
            fontButtons.item(i).classList.remove("active", "border-primary" ,"bg-slate-50" ,"dark:bg-slate-800")
            fontButtons.item(i).classList.add("border-slate-200" ,"dark:border-slate-700")
        }
        fontButtons.item(i).classList.add("active", "border-primary" ,"bg-slate-50" ,"dark:bg-slate-800")
        fontButtons.item(i).classList.remove("border-slate-200" ,"dark:border-slate-700")
    })
}
for(let i =0; i<themeColors.length;i++){
    let button = document.createElement("button")
    button.classList.add("w-12", "h-12", "rounded-full", "cursor-pointer", "transition-transform", "hover:scale-110", "border-2", "border-slate-200", "dark:border-slate-700" ,"hover:border-primary" ,"shadow-sm")
    button.setAttribute("title" , themeColors[i].title)
    button.setAttribute("data-primary" , themeColors[i].primaryColor)
    button.setAttribute("data-secondary" , themeColors[i].secondaryColor)
    button.setAttribute("data-accent" , themeColors[i].accentColor)
    button.setAttribute("style" ,`background: linear-gradient(135deg, ${themeColors[i].primaryColor}, ${themeColors[i].secondaryColor}); ` )
    button.addEventListener("click" , (e) => {
        localStorage.setItem("themeColor" , `${themeColors[i].title}`)
        html.setAttribute("style" ,  `--color-primary: ${themeColors[i].primaryColor}; --color-secondary: ${themeColors[i].secondaryColor}; --color-accent: ${themeColors[i].accentColor};`)
        for(let i =0;i<themeColorContainer.children.length;i++){
            themeColorContainer.children.item(i).classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
        }
        button.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
    })
    themeColorContainer.append(button)
}
for(let i =0;i<navLinksChildren.length;i++){
    if(navLinksChildren.item(i).tagName == "A"){
    let temp = navLinksChildren.item(i).href.split("#");
    navLinks.push(temp[1]);
    };
};
for(let i =0;i<carouselindicators.length;i++){
    carouselindicators.item(i).addEventListener("click" ,  (n)=>{
        for(let i =0;i<carouselindicators.length;i++){
            carouselindicators.item(i).classList.remove("active", "bg-accent", "scale-125")
            carouselindicators.item(i).classList.add("bg-slate-400" , "dark:bg-slate-600")
        }
        for(let i =0;i<carousel.children.length;i++){
            carousel.children.item(i).removeAttribute("selected")
        }
        n.target.classList.add("active", "bg-accent", "scale-125")
        n.target.classList.remove("bg-slate-400" , "dark:bg-slate-600")
        let index = n.target.dataset.index
        carousel.children.item(index).setAttribute("selected" , true)
        carouselPosition = (carousel.children.item(0).clientWidth / carousel.clientWidth) * 100 * index
        carousel.setAttribute("style" , `transform: translateX(${carouselPosition}%);`)
    })
}
for(let i =0;i<FormInputChildren.length -1;i++){
    if(FormInputChildren.item(i).children.item(1).tagName == "INPUT"){
        formInputs.push(FormInputChildren.item(i).children.item(1))
    }
    if(FormInputChildren.item(i).children.item(1).tagName == "DIV"){
        selectInputs.push(FormInputChildren.item(i).children.item(1))
    }


}
for(let i =0;i<selectInputs.length;i++){
    selectInputs[i].children.item(0).addEventListener("click" , () => {
        if(selectInputs[i].children.item(0).getAttribute("aria-expanded") == "false"){
            for(let i =0; i<selectInputs.length;i++){
            selectInputs[i].children.item(1).style.display = "none"
            selectInputs[i].children.item(0).children.item(1).style.transform = "rotate(0deg)"
            selectInputs[i].children.item(0).setAttribute("aria-expanded" , false)
            }
            selectInputs[i].children.item(1).style.display = "block"
            selectInputs[i].children.item(0).children.item(1).style.transform = "rotate(180deg)"
            selectInputs[i].children.item(0).setAttribute("aria-expanded" , true)
        }else{
            selectInputs[i].children.item(1).style.display = "none"
            selectInputs[i].children.item(0).children.item(1).style.transform = "rotate(0deg)"
            selectInputs[i].children.item(0).setAttribute("aria-expanded" , false)
        }
    }
)}
for(let i =0;i<selectInputs.length;i++){
    for(let x =0;x<selectInputs[i].children.item(1).children.length;x++){
       selectInputs[i].children.item(1).children.item(x).addEventListener("click" , ()=>{
        let child = selectInputs[i].children.item(1).children.item(x)
        selectInputs[i].children.item(0).children.item(0).innerText = child.dataset.value
        selectInputs[i].children.item(1).style.display = "none"
        selectInputs[i].children.item(0).children.item(1).style.transform = "rotate(0deg)"
        selectInputs[i].children.item(0).setAttribute("aria-expanded" , false)
        selectInputs[i].children.item(0).children.item(0).classList.remove("text-slate-500" ,"dark:text-slate-400")
        selectInputs[i].children.item(0).children.item(0).classList.add("text-slate-800" ,"dark:text-white")
       })
    }
}
function resetPosition(){
    carousel.children.item(0).setAttribute("selected" , true)
    carouselindicators.item(0).classList.add("active", "bg-accent", "scale-125")
    carouselindicators.item(0).classList.remove("bg-slate-400" , "dark:bg-slate-600")
}
function displayCards(keyword){
    
    for(let i =0;i<portofolioGrid.children.length;i++){
        let card = portofolioGrid.children.item(i)
            if(card.getAttribute("data-category") == keyword || keyword == "all"){
                card.style.display = "block"
                card.style.opacity = 1
                card.style.transform = "scale(1)"
            }else{
                card.style.display = "none"
                card.style.opacity = 1
                card.style.transform = "scale(1)"
            }
        
    }
}
function scrollIndicator(){
    let sum = 0;
    for(let i =0;i<bodyChildren.length;i++){
        let section = bodyChildren.item(i)
        if(navLinks.includes(section.id)){
            if(sum <= document.scrollingElement.scrollTop && sum + section.clientHeight >= document.scrollingElement.scrollTop){
                navLinksChildren.item(navLinks.indexOf(section.id)).classList.add("active")
            }else{
                navLinksChildren.item(navLinks.indexOf(section.id)).classList.remove("active")
            }
        }
        sum += section.clientHeight
    }
    if(document.scrollingElement.scrollTop > 600){
        scrollToTop.classList.remove("invisible" , "opacity-0")
        scrollToTop.classList.add("visible" , "opacity-100")
    }else{
        scrollToTop.classList.add("invisible" , "opacity-0")
        scrollToTop.classList.remove("visible" , "opacity-100")
    }
};
function toggleSettings(){
    if(sideSettingsToggle.getAttribute("aria-expanded") == "false"){
        sideSettings.classList.remove("translate-x-full")
        sideSettingsToggle.style.right = `${sideSettings.clientWidth}px`
        sideSettingsToggle.setAttribute("aria-expanded" , true)
    }else{
        sideSettings.classList.add("translate-x-full")
        sideSettingsToggle.style.right = `0px`
        sideSettingsToggle.setAttribute("aria-expanded" , false)
    }
};
function restartSettings(){
    for(let i =0;i<fontButtons.length;i++){
        fontButtons.item(i).classList.remove("active", "border-primary" ,"bg-slate-50" ,"dark:bg-slate-800");
        fontButtons.item(i).classList.add("border-slate-200" ,"dark:border-slate-700");
    };
    fonts.forEach((n)=> {body.classList.remove(`font-${n}`)})
    for(let i =0;i<themeColorContainer.children.length;i++){
        themeColorContainer.children.item(i).classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    };
    fontButtons.item(1).classList.add("active", "border-primary" ,"bg-slate-50" ,"dark:bg-slate-800");
    fontButtons.item(1).classList.remove("border-slate-200" ,"dark:border-slate-700");
    body.classList.add(`font-${fonts[1]}`)
    themeColorContainer.children.item(0).classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900");
    html.setAttribute("style" ,  `--color-primary: ${themeColors[0].primaryColor}; --color-secondary: ${themeColors[0].secondaryColor}; --color-accent: ${themeColors[0].accentColor};`)
    localStorage.setItem("themeColor" , themeColors[0].title)
    localStorage.setItem("selectedFont" , fonts[1])
    toggleSettings()
};
function clearInput(){
    formInputs[0].value = ""
    formInputs[1].value = ""
    formInputs[2].value = ""
    selectInputs[0].children.item(0).children.item(0).innerText = "اختر نوع المشروع"
    selectInputs[1].children.item(0).children.item(0).innerText = "اختر الميزانية"
    textArea.value == ""
}
function validateForm(){
    let validate = true;
    if(formInputs[0].value == ""){
        let nameWarning = document.createElement("p")
        validate = false
        nameWarning.innerText = "يرجى إدخال الاسم الكامل"
        nameWarning.classList.add("error-message", "text-red-400" ,"text-sm", "mt-1")
        if(FormInputChildren.item(0).children.item(2) == null){
            FormInputChildren.item(0).append(nameWarning)
        }
    }else{
        if(FormInputChildren.item(0).children.item(2) != null){
            FormInputChildren.item(0).removeChild(FormInputChildren.item(0).children.item(2))
        }
    }
    if(!regExps[0].test(formInputs[1].value)){
        let emailWarning = document.createElement("p")
        validate = false
        emailWarning.innerText = "يرجى إدخال البريد الإلكتروني"
        emailWarning.classList.add("error-message", "text-red-400" ,"text-sm", "mt-1")
        if(FormInputChildren.item(1).children.item(2) == null){
            FormInputChildren.item(1).append(emailWarning)
        }
    }else{
        if(FormInputChildren.item(1).children.item(2) != null){
            FormInputChildren.item(1).removeChild(FormInputChildren.item(1).children.item(2))
        }
    }
    if((!regExps[1].test(formInputs[2].value) && formInputs[2].value)){
        let phoneWarning = document.createElement("p")
        validate = false
        phoneWarning.innerText = "يرجى إدخال رقم هاتف صحيح"
        phoneWarning.classList.add("error-message", "text-red-400" ,"text-sm", "mt-1")
        if(FormInputChildren.item(2).children.item(2) == null){
            FormInputChildren.item(2).append(phoneWarning)
        }
    }else{
        if(FormInputChildren.item(2).children.item(2) != null){
            FormInputChildren.item(2).removeChild(FormInputChildren.item(2).children.item(2))
        }
    }
    if(selectInputs[0].children.item(0).children.item(0).innerText == "اختر نوع المشروع" || selectInputs[1].children.item(0).children.item(0).innerText == "اختر الميزانية" || textArea.value == ""){
        let otherWarning = document.createElement("p")
        validate = false
        otherWarning.innerText = "يرجى إدخال تفاصيل المشروع"
        otherWarning.classList.add("error-message", "text-red-400" ,"text-sm", "mt-1")
        if(FormInputChildren.item(5).children.item(2) == null){
            FormInputChildren.item(5).append(otherWarning)
        }
    }else{
        if(FormInputChildren.item(5).children.item(2) != null){
    
            FormInputChildren.item(5).removeChild(FormInputChildren.item(5).children.item(2))
        }
    }
    if(validate){
        body.innerHTML += `<div class="fixed inset-0 flex items-center justify-center z-50 bg-slate-950/80 backdrop-blur-sm">
      <div class="bg-slate-800 rounded-2xl p-8 max-w-md mx-4 text-center border border-slate-700 shadow-2xl transform animate-fade-in">
        <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="text-4xl fa-check fa-solid text-white" data-fa-i2svg=""></i>
        </div>
        <h3 class="text-2xl font-bold mb-3">تم إرسال رسالتك بنجاح!</h3>
        <p class="text-slate-400 mb-6">شكراً لتواصلك. سأرد عليك في أقرب وقت ممكن.</p>
        <button class="success-popup-close bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
          حسناً
        </button>
      </div>
    </div>`
    clearInput()
    body.children.item(8).children.item(0).children.item(3).addEventListener("click" , () => body.removeChild(body.children.item(8)))
    setTimeout(() => {
         body.removeChild(body.children.item(8))
    }, 5000);
    }
    return
}
filters.forEach(
    (n) => {
        n.addEventListener("click" , ()=>{
            for(let i=0;i<filters.length;i++){
                filters.item(i).classList.remove("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white" ,"hover:shadow-lg" ,"hover:shadow-primary/50")
                filters.item(i).classList.add("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700")
            }
            n.classList.add("active", "bg-linear-to-r", "from-primary", "to-secondary", "text-white" ,"hover:shadow-lg" ,"hover:shadow-primary/50")
            n.classList.remove("bg-white", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-300", "hover:bg-slate-100", "dark:hover:bg-slate-700", "border", "border-slate-300", "dark:border-slate-700")
            for(let i =0;i<portofolioGrid.children.length;i++){
                let card = portofolioGrid.children.item(i)
                card.style.transition = "opacity 0.3s , transform 0.3s"
                card.style.opacity = 0
                card.style.transform = "scale(0.8)"
            }
            setTimeout(displayCards , 300 , n.getAttribute("data-filter"))
        })
    }
)
document.addEventListener("scroll" , scrollIndicator);
resetSettings.addEventListener("click" , restartSettings)
sideSettingsToggle.addEventListener("click" , toggleSettings);
sideSettingsExit.addEventListener("click" , toggleSettings);
ThemeToggle.addEventListener("click" , () => {
    if(html.classList.contains("dark")){
        html.classList.remove("dark")
    }else{
        html.classList.add("dark")
    }
});
mobileMenu.addEventListener("click" , ()=>{
    if(navLinksHtml.classList.contains("active")){
        navLinksHtml.classList.remove("active")
        mobileMenu.setAttribute("aria-label", "فتح القائمة")
    }else{
        navLinksHtml.classList.add("active")
        mobileMenu.setAttribute("aria-label", "إغلاق القائمة")
    }
})
nextCarousel.addEventListener("click" , ()=>{
    let x = 0;
    for(let i =0;i<carousel.children.length;i++){
        if(carousel.children.item(i).hasAttribute("selected")){
            x = i + 1
            carousel.children.item(i).removeAttribute("selected")
            if(i <= 3){
            carouselindicators.item(i).classList.remove("active", "bg-accent", "scale-125")
            carouselindicators.item(i).classList.add("bg-slate-400" , "dark:bg-slate-600")
            }
        }
    }
    carousel.children.item(x).setAttribute("selected" , true)
    if(x <= 3){
        carouselindicators.item(x).classList.add("active", "bg-accent", "scale-125")
        carouselindicators.item(x).classList.remove("bg-slate-400" , "dark:bg-slate-600")
    }
    if(carouselPosition < (carousel.children.item(0).clientWidth / carousel.clientWidth) * 100 * (Math.ceil((carousel.scrollWidth / carousel.clientWidth).toFixed(1)) + 1)){
        carouselPosition += (carousel.children.item(0).clientWidth / carousel.clientWidth) * 100
    }else{
        carouselPosition = 0
        carousel.children.item(x).removeAttribute("selected")
        resetPosition()
        
    }
    carousel.setAttribute("style" , `transform: translateX(${carouselPosition}%);`)
})
prevCarousel.addEventListener("click" , ()=>{
    let x = 0;
    for(let i =0;i<carousel.children.length;i++){
        if(carousel.children.item(i).hasAttribute("selected")){
            x = i - 1 == -1 ? carousel.children.length - Math.ceil((carousel.clientWidth / carousel.children.item(0).clientWidth).toFixed(1)) : i -1 
            carousel.children.item(i).removeAttribute("selected")
            if(i <= 3){
            carouselindicators.item(i).classList.remove("active", "bg-accent", "scale-125")
            carouselindicators.item(i).classList.add("bg-slate-400" , "dark:bg-slate-600")
            }
        }
    }
    carousel.children.item(x).setAttribute("selected" , true)
    if(x <= 3){
        carouselindicators.item(x).classList.add("active", "bg-accent", "scale-125")
        carouselindicators.item(x).classList.remove("bg-slate-400" , "dark:bg-slate-600")
    }
    if(carouselPosition > 0){
        carouselPosition -= (carousel.children.item(0).clientWidth / carousel.clientWidth) * 100
    }else{
        carouselPosition = (carousel.children.item(0).clientWidth / carousel.clientWidth) * 100 * (Math.ceil((carousel.scrollWidth / carousel.clientWidth).toFixed(1)) + 1)
        carousel.children.item(0).removeAttribute("selected")
        carousel.children.item(x).setAttribute("selected" , true)
    }
    carousel.setAttribute("style" , `transform: translateX(${carouselPosition}%);`)
})
window.addEventListener("resize" , ()=> {
    if(carouselPosition == 0){return}
    for(let i =0;carousel.children.length;i++){
        if(carousel.children.item(i).hasAttribute("selected")){
            let l = (carousel.children.item(0).clientWidth / carousel.clientWidth) * 100
            
            carouselPosition = l * i
            carousel.setAttribute("style" , `transform: translateX(${carouselPosition}%);`)
            return
        }
    }
})
formButton.addEventListener("click" , (e) =>{
    e.preventDefault()
    validateForm()
})
scrollToTop.addEventListener("click" , ()  => document.scrollingElement.scrollTo(0 , 0))
resetPosition()
if(localStorage.getItem("themeColor") != null){
    let color = localStorage.getItem("themeColor")  
    for(let i = 0;i<themeColors.length;i++){
        if(color == themeColors[i].title){
            themeColorContainer.children.item(i).classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-white", "dark:ring-offset-slate-900")
            html.setAttribute("style" ,  `--color-primary: ${themeColors[i].primaryColor}; --color-secondary: ${themeColors[i].secondaryColor}; --color-accent: ${themeColors[i].accentColor};`)
        }
    }
}
if(localStorage.getItem("selectedFont") != null){
    let font = localStorage.getItem("selectedFont") 
    let index = fonts.indexOf(font)
    fontButtons.item(index).classList.add("active", "border-primary" ,"bg-slate-50" ,"dark:bg-slate-800")
    fontButtons.item(index).classList.remove("border-slate-200" ,"dark:border-slate-700")
    body.classList.add(`font-${font}`)
}