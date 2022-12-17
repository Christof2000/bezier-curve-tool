function setup() {

    var myCanvas = createCanvas(600, 600)
    myCanvas.parent("canvas_id");
    
    //t value
    slider_t = createSlider(0, 1, 0.5, 0.005);
    slider_t.position(10, 10);
    slider_t.style('width', '80px');
    
    

    // bezier_points = [createVector(40,80), createVector(500,120), createVector(350,400), createVector(200,500), createVector(200,200)]
    bezier_points = []
    list_trajectory = createBezierTrajectoryArray(bezier_points)

    showStructure = true; 
}

function mouseClicked() {
    //add points to the canvas
    if(mouseY > 30 & mouseY < 600 & mouseX < 600 & mouseX > 0){
        bezier_points.push(createVector(mouseX, mouseY))
        list_trajectory = createBezierTrajectoryArray(bezier_points)
    }
    
}

document.querySelector("#hide_structure").addEventListener("click", function () {
    // hide the structure
    showStructure = !showStructure;
})
  
  function draw() {
    background(30);
    let t = slider_t.value();

    fill('white');
    strokeWeight(0)
    textSize(20);
    text("t: " + t, 100,26)

    //show curve
    strokeWeight(2)
    for(let j = 0; j < list_trajectory.length; j++){
        point(list_trajectory[j])
    }

    //show structure
    if (showStructure){
        generateBezier(bezier_points, t, 50)
    }
    
    //reset the canvas
    if (keyIsPressed === true) {
        bezier_points = []
        list_trajectory = []
    }

  }  


  function generateBezier(points, t, hu){

    new_points = []
    for (i = 0; i < points.length; i++){
        
        //generate points
        strokeWeight(7)
        stroke('white')
        
        point(points[i])

        //generate lines
        if(i != 0){
            p1 = points[i]
            p2 = points[i-1]
            strokeWeight(1)
            line(p1.x,p1.y,p2.x,p2.y)

            let between_point = p5.Vector.add(p5.Vector.mult(p1,1-t), p5.Vector.mult(p2,t))
            strokeWeight(7)
            new_points.push(between_point)

            if(points.length == 2){
                strokeWeight(12)
                stroke('red')
            }
            point(between_point)
            stroke('white')
        }
    }    
 
    if(new_points.length > 1){
        generateBezier(new_points, t, hu + 50)
    } else{
        return
    }
  }

  function createBezierTrajectoryArray(points){
    let array_points = []
    for(d = 0; d < 1; d += 0.01){
        let p = createBezierTrajectoryPoint(points, d)
        array_points.push(p)
    }
    return array_points
  }

  function createBezierTrajectoryPoint(points, t){
    let new_points = []
    for (i = 0; i < points.length; i++){
        
        //base case
        if(points.length == 1){
            strokeWeight(2);
            point(points[i]);

            return points[i]; 
        }

        //inductive case
        if(i != 0){
            p1 = points[i];
            p2 = points[i-1];

            let between_point = p5.Vector.add(p5.Vector.mult(p1,1-t), p5.Vector.mult(p2,t));
            new_points.push(between_point);
        }
    }    

    if (points.length == 0){
        return []
    } else{
        return createBezierTrajectoryPoint(new_points, t)
    }
  }

  function test(){
    return "s"
  }
