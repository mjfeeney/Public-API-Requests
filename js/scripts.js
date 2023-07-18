// Javascript for Public API - Project #5

const gallery = document.getElementById("gallery");



// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Looks like there was a problem!', error))
  }
  
  fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => generateCard(data.results))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function generateCard(data) {
    for (let i = 0; i < data.length; i++) {
        const card_html = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img draw" src="${data[i].picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="card-text">${data[i].email}</p>
                    <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                </div>
            </div>
        `;
        gallery.insertAdjacentHTML('beforeend', card_html);
    };
    
  }
  




