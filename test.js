

// document.querySelector('.grid').innerHTML = cellHtml;


el = document.querySelector('.overlay:after')
console.log(el)
// .style.cssText = "background-color: blue";
let cell = document.querySelector('.cell-0-0');
let overlay = document.querySelector('.cell-0-0 + .overlay');
// console.log(overlay);
cell.addEventListener("mouseover",
() => {
  overlay.style.cssText = "top: 0px";
})

cell.addEventListener("mouseout",
() => {
  overlay.style.cssText = "top: 50px";
})
