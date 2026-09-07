let tempoAtual = 25 * 60;
let intervalo = null;
let executando = false;
let ciclosConcluidos = 0;
let modoAtual = "Estudo";

const displayTempo = document.getElementById("tempo");
const statusTexto = document.getElementById("status");
const contadorCiclos = document.getElementById("contador-ciclos");
const botaoIniciar = document.getElementById("iniciar");
const botaoPausar = document.getElementById("pausar");
const botaoReiniciar = document.getElementById("reiniciar");

function atualizarDisplay() {
    const minutos = Math.floor(tempoAtual / 60);
    const segundos = tempoAtual % 60;

    displayTempo.textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

function iniciarPomodoro() {
    if (executando) return;

    executando = true;
    statusTexto.textContent = `${modoAtual} em andamento...`;

    intervalo = setInterval(() => {
        if (tempoAtual > 0) {
            tempoAtual--;
            atualizarDisplay();
        } else {
            clearInterval(intervalo);
            executando = false;

            if (modoAtual === "Estudo") {
                ciclosConcluidos++;
                contadorCiclos.textContent = ciclosConcluidos;
                statusTexto.textContent = "Ciclo concluído! Faça uma pausa.";
            } else {
                statusTexto.textContent = "Pausa concluída! Prepare-se para estudar.";
            }

            tocarAlerta();
        }
    }, 1000);
}

function pausarPomodoro() {
    clearInterval(intervalo);
    executando = false;
    statusTexto.textContent = "Pomodoro pausado.";
}

function reiniciarPomodoro() {
    clearInterval(intervalo);
    executando = false;

    const modoSelecionado = document.querySelector(".modo.ativo");
    tempoAtual = Number(modoSelecionado.dataset.tempo) * 60;

    atualizarDisplay();

    statusTexto.textContent =
        modoAtual === "Estudo"
            ? "Hora de estudar!"
            : "Momento de descansar.";
}

function tocarAlerta() {
    const alerta = new Audio(
        "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
    );

    alerta.play().catch(() => {
        console.log("Alerta sonoro bloqueado.");
    });
}

document.querySelectorAll(".modo").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".modo").forEach(item => {
            item.classList.remove("ativo");
        });

        botao.classList.add("ativo");
        modoAtual = botao.textContent.trim();
        tempoAtual = Number(botao.dataset.tempo) * 60;

        clearInterval(intervalo);
        executando = false;

        atualizarDisplay();

        statusTexto.textContent =
            modoAtual === "Estudo"
                ? "Hora de estudar!"
                : "Momento de descansar.";
    });
});

botaoIniciar.addEventListener("click", iniciarPomodoro);
botaoPausar.addEventListener("click", pausarPomodoro);
botaoReiniciar.addEventListener("click", reiniciarPomodoro);

atualizarDisplay();
