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
        alert("enter a valid email");
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
    
    // Format education data with proper spacing and new lines
    if (cvData.education) {
        const formattedEducation = cvData.education.map(edu => {
            const [institution, startDate, endDate, qualifications] = edu;
            let eduText = '<div class="education-entry">';
            eduText += `• <strong>Institution:</strong> ${institution}`;
            eduText += `<span class="date-range">${startDate} - ${endDate}</span>\n`;
            eduText += "<strong>• Qualifications:</strong>";
            qualifications.forEach(qual => {
                eduText += `<div class="qualification-entry">${qual[0]}: ${qual[1]}</div>`;
            });
            eduText += '</div>';
            return eduText;
        }).join("\n");
        document.getElementById("educationDisplay").innerHTML = formattedEducation;
    } else {
        document.getElementById("educationDisplay").innerText = "Not provided";
    }
    
    document.getElementById("experienceDisplay").innerText = cvData.experience || "Not provided";
    document.getElementById("extracurricularDisplay").innerText = cvData.extracurricular || "Not provided";

    console.log(institutionList);
}

function createEducationArray() {
    
    let institutionArray = new Array();


    institutionArray.push(document.getElementById("institutionName").value);
    institutionArray.push(document.getElementById("startDate").value);
    institutionArray.push(document.getElementById("endDate").value);

    institutionArray.push(qualificationList);

    addToList(institutionList,institutionArray,"education");

    qualificationList = [];
}

function createExperienceArray() {
    
    let experienceArray = new Array();


    experienceArray.push(document.getElementById("compName").value);
    experienceArray.push(document.getElementById("jobTitle").value);
    experienceArray.push(document.getElementById("jobStartDate").value);
    experienceArray.push(document.getElementById("jobEndDate").value);
    experienceArray.push(document.getElementById("jobDescription").value);
    

    addToList(jobExperienceList,experienceArray,"experience");
}

function createExtraCurricularArray() {
    
    let extracurricularArray = new Array();


    extracurricularArray.push(document.getElementById("Activity").value);
    extracurricularArray.push(document.getElementById("Description").value);
    extracurricularArray.push(document.getElementById("Duration").value);  

    addToList(extraActivities,extracurricularArray,"extracurricular");
}

function addToList(listToPush, arrayToPush, section) 
{
    listToPush.push(arrayToPush);

    console.log(listToPush);

    saveCVData(section, listToPush);
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

document.getElementById("submit-Exp").addEventListener("click", function(event) {
    event.preventDefault();
    alert("Education Added");
    createExperienceArray();
});

