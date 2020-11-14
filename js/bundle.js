(()=>{"use strict";(()=>{let e;window.util={isEscEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())},isEnterEvent:(e,t)=>{"Enter"===e.key&&t()},isMouseMainButton:(e,t)=>{1===e.which&&t()},debounce:t=>{e&&window.clearTimeout(e),e=window.setTimeout(t,500)}}})(),(()=>{const e=document.querySelector("#success").content.querySelector(".success"),t=document.querySelector("#error").content.querySelector(".error"),r=(e,t,r)=>{e.addEventListener("load",(function(){200===e.status?t(e.response):r("Статус ответа: "+e.status+" "+e.statusText)})),e.addEventListener("error",(function(){r("Произошла ошибка соединения")})),e.addEventListener("timeout",(function(){r("Запрос не успел выполниться за "+e.timeout+"мс")}))};window.backend={load:(e,t)=>{const o=new XMLHttpRequest;o.responseType="json",o.open("GET","https://21.javascript.pages.academy/keksobooking/data"),o.timeout=1e4,r(o,e,t),o.send()},upload:(e,t,o)=>{const n=new XMLHttpRequest;n.responseType="json",n.open("POST","https://21.javascript.pages.academy/keksobooking"),n.timeout=1e4,r(n,t,o),n.send(e)},errorHandler:e=>{const t=document.createElement("div");t.classList.add("server-error"),t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},successHandler:()=>{document.body.insertAdjacentElement("afterbegin",e),document.addEventListener("keydown",(t=>{window.util.isEscEvent(t,(()=>{e.remove()}))})),document.addEventListener("click",(()=>{e.remove()}))},uploadErrorHandler:()=>{document.body.insertAdjacentElement("afterbegin",t),document.addEventListener("keydown",(e=>{window.util.isEscEvent(e,(()=>{t.remove()}))})),document.addEventListener("click",(()=>{t.remove()}))}}})(),(()=>{const e="palace",t="house",r="flat",o="any",n="img/muffin-grey.svg",a=document.querySelector(".ad-form"),i=a.querySelectorAll("fieldset"),d=a.querySelector("#room_number"),s=a.querySelector("#capacity"),l=a.querySelector("#title"),c=a.querySelector("#type"),u=a.querySelector("#price"),p=a.querySelector("#timein"),m=a.querySelector("#timeout"),v=document.querySelector(".map__filters"),f=v.querySelectorAll("fieldset"),y=v.querySelectorAll("select"),w=a.querySelector(".ad-form__reset"),g=document.querySelector("#housing-type"),_=document.querySelector("#housing-price"),h=document.querySelector("#housing-rooms"),q=document.querySelector("#housing-guests"),S=document.querySelector("#housing-features"),E=S.querySelectorAll("input"),L=document.querySelector(".map"),b=document.querySelector(".map__pins"),C=document.querySelector(".map__pin--main"),x=document.querySelector(".ad-form-header__preview").querySelector("img"),k=document.querySelector("#avatar");let A=document.querySelector(".ad-form__photo").querySelector("img");const H=document.querySelector("#images"),F=parseInt(C.style.left,10),V=parseInt(C.style.top,10),P={[e]:1e4,[t]:5e3,[r]:1e3,bungalow:0};let T=[];const j=e=>{e.forEach((function(e){e.setAttribute("disabled",!0)}))},D=e=>{e.forEach((function(e){e.removeAttribute("disabled")}))},M=()=>{l.value.length<30?l.setCustomValidity("минимальная длина - 30 символов"):l.value.length>100?l.setCustomValidity("максимальная длина - 100 символов"):l.setCustomValidity("")},I=()=>{"bungalow"===c.value&&u.setAttribute("placeholder","0"),c.value===e&&u.value<P.palace?(u.setAttribute("placeholder","10000"),u.setCustomValidity("Минимальная цена за ночь: 10 000")):c.value===t&&u.value<P.house?(u.setAttribute("placeholder","5000"),u.setCustomValidity("Минимальная цена за ночь: 5 000")):c.value===r&&u.value<P.flat?(u.setAttribute("placeholder","1000"),u.setCustomValidity("Минимальная цена за ночь: 1 000")):0===u.value.length?u.setCustomValidity("Нужно задать цену за ночь"):u.setCustomValidity("")},X=()=>{m.value=p.value},R=()=>{p.value=m.value},$=()=>{"100"===d.value&&"0"!==s.value?s.setCustomValidity("Не для гостей"):"1"===d.value&&"1"!==s.value?s.setCustomValidity("для 1 гостя"):"2"===d.value?(s.setCustomValidity("для 2 гостей или для 1 гостя"),"1"!==s.value&&"2"!==s.value||s.setCustomValidity("")):"3"===d.value?(s.setCustomValidity("для 3 гостей, для 2 гостей или для 1 гостя"),"1"!==s.value&&"2"!==s.value&&"3"!==s.value||s.setCustomValidity("")):s.setCustomValidity("")},Y=e=>{window.util.isEnterEvent(e,N)},B=e=>{window.util.isMouseMainButton(e,N)},N=()=>{w.addEventListener("click",W),C.removeEventListener("mousedown",B),C.removeEventListener("keydown",Y),L.classList.contains("map--faded")&&window.map.renderFragment(T),window.map.setAddress(window.map.getAddressCoords(C).x,window.map.getAddressCoords(C).y),L.classList.remove("map--faded"),a.classList.remove("ad-form--disabled"),D(i),D(f),D(y),M(),l.addEventListener("input",M),I(),c.addEventListener("change",I),u.addEventListener("input",I),$(),s.addEventListener("change",$),d.addEventListener("change",$),p.addEventListener("change",X),m.addEventListener("change",R),k.addEventListener("change",window.preview.imagePreviewHandler),H.addEventListener("change",window.preview.imagePreviewHandler),v.classList.remove("map__filters--disabled")},W=()=>{w.removeEventListener("click",W),C.addEventListener("mousedown",B),C.addEventListener("keydown",Y),window.map.clearPins(b),L.classList.add("map--faded"),C.style.top=V+"px",C.style.left=F+"px",v.classList.add("map__filters--disabled"),a.classList.add("ad-form--disabled"),a.reset(),window.map.setAddress(F+31,V+31),g.value=o,_.value=o,h.value=o,q.value=o,E.forEach((e=>{e.checked=!1})),l.removeEventListener("input",M),c.removeEventListener("change",I),u.removeEventListener("input",I),s.removeEventListener("change",$),d.removeEventListener("change",$),p.removeEventListener("change",X),m.removeEventListener("change",R),x.src=n,A=document.querySelector(".ad-form__photo").querySelector("img"),A&&(A.src=n),k.removeEventListener("change",window.preview.imagePreviewHandler),H.removeEventListener("change",window.preview.imagePreviewHandler),j(i),j(f),j(y)};g.addEventListener("change",(()=>{window.util.debounce(window.map.filterFragments(T,window.filter.filterPlaces))})),_.addEventListener("change",(()=>{window.util.debounce(window.map.filterFragments(T,window.filter.filterPlaces))})),h.addEventListener("change",(()=>{window.util.debounce(window.map.filterFragments(T,window.filter.filterPlaces))})),q.addEventListener("change",(()=>{window.util.debounce(window.map.filterFragments(T,window.filter.filterPlaces))})),S.addEventListener("change",(()=>{window.util.debounce(window.map.filterFragments(T,window.filter.filterPlaces))})),window.backend.load((e=>{T=[...e]}),window.backend.errorHandler),window.form={init:W}})(),(()=>{const e=document.querySelector(".map").offsetWidth;window.drag={dragHandler:t=>{t.addEventListener("mousedown",(r=>{r.preventDefault();let o={x:r.clientX,y:r.clientY};const n=r=>{r.preventDefault();let n=o.x-r.clientX,a=o.y-r.clientY;o={x:r.clientX,y:r.clientY};let i=t.style.top=t.offsetTop-a,d=t.style.left=t.offsetLeft-n;i<=46?i=46:i>=546&&(i=546),d<=-31?d=-31:d>=e-31&&(d=e-31),t.style.top=i+"px",t.style.left=d+"px",window.map.setAddress(d+31,i+62+22)},a=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",a)}))}}})(),(()=>{const e="any",t={low:{min:0,max:1e4},middle:{min:1e4,max:5e4},high:{min:5e4,max:1/0}},r=document.querySelector("#housing-type"),o=document.querySelector("#housing-price"),n=document.querySelector("#housing-rooms"),a=document.querySelector("#housing-guests"),i=document.querySelector("#housing-features"),d=i.querySelector("#filter-wifi"),s=i.querySelector("#filter-dishwasher"),l=i.querySelector("#filter-parking"),c=i.querySelector("#filter-washer"),u=i.querySelector("#filter-elevator"),p=i.querySelector("#filter-conditioner"),m=r=>o.value===e||r.offer.price<=t[o.value].max&&r.offer.price>=t[o.value].min,v=t=>n.value===e||t.offer.rooms===parseInt(n.value,10),f=t=>a.value===e||t.offer.guests===parseInt(a.value,10),y=(e,t)=>!(t.checked&&!e.offer.features.includes(t.value));window.filter={filterPlaces:t=>{let o=[];for(let a=0;a<t.length&&(n=t[a],!((r.value===e||n.offer.type===r.value)&&m(t[a])&&v(t[a])&&f(t[a])&&y(t[a],d)&&y(t[a],s)&&y(t[a],l)&&y(t[a],c)&&y(t[a],u)&&y(t[a],p)&&(o.push(t[a]),5===o.length)));a++);var n;return o}}})(),(()=>{const e=document.querySelector(".map__pins"),t={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"},r=document.querySelector("#card").content.querySelector(".map__card"),o=e=>{window.util.isEscEvent(e,a)},n=()=>{let t=e.querySelector(".map__pin--active");t&&t.classList.remove("map__pin--active")},a=()=>{n();const e=document.querySelector(".map__card");e&&(e.classList.add("hidden"),e.querySelector(".popup__close").removeEventListener("keydown",a)),document.removeEventListener("keydown",o)},i=(e,t)=>!!e||(t.innerHTML="",!1),d=e=>{let o=document.querySelector(".map__card");o||(o=r.cloneNode(!0));const n=o.querySelector(".popup__photos"),a=o.querySelector(".popup__features"),d=e.offer.features,s=e.offer.photos;if(a.innerHTML="",n.innerHTML="",i(e.offer.title,o.querySelector(".popup__title"))&&(o.querySelector(".popup__title").textContent=e.offer.title),i(e.offer.address,o.querySelector(".popup__text--address"))&&(o.querySelector(".popup__text--address").textContent=e.offer.address),i(e.offer.price,o.querySelector(".popup__text--price"))&&(o.querySelector(".popup__text--price").textContent=e.offer.price+" ₽/ночь"),i(e.offer.type,o.querySelector(".popup__type"))&&(o.querySelector(".popup__type").textContent=t[e.offer.type]),i(e.offer.rooms,o.querySelector(".popup__text--capacity"))&&(e.offer.guests?o.querySelector(".popup__text--capacity").textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`:o.querySelector(".popup__text--capacity").remove()),i(e.offer.checkin,o.querySelector(".popup__text--time"))&&(e.offer.checkout?o.querySelector(".popup__text--time").textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`:o.querySelector(".popup__text--time").remove()),i(d,a)){const e=document.createDocumentFragment();for(let t=0;t<d.length;t++){let r=document.createElement("li");r.classList.add("popup__feature"),r.classList.add("popup__feature--"+d[t]),e.appendChild(r)}a.appendChild(e)}if(i(e.offer.description,o.querySelector(".popup__description"))&&(o.querySelector(".popup__description").textContent=e.offer.description),i(s,n)){const e=document.createDocumentFragment();for(let t=0;t<s.length;t++){let r=document.createElement("img");r.classList.add("popup__photo"),r.setAttribute("width","45"),r.setAttribute("height","40"),r.setAttribute("alt","Фотография жилья"),r.setAttribute("src",s[t]),e.appendChild(r)}n.appendChild(e)}return i(e.author.avatar,o.querySelector(".popup__avatar"))&&(o.querySelector(".popup__avatar").src=e.author.avatar),o};window.card={cardHandler:t=>{const r=document.querySelector(".map__card");r?(r.classList.add("hidden"),d(t),r.classList.remove("hidden")):e.appendChild(d(t)),document.querySelector(".popup__close").addEventListener("click",a),document.addEventListener("keydown",o)},resetActiveClass:n}})(),(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector(".ad-form").querySelector("#address"),r=document.querySelector("#pin").content.querySelector(".map__pin"),o=e=>{let t=e.querySelector(".map__card");t&&e.removeChild(t),e.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((t=>{e.removeChild(t)}))},n=e=>{let t=r.cloneNode(!0),o=t.querySelector("img");return t.style.left=e.location.x-25+"px",t.style.top=e.location.y-70+"px",o.setAttribute("src",e.author.avatar),o.setAttribute("alt",e.offer.title),t},a=t=>{let r,o=[...t];const a=document.createDocumentFragment(),i=o.length>5?5:o.length;for(let e=0;e<i;e++)r=n(o[e]),r.addEventListener("click",(t=>{window.card.resetActiveClass(),t.target.closest(".map__pin").classList.add("map__pin--active"),window.card.cardHandler(o[e])})),a.appendChild(r);e.appendChild(a)};window.map={getAddressCoords:e=>({x:(parseInt(e.style.left,10)+31).toFixed(),y:(parseInt(e.style.top,10)+62+22).toFixed()}),setAddress:(e,r)=>{t.value=e+" , "+r},renderFragment:a,filterFragments:(t,r)=>{const n=r(t);o(e),a(n)},clearPins:o}})(),(()=>{const e=["gif","jpg","jpeg","png"];window.preview={imagePreviewHandler:t=>{const r=t.target.files[0];let o=t.target.closest(".ad-form-header__upload");if(!o){o=t.target.closest(".ad-form__photo-container");let e=document.createElement("img");e.width="40",e.height="44",o.querySelector(".ad-form__photo").innerHTML="",o.querySelector(".ad-form__photo").appendChild(e)}const n=o.querySelector("img"),a=r.name.toLowerCase();if(e.some((function(e){return a.endsWith(e)}))){const e=new FileReader;e.addEventListener("load",(function(){n.src=e.result})),e.readAsDataURL(r)}}}})(),(()=>{const e=document.querySelector(".ad-form"),t=e.querySelector("#address"),r=e.querySelector("#avatar"),o=e.querySelector("#images"),n=document.querySelector(".map__pin--main");t.setAttribute("readonly",!0),r.setAttribute("accept","image/png, image/jpeg"),o.setAttribute("accept","image/png, image/jpeg"),window.drag.dragHandler(n),e.addEventListener("submit",(function(t){t.preventDefault(),window.backend.upload(new FormData(e),(()=>{window.form.init(),window.backend.successHandler()}),window.backend.uploadErrorHandler)})),window.form.init()})()})();