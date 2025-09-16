const addeduutton = document.getElementById("submit-qualification");
const nameInput = document.getElementById("institutionName");
const startimeInput = document.getElementById("startDate");
const endtimeInput = document.getElementById("endDate");
const qualiName = document.getElementById("qualificationName");
const eduList = document.getElementById("edu-list");
const grade = document.getElementById("grade");

var eduSave = [];

addeduutton.addEventListener("click",()=> {
    const name = nameInput.value;
    const startime = startimeInput.value;
	const endtime = endtimeInput.value;
    const qName = qualiName.value;
    const gradeValue = grade.value;


    if (name.trim() === "" || startime.trim() === ""| endtime.trim() === "" | qName.trim() === ""| gradeValue.trim() === "") {
		alert("Please input your experiance into the fields.")
		return; // Don't add task if task or deadline is empty
	}

    const expItem = document.createElement("div");
	expItem.classList.add("exp");
	expItem.innerHTML = `
	<p>${name}</p>
	<p>start ${startime}</p>
	<p>end ${endtime}</p>
	<p>${qName}</p>
    <p>${gradeValue}</p>
	<hr/>

    `;

    eduList.appendChild(eduList);

	nameInput.value = "";
	gradeValue.value = "";
    qName.value = "";
	eduSave.push([name, startime,,endtime.qName,gradeValue]); // Use array literal syntax
    console.log(eduSave);
    console.log(eduSave[0][0]); 

})