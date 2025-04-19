const URL_PRODUCTS = "http://localhost:3000/produtos";
import { userIsAuthenticated } from "../../services/check-user.mjs";

document.addEventListener("DOMContentLoaded", async function () {

   if(!userIsAuthenticated() == true){
      window.location.href = "./login/login.html";
    }
  async function getProdutos() {
    try {
      const response = await fetch(URL_PRODUCTS);
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const produtos = await response.json();
      return produtos;
    } catch (error) {
      alert("Erro ao buscar os produtos");
      console.error("Erro:", error);
    }
  }

  function listarProdutos(produtos) {
    const container = document.getElementById("produtos");

    // Limpa o conteúdo atual para evitar duplicações
    container.innerHTML = "";

    produtos.forEach(produto => {
      const showProduto = document.createElement('div');
      showProduto.classList.add('col', 's6', 'm6', 'l4');

      showProduto.innerHTML = `
        <div class='center'>
            <div class="z-depth-2" id="imagemproduto">
          <img src="${produto.caminho_foto}" alt="${produto.nomeProduto}" width="150" height="200">
          <div class="row row-info-product">
            <span class="green-text">Frete Grátis</span>
          </div>
          <div class="row desc-product row-info-product">
            <p>${produto.nomeProduto}</p>
          </div>
          <div class="row real-value-product row-info-product">
            <p>R$ ${produto.valorOriginal.toFixed(2)}</p>
          </div>
          <div class="row value-product row-info-product">
            <p>R$ ${produto.valorDesconto.toFixed(2)}</p>
          </div>
          <div class="row row-info-product">
            <button class="waves-effect waves-light btn btn-cashback">
              R$ ${produto.valorCashback.toFixed(2)} Cashback *
            </button>
          </div>
          <div class="row row-info-product">
            <button class="waves-effect waves-light btn btn-buy">Adicionar ao Carrinho</button>
          </div>
        </div></div>
      `;

      container.appendChild(showProduto);
    });
  }

  const produtos = await getProdutos();
  if (produtos) {
    listarProdutos(produtos);
  }
});
