function buscarBebida() {

    const nomeBebida = document.getElementById("bebida").value;
    const resultado = document.getElementById("resultado");

    if (nomeBebida === "") {
        resultado.innerHTML = "<p>Digite o nome de um drink.</p>";
        return;
    }

    resultado.innerHTML = "<p>Buscando drink...</p>";

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(nomeBebida)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (!data.drinks) {
                resultado.innerHTML = "<p>Drink não encontrado.</p>";
                return;
            }

            const bebida = data.drinks[0];

            let ingredientes = "";

            for (let i = 1; i <= 15; i++) {

                const ingrediente = bebida[`strIngredient${i}`];
                const quantidade = bebida[`strMeasure${i}`];

                if (ingrediente) {
                    ingredientes += `
                        <li>
                            ${quantidade || ""} ${ingrediente}
                        </li>
                    `;
                }
            }

            resultado.innerHTML = `
                <div class="card">

                    <img
                        src="${bebida.strDrinkThumb}"
                        alt="${bebida.strDrink}"
                    >

                    <div class="informacoes">

                        <h2>${bebida.strDrink}</h2>

                        <p>
                            <strong>Categoria:</strong>
                            ${bebida.strCategory || "Não informado"}
                        </p>

                        <p>
                            <strong>Tipo de copo:</strong>
                            ${bebida.strGlass || "Não informado"}
                        </p>

                        <h3>Ingredientes</h3>

                        <ul>
                            ${ingredientes}
                        </ul>

                        <h3>Modo de preparo</h3>

                        <p>
                            ${bebida.strInstructions || "Não informado"}
                        </p>

                    </div>

                </div>
            `;
        })

        .catch(error => {

            console.error(error);

            resultado.innerHTML =
                "<p>Erro ao buscar o drink.</p>";
        });
}