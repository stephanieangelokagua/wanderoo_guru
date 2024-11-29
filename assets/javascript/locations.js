document.addEventListener('DOMContentLoaded', function() {
    var destinationModal = document.getElementById('destinationModal');
    destinationModal.addEventListener('show.bs.modal', function (event) {
        var button = event.relatedTarget; // Button that triggered the modal
        var title = button.getAttribute('data-title');
        var img = button.getAttribute('data-img');
        var description = button.getAttribute('data-description');

        // Update the modal's content
        var modalTitle = destinationModal.querySelector('.modal-title');
        var modalImg = destinationModal.querySelector('#destinationModalImg');
        var modalDescription = destinationModal.querySelector('#destinationModalDescription');

        modalTitle.textContent = title;
        modalImg.src = img;
        modalDescription.textContent = description;
    });
});