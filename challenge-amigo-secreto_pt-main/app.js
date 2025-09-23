const nomes = []; // Lista dos nomes
const nomesNormalizados = []; // Lista para checar nomes duplicados

function adicionarAmigo() {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();

    if (nome === "") {
        alert("Por favor, digite um nome.");
        return;
    }

    const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome);
    if (!nomeValido) {
        alert("Digite apenas letras. Números e símbolos não são permitidos.");
        return;
    }

    const nomeNormalizado = nome.toLowerCase();
    if (nomesNormalizados.includes(nomeNormalizado)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    nomes.push(nome);
    nomesNormalizados.push(nomeNormalizado);
    atualizarLista();

    input.value = "";
    input.focus();
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";

    nomes.forEach((nome, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${nome}`;

        // Adicionei Botão para remover
        const btnRemover = document.createElement('button');
        btnRemover.textContent = "❌";
        btnRemover.classList.add("btn-remover"); //Adicionado
        btnRemover.style.marginLeft = "10px";
        btnRemover.style.cursor = "pointer";
        btnRemover.onclick = () => removerAmigo(index);

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });

    // Limpar o resultado anterior ao modificar a lista
    document.getElementById('resultado').innerHTML = "";
}

function removerAmigo(index) {
    nomes.splice(index, 1);
    nomesNormalizados.splice(index, 1);
    atualizarLista();
}

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function sortearPares() {
    if (nomes.length < 2) {
        alert("É necessário pelo menos dois nomes para sortear.");
        return;
    }

    let sorteados = embaralhar(nomes);
    let valido = false;

    // Tenta gerar uma lista onde ninguém tira a si mesmo
    for (let tentativas = 0; tentativas < 100 && !valido; tentativas++) {
        sorteados = embaralhar(nomes);
        valido = nomes.every((nome, i) => nome !== sorteados[i]);
    }

    if (!valido) {
        alert("Ops! Não conseguimos fazer um sorteio válido dessa vez. Tente novamente.");
        return;
    }

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = "";

    nomes.forEach((nome, index) => {
        const li = document.createElement('li');
        li.textContent = `${nome} → ${sorteados[index]}`;
        resultado.appendChild(li);
    });
}
document.getElementById('amigo').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});

// Função para remover todos os amigos da lista
function limparTodosAmigos() {
    const confirmar = confirm("Tem certeza que deseja remover todos os nomes?");
    if (!confirmar) return;

    nomes.length = 0;
    nomesNormalizados.length = 0;
    atualizarLista();
}



