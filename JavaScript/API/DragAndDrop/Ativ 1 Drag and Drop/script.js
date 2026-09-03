const tarefas = document.querySelectorAll(".tarefa");
const areasDrop = document.querySelectorAll(".area-drop");
const mensagem = document.getElementById("mensagem");

let tarefaArrastada = null;

// Inicia o arraste
tarefas.forEach(tarefa => {

    tarefa.addEventListener("dragstart", function () {

        tarefaArrastada = this;

        this.style.opacity = "0.5";

    });

    tarefa.addEventListener("dragend", function () {

        this.style.opacity = "1";

        areasDrop.forEach(area => {
            area.classList.remove("destino");
        });

    });

});


// Permite receber o elemento
areasDrop.forEach(area => {

    area.addEventListener("dragover", function (evento) {

        evento.preventDefault();

        this.classList.add("destino");

    });


    area.addEventListener("dragleave", function () {

        this.classList.remove("destino");

    });


    // Quando o elemento é solto
    area.addEventListener("drop", function (evento) {

        evento.preventDefault();

        this.classList.remove("destino");

        if (tarefaArrastada) {

            this.appendChild(tarefaArrastada);

            atualizarContadores();

            mostrarMensagem();

        }

    });

});


// Atualiza a quantidade de tarefas
function atualizarContadores() {

    const colunas = document.querySelectorAll(".coluna");

    colunas.forEach(coluna => {

        const area = coluna.querySelector(".area-drop");
        const contador = coluna.querySelector(".contador");

        contador.textContent = area.querySelectorAll(".tarefa").length;

    });

}


// Mostra feedback visual
function mostrarMensagem() {

    mensagem.classList.add("mostrar");

    mensagem.textContent = "✓ Tarefa movida com sucesso!";

    setTimeout(() => {

        mensagem.classList.remove("mostrar");

    }, 2000);

}