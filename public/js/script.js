function uploadProject() {
    const title = document.getElementById('project-title-field').value;
    const desc = document.getElementById('project-desc-field').value;
    const images = document.getElementById('project-images').files;
    const allowedExtensions = /(\.jpg|\.png)$/i;
    if (images.length < 3 || images.length > 3) {
        alert('Upload 3 files to Continue.');
        return;
    }

    for (let i = 0; i < images.length; i++) {
        // Client-side validation for file type
        if (!allowedExtensions.exec(images[i].name)) {
            alert('Invalid file type. Only JPG and PNG are allowed.');
            return;
        }

        // Client-side validation for file size
        if (images[i].size > 5 * 1024 * 1024) { // 5MB
            alert('File size should not exceed 5MB.');
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
                window.location.href = '/'; // Redirect to the home page on success
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
            alert("Project added Successfully");
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add project');
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
            alert('Invalid file type. Only JPG and PNG are allowed.');
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


const loginButton = document.getElementById('loginButton');

// Add a click event listener to the button
loginButton.addEventListener('click', () => {
    // Redirect the user to the /signin route
    window.location.href = '/signin';
});

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

async function toggleLike(projectId) {
    const elementId = `likeCount${projectId}`;
    // console.log('Element ID:', elementId);

    const likeCountElement = document.getElementById(elementId);
    // console.log('Element:', likeCountElement);

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
async function saveProject(projectId) {
    try {
        const response = await fetch('/save-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectId })
        });

        if (response.ok) {
            alert('Project saved successfully!');
        } else {
            alert('Failed to save the project.');
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





