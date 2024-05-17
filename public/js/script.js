document.addEventListener('DOMContentLoaded', () => {
    const cardModal = document.getElementById('cardModal');
    const modalTriggerElements = document.querySelectorAll('.card-img, .card-info');

    modalTriggerElements.forEach(element => {
        element.addEventListener('click', function(event) {
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const images = this.getAttribute('data-images').split(',');

            // Update the modal's content.
            const modalTitle = cardModal.querySelector('.modal-title');
            const modalCardImages = cardModal.querySelector('#modalCardImages');
            const modalDesc = cardModal.querySelector('#modalCardDesc');

            modalTitle.textContent = title;
            modalDesc.textContent = desc;

            // Clear previous images
            modalCardImages.innerHTML = '';

            // Add new images
            images.forEach((image) => {
                const imgElement = document.createElement('img');
                imgElement.src = image.trim();
                imgElement.classList.add('img-fluid', 'mb-2'); // Adjust classes as needed
                modalCardImages.appendChild(imgElement);
            });
        });
    });
});


// const loginButton = document.getElementById('loginButton');

// // Add a click event listener to the button
// loginButton.addEventListener('click', () => {
//     // Redirect the user to the /signin route
//     window.location.href = '/signin';
// });

function signinPage(){
    window.location.href = '/signin';
}
function signupPage(){
    window.location.href = '/signup';
}

const SignButton = document.getElementById('SignUpButton');

// Add a click event listener to the button
SignButton.addEventListener('click', () => {
    // Redirect the user to the /signin route
    window.location.href = '/signup';
});

document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const query = searchInput.value;
        if (query === "") {
            window.location.href = "/";
        } 
        else {
        fetch(`/search?query=${encodeURIComponent(query)}`)
            .then(response => response.text())
            .then(data => {
                document.getElementById('searchResults').innerHTML = data;
            })
            .catch(error => console.error('Error:', error));
        }
    });

    const likeElements = document.querySelectorAll('.like-count');

    // Iterate over each element and update the text content with formatted likes
    likeElements.forEach(element => {
        const likes = parseInt(element.getAttribute('data-likes'), 10);
        element.textContent = formatLikes(likes);
    });
});

async function toggleLike(projectId,element) {
    const elementId = `likeCount${projectId}`;
    const likeCountElement = document.getElementById(elementId);

   // Toggles the 'active' class on the clicked element
   element.classList.toggle('active');
    
   // Removes the 'active' class after 0.5s (duration of animation)
   setTimeout(() => {
       element.classList.remove('active');
   }, 500); // Adjust the timeout value to match the duration of the animation
    

    console.log(elementId);
    if (!likeCountElement) {
        console.error('Element not found:', elementId);
        return;
    }
    const currentLikes = parseInt(likeCountElement.getAttribute('data-likes'));
    try {
        const response = await fetch(`/like-project/${projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentLikes })
        });

        if (response.ok) {
            const data = await response.json();
            likeCountElement.textContent = data.likes;
            likeCountElement.setAttribute('data-likes', data.likes);
        } else {
            console.error('Failed to toggle like');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to save a project
async function saveProject(projectId,element) {

    document.getElementById('saveIcon').addEventListener('click', function() {
        this.classList.toggle('active'); // Toggles the 'active' class
        setTimeout(() => {
            this.classList.remove('active'); // Removes the 'active' class after 0.5s (duration of animation)
        }, 500); // Adjust the timeout value to match the duration of the animation
    });
    
    try {
        const response = await fetch('/save-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectId })
        });

        if (response.ok) {
            showSuccessAlert('Project saved successfully!');
        } else {
            showDangerAlert('Failed to save the project.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
        return (likes / 1000).toFixed(1) + 'K'; // Convert to K format
    } else if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M'; // Convert to M format
    } else {
        return likes; // Return as-is for values below 1000
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

function confirmDeletion(callback) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Your file is safe :)',
                'error'
            );
        }
    });
}

function removeProject(projectId) {
    confirmDeletion(() => {
        fetch(`/project-remove/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessAlert('Project removed successfully!');
                document.getElementById(`project-${projectId}`).remove();
            } else {
                alert('Failed to remove the project: ' + data.message);
            }
        })
        .catch(error => console.error('Error removing project:', error));
    });
}
/*wajee try */
// document.getElementById('likeIcon').addEventListener('click', function() {
//     this.classList.toggle('active');
// });
