//Create variables here
var dog, happyDog, database, foodS, foodStock;
var feed,addFood,feedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dog1 = loadImage("images/dog1.png")
  happyDog = loadImage("images/dog2.png")
  foodObj = loadImage("milk.png")
}

function setup() {
	createCanvas(850,400);
dog = createSprite(500,300,150,150);
dog.addImage(dog1)
foodObj = new food(10,40) 

feed = createButton("Feed Choco")
feed.position(700,95)
feed.mousePressed(feedDog)

addFood = createButton("Add Food")
addFood.position(800,95)
addFood.mousePressed(addFoodS)

dog.scale = 0.2
database = firebase.database();
foodStock = database.ref('food')
foodStock.on("value",readStock)  
}


function draw() {  
background(46, 139, 87);
foodObj.display();
fill(255,255,254);
textSize(15)

feedTime = database.ref("lastFed")
feedTime.on("value",function(data){
lastFed=data.val();
});
if(lastFed>=12){
  text("Last Fed :"+lastFed%12 + "PM",350,30);
}

else if (lastFed==0){
text("Last fed : 12 AM",350,30)
}
 
else{
    text("Last fed :"+lastFed+"AM",350,30)
  };

  drawSprites(); 
}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0
  }else{
      x= x-1
    }
    database.ref('/').update({
      food:x
  })}

  function feedDog(){
    dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  function addFoodS(){
    foodS++;
    database.ref("/").update({
      Food:foodS
    })
  }