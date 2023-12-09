const $sectionCards = document.querySelector("section.cards");
const $ulCategory = document.querySelector("ul");
const $inputSearch = document.querySelector("input");
let data = [];

$inputSearch.addEventListener('keyup', function (e) {
  let textvalue = e.target.value.toLowerCase()
  let xc = data.filter(({name})=>{
    name = name.toLowerCase();
    console.log(textvalue);
    if (name.includes(textvalue) ){
      return true
    }
    return false
  })
  console.log(xc);
  renderCards(xc)
});
function renderCards(lista){
  let collection = "";
    for (const { icon, name, link } of lista) {
      collection += `
        <article>
          <img src="${icon || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTEyIDIydi0yIiBvcGFjaXR5PSIuNSIvPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZD0iTTQgMTYuNTYyQTEwLjI4NyAxMC4yODcgMCAwIDAgMTEuNjg3IDIwQzE3LjM4MyAyMCAyMiAxNS4zODMgMjIgOS42ODdDMjIgNi42MzMgMjAuNjcyIDMuODg4IDE4LjU2MiAyIi8+PHBhdGggZD0iTTcgNC41NTNjLjU4NS41NTIgMS43OSAyLjA2MyAxLjkzMSAzLjY4NGMuMTMxIDEuNTE1IDEuMDk2IDIuNzQ2IDIuNTY5IDIuNzYzYy41NjYuMDA2IDEuMTM5LS40MTggMS4xMzctMS4wMDVjMC0uMTgyLS4wMy0uMzY3LS4wNzQtLjUzOGExLjEzNyAxLjEzNyAwIDAgMSAuMDYyLS43OWMuNDU3LS45NzggMS4zNTctMS4yNDEgMi4wNy0xLjc3MmMuMzE2LS4yMzYuNjA0LS40ODQuNzMyLS42ODRjLjM1LS41NTMuNzAyLTEuNjU4LjUyNi0yLjIxMW0tMi42NjIgMTNjLS4yMi0uNDE0LS41MjctMS40OSAwLTIuNDgzYy42NTktMS4yNDEgMi44NTQtMS4yNDEgMi44NTQtMS4yNDFjMS42OTItLjAxOCAyLjMwMi0uNzgyIDIuNTg4LTEuNDYyTTE5IDEwYTcgNyAwIDEgMS0xNCAwYTcgNyAwIDAgMSAxNCAwWiIgb3BhY2l0eT0iLjUiLz48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xMCAyMmg0Ii8+PC9nPjwvc3ZnPg=='}" class="img-card" id=""/>
          <div class="card-info">
            <div class="name-article">${name}</div>
            
          </div>
        </article>`;
    }
    $sectionCards.innerHTML = collection;
}

function renderCategory(categorys){
  let c = document.createDocumentFragment();
  for (const m of categorys) {
    let li = document.createElement('li');
    li.textContent = m || 'Otros'
    li.addEventListener('click', function (e) {
      let g = data.filter(({ category})=>{
        if (category.includes(m)) {
          return true
        }
        return false
      })

      renderCards(g)
    });
    c.appendChild(li);
  }
  $ulCategory?.appendChild(c)
}

fetch("API/favoritePages.json")
  .then((response) => {
    // network failure, request prevented
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }

    return Promise.reject(new Error(response.statusText));
  })
  .then((response) => response.json())
  .then((result) => {
    data=result
    renderCards(result);

    let mn = []
    for (const {category} of result) {
      for (const cat of category) {
        mn.push(cat)
      }
    }
    mn = [...new Set(mn)]
    console.log(mn);
    renderCategory(mn)
  })
  .catch((error) => {
    // common error
    return null;
  });
