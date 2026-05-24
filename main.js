const glossaryContainer =
  document.querySelector('.glossary-container');



/* ───────── RENDER GLOSSAR ───────── */

function renderGlossary(data) {

  glossaryContainer.innerHTML = '';

  const grouped = {};



  data.forEach(item => {

    const letter =
      item.term.charAt(0).toUpperCase();



    if (!grouped[letter]) {

      grouped[letter] = [];

    }



    grouped[letter].push(item);

  });



  Object.keys(grouped)
    .sort()
    .forEach(letter => {

      const section =
        document.createElement('section');

      section.classList.add('letter-section');

      section.id = letter.toLowerCase();



      section.innerHTML = `

        <div class="letter-marker">
          ${letter}
        </div>

      `;



      grouped[letter].forEach(entry => {

        const article =
          document.createElement('article');

        article.classList.add('glossary-entry');



        article.innerHTML = `

          <p class="glossary-text">

            <span class="glossary-term">
              ${entry.term}:
            </span>

            ${entry.description}

          </p>

        `;



        section.appendChild(article);

      });



      glossaryContainer.appendChild(section);

    });

}



/* ───────── INIT ───────── */

renderGlossary(glossaryData);



/* ───────── SUCHE ───────── */

const searchInput =
  document.getElementById('searchInput');



searchInput.addEventListener('input', (e) => {

  const value =
    e.target.value.toLowerCase();



  const filtered =
    glossaryData.filter(item => {

      return (

        item.term
          .toLowerCase()
          .includes(value)

        ||

        item.description
          .toLowerCase()
          .includes(value)

      );

    });



  renderGlossary(filtered);

});



/* ───────── SCROLL TO NAV ───────── */

document
  .querySelectorAll('.scroll-indicator')
  .forEach(indicator => {

    indicator.addEventListener('click', () => {

      const target =
        document.querySelector('.alphabet-nav');



      if (target) {

        const offset = 20;

        const top =
          target.getBoundingClientRect().top
          + window.scrollY
          - offset;



        window.scrollTo({

          top,
          behavior: 'smooth'

        });

      }

    });

});