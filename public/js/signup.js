function validateForm(formObject) {
    // Check if any field is empty
    for (const [key, value] of Object.entries(formObject)) {
        if (!value) {
            alert(`${key} cannot be empty`);
            return false;
        }
    }

    // Check username length and character requirements
    const usernamePattern = /^[A-Za-z]{4,}$/;
    if (!usernamePattern.test(formObject.username)) {
        alert('Username must be at least 4 characters long and contain only alphabets');
        return false;
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formObject.email)) {
        alert('Invalid email format');
        return false;
    }

    // Check password strength
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!passwordPattern.test(formObject.password)) {
        alert('Password must be at least 5 characters long, contain at least one letter and one number');
        return false;
    }

    return true;
}


async function submitForm(event) {
    event.preventDefault();
    const formObject = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value
    };

    if (!validateForm(formObject)) {
        return; // Stop submission if validation fails
    }

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });
        if (response.status === 400) {
            const errorMessage = await response.text();
            alert(errorMessage);
            return;
        }
        if (!response.ok) throw new Error('Failed to submit form');
        
        window.location.href = '/email-page'; 
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while signing up');
    }

}

