async function buscarEvento() {

    const nome = document.getElementById("evento").value;
    const resultado = document.getElementById("resultado");

    if (nome === "") {

        resultado.innerHTML =
            "<p class='erro'>Digite o nome de um evento.</p>";

        return;
    }

    resultado.innerHTML =
        "<p>Buscando eventos...</p>";

    try {

        const resposta = await fetch(
            "https://api.stungevents.com/search?q=" +
            encodeURIComponent(nome)
        );

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a API");
        }

        const dados = await resposta.json();

        resultado.innerHTML = "";

        if (!dados.events || dados.events.length === 0) {

            resultado.innerHTML =
                "<p>Nenhum evento encontrado.</p>";

            return;
        }

        dados.events.forEach(function(evento) {

            const card = document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `
                <h2>${evento.title || "Evento sem nome"}</h2>

                <p>
                    <strong>Local:</strong>
                    ${evento.venue_name || "Não informado"}
                </p>

                <p>
                    <strong>Cidade:</strong>
                    ${evento.city || "Não informada"}
                </p>

                <p>
                    <strong>Categoria:</strong>
                    ${evento.category || "Não informada"}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${
                        evento.start_utc
                        ? new Date(evento.start_utc).toLocaleString("pt-BR")
                        : "Não informada"
                    }
                </p>

                ${
                    evento.ticket_url
                    ? `<p>
                        <a href="${evento.ticket_url}" target="_blank">
                            Ver evento
                        </a>
                       </p>`
                    : ""
                }
            `;

            resultado.appendChild(card);

        });

    } catch (erro) {

        resultado.innerHTML =
            "<p class='erro'>Não foi possível carregar os eventos.</p>";

        console.error(erro);
    }
}