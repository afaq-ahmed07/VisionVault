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
    cardModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget; // Button that triggered the modal
        const title = button.getAttribute('data-title');
        const desc = button.getAttribute('data-desc');
        const images = button.getAttribute('data-images').split(',');

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


