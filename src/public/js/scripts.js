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