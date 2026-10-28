const P=["03","20","33","35","39","51","52","55","66","70","87","89"];
const T={en:{title:"Family Files",sub:"A film, a little booklet, and some photos. Watch or read here, or save them to your phone.",j1:"🎬 Film",j2:"📄 Booklet",j3:"🖼 Photos",
forMasa:"For Masa",filmT:"Lawson 100, the film",filmP:"49 seconds. Press play to watch here, or save it.",saveFilm:"⬇ Save the film",
forRie:"For Rie",pdfT:"Koro and Mugi",pdfP:"A tiny two-page booklet about Koro and Mugi. Read it right here, or save the PDF.",savePdf:"⬇ Save the PDF",openPdf:"Open full size",
forMat:"Mat's photos",phT:"Reference photos",phP:"All the photos in one zip. After it saves, unzip it. The folder you want is inside, called best.",saveZip:"⬇ Save the photo zip",
oneByOne:"Or save the 12 best pictures one by one. Tap a picture to see it big.",savePic:"⬇ Save this picture",foot:"Family Files · Mat McDaniel · Works offline after your first visit (except the photo zip)"},
ja:{title:"ファミリーファイル",sub:"動画、小さな冊子、写真。ここで見る・読むか、スマホに保存してください。",j1:"🎬 動画",j2:"📄 冊子",j3:"🖼 写真",
forMasa:"マサへ",filmT:"ローソン100の動画",filmP:"49秒。再生ボタンでここで見られます。保存もできます。",saveFilm:"⬇ 動画を保存",
forRie:"りえへ",pdfT:"コロとムギ",pdfP:"コロとムギについての2ページの小さな冊子。ここで読むか、PDFを保存してください。",savePdf:"⬇ PDFを保存",openPdf:"大きく開く",
forMat:"Matの写真",phT:"参考写真",phP:"写真をまとめたzipです。保存したら解凍してください。中の「best」フォルダが目的のものです。",saveZip:"⬇ 写真zipを保存",
oneByOne:"または、ベスト12枚を1枚ずつ保存。写真をタップすると大きく見られます。",savePic:"⬇ この写真を保存",foot:"ファミリーファイル・Mat McDaniel・一度開けばオフラインでも見られます（写真zipを除く）"}};
let L=localStorage.getItem("ff-lang")||((navigator.language||"").startsWith("ja")?"ja":"en");
const g=document.getElementById("gal");g.innerHTML=P.map((p,i)=>`<button data-i="${i}" aria-label="Photo ${p}"><img loading="lazy" src="best/${p}.webp" alt=""><span>${p}.png</span></button>`).join("");
function draw(){document.documentElement.lang=L;document.querySelectorAll("[data-t]").forEach(e=>e.textContent=T[L][e.dataset.t]);document.getElementById("lang").textContent=L==="en"?"日本語":"English";document.getElementById("lang").lang=L==="en"?"ja":"en";document.title=T[L].title;}
document.getElementById("lang").onclick=()=>{L=L==="en"?"ja":"en";localStorage.setItem("ff-lang",L);draw();if(!lb.hidden)show(cur)};
const lb=document.getElementById("lb");let cur=0;
function show(i){cur=(i+P.length)%P.length;const im=lb.querySelector("img");im.src=`best/${P[cur]}.webp`;im.alt=`Photo ${P[cur]} (${cur+1}/${P.length})`;const d=lb.querySelector(".dl");d.href=`best/${P[cur]}.png`;d.textContent=`${T[L].savePic} (${P[cur]}.png)`;if(lb.hidden){op=document.activeElement;lb.hidden=false;lb.querySelector(".x").focus()}}
let op=null;function hide(){if(lb.hidden)return;lb.hidden=true;if(op)op.focus();op=null}
g.onclick=e=>{const b=e.target.closest("button");if(b)show(+b.dataset.i)};
lb.querySelector(".x").onclick=hide;lb.querySelector(".pv").onclick=()=>show(cur-1);lb.querySelector(".nx").onclick=()=>show(cur+1);
lb.onclick=e=>{if(e.target===lb)hide()};
document.addEventListener("keydown",e=>{if(lb.hidden)return;if(e.key==="Escape")hide();if(e.key==="Tab"){const f=[...lb.querySelectorAll("button,a")];const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}if(e.key==="ArrowRight")show(cur+1);if(e.key==="ArrowLeft")show(cur-1)});
let sx=null;lb.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener("touchend",e=>{if(sx==null)return;const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1));sx=null});
draw();if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
