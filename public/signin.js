async function signinFORM(event) {
    event.preventDefault();
    console.log("hi")
    

    const formObject = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    console.log(formObject)
    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (!response.ok) throw new Error('Failed to submit form');
        alert('everything is ok');
    } catch (error) {
        console.error('Error:', error.message);
        alert('An error occurred while signing in');
    }
}
