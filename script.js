// Replace this with the URL you got from "Publish to web"
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT41ihuAutSEp1Ibpdo7wgSmXIpWrtP962F7oYKCuW8JR31BrD2R8HjjiN_7U8rFJAqgqofNDgF6-ya/pub?output=csv';

const table = document.getElementById('data-table');
const tableBody = table.getElementsByTagName('tbody')[0];
const searchInput = document.getElementById('searchInput');
const loader = document.getElementById('loader');

let data = [];

// Function to build the HTML table from data
function createTable(dataToRender) {
    tableBody.innerHTML = ''; // Clear existing table data
    for (let item of dataToRender) {
        let row = tableBody.insertRow();
        row.insertCell(0).innerHTML = item.Account;
        row.insertCell(1).innerHTML = item.Password;
        row.insertCell(2).innerHTML = item.Date;
        row.insertCell(3).innerHTML = item.Hero;
        row.insertCell(4).innerHTML = item.Notes;
        row.insertCell(5).innerHTML = item.Player;
        row.insertCell(6).innerHTML = item.Art;
    }
}

// Function to filter data based on search input
function search() {
    const filter = searchInput.value.toUpperCase();
    const filteredData = data.filter(item => {
        // Join all values in the row and check if the filter text is present
        return Object.values(item).join(' ').toUpperCase().includes(filter);
    });
    createTable(filteredData);
}

// Event listener for the search input
searchInput.addEventListener('keyup', search);

// Use PapaParse to fetch and parse the CSV data from Google Sheets
Papa.parse(GOOGLE_SHEET_URL, {
    download: true,
    header: true, // Assumes the first row of your sheet is the header
    complete: function(results) {
        data = results.data; // Store the parsed data
        createTable(data);    // Create the initial table
        
        // Hide loader and show table
        loader.style.display = 'none';
        table.style.display = 'table';
    },
    error: function(error) {
        console.error("Error fetching or parsing data:", error);
        loader.innerText = "Error loading data. Please check the Google Sheet URL and make sure it's published correctly.";
    }
});
