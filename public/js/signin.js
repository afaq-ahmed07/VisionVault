function validateForm(formObject) {
    // Check if any field is empty
    for (const [key, value] of Object.entries(formObject)) {
        if (!value) {
            showDangerAlert(`${key} cannot be empty`);
            return false;
        }
    }

    // Check username length and character requirements
    const usernamePattern = /^[A-Za-z]{4,}$/;
    if (!usernamePattern.test(formObject.username)) {
        showDangerAlert('invalid username');
        return false;
    }

   
    // Check password strength
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!passwordPattern.test(formObject.password)) {
        showDangerAlert('invalid password');
        return false;
    }

    return true;
}
 

async function signinFORM(event) {
    event.preventDefault();

    const formObject = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    console.log(formObject.username)
    
    if (!validateForm(formObject)) {
        return; // Stop submission if validation fails
    }

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
        window.location.href = '/'; 
    } catch (error) {
    console.error('Error:', error);
    alert('wrong credentials');
}

}

function showDangerAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    });
}

function showSuccessAlert(message) {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
    });
}