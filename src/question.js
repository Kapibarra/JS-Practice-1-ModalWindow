// import { response } from "express";

export class Question {
  static create(question) {
    return fetch(
      "https://podcast-javascript-app-c1894.firebaseio.com/questions.json",
      {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responce) => {
        question.id = responce.name;
        return question;
      })
      .then(addToLocalStorage)
      .then(Question.renderList);
  }
  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error"> У вас нет токена </p>')
    }
    fetch (`https://podcast-javascript-app-c1894.firebaseio.com/questions.json?auth=${token}`)
    .then( responce => responce.json())
    .then( questions => {
      if (responce.error) {
        return `<p class="error"> ${responce.error}<p>`
      }
      return responce ? Object.keys(responce).map(key => ({
        ...responce[key],
        id: key
      })) : []
    })
    
  }
  static renderList() {
    const questions = getQuestionsFromLocalStorage();

    const html = questions.length
      ? questions.map(toCard).join("")
      : ` <div class="mui--text-headline"> Вы пока ничего не спрашивали </div>`;

    const list = document.getElementById("list");

    list.innerHTML = html;
  }
}
function addToLocalStorage(question) {
  const all = getQuestionsFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}

function getQuestionsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}
function toCard(question) {
  return `
          <div class="mui--text-black-54">
          ${new Date(question.date).toLocaleDateString()}
          ${new Date(question.date).toLocaleTimeString()}
          </div>
          <div> ${question.text}
          </div>
          <br>
          `
}
