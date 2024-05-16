function validateForm(formObject) {
    // Check if any field is empty
    for (const [key, value] of Object.entries(formObject)) {
        if (!value) {
            alert(`${key} cannot be empty`);
            return false;
        }
    }


    // Check password strength
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!passwordPattern.test(formObject.password)) {
        alert('wrong password');
        return false;
    }

    return true;
}
 


async function changepassword(event) {
    event.preventDefault();
        
        const oldpass = document.getElementById('opassword').value;
        const newpass = document.getElementById('npassword').value;

        const data = { oldpass, newpass };
       
        if (!validateForm(data)) {
            return; // Stop submission if validation fails
        }

        try {
            const response = await fetch('/changepassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const message = await response.text();
                alert("Password changed successfully.");
                window.location.href = "/";
            } else {
                const error = await response.text();
                alert(error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
 