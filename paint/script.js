const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool")
    fillColor = document.querySelector("#fill-color")
    ctx = canvas.getContext("2d");

// Global variable with default value
let prevMouseX, preMouseY, snapshot
let isDrawing = false
selectedTool = "brush"
    brushWidth = 5;

window.addEventListener("load", () => {
    //Setting canvas width/height ... offsetwith/height return viewable with/height of an element
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    if (!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, preMouseY - e.offsetY)
    }
    ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, preMouseY - e.offsetY)
}

const startDraw = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX; // Passing current mouseX position as prevMouseX value
    preMouseY = e.offsetY;
    ctx.beginPath(); //Creating new path to draw
    ctx.lineWidth = brushWidth; // passing brush size as line width
    // copying canvas data & passing as snapshot value ... this avoids dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

const drawing = (e) => {
    if (!isDrawing) return // if isDrawing is false return from here
    ctx.putImageData(snapshot, 0, 0) // adding copied canvas data on to this canvas

    if (selectedTool === "brush") {
        ctx.lineTo(e.offsetX, e.offsetY); // Creating line according to the mouse point
        ctx.stroke(); // Drawing/filing line with color
    } else if (selectedTool === "rectangle") {
        drawRect(e)
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener("click", () => { // Add click event to all tool option
        //Removing active class from the previous option and adding on current clicked option
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id
        console.log(selectedTool)
    })
})

canvas.addEventListener("mousedown", startDraw)
canvas.addEventListener("mousemove", drawing)
canvas.addEventListener("mouseup", () => isDrawing = false)
