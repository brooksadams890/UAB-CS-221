const si         = document.getElementById('sInput'); // Text input for searching
const sBtn       = document.getElementById('sButton'); // Search button that searches
const result1    = document.getElementById('results'); // Shows search results 
const shelfEl    = document.getElementById('shelf'); // Shows saved bookshelf
// Init bookshelf from localStorage
let shelf = JSON.parse(localStorage.getItem('shelf') || '[]');
drawShelf();
// The search button is clicked
sBtn.onclick = () => {
  const q = si.value.trim(); // trim the seach term
  if (!q) {                 // if empty, don't do anything
    return;
  }
  result1.textContent = 'Searching…'; // Displays a loading indicator
  // Fetches results from OpenLibrary
  fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}`)
    .then(r => r.json())    //parse JSON
    .then(j => showResults(j.docs.slice(0, 20))) // Display 20 results
    .catch(() => result1.textContent = 'Error fetching'); // Displays error 
};
//I asked chatGPT to help me with this part. I mostly wanted to make sure I was doing it right.  I asked it:
/* Write a JS function called showResults(docs) that does the following:
Clears the result1 container.
Loops over the array, docs.
For each item d, creates a <div> with class "bCard" and sets its innerHTML that:
Inserts an <img> whose src is the OpenLibrary cover URL when d.cover_i exists, or a placeholder URL otherwise.
Adds a <div class="bInfo"> containing:
An <h3> with d.title, a <p> listing authors joined by commas, a <div class="actions"> with two buttons: one with class "switch" labeled “Info” and one with class "add" labeled “Shelf”, a <div class="details"> holding two <p> elements: one for “Year: ” plus d.first_publish_year (or “?”), and one for “Subjects: ” plus up to five subjects joined by commas,
Appends each card into result1, Hooks the .switch button to toggle the "open" class on its sibling .details element, Hooks the .add button to push d into a shelf array in localStorage while skipping duplicates and then calls drawShelf(). */

/* It said function showResults(docs) {
  result1.innerHTML = '';
  docs.forEach(d => {
    const card = document.createElement('div');
    card.className = 'bCard';
    card.innerHTML = `
      <img src="${
        d.cover_i
          ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
          : 'https://via.placeholder.com/128x190?text=No+Cover'
      }" />
      <div class="bInfo">
        <h3>${d.title}</h3>
        <p>${(d.author_name || []).join(', ')}</p>
        <div class="actions">
          <button class="switch">Info</button>
          <button class="add">Shelf</button>
        </div>
        <div class="details">
          <p>Year: ${d.first_publish_year || '?'}</p>
          <p>Subjects: ${(d.subject || []).slice(0,5).join(', ') || 'N/A'}</p>
        </div>
      </div>`;
    result1.append(card);

    const details = card.querySelector('.details');
    card.querySelector('.switch').onclick = () => {
      details.classList.toggle('open');
    };

    card.querySelector('.add').onclick = () => {
      if (!shelf.find(b => b.key === d.key)) {
        shelf.push(d);
        localStorage.setItem('shelf', JSON.stringify(shelf));
        drawShelf();
      }
    };
  });
}
  */
 //Show results 
function showResults(docs) {
  result1.innerHTML = ''; // Remove last results
  docs.forEach(d => { 
    //Each book gets a card
    const card = document.createElement('div');
    card.className = 'bCard';
   // Make the card with the author/s, buttons, cover, and the hidden info
    card.innerHTML = `
      <img src="${d.cover_i
        ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
        : 'https://via.placeholder.com/128x190?text=No+Cover'}" />
      <div class="bInfo">
        <h3>${d.title}</h3>
        <p>${(d.author_name||[]).join(', ')}</p>
        <div class="actions">
          <button class="switch">Info</button>
          <button class="add">Shelf</button>
        </div>
        <div class="details"> 
          <p>Year: ${d.first_publish_year||'?'}</p>
          <p>Subjects: ${(d.subject||[]).slice(0,5).join(', ')||'N/A'}</p>
        </div>
      </div>`;
    result1.append(card); // Add card to results
// Toggle the details dection if info button is pressed on
    card.querySelector('.switch').onclick = () =>
      card.querySelector('.details').classList.toggle('open');
// Adds the book/card to the shelf when shelf button is clicked
    card.querySelector('.add').onclick = () => {
      if (!shelf.find(b => b.key === d.key)) {
        shelf.push(d);  // put in array
        localStorage.setItem('shelf', JSON.stringify(shelf)); //save to localStorage 
        drawShelf(); // re-render bookshelf 
      }
    };
  });
}
// render the saved bookshelf
function drawShelf() {
  shelfEl.innerHTML = ''; //clears the current display
  if (!shelf.length) {
    shelfEl.textContent = 'Shelf is empty.'; // if there is no books, show placeholder
    return;
  }

  shelf.forEach(d => {
    // Make a card for every saved book
    const card = document.createElement('div');
    card.className = 'bCard';
    /* I asked ChatGpt to help me with... I mostly wanted to make sure I was doing this right:
    
An <img> whose src is https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg when d.cover_i exists, otherwise a placeholder URL.
A <div class="bInfo"> containing, a <h3> with d.title, a <button class="remove">Remove</button>, appends that card to the shelfEl container.
Wires up the .remove button’s onclick to:

  shelf = shelf.filter(b => b.key !== d.key);
  localStorage.setItem('shelf', JSON.stringify(shelf));
  drawShelf();
  */

  /* shelf.forEach(d => {
  const card = document.createElement('div');
  card.className = 'bCard';
  card.innerHTML = `
    <img src="${d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
      : 'https://via.placeholder.com/128x190?text=No+Cover'}" />
    <div class="bInfo">
      <h3>${d.title}</h3>
      <button class="remove">Remove</button>
    </div>`;
  shelfEl.append(card);

  card.querySelector('.remove').onclick = () => {
    shelf = shelf.filter(b => b.key !== d.key);
    localStorage.setItem('shelf', JSON.stringify(shelf));
    drawShelf();
  };
}); */
    card.innerHTML = `
      <img src="${d.cover_i
        ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
        : 'https://via.placeholder.com/128x190?text=No+Cover'}" />
      <div class="bInfo">
        <h3>${d.title}</h3>
        <button class="remove">Remove</button>
      </div>`;
    shelfEl.append(card); //Add to bookshelf
//If the remove button is clicked, take it out from the shelf
    card.querySelector('.remove').onclick = () => {
      shelf = shelf.filter(b => b.key !== d.key); // filter out book
      localStorage.setItem('shelf', JSON.stringify(shelf)); // update storage
      drawShelf(); // re-render shelf
    };
  });
}