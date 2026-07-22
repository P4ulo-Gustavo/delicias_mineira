document.addEventListener('DOMContentLoaded', () => {
    const categorias = document.querySelectorAll('.btn-categoria');

    //O primeiro botão de categoria é marcado como ativo por padrão
    if (categorias.length > 0) {
        categorias[0].classList.add('ativo');
    }


    //COLOCANDO A CLASSE ATIVO NA CATEGORIA CLICADA E REMOVENDO DOS OUTROS
    categorias.forEach(categoria => {
        categoria.addEventListener('click', () => {
            // Remove a classe 'ativo' de todos os botões usando um nome diferente (btn)
            categorias.forEach(btn => {
                btn.classList.remove('ativo');
            });

            // Adiciona a classe apenas no botão que recebeu o clique
            categoria.classList.add('ativo');
        });
    });
});