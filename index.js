const buttonEl = document.querySelector("button");
const cardEl = document.querySelector(".card__content");

function renderAdvice({ id, advice }) {
  cardEl.innerHTML = `
        <h1>Advice #${id}</h1>
        <p>${advice}</p>
    `;
}

function renderLoader() {
  cardEl.innerHTML = '<span class="loader"></span>';
}

function renderError(message) {
  cardEl.innerHTML = `
        <h1>Error !</h1>
        <p>${message}</p>
    `;
}

async function getAdvice() {
  try {
    renderLoader();
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();

    renderAdvice({
      id: data.slip.id,
      advice: data.slip.advice,
    });
  } catch (e) {
    console.error(e);
    renderError(e.message);
  }
}

buttonEl.addEventListener("click", getAdvice);
getAdvice();
