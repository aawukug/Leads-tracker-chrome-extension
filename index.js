// INITILIAZATION
let leadsArr = [];

const inputEl = document.getElementById("input-el");

const saveBTn = document.getElementById("save-btn");

const tabBTn = document.getElementById("tab-btn");

const deleteBtn = document.getElementById("delete-btn");

const ulEl = document.getElementById("ul-el")


// RENDER FUNCTION
function render(leads) {
    let listItems = "";

    for ( let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>
        `
    }

    ulEl.innerHTML = listItems;
}

// SAVEBTN EVENTLISTNER
saveBTn.addEventListener("click", function(){
    leadsArr.push(inputEl.value);
    inputEl.value = "";

    // SAVE THE INPUT IN LOCAL STORAGE;
    localStorage.setItem("myLeads", JSON.stringify(leadsArr))
    render(leadsArr)
});;


// PERSIT DATA IN LOCAL STORAGE AND UI

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage){
    leadsArr = leadsFromLocalStorage;
    render(leadsArr)
}



// SAVE CURRENT TAB.
// TAB BTN EVENTLISTENR
tabBTn.addEventListener("click", function (){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        leadsArr.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(leadsArr))
        render(leadsArr)
      })
})



// DELETE ITEMS IN LOCAL STORAGE, DOM AND UI
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    leadsArr = []
    render(leadsArr)
})