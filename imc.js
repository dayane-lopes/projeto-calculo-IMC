async function calcular(event) {
  event.preventDefault();

  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value;
  const resultado = document.getElementById("resultado");
  const imgContainer = document.querySelector(".img-container");

  if (!peso || !altura) {
    resultado.textContent = "Preencha os dois campos!";
    return;
  }

  try {
    // Chama a API
    const url = `https://bmicalculatorapi.vercel.app/api/bmi/${peso}/${altura}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log("Resposta da API:", data); // DEBUG

    if (!data || !data.bmi) {
      resultado.textContent = "Erro ao calcular o IMC.";
      return;
    }

    const imc = data.bmi;
    const categoria = data.Category;

    console.log("Categoria detectada:", categoria);

    // Mostra o resultado traduzido
    resultado.textContent = `IMC: ${imc.toFixed(2)} - ${traduzirCategoria(categoria)}`;

    resultado.style.display = "block";


    // Escolhe a imagem de fundo com base na categoria
    let imagem = "";
    const cat = categoria ? categoria.toLowerCase() : "";

    if (cat.includes("underweight")) {
      imagem = "imagens/desnutrido.png";
    } else if (cat.includes("normal")) {
      imagem = "imagens/normal.png";
    } else if (cat.includes("overweight")) {
      imagem = "imagens/sobrepeso.png";
    } else if (cat.includes("obesity")) {
      imagem = "imagens/obeso.png";
    }

    if (imagem) {
      imgContainer.style.backgroundImage = `url('${imagem}')`;
      imgContainer.style.backgroundRepeat = "no-repeat";
      imgContainer.style.backgroundSize = "cover";
      imgContainer.style.backgroundPosition = "center";
    } else {
      console.warn("Nenhuma imagem encontrada para a categoria:", categoria);
      imgContainer.style.backgroundImage = ""; // limpa caso não ache imagem
    }

  } catch (error) {
    resultado.textContent = "Erro ao acessar a API.";
    console.error(error);
  }
}

// Função para traduzir a categoria
function traduzirCategoria(categoria) {
  if (!categoria) return "Desconhecido";

  const cat = categoria.toLowerCase();

  if (cat.includes("underweight")) return "Abaixo do peso";
  if (cat.includes("normal")) return "Peso normal";
  if (cat.includes("overweight")) return "Sobrepeso";
  if (cat.includes("obesity")) return "Obesidade";

  return "Desconhecido"; // caso não bata com nenhum
}
