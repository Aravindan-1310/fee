document.getElementById('getFeeStatusButton').addEventListener('click', function() {
    const studentId = document.getElementById('studentIdInput').value; // Get student ID from input field
    
    const functionUrl = `https://feeinfo.azurewebsites.net/api/http_trigger?student_id=${studentId}`;
    
    fetch(functionUrl)
        .then(response => response.json())
        .then(data => {
            // Handle the response (display the fee details)
            if (data.Status) {
                document.getElementById('studentName').innerText = `Name: ${data.Name}`;
                document.getElementById('feeStatus').innerText = `Fee Status: ${data.Status}`;
                document.getElementById('totalFee').innerText = `Total Fee: $${data.TotalFee}`;
                document.getElementById('paidAmount').innerText = `Paid: $${data.PaidAmount}`;
                document.getElementById('remainingAmount').innerText = `Remaining: $${data.RemainingAmount}`;
            } else {
                document.getElementById('feeStatus').innerText = 'No data found';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('feeStatus').innerText = 'Error communicating with the server.';
        });
});
