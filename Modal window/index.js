let fruits = [
  {
    id: 1,
    title: "Яблоко",
    price: 20,
    img: "https://pngimg.com/uploads/apple/apple_PNG12436.png",
  },
  {
    id: 2,
    title: "Апельсин",
    price: 30,
    img:
      "https://avatanplus.com/files/resources/original/5bceeb962cdf1166a04842a8.png",в
  },
  {
    id: 3,
    title: "Манго",
    price: 40,
    img: "https://dgdesign.ru/uploads/posts/2018-07/1531848661_354654531.png",
  },
];



const toHTML = (fruit) => `
<div class="col">
        <div class="card">
          <img src="${fruit.img}" class="card-img-top" style="height: 300px;" alt="${fruit.title}">
          <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить </a>
          </div>
        </div>
      </div>
`;
    

function render() {
  const html = fruits.map((fruit) => toHTML(fruit)).join("");
  document.querySelector("#fruits").innerHTML = html;
}
render();

const priceModal = $.modal({
    title: "Цены на товар",
    closeable: true,
    width: ' 400px',
    footerButtons: [
        {text: 'Закрыть', type:'primary', handler(){
            priceModal.close()
        }}
    ]
})



document.addEventListener("click", (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)

  if (btnType === 'price') {
   
      priceModal.setContent(`
      <p>Цена на ${fruit.title} : <strong>${fruit.price}$<strong><p>
      `)
    priceModal.open();
  } else if (btnType === 'remove') {
      $.confirm({
          title: ' Вы уверены?',
          content: `
          <p>Вы удаляете  <strong>${fruit.title}<strong></p>
          `
      }).then(() => {
         fruits = fruits.filter(f => f.id !==id)
         render()
      }).catch(() => {
          console.log('delete')
      })

  }
});

// const confirmModal = $.modal({
//     title: "Цены на товар",
//     closeable: true,
//     width: ' 400px',
//     footerButtons: [
//         {text: 'Удалить', type:'danger', handler(){
//             confirmModal.close()
//         }} ,
//         {text: 'Отменить', type:'secondary', handler(){
//             confirmModal.close()
//         }}
//     ]
// })


// const modal = $.modal({
//   title: "My Modal",
//   closeable: true,
//   content: `
// <h4>Modal is working<h4>
// <p>text text text<p>
// <p>text text text<p>
// <p>text text text<p>
// `,
//   width: "500px",
//   footerButtons: [
//     {
//       text: "OK",
//       type: "primary",
//       handler() {
//         console.log("primary btn clicked");
//         modal.close();
//       },
//     },
//     {
//       text: "CANCEL",
//       type: "danger",
//       handler() {
//         console.log("Danger btn clicked");
//         modal.close();
//       },
//     },
//   ],
// });


    //   confirmModal.setContent(`
    //   <p>Вы удаляете  <strong>${fruit.title}<strong><p>
    //   `)
    //   confirmModal.open()
