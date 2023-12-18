// Function to load and set the data in input fields
function loadData() {
    // Use chrome.storage API to get the stored data
    chrome.storage.local.get(['stable_id', 'validation_code']).then(
        (result) => {
            if (result.stable_id) {
                document.getElementById('stable_id').value = result.stable_id;
            }
            if (result.validation_code) {
                document.getElementById('validation_code').value = result.validation_code;
            }
        },
        (error) => { console.log(`Error: ${error}`); }
    );
}

// Event listener for the save button
document.getElementById('saveButton').addEventListener('click', () => {
    let stable_id = document.getElementById('stable_id').value;
    let validation_code = document.getElementById('validation_code').value;

    // Save data using chrome.storage API
    chrome.storage.local.set({ stable_id: stable_id, validation_code: validation_code }).then(
        () => { console.log("Data saved"); },
        (error) => { console.log(`Error: ${error}`); }
    );
});

// Load data when the script is loaded
loadData();
