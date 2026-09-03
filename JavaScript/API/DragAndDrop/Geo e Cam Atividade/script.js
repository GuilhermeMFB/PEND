// ========================================
// ELEMENTOS DA LOCALIZAÇÃO
// ========================================

const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");
const precisao = document.getElementById("precisao");

const btnLocalizacao = document.getElementById("btnLocalizacao");
const statusLocalizacao = document.getElementById("statusLocalizacao");

const resumoLocalizacao =
    document.getElementById("resumoLocalizacao");


// ========================================
// ELEMENTOS DA CÂMERA
// ========================================

const camera = document.getElementById("camera");
const foto = document.getElementById("foto");

const btnCamera = document.getElementById("btnCamera");
const btnFoto = document.getElementById("btnFoto");

const cameraMensagem =
    document.getElementById("cameraMensagem");

const statusCamera =
    document.getElementById("statusCamera");

const resumoFoto =
    document.getElementById("resumoFoto");

let transmissaoCamera = null;
let fotoRegistrada = false;
let localizacaoRegistrada = false;


// ========================================
// GEOLOCATION
// ========================================

btnLocalizacao.addEventListener("click", () => {

    if (!navigator.geolocation) {

        statusLocalizacao.textContent =
            "Seu navegador não suporta Geolocation.";

        return;
    }

    statusLocalizacao.textContent =
        "Obtendo sua localização...";

    btnLocalizacao.disabled = true;

    navigator.geolocation.getCurrentPosition(

        function (posicao) {

            const latitudeAtual =
                posicao.coords.latitude;

            const longitudeAtual =
                posicao.coords.longitude;

            const precisaoAtual =
                posicao.coords.accuracy;


            latitude.textContent =
                latitudeAtual.toFixed(6);

            longitude.textContent =
                longitudeAtual.toFixed(6);

            precisao.textContent =
                precisaoAtual.toFixed(2) + " metros";


            statusLocalizacao.textContent =
                "✓ Localização obtida com sucesso!";

            resumoLocalizacao.textContent =
                "Registrada";

            localizacaoRegistrada = true;

            btnLocalizacao.disabled = false;

        },

        function (erro) {

            btnLocalizacao.disabled = false;

            switch (erro.code) {

                case erro.PERMISSION_DENIED:
                    statusLocalizacao.textContent =
                        "Permissão de localização negada.";
                    break;

                case erro.POSITION_UNAVAILABLE:
                    statusLocalizacao.textContent =
                        "Não foi possível encontrar sua localização.";
                    break;

                case erro.TIMEOUT:
                    statusLocalizacao.textContent =
                        "Tempo limite para obter localização.";
                    break;

                default:
                    statusLocalizacao.textContent =
                        "Ocorreu um erro ao obter a localização.";
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});


// ========================================
// CÂMERA
// ========================================

btnCamera.addEventListener("click", async () => {

    try {

        transmissaoCamera =
            await navigator.mediaDevices.getUserMedia({

                video: true,
                audio: false

            });

        camera.srcObject = transmissaoCamera;

        cameraMensagem.style.display = "none";

        btnFoto.disabled = false;

        btnCamera.textContent =
            "🔴 Câmera ativada";

        statusCamera.textContent =
            "✓ Câmera funcionando normalmente.";

    }

    catch (erro) {

        console.error(erro);

        statusCamera.textContent =
            "Não foi possível acessar a câmera. Verifique a permissão do navegador.";

    }

});


// ========================================
// CAPTURAR FOTO
// ========================================

btnFoto.addEventListener("click", () => {

    if (!transmissaoCamera) {

        statusCamera.textContent =
            "Primeiro ative a câmera.";

        return;
    }


    foto.width = camera.videoWidth;
    foto.height = camera.videoHeight;


    const contexto =
        foto.getContext("2d");


    contexto.drawImage(
        camera,
        0,
        0,
        foto.width,
        foto.height
    );


    foto.style.display = "block";

    fotoRegistrada = true;

    resumoFoto.textContent =
        "Foto registrada";

    statusCamera.textContent =
        "✓ Foto capturada com sucesso!";

});


// ========================================
// FINALIZAR REGISTRO
// ========================================

const btnFinalizar =
    document.getElementById("btnFinalizar");

const resultado =
    document.getElementById("resultado");


btnFinalizar.addEventListener("click", () => {

    if (!localizacaoRegistrada) {

        resultado.textContent =
            "⚠️ Primeiro registre a localização.";

        return;
    }


    if (!fotoRegistrada) {

        resultado.textContent =
            "⚠️ Primeiro capture uma foto.";

        return;
    }


    resultado.textContent =
        "✅ Visita técnica registrada com sucesso!";


    // Desliga a câmera depois do registro
    if (transmissaoCamera) {

        transmissaoCamera
            .getTracks()
            .forEach(track => track.stop());

        btnCamera.textContent =
            "📷 Câmera finalizada";

    }

});