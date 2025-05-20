window.onload = function() {

    var time = 1000;
    var fade = 500;
    
    const successAlert = document.getElementById('success-alert');
    if (successAlert) {
        setTimeout(() => {
            successAlert.classList.add('hidden');
        }, time);

        setTimeout(() => {
            successAlert.style.display = 'none';
        }, time + fade);
    }
};

function setDeleteModal(desc, name, type, id) {
    document.getElementById('desc').innerText = desc;
    document.getElementById('itemName').innerText = name;
    document.getElementById('deleteForm').action = `/${type}/eliminar/${id}`;
}