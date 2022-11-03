var song="";
var leftWristx=0;
var leftWristy=0;
var rightWristx=0;
var rightWristy=0;
var score_left_wrist=0;
var score_right_wrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('Model is Loaded');
}
function draw(){
    image(video,0,0,600,500);
    fill('#ff0013');
    stroke('#001dff');
if (score_right_wrist>0.02) {
    circle(rightWristx,rightWristy,20);

    if(rightWristy>0 && rightWristy<=100){
document.getElementById("speed_title").innerHTML="speed=0.5x";
song.rate(0.5);
}
else if(rightWristy>100 && rightWristy<=200){
document.getElementById("speed_title").innerHTML="speed=1x";
song.rate(1);
}
else if(rightWristy>200 && rightWristy<=300){
    document.getElementById("speed_title").innerHTML="speed=1.5x";
    song.rate(1.5);
}
else if(rightWristy>300 && rightWristy<=400){
document.getElementById("speed_title").innerHTML="speed=2x";
song.rate(2);
}
else if(rightWristy>400){
document.getElementById("speed_title").innerHTML="speed=2.5x";
song.rate(2.5);
}   
}
if(score_left_wrist>0.02){
        circle(leftWristx,leftWristy,20);
        leftwristYnumber=Number(leftWristy);
        remove_decimals=floor(leftwristYnumber);
        volume=remove_decimals/500;
        document.getElementById("volume_title").innerHTML="Volume= "+volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
if (results.length>0) {
    console.log(results);
    score_left_wrist=results[0].pose.keypoints[9].score;
    score_right_wrist=results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score= "+score_right_wrist);
    console.log("Left Wrist Score= "+score_left_wrist);
    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("left wrist x= "+leftWristx);
    console.log("right wrist y= "+leftWristy);
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("right wrist x="+rightWristx+"  right wrist y= "+rightWristy);
}
}