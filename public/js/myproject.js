function uploadProject() {
    const title = document.getElementById('project-title-field').value;
    const desc = document.getElementById('project-desc-field').value;
    const images = document.getElementById('project-images').files;
    const allowedExtensions = /(\.jpg|\.png)$/i;
    if (images.length < 3 || images.length > 3) {
        showDangerAlert('Upload 3 files to Continue.');
        return;
    }

    for (let i = 0; i < images.length; i++) {
        // Client-side validation for file type
        if (!allowedExtensions.exec(images[i].name)) {
            showDangerAlert('Invalid file type. Only JPG and PNG are allowed.');
            return;
        }

        // Client-side validation for file size
        if (images[i].size > 5 * 1024 * 1024) { // 5MB
            showDangerAlert('File size should not exceed 5MB.');
            return;
        }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    for (let i = 0; i < images.length; i++) {
        formData.append('projectImages', images[i]);
    }

    // Send AJAX request to backend
    fetch('/projects', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/my-projects'; // Redirect to the home page on success
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || 'Failed to add project');
                });
            }
        })
        .then(data => {
            console.log(data);
            const closeButton = document.querySelector('#project-modal .btn-close');
            closeButton.click(); // Close the modal
            showSuccessAlert("Project added Successfully");
        })
        .catch(error => {
            console.error('Error:', error);
            showSuccessAlert('Failed to add project');
        });
}

const form = document.querySelector('.img-form');
fileInput = form.querySelector('.file-input');
uploadArea = document.querySelector('.upload-area');
uploadArea.style.display = "none";
form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = (event) => {
    const files = event.target.files;
    const allowedExtensions = /(\.jpg|\.png)$/i;
    uploadArea.style.display = "block";
    if (files.length==3){
    Array.from(files).forEach((file) => {
        const fileName = file.name;
        const fileSize = file.size;
        Array.from(files).forEach((file) => {
            if (!allowedExtensions.test(file.name)) {
                showDangerAlert('Invalid file type. Only JPG and PNG are allowed.');
                return;
            }
        });
        if (allowedExtensions.test(fileName)) {
            const uploadHTML = `
                <li class="file-li d-flex justify-content-between">
                    <div class="content">
                        <img class="fa-file" src="/img/file.svg" alt="File.svg">
                        <div class="details">
                            <span class="name">${fileName} . Uploaded</span>
                            <span class="size">${(fileSize / 1024).toFixed(2)} Kb</span>
                        </div>
                    </div>
                    <img class="fa-check" src="/img/check.svg" alt="check.svg">
                </li>`;
            uploadArea.insertAdjacentHTML('afterbegin', uploadHTML);
        } else {
            showDangerAlert('Invalid file type. Only JPG and PNG are allowed.');
        }
    });
}
};

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

async function toggleLike(projectId) {
    const likeIcon = document.getElementById('likeIcon');
    likeIcon.classList.toggle('active'); // Toggles the 'active' class
    
    setTimeout(() => {
        likeIcon.classList.remove('active'); // Removes the 'active' class after 0.5s (duration of animation)
    }, 500); // Adjust the timeout value to match the duration of the animation
    

    const elementId = `likeCount${projectId}`;
    const likeCountElement = document.getElementById(elementId);
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

function formatLikes(likes) {
    if (likes >= 1000 && likes < 1000000) {
        return (likes / 1000).toFixed(1) + 'K'; // Convert to K format
    } else if (likes >= 1000000) {
        return (likes / 1000000).toFixed(1) + 'M'; // Convert to M format
    } else {
        return likes; // Return as-is for values below 1000
    }
}

function editProject(projectId) {
    const editIcon = document.getElementById('editIcon');
    editIcon.classList.toggle('active'); // Toggles the 'active' class
    
    setTimeout(() => {
        likeIcon.classList.remove('active'); // Removes the 'active' class after 0.5s (duration of animation)
    }, 500); // Adjust the timeout value to match the duration of the animation

    // Fetch the project details from the server using the projectId
    fetch(`/editprojects/${projectId}`)
        .then(response => response.json())
        .then(project => {
            // Populate the modal with the project details
            document.getElementById('project-edit-title-field').value = project.title;
            document.getElementById('project-edit-desc-field').value = project.desc;

            // Store the projectId in a hidden field or a global variable
            document.getElementById('project-edit-modal').setAttribute('data-project-id', projectId);

            // Show the modal
            new bootstrap.Modal(document.getElementById('project-edit-modal')).show();
        })
        .catch(error => console.error('Error fetching project details:', error));
}

function saveProjectChanges() {
    const projectId = document.getElementById('project-edit-modal').getAttribute('data-project-id');
    const updatedTitle = document.getElementById('project-edit-title-field').value;
    const updatedDesc = document.getElementById('project-edit-desc-field').value;

    // Send the updated project details to the server
    fetch(`/editprojects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: updatedTitle,
            desc: updatedDesc
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Close the modal and refresh the project list or update the project details in the DOM
            new bootstrap.Modal(document.getElementById('project-edit-modal')).hide();
            // Optionally, refresh the page or update the DOM to reflect the changes
            location.reload();
        } else {
            console.error('Error saving project changes:', data.message);
        }
    })
    .catch(error => console.error('Error saving project changes:', error));
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
