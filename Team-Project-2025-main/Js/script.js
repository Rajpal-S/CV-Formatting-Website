let institutionList = [];
let qualificationList = [];

let jobExperienceList = [];

let extraActivities = [];

function adjustContentSize() {
    const container = document.querySelector('.container-cv');
    if (!container) return;

    const content = container.scrollHeight;
    const maxHeight = container.clientHeight;
    
    // Reset to default
    document.documentElement.style.setProperty('--content-scale', '1');
    
    if (content > maxHeight) {
        
        let scale = maxHeight / content;
        // Don't go smaller than 65% to maintain readability
        scale = Math.max(scale, 0.65);
        document.documentElement.style.setProperty('--content-scale', scale);
    }
}

function setupContentObserver() {
    const observer = new MutationObserver(() => {
        setTimeout(adjustContentSize, 100);
    });
    
    const container = document.querySelector('.container-cv');
    if (container) {
        observer.observe(container, { 
            childList: true, 
            subtree: true, 
            characterData: true,
            attributes: true 
        });
    }
}

function adjustScale() {
    const container = document.querySelector('.container-cv');
    const scale = Math.min(
        window.innerWidth / container.offsetWidth,
        window.innerHeight / container.offsetHeight
    );
    document.documentElement.style.setProperty('--content-scale', scale);
}

function adjustFontSize() {
    const container = document.querySelector('.container-cv');
    const contentHeight = container.scrollHeight;
    const maxHeight = window.innerHeight;

    if (contentHeight > maxHeight) {
        const scaleFactor = maxHeight / contentHeight;
        document.documentElement.style.setProperty('--font-size', `${scaleFactor}em`);
        document.documentElement.style.setProperty('--line-height', `${scaleFactor * 1.2}em`);
    } else {
        document.documentElement.style.setProperty('--font-size', '1em');
        document.documentElement.style.setProperty('--line-height', '1.2em');
    }
}

window.addEventListener('resize', () => {
    adjustScale();
    adjustFontSize();
});
window.addEventListener('load', () => {
    adjustScale();
    adjustFontSize();
});

function saveCVData(section, value) {
    let cvData = JSON.parse(localStorage.getItem("cvData")) || {};
    cvData[section] = value; 
    
    localStorage.setItem("cvData", JSON.stringify(cvData));
}

function Submit(page) {
    var emailCheck =document.getElementById("emailData").value.indexOf("@");
    if(emailCheck == -1){
        alert("enter valid email");
    }
    else{
        window.location.href = page;
    }
    
}

function areInputsEmpty() {
    const inputs = document.querySelectorAll('input');
    for (let input of inputs) {
        if (input.value.trim() !== '') {
            return false;
        }
    }
    return true;
}

function nextPage(page) {
    if (areInputsEmpty() || page == 'chooseTempl.html') {
        window.location.href = page;
    } else {
        alert("Please click the add button to save your data.");
    }
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
    
    // Format experience data with proper spacing and new lines
    if (cvData.experience) {
        const formattedExperience = cvData.experience.map(exp => {
            const [company, jobTitle, startDate, endDate, description] = exp;
            let expText = '<div class="experience-entry">';
            expText += `• <strong>Company:</strong> ${company}`;
            expText += `<span class="date-range">${startDate} - ${endDate}</span>\n`;
            expText += `<div class="job-title"><strong>• Role:</strong> ${jobTitle}</div>`;
            expText += `<div class="job-description">${description}</div>`;
            expText += '</div>';
            return expText;
        }).join("\n");
        document.getElementById("experienceDisplay").innerHTML = formattedExperience;
    } else {
        document.getElementById("experienceDisplay").innerText = "Not provided";
    }
    
    // Format extracurricular data with proper spacing and new lines
    if (cvData.extracurricular) {
        const formattedExtracurricular = cvData.extracurricular.map(activity => {
            const [activityName, description, duration] = activity;
            let activityText = '<div class="extracurricular-entry">';
            activityText += `• <strong>Activity:</strong> ${activityName}`;
            activityText += `<span class="duration">${duration}</span>\n`;
            activityText += `<div class="activity-description">${description}</div>`;
            activityText += '</div>';
            return activityText;
        }).join("\n");
        document.getElementById("extracurricularDisplay").innerHTML = formattedExtracurricular;
    } else {
        document.getElementById("extracurricularDisplay").innerText = "Not provided";
    }

    console.log(institutionList);

    // Add scaling after content is loaded
    setTimeout(() => {
        adjustContentSize();
        setupContentObserver();
        setupPrintHandler();
    }, 100);
    
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

function checkEducationInputs() {

    const courseName = document.getElementById("qualificationName").value;
    const grade = document.getElementById("grade").value;
    if (courseName === '' || grade === '') {
        return true;
    }
    alert("Please click add qualification to add the qualification");
    return false;
}

function clearAllInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
}


// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Check if elements exist before adding event listeners
    let submitQualification = document.getElementById("submit-qualification");
    if (submitQualification) {
        submitQualification.addEventListener("click", function(event) {
            event.preventDefault();
            createQualificationArray();

            document.getElementById("qualificationName").value = "";
            document.getElementById("grade").value = "";
        });
    }

    let submitEdu = document.getElementById("submit-Edu");
    if (submitEdu) {
        submitEdu.addEventListener("click", function(event) {
            event.preventDefault();
            
            if(checkEducationInputs())
            {
                createEducationArray();
                clearAllInputs();
                alert("Education Added");        
            }
        });
    }

    let submitExp = document.getElementById("submit-Exp");
    if (submitExp) {
        submitExp.addEventListener("click", function(event) {
            event.preventDefault();
            createExperienceArray();
            clearAllInputs();
            alert("Experience Added");
        });
    }

    let submitExtracurricular = document.getElementById("submit-Extracurricular");
    if (submitExtracurricular) {
        submitExp.addEventListener("click", function(event) {
            event.preventDefault();
            createExtraCurricularArray();
            clearAllInputs();
            alert("Extracurricular Added");
        });
    }

    let clearAll = document.getElementById("clearButton");
    if (clearAll) {
        clearAll.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.clear();
            location.reload();
        });
    }

    // Add resize listener for scaling
    window.addEventListener('resize', adjustContentSize);
    
    // Initial setup of content observer
    setupContentObserver();

    // Add print styles
    setupPrintStyles();
});

// function downloadPDF() {
//     const element = document.getElementById('cv-content');
    
//     // Ensure content is properly scaled before generating PDF
//     adjustContentSize();
    
//     const options = {
//         margin: [1, 1],
//         filename: 'my-cv.pdf',
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 1 },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };

//     html2pdf().set(options).from(element).save();
// }

function setupPrintStyles() {//The CV will be properly formatted for A4 paper size
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body * {
                visibility: hidden;
            }
            #cv-content, #cv-content * {
                visibility: visible;
            }
            #cv-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                transform: scale(1) !important;
            }
            .container-cv {
                box-shadow: none !important;
                border: none !important;
            }
            @page {
                size: A4;
                margin: 20mm;
            }
        }
    `;
    document.head.appendChild(style);
}

function setupPrintHandler() {
    window.onbeforeprint = function() {
        // Reset any scaling before print
        document.documentElement.style.setProperty('--content-scale', '1');
        
        // Make sure content is visible
        document.body.style.display = 'block';
        document.querySelector('.container-cv').style.transform = 'none';
        
        // Force a layout recalculation
        document.body.offsetHeight;
    };
}


function downloadPDF() {//pdf download function
    const element = document.querySelector('.container-cv'); // Select the CV container
    html2pdf()
        .from(element)
        .save('CV.pdf'); // Name of the downloaded file
}
