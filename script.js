//////////////////////////////////////////////////////////////
//                                                            //
// Created by: Asher Andargachew                              //
// Created on: Sept. 24th, 2021                               //
// Description: Matrix Vision inspired by and helped          //
//              https://www.youtube.com/watch?v=UoTxOVEecbI.  //
//                                                            //
////////////////////////////////////////////////////////////////

// Variables
let bgColor;
let img;
let imgWidth, imgHeight;
let particlesArray = [];
let mappedImage = [];

// preload image
function preload() {
    img = loadImage("assets/image3.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight-6);
    pixelDensity(1);
    bgColor = color(0, 0, 0);
    imgWidth = img.width/2;
    imgHeight = img.height/2;

    // create intances of new particles
    particlesArray = new Array (5000);
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i] = new Particles();
    }

    // draw image
    image(img, width/2 - imgWidth/2, height/2 - imgHeight/2, imgWidth, imgHeight);

    // map image to get color data
    imageMap(img);

    // background
    background(bgColor);

}
  
  function draw() {
    // fading effect
    background(0, 0, 0, 10);
    background(0, 0, 0, 14);

    // create particles
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].show();
    }
  }

  // particles to show image
  class Particles {
      constructor(){
          this.x = random(width);
          this.y = 0;
          this.speed = 0;
          this.velocity = random((height*0.2)/100);
          if (width > height){
            this.size = random((height*1/7)/100, (height*0.352)/100);
          }
          else{
              this.size = random((height*1/5)/100,(height*0.25)/100);
          }
          // index positions for image data
          this.pos1 = floor(this.y);
          this.pos2 = floor(this.x);
      }
      show(){
          // draw particles
          noStroke();

          // show image color using particles
          fill(mappedImage[this.pos1][this.pos2][1]);

          ellipse(this.x, this.y, this.size);

          this.update();
      }

      update(){
          // making sure index positions are rounded down
          this.pos1 = floor(this.y);
          this.pos2 = floor(this.x);

          // speed of the particles depending on how bright the image pixel is
          this.speed = mappedImage[this.pos1][this.pos2][0];
          let movement = (3 - this.speed) + this.velocity;

          this.y += movement;
          
          // when the particle exists screen
          if (this.y > height){
              this.y = 0;
              this.x = random(width);
          }
      }
  }

  // find the data of each pixel in image
  // function helped from video
  function imageMap(img){
      loadPixels();
      // go through each column
      for (let y = 0; y < height; y++){
          let row = [];
          // go through each row
          for (let x = 0; x < width; x++){
              // index of pixels
              var index = (x + y * width) * 4;
              const red = pixels[index];
              const green = pixels[index+1];
              const blue = pixels[index+2];
              let brightness = sqrt((red*red)*0.299 + (green*green)*0.587 + (blue*blue)*0.114)/100;
              const cell = [cellBrightness = brightness, cellColor = `rgb(${red},${green},${blue})`];
              row.push(cell);
          }
          mappedImage.push(row);
      }
    //   console.log(mappedImage);
      updatePixels();
  }