async function submitForm(event) {
    event.preventDefault();
    const formObject = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value
    };

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (!response.ok) throw new Error('Failed to submit form');
        alert('everything is ok');
        window.location.href = '/'; 
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while signing up');
    }
}

