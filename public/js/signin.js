async function signinFORM(event) {
    event.preventDefault();

    const formObject = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log(formObject.username)
    
    try {
        const response = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject),
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Failed to submit form');
        alert('everything is ok');
        window.location.href = '/'; 
    } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while signing in: ' + error.message);
}

}
