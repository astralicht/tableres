// class DOMElem {
//     constructor(e) {
//         this.e = e;
//     }

//     text(text = undefined) {
//         if (text != undefined) {
//             this.e.innerText = text;
//             return this;
//         }
//         return this.e.innerText;
//     }

//     frcolor(color = undefined) {
//         if (color != undefined) {
//             this.e.style.color = color;
//             return this;
//         }
//         return this.e.style.color;
//     }

//     bgcolor(color = undefined) {
//         if (color != undefined) {
//             this.e.style.backgroundColor = color;
//             return this;
//         }
//         return this.e.style.backgroundColor;
//     }

//     display(display = undefined) {
//         if (display != undefined) {
//             this.e.style.display = display;
//             return this;
//         }
//         return this.e.style.display;
//     }

//     opacity(opacity = undefined) {
//         if (opacity != undefined) {
//             this.e.style.opacity = opacity;
//             return this;
//         }
//         return this.e.style.opacity;
//     }
// }

function elem(selector) {
    return document.querySelector(selector);
}

function elems(selector) {
    return document.querySelectorAll(selector);
}
