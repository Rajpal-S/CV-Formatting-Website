let institutionList = [];
let qualificationList = [];

let jobExperienceList = [];

let extraActivities = [];

function saveCVData(section, value) {
    let cvData = JSON.parse(localStorage.getItem("cvData")) || {};
    cvData[section] = value; 
    
    localStorage.setItem("cvData", JSON.stringify(cvData));
}

function Submit(page) {
    var emailCheck =document.getElementById("emailData").value.indexOf("@");
    if(emailCheck == -1){
        alert("enter valid emai");
    }
    else{
        window.location.href = page;
    }
    
}
function nextPage(page) {
    
    window.location.href = page;
}


function loadCVData() {
    let cvData = JSON.parse(localStorage.getItem("cvData")) || {}; 

    document.getElementById("nameDisplay").innerText = cvData.name || "Not provided";
    document.getElementById("numberDisplay").innerText = cvData.number || "Not provided";
    document.getElementById("emailDisplay").innerText = cvData.email || "Not provided";
    document.getElementById("educationDisplay").innerText = cvData.education || "Not provided";
    document.getElementById("experienceDisplay").innerText = cvData.experience || "Not provided";
    document.getElementById("extracurricularDisplay").innerText = cvData.extracurricular || "Not provided";

    console.log(institutionList);
}

function createEducationArray() {
    
    let institutionArray = new Array();


    institutionArray.push(document.getElementById("institutionName").value) || institutionArray.push(document.getElementById("compName").value);
    institutionArray.push(document.getElementById("startDate").value);
    institutionArray.push(document.getElementById("endDate").value);

    institutionArray.push(qualificationList);

    addToList(institutionArray);

    qualificationList = [];
}

function addToList(institutionArray)
{
    institutionList.push(institutionArray);

    console.log(institutionList);

    saveCVData("education", institutionList);
}

function createQualificationArray()
{
    let qualificationArray = new Array();

    
    qualificationArray.push(document.getElementById("qualificationName").value);
    qualificationArray.push(document.getElementById("grade").value);

    addToCourseList(qualificationArray);
}


function addToCourseList(qualificationArray)
{
    qualificationList.push(qualificationArray);

    console.log(qualificationList);
}

document.getElementById("submit-qualification").addEventListener("click", function(event) {
    event.preventDefault();
    createQualificationArray();
});

document.getElementById("submit-Edu").addEventListener("click", function(event) {
    event.preventDefault();
    createEducationArray();
});