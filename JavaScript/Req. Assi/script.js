const btnUsuarios = document.querySelector("#buscarUsuarios");
const resultado = document.querySelector("#resultado");
const idUsuario = document.querySelector("#idUsuario");

//esse codigo esta utilizando apenas then e catch
// btnUsuarios.addEventListener("click", function () {
//     fetch("https://jsonplaceholder.typicode.com/users")
//         .then(resposta => resposta.json())
//         .then(dados => {
//             console.log(dados);

//             resultado.innerHTML = "";

//             dados.forEach(usuario => {
//                 resultado.innerHTML += `
//                 <p>
//                 <strong>${usuario.name}</strong><br>
//                 ${usuario.email}
//                 <hr>
//                 `;
//             });
//         })
//         .catch(erro => {
//             console.log("Erro:", erro);

//             resultado.innerHTML = "Erro ao buscar usuários.";
//         });
// });

// Esse codigo esta usando o async e await
// btnUsuarios.addEventListener("click", async () => {
//     try {
//         const resposta = await fetch(
//             "https://jsonplaceholder.typicode.com/users"
//         );

//         const dados = await resposta.json();

//         resultado.innerHTML = "";

//         dados.forEach(usuario => {
//             resultado.innerHTML += `
//             <p>
//             <strong>${usuario.name}</strong><br>
//             ${usuario.email}
//             <hr>
//             `;

//         });

//     } catch (erro) {
//         console.log("Erro:", erro);

//         resultado.innerHTML = "Erro ao buscar usuários.";
//     }
// });

btnUsuarios.addEventListener("click", async () => {

    const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Digite o ID";
        return;
    }
    try {
        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const dados = await resposta.json();

        resultado.innerHTML = "";


        resultado.innerHTML += `
            <p>
            <strong>${dados.name}</strong><br>
            Email: ${dados.email}<br>
            Cidade: ${dados.address.city}<br>
            Telefone: ${dados.phone}            
            <hr>
            `;



    } catch (erro) {
        console.log("Erro:", erro);

        resultado.innerHTML = "Erro ao buscar usuários.";
    }
});