// Declarations
// 

let dropZone;
let dropped = false;
let file;

let imageFile;
let imgHeight, imgWidth, imgHeightRatio, imgWidthRatio;

let canvasHeight, canvasWidth;

let lockRatio = true;
let ditherToggle = false;
let matchImage = true;
let saveImage = false;
let exportNum = 1;
let backgroundColor = [0,0,0,255];
let foregroundColor = [255,255,255,255];
let prevBackgroundColor = [0,0,0,255];
let prevForegroundColor = [255,255,255,255];

const canvasHeightHTML = document.getElementById("canvasHeight");
const canvasWidthHTML = document.getElementById("canvasWidth");
const dropZoneHTML = document.getElementById("dropZone");
const dropTextHTML = document.getElementById("dropText");
const imageHeightHTML = document.getElementById("imageHeight");
const imageWidthHTML = document.getElementById("imageWidth");
const dimensionsHTML = document.getElementById("dimensions");
const lockRatioHTML = document.getElementById("lockRatio");
const ditherToggleHTML = document.getElementById("ditherToggle");
const matchImageHTML = document.getElementById("matchImage");
const foregroundColorHTML = document.getElementById("foregroundColor");
const backgroundColorHTML = document.getElementById("backgroundColor");



// Image Input Handling
// 

function dropHandler(ev) {
    console.log('File(s) dropped');
    dropped = true;
    lockRatioClickHandler(true);
    dropZoneHTML.classList.add("dropped");
    dimensionsHTML.classList.remove("hide");
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items && ev.dataTransfer.items.length == 1) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[0].kind === 'file') {
          file = ev.dataTransfer.items[0].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
          dropTextHTML.innerHTML = file.name;
          dropZoneHTML.style.opacity = 1;
        }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }

function dragOverHandler(ev) {
  console.log('File(s) in drop zone');
  dropZoneHTML.style.opacity = 0.5;
  ev.preventDefault();
}

function dragLeaveHandler(ev) {
  console.log('File(s) left drop zone');
  dropZoneHTML.style.opacity = 1;
  ev.preventDefault();
}

function clearMouseOverHandler(ev) {
  if (dropped == true) {
    dropTextHTML.innerHTML = "Clear?"
  }
}

function clearMouseLeaveHandler(ev) {
  if (dropped == true) {
    dropTextHTML.innerHTML = file.name
    
  }
}

function clickHandler(ev) {
  if (dropped == true) {
    dropTextHTML.innerHTML = "Drop photo";
    file = null;
    imageFile = null
    dropped = false;
    dropZoneHTML.classList.remove("dropped");
    imageHeightHTML.value = 0;
    imageWidthHTML.value = 0;
    dimensionsHTML.classList.add("hide");

  }
}

function matchImageClickHandler(val) {
  if (val) {
    matchImage = val;
  } else {
    matchImage = !matchImage;
  }

  if (matchImage == true) {
    matchImageHTML.classList.add("radioActive");

  } else if (matchImage == false) {
    matchImageHTML.classList.remove("radioActive");
  }
}

function lockRatioClickHandler(val) {
  if (val) {
    lockRatio = val;
  } else{
    lockRatio = !lockRatio
  }
  if(lockRatio == true) {
    lockRatioHTML.classList.add("radioActive");
  } else if (lockRatio == false) {
    lockRatioHTML.classList.remove("radioActive");
  }
}

function ditherToggleClickHandler(val) {
  if (val) {
    ditherToggle = val;
  } else{
    ditherToggle = !ditherToggle
  }
  if(ditherToggle == true) {
    ditherToggleHTML.classList.add("radioActive");
  } else if (ditherToggle == false) {
    ditherToggleHTML.classList.remove("radioActive");
  }
}

function saveImageHandler() {
  saveImage = true;
}

imageHeightHTML.addEventListener('change', (event) => {
  imgHeight = event.target.value
  if(matchImage) {
    canvasHeight = event.target.value
    resizeCanvas(canvasWidth, canvasHeight);
    canvasWidthHTML.value = canvasWidth;
    canvasHeightHTML.value = canvasHeight;
  }
  if(lockRatio == true) {
    imgWidth = Math.floor(imgHeight * imgHeightRatio);
    imageWidthHTML.value = imgWidth;
    if(matchImage) {
      canvasWidth = imgWidth
      resizeCanvas(canvasWidth, canvasHeight);
      canvasWidthHTML.value = canvasWidth;
      canvasHeightHTML.value = canvasHeight;
    }
  }
});

imageWidthHTML.addEventListener('change', (event) => {
  imgWidth = event.target.value
  if(matchImage) {
    canvasWidth = event.target.value
    resizeCanvas(canvasWidth, canvasHeight);
    canvasWidthHTML.value = canvasWidth;
    canvasHeightHTML.value = canvasHeight;
  }
  if(lockRatio == true) {
    imgHeight = Math.floor(imgWidth * imgWidthRatio);
    imageHeightHTML.value = imgHeight;
    if(matchImage) {
      canvasHeight = imgHeight
      resizeCanvas(canvasWidth, canvasHeight);
      canvasWidthHTML.value = canvasWidth;
      canvasHeightHTML.value = canvasHeight;
    }
  }
});

canvasHeightHTML.addEventListener('change', (event) => {
  canvasHeight = event.target.value;
  resizeCanvas(canvasWidth, canvasHeight);

});

canvasWidthHTML.addEventListener('change', (event) => {
  canvasWidth = event.target.value;
  resizeCanvas(canvasWidth, canvasHeight);
  
});

foregroundColorHTML.addEventListener('change', (event) => {
  foregroundColor = (hexToRGB(event.target.value));
});

backgroundColorHTML.addEventListener('change', (event) => {
  backgroundColor = (hexToRGB(event.target.value));
});

// P5.js
// 



function setup() {
  canvasHeight = windowHeight;
  canvasWidth = windowWidth - 300;
  canvasWidthHTML.value = canvasWidth;
  canvasHeightHTML.value = canvasHeight;
  pixelDensity(1);

  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvasContainer');

  dropZone = select('#dropZone');
  dropZone.drop(gotFile);


} 

function gotFile(file) {
  console.log(file);
  imageFile = loadImage(file.data);


  console.log(imageFile);

  setTimeout(() => {
    imgHeight = imageFile.height;
    imgWidth = imageFile.width;
    imageHeightHTML.value = imgHeight;
    imageWidthHTML.value = imgWidth;
    imgHeightRatio = imgWidth/imgHeight;
    imgWidthRatio = imgHeight/imgWidth;
    canvasHeight = imgHeight
    canvasWidth = imgWidth;
    canvasWidthHTML.value = canvasWidth;
    canvasHeightHTML.value = canvasHeight;

  }, 200);


}

function draw() {
    if(imageFile) {
      background(240);
      image(imageFile, 0, 0, imgWidth, imgHeight);
      // filter(GRAY);
      if(ditherToggle == true) {
        makeDithered(imageFile, 1);
        image(imageFile, 200, 0, imgWidth, imgHeight);

      }
    } else if(imageFile == null)  {
      background(240);
    }

    if(saveImage == true) {
      saveCanvas(canvas, "ditherExport_" + exportNum,"png");
      exportNum++;
      saveImage=false;
    }
}



// Resize Image
//

function resizeHandlerRed() {
  newImage = createImage(canvasWidth, canvasHeight);

  imageFile.loadPixels();

  newImage.loadPixels();
  for (let i = 0; i < newImage.width; i++) {
    for (let j = 0; j < newImage.height; j++) {
      newImage.set(i, j, imageFile.pixels[imageIndex(imageFile, round(i * (imageFile.width/newImage.width)), round(j * (imageFile.height/newImage.height)))]);
    }
  }
  newImage.updatePixels();

  imageFile = newImage;
  console.log(imageFile);
}

function resizeHandlerGreen() {
  newImage = createImage(canvasWidth, canvasHeight);

  imageFile.loadPixels();

  newImage.loadPixels();
  for (let i = 0; i < newImage.width; i++) {
    for (let j = 0; j < newImage.height; j++) {
      newImage.set(i, j, imageFile.pixels[imageIndex(imageFile, round(i * (imageFile.width/newImage.width)), round(j * (imageFile.height/newImage.height)))+1]);
    }
  }
  newImage.updatePixels();

  imageFile = newImage;
  console.log("duh");
}

function resizeHandlerBlue() {
  newImage = createImage(canvasWidth, canvasHeight);

  imageFile.loadPixels();

  newImage.loadPixels();
  for (let i = 0; i < newImage.width; i++) {
    for (let j = 0; j < newImage.height; j++) {
      newImage.set(i, j, imageFile.pixels[imageIndex(imageFile, round(i * (imageFile.width/newImage.width)), round(j * (imageFile.height/newImage.height)))+2]);
    }
  }
  newImage.updatePixels();

  imageFile = newImage;
  console.log(imageFile);
}


// Change Color
//

function colorHandler() {

  imageFile.loadPixels();

  for (let i = 0; i < imageFile.width; i++) {
    for (let j = 0; j < imageFile.height; j++) {
      let currentPixelColor = covertToColor(get(i,j));
      imageFile.set(i, j, arrayEquals(currentPixelColor.levels, covertToColor(prevBackgroundColor).levels) ? covertToColor(backgroundColor) : covertToColor(foregroundColor));
    }
  }
  imageFile.updatePixels();
  prevBackgroundColor = backgroundColor;
  prevForegroundColor = foregroundColor;
}

function covertToColor(col) {
  return color(col[0],col[1],col[2],col[3]);
}

function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  
  return [+r,+g,+b,255]
}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}


// Dither functions
//

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
  return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      let newR = closestStep(255, steps, oldR);
      let newG = closestStep(255, steps, oldG);
      let newB = closestStep(255, steps, oldB);

      let newClr = color(newG, newG, newG);
      setColorAtIndex(img, x, y, newClr);

      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
  ditherToggleClickHandler(false);
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}