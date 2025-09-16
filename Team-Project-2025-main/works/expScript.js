const addExpButton = document.getElementById("submit-Exp");
const nameInput = document.getElementById("compName");
const startimeInput = document.getElementById("starDate");
const endtimeInput = document.getElementById("endDate");
const roleInput = document.getElementById("roleDesc");
const expList = document.getElementById("exp-list");

var expSave = [];

addExpButton.addEventListener("click",()=> {
    const name = nameInput.value;
    const startime = startimeInput.value;
	const endtime = endtimeInput.value;
    const role = roleInput.value;

    if (name.trim() === "" || startime.trim() === ""| endtime.trim() === "" | role.trim() === "") {
		alert("Please input your experiance into the fields.")
		return; // Don't add task if task or deadline is empty
	}

    const expItem = document.createElement("div");
	expItem.classList.add("exp");
	expItem.innerHTML = `
	<p>${name}</p>
	<p>start ${startime}</p>
	<p>end ${endtime}</p>
	<p>${role}</p>

    `;

    expList.appendChild(expItem);

	nameInput.value = "";
	roleInput.value = "";
	expSave.push([name, time, role]); // Use array literal syntax
    console.log(expSave);
    console.log(expSave[0][0]); 

})


