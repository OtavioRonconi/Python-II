// static/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('action-button');

    if (actionButton) {
        actionButton.addEventListener('click', () => {
            alert('Botão clicado! O JavaScript está funcionando.');
        });
    }

    console.log('Página CanesGril carregada com sucesso!');
});