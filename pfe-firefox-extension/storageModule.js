// Define the loadData function
export function loadData(key) {
    return browser.storage.local.get(key).then(
        (result) => {
            if (result[key]) {
                return result[key];
            } else {
                console.error("No data found for key:", key);
                return null;
            }
        },
        (error) => {
            console.error(`Error retrieving data for key ${key}:`, error);
            return null;
        }
    );
}
