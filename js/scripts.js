// Javascript for Public API - Project #5

const gallery = document.getElementById("gallery");
const body = document.querySelector('body');


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
    .then(modals)
        
           
   

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

// Date formatting function
function dateFormat(inputDate, format) {
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    

    //replace the month
    format = format.replace("MM", month.toString().padStart(2,"0"));        

    //replace the year
    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2,2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2,"0"));

    return format;
}


function generateCard(data) {
    for (let i = 0; i < data.length; i++) {
        let birthdate = data[i].dob.date;
        let convertedDate = dateFormat(birthdate, 'MM/dd/yyyy');

        // the HTML for each individual "card" created from the fetched data
        const card_html = `
            <div class="card" id="card-${i}">
                <div class="card-img-container">
                    <img class="card-img draw" src="${data[i].picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                    <p class="card-text">${data[i].email}</p>
                    <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                </div>

                <div class="hidden">
                    <div class="phone">${data[i].phone}</div>
                    <div class="full_address">
                        ${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.state}, ${data[i].location.postcode}
                    </div>
                    <div class="birthday">${convertedDate}</div>
                </div>
                

            </div>
        `;

        // the HTML for each individual "modal" created from the fetched data
        let modal_html = `
            <div class="modal-container hidden" id="modal-${i}">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${data[i].phone}</p>
                        <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.state}, ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${convertedDate}</p>
                    </div>
                </div>

                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        `;  

        
        // append the "card" and "modal" HTML to the proper spot in the index.html file
        gallery.insertAdjacentHTML('beforeend', card_html);
        body.insertAdjacentHTML('beforeend', modal_html);


        // adds ".hidden" class to initially hide all the created modals.  
        // showing the modals is accomplished within the createModals() function.
        const modals = document.querySelectorAll(".modal-container");
        // modals.forEach(modal => modal.classList.add("hidden"));
        
    }; 
  }



// ------------------------------------------
//  MODAL
// ------------------------------------------




function modals() {

    const cards = document.querySelectorAll(".card");
    
    // adds "click" listener to cards created by fetch request to open the corresponding modal window
    cards.forEach(card => card.addEventListener("click", function(e) {
        let clickedCard = e.target.closest(".card").id;
        let cardIndex = clickedCard.split('-').pop();
        let modalMatch = "modal-" + cardIndex;
        let modalID = document.getElementById(modalMatch);
        
        modalID.classList.remove("hidden");
        
    }));

    // adds "click" listener to "X" button that enables button to close the modal
    const closeModal = document.querySelectorAll(".modal-close-btn");
    closeModal.forEach(singleModal => singleModal.addEventListener("click", function(e) {
        e.target.closest(".modal-container").classList.add("hidden");
    }))

     // Allows toggle buttons for "next" and "previous" buttons to toggle between employees when the modal window is open.
    const prevBtn = document.querySelectorAll(".modal-prev");
    const nextBtn = document.querySelectorAll(".modal-next");

    nextBtn.forEach(btn => btn.addEventListener("click", function(e) {
        let closestModal = e.target.closest(".modal-container");
        closestModal.classList.add("hidden");

        let nextModal = closestModal.nextElementSibling;
        if (nextModal) {
            nextModal.classList.remove("hidden");
        };
        
    }))

    prevBtn.forEach(btn => btn.addEventListener("click", function(e) {
        let closestModal = e.target.closest(".modal-container");
        closestModal.classList.add("hidden");

        let prevModal = closestModal.previousElementSibling;
        prevModal.classList.remove("hidden");
    }))



};







