let RegularPolygon = {

    init:function(nbSides,centerX,centerY,radius,lineWidth,strokeColor,fillColor) {
        this.nbSides = nbSides;
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.strokeColor =strokeColor;
        this.fillColor = fillColor;
        this.cornersCoords = [];
        this.captionsCoords = [];
    },

    draw:function(canvas) {
        let canvasCtx = canvas.getContext("2d");
        canvasCtx.strokeStyle = this.strokeColor;
        canvasCtx.lineWidth = this.lineWidth;

        canvasCtx.beginPath();
        canvasCtx.moveTo(this.centerX,this.centerY-this.radius);
        let angleStep = (2*Math.PI)/this.nbSides;
        for(let i=0 ; i<this.nbSides ; i++) {
            let x = Math.round(this.centerX + this.radius*Math.cos(Math.PI/2 - i*angleStep));
            let y = Math.round(this.centerY - this.radius*Math.sin(Math.PI/2 - i*angleStep));
            let captionX = Math.round(this.centerX + (this.radius+15)*Math.cos(Math.PI/2 - i*angleStep));
            let captionY = Math.round(this.centerY - (this.radius+15)*Math.sin(Math.PI/2 - i*angleStep));
            canvasCtx.lineTo(x,y);
            this.cornersCoords.push([x,y]);
            this.captionsCoords.push([captionX,captionY]);
        }
        let x = Math.round(this.centerX + this.radius*Math.cos(Math.PI/2 - this.nbSides*angleStep));
        let y = Math.round(this.centerY - this.radius*Math.sin(Math.PI/2 - this.nbSides*angleStep));
        let captionX = Math.round(this.centerX + (this.radius+15)*Math.cos(Math.PI/2 - this.nbSides*angleStep));
        let captionY = Math.round(this.centerY - (this.radius+15)*Math.sin(Math.PI/2 - this.nbSides*angleStep));
        canvasCtx.lineTo(x,y);
        canvasCtx.stroke();
        canvasCtx.closePath();
    },

    drawAndFill:function(canvas) {
        let canvasCtx = canvas.getContext("2d");
        canvasCtx.strokeStyle = this.strokeColor;
        canvasCtx.fillStyle = this.fillColor;
        canvasCtx.lineWidth = this.lineWidth;

        canvasCtx.beginPath();
        canvasCtx.moveTo(this.centerX,this.centerY-this.radius);
        let angleStep = (2*Math.PI)/this.nbSides;
        for(let i=1 ; i<=this.nbSides ; i++) {
            let x = Math.round(this.centerX + this.radius*Math.cos(Math.PI/2 - i*angleStep));
            let y = Math.round(this.centerY - this.radius*Math.sin(Math.PI/2 - i*angleStep));
            canvasCtx.lineTo(x,y);
            this.cornersCoords.push([x,y]);
        }
        canvasCtx.stroke();
        canvasCtx.fill();
        canvasCtx.closePath();
    },

    drawRadius:function(canvas) {
        let canvasCtx = canvas.getContext("2d");
        canvasCtx.strokeStyle = this.strokeColor;
        canvasCtx.lineWidth = 1;

        canvasCtx.beginPath();
        canvasCtx.moveTo(this.centerX,this.centerY);
        for(let i=0 ; i<this.cornersCoords.length ; i++) {
            let x = this.cornersCoords[i][0];
            let y = this.cornersCoords[i][1];
            canvasCtx.lineTo(x,y);
            canvasCtx.moveTo(this.centerX,this.centerY);
        }
        canvasCtx.stroke();
        canvasCtx.closePath();
    },

    drawCornersPoints:function(canvas) {
        let canvasCtx = canvas.getContext("2d");
        canvasCtx.fillStyle = "black";
        let angleStep = (2*Math.PI)/this.nbSides;
        for(let i=0 ; i<this.cornersCoords.length ; i++) {
            let x = this.cornersCoords[i][0];
            let y = this.cornersCoords[i][1];
            canvasCtx.beginPath();
            canvasCtx.arc(x,y,4,0,2*Math.PI);
            canvasCtx.fill();
            canvasCtx.closePath();
        }
    },

    drawCaptions:function(canvas,values){
        console.log(values);
        console.log(this.captionsCoords);
        let canvasCtx = canvas.getContext("2d");
        canvasCtx.fillStyle = "black";
        canvasCtx.font = "14px Arial";
        for(let i=0 ; i<this.cornersCoords.length ; i++) {
            let x = this.captionsCoords[i][0];
            let y = this.captionsCoords[i][1];
            canvasCtx.beginPath();
            let xDiff = x - this.centerX;
            if(xDiff<0) canvasCtx.textAlign = "right";
            else if (xDiff>0) canvasCtx.textAlign = "left";
            else canvasCtx.textAlign = "center";
            canvasCtx.fillText(values[i][0],x,y);
            canvasCtx.closePath();
        }
    }

};

let Polygon = {

    init:function(cornersCoords,lineWidth,strokeColor,fillColor) {
        this.cornersCoords = cornersCoords;
        this.lineWidth = lineWidth;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
    },

    draw:function(canvas) {
        let canvasCtx = canvas.getContext('2d');
        canvasCtx.strokeStyle = this.strokeColor;
        canvasCtx.lineWidth = this.lineWidth;

        canvasCtx.moveTo(this.cornersCoords[0][0],this.cornersCoords[0][1]);
        canvasCtx.beginPath();
        for(let i=1 ; i<=this.cornersCoords.length ; i++) {
            let x = this.cornersCoords[i%this.cornersCoords.length][0];
            let y = this.cornersCoords[i%this.cornersCoords.length][1];
            canvasCtx.lineTo(x,y);
        }
        canvasCtx.stroke();
        canvasCtx.closePath();
    },

    drawAndFill:function(canvas) {
        let canvasCtx = canvas.getContext('2d');
        canvasCtx.strokeStyle = this.strokeColor;
        canvasCtx.fillStyle = this.fillColor;
        canvasCtx.lineWidth = this.lineWidth;
        
        canvasCtx.moveTo(this.cornersCoords[0][0],this.cornersCoords[0][1]);
        canvasCtx.beginPath();
        for(let i=0 ; i<this.cornersCoords.length ; i++) {
            let x = this.cornersCoords[i][0];
            let y = this.cornersCoords[i][1];
            canvasCtx.lineTo(x,y);
        }
        canvasCtx.lineTo(this.cornersCoords[0][0],this.cornersCoords[0][1]);
        canvasCtx.stroke();
        canvasCtx.fill();
        canvasCtx.closePath();
    }

};

let SpiderWebChart = {

    init:function(nbSides,centerX,centerY,nbSteps,stepLength,values) {
        this.nbSides = nbSides;
        this.centerX = centerX;
        this.centerY = centerY;
        this.nbSteps = nbSteps;
        this.stepLength = stepLength;
        this.values = values;
    },

    draw:function(canvas) {
        for(let i=1 ; i<=this.nbSteps ; i++) {
            let radius = i*this.stepLength;
            let rp = Object.create(RegularPolygon);
            if(i==this.nbSteps) {
                rp.init(this.nbSides,this.centerX,this.centerY,radius,2,"black","white");
                rp.draw(canvas);
                rp.drawRadius(canvas);
                rp.drawCornersPoints(canvas);
                rp.drawCaptions(canvas,this.values);
            } else {
                rp.init(this.nbSides,this.centerX,this.centerY,radius,1,"grey","white");
                rp.draw(canvas);
            }
        }
        let array = this.generateCoordsArray();
        let p = Object.create(Polygon);
        p.init(array,2,"blue","rgba(135,206,250,0.9)");
        p.drawAndFill(canvas);
    },

    generateCoordsArray:function(){
        let coordsArray = [];
        let angleStep = (2*Math.PI)/this.nbSides;
        for(let i=0 ; i<this.nbSides ; i++) {
            let value = this.values[i][1]/this.nbSteps;
            let radius = this.nbSteps*this.stepLength;
            let x = Math.round(this.centerX + radius*value*Math.cos(Math.PI/2 - i*angleStep));
            let y = Math.round(this.centerY - radius*value*Math.sin(Math.PI/2 - i*angleStep));
            coordsArray.push([x,y]);
        }
        return coordsArray;
    }

};

let spiderWebCanvas = document.getElementById("spiderWebChartCanvas");
let spiderWebBtn = document.getElementById("spiderWebChartBtn");

let characteristics = [];

function initSpiderWebChart() {
    spiderWebCanvas.getContext('2d').clearRect(0,0,spiderWebCanvas.width,spiderWebCanvas.height);
    characteristics = [["Force",5],["Agilité",5],["Intelligence",5],["Charisme",5],["Chance",5]];
    let swc = Object.create(SpiderWebChart);
    swc.init(5,spiderWebCanvas.width/2,spiderWebCanvas.height/2,10,14,characteristics);
    swc.draw(spiderWebCanvas);
}

initSpiderWebChart();

let numberInputs = document.getElementsByClassName("charValue");
for(let i=0 ; i<numberInputs.length ; i++) {
    let numberInput = numberInputs[i];
    numberInput.value = 5;
    numberInput.addEventListener("input",function(){
        let charName = this.parentNode.firstElementChild.value;
        let charExists = false;
        for(let j=0 ; j<characteristics.length ; j++) {
            if(characteristics[j][0]==charName) {
                characteristics[j][1] = parseInt(this.value);
                charExists = true;
            }
        }
        if(!charExists) characteristics.push([charName,this.value]);
        spiderWebCanvas.getContext('2d').clearRect(0,0,spiderWebCanvas.width,spiderWebCanvas.height);
        let swc = Object.create(SpiderWebChart);
        swc.init(characteristics.length,spiderWebCanvas.width/2,spiderWebCanvas.height/2,10,14,characteristics);
        swc.draw(spiderWebCanvas);
    });
}

let nameInputs = document.getElementsByClassName("charName");
for(let i=0 ; i<nameInputs.length ; i++) {
    let nameInput = nameInputs[i];
    nameInput.addEventListener("change",function(){
        let charName = this.value;
        let charValue = this.parent.lastElementChild.value;
        let charExists = false;
        for(let j=0 ; j<characteristics.length ; j++) {
            if(characteristics[j][0]==charName) {
                characteristics[j][1] = parseInt(this.value);
                charExists = true;
            }
        }
        if(!charExists) characteristics.push([this.value,charValue]);
        spiderWebCanvas.getContext('2d').clearRect(0,0,spiderWebCanvas.width,spiderWebCanvas.height);
        let swc = Object.create(SpiderWebChart);
        swc.init(characteristics.length,spiderWebCanvas.width/2,spiderWebCanvas.height/2,10,14,characteristics);
        swc.draw(spiderWebCanvas);
    });
}

let deleteBtns = document.getElementsByClassName("deleteBtn");
for(let i=0 ; i<deleteBtns.length ; i++) {
    let deleteBtn = deleteBtns[i];
    deleteBtn.addEventListener("click",function(){
        let charName = this.parentNode.firstElementChild.value;
        this.parentNode.parentNode.removeChild(this.parentNode);
        for(let j=0 ; j<characteristics.length ; j++) {
            if(characteristics[j][0]==charName){
                characteristics.splice(j,1);
            }
        }
        console.log(characteristics);
        spiderWebCanvas.getContext('2d').clearRect(0,0,spiderWebCanvas.width,spiderWebCanvas.height);
        let swc = Object.create(SpiderWebChart);
        swc.init(characteristics.length,spiderWebCanvas.width/2,spiderWebCanvas.height/2,10,14,characteristics);
        swc.draw(spiderWebCanvas);
    });
}

let addBtn = document.getElementById("addCharacteristic");
addBtn.addEventListener("click",function(event){
    event.preventDefault();

    let charInput = document.createElement("input");
    charInput.setAttribute("type","text");
    charInput.setAttribute("class","charName");
    charInput.setAttribute("name","charName");

    let valueInput = document.createElement("input");
    valueInput.setAttribute("type","number");
    valueInput.setAttribute("class","charValue");
    valueInput.setAttribute("name","charValue");
    valueInput.setAttribute("min","0");
    valueInput.setAttribute("max","10");
    valueInput.setAttribute("value","5");
    valueInput.addEventListener("input",function(){
        let charName = this.parentNode.firstElementChild.value;
        let charExists = false;
        for(let j=0 ; j<characteristics.length ; j++) {
            if(characteristics[j][0]==charName) {
                characteristics[j][1] = parseInt(this.value);
                charExists = true;
            }
        }
        if(!charExists) characteristics.push([charName,this.value]);
        spiderWebCanvas.getContext('2d').clearRect(0,0,spiderWebCanvas.width,spiderWebCanvas.height);
        let swc = Object.create(SpiderWebChart);
        swc.init(characteristics.length,spiderWebCanvas.width/2,spiderWebCanvas.height/2,10,14,characteristics);
        swc.draw(spiderWebCanvas);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class","deleteBtn");
    deleteBtn.setAttribute("required","");
    deleteBtn.textContent = "\u00d7";

    let inputSpan = document.createElement("span");
    inputSpan.setAttribute("class","inputSpan");
    inputSpan.appendChild(charInput);
    inputSpan.appendChild(valueInput);
    inputSpan.appendChild(deleteBtn);

    document.getElementById("inputsList").appendChild(inputSpan);
});

let drawBtn = document.getElementById("drawChart");
drawBtn.addEventListener("click",function(event){
    event.preventDefault();

    characteristics = [];
    let allInputSpans = document.getElementsByClassName("inputSpan");
    for(let i=0 ; i<allInputSpans.length ; i++) {
        let inputSpan = allInputSpans[i];
        let charName = inputSpan.children[0].value;
        let charValue = inputSpan.children[1].value;
        characteristics.push([charName,charValue]);
    }

    if(characteristics.length >= 3) {
        spiderWebCanvas.getContext('2d').clearRect(0,0,spiderWebCanvas.width,spiderWebCanvas.height);
        let swc = Object.create(SpiderWebChart);
        swc.init(characteristics.length,spiderWebCanvas.width/2,spiderWebCanvas.height/2,10,14,characteristics);
        swc.draw(spiderWebCanvas);
    }
});


let downloadBtn = document.getElementById("downloadChartBtn");
downloadBtn.addEventListener("click",function(e){
    console.log(this);
    this.download = "Fiche.png";
    this.href = spiderWebCanvas.toDataURL("image/png");
});