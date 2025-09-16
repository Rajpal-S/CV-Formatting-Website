document.addEventListener('DOMContentLoaded', start)
function start(){

    const temp1=document.getElementById("temp1");
    const temp2=document.getElementById("temp2");
    const temp3=document.getElementById("temp3");
    const temp4=document.getElementById("temp4");

    temp1.addEventListener("mouseover", show);
    temp1.addEventListener("mouseout", hide);

    temp2.addEventListener("mouseover", show2);
    temp2.addEventListener("mouseout", hide2);

    temp3.addEventListener("mouseover", show3);
    temp3.addEventListener("mouseout", hide3);

    temp4.addEventListener("mouseover", show4);
    temp4.addEventListener("mouseout", hide4);
    //first image functions
    function show(){
        document.getElementById("hiddenPic1").style.display = "block";
    }
    
    function hide(){
        document.getElementById("hiddenPic1").style.display = "none";
    }
//second image functions
    function show2(){
        document.getElementById("hiddenPic2").style.display = "block";
    }
    
    function hide2(){
        document.getElementById("hiddenPic2").style.display = "none";
    }

    function show3(){
        document.getElementById("hiddenPic3").style.display = "block";
    }
    
    function hide3(){
        document.getElementById("hiddenPic3").style.display = "none";
    }
    
    function show4(){
        document.getElementById("hiddenPic4").style.display = "block";
    }
    
    function hide4(){
        document.getElementById("hiddenPic4").style.display = "none";
    }
}