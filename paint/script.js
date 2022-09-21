const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool")
    ctx = canvas.getContext("2d");

let isDrawing = false

window.addEventListener("load", () => {
    //Setting canvas width/height ... offsetwith/height return viewable with/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const startDraw = () => {
    isDrawing = true;
    ctx.beginPath(); //Creating new path to draw
    ctx.lineWidth = brushWidth; // passing brush size as line width
}

const drawing = (e) => {
    if (!isDrawing) return // if isDrawing is false return from here
    ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to the mouse point
    ctx.stroke(); // Drawing/filing line with color
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Add click event to all tool option
        //Removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        console.log(btn.id)
    })
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false)
