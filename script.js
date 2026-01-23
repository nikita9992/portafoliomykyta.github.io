const buttons = document.querySelectorAll('.btnProyecto button');

buttons.forEach(button => {
    button.addEventListener('click', function () {

        this.classList.toggle('active');


        const desc = this.closest('.proyecto').querySelector('.descripcion');

        if (desc.style.height && desc.style.height !== '0px') {
            desc.style.height = '0px';
        } else {
            desc.style.height = desc.scrollHeight + 'px';
        }
    });
});