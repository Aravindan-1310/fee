document.getElementById('student-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    if (!studentId) {
        alert("Please enter a Student ID.");
        return;
    }

    try {
        const functionUrl = `https://feeinfo.azurewebsites.net/api/http_trigger?student_id=${studentId}`;
        console.log("Making request to:", functionUrl);  // Log the URL to verify it's correct

        const response = await fetch(functionUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);  // Log the returned data to see it

        // Update the UI with the status
        document.getElementById('status').style.display = 'block';
        document.getElementById('name').innerText = data.Name;
        document.getElementById('fee-status').innerText = data.Status;
    } catch (error) {
        console.error("Error communicating with the server:", error);
        alert("An error occurred while fetching the fee status.");
    }
});

