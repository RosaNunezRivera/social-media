'use strict';

//Import utilities functions  
import {
    onEvent,
    getElement,
    select,
    create,
} from "./utils.js";

//Import class 
import {
    User,
    Suscriber
} from "./Classes.js";

//Creating HTML elements Modal 
const fileInput = getElement("file");
const selectedFileAlert = select(".div-name-file");
const textArea = getElement("text");
const postButton = select('.post-button');
const postsContainer = select(".posts-container");

//Creating HTML Modal elements 
const btn = getElement("openModalBt");
const modal = getElement("myModal");
const modalContent = select(".modal-content");
const span = getElement('closeModalBtn');

/*--------------------------------------------------------------------------------*/
/* Proving data manually to add a new suscriber                                            */
/*--------------------------------------------------------------------------------*/
const suscribers = [];
const newSuscriber = new Suscriber('001', 'Rosa', 'romanu7777', 'romanunez7777@gmail.com',
    [1, 2, 3],
    ['www.smileface.com', 'www.goole.com'],
    true)
suscribers.push(newSuscriber);
textArea.placeholder = "What's new " + newSuscriber.fullname;

/*--------------------------------------------------------------------------------*/
/* Function: On Event listener input area                                         */
/*--------------------------------------------------------------------------------*/
onEvent(textArea, "keydown", handleKeyDown);

// Function to handle keydown event on the text area
function handleKeyDown(event) {
    if (event.key === "Enter" && textArea.value.trim().length > 0) {
        event.preventDefault();
        newPost();
        textArea.focus();
        reset();
    } else if (event.key === "Enter") {
        event.preventDefault();
        textArea.focus();
    }
}

/*--------------------------------------------------------------------------------*/
/* Function: On Event listener input file                                        */
/*--------------------------------------------------------------------------------*/
let validFileUploaded = false;
let nameFile;
onEvent(fileInput, "change", newFileUploaded);

/*--------------------------------------------------------------------------------*/
/* Function: To Upload a img file using input file                                */
/*--------------------------------------------------------------------------------*/
function newFileUploaded(e) {
    validFileUploaded = true;
    nameFile = e.target.files[0];

    console.log(e.target.files[0]);

    const fileSelectedText = create("p");
    fileSelectedText.classList.add("file-selected-text");
    fileSelectedText.textContent = `${nameFile.name}`;
    selectedFileAlert.prepend(fileSelectedText);

    console.log(`Test file uploaded`);
}

/*--------------------------------------------------------------------------------*/
/* Function: Postbotton Even Listener when the user do click in the button        */
/*--------------------------------------------------------------------------------*/
onEvent(postButton, 'click', function (e) {
    e.preventDefault();

    if (textArea.value.trim().length > 0 || validFileUploaded) {
        console.log('validando si hay imagen y si hay texto')
        newPost();
        textArea.focus();
        reset();
    } else {
        textArea.focus();
    }
});

onEvent(window, "load", () => {
    textArea.focus();
});

/*--------------------------------------------------------------------------------*/
/* Function: Reset values                                                         */
/*--------------------------------------------------------------------------------*/
function reset() {
    textArea.value = "";
    validFileUploaded = false;
    nameFile = null;
    fileInput.value = "";
    selectedFileAlert.innerHTML = "";
}

/*--------------------------------------------------------------------------------*/
/* Function: Post botton                                                          */
/*--------------------------------------------------------------------------------*/
function newPost() {
    let post = create("div");
    post.classList.add("post");

    // Create post-header
    const postHeader = create("div");
    postHeader.classList.add("post-header");
    post.appendChild(postHeader);

    // Create post-header-image
    let profileImage = create("div");
    profileImage.classList.add("post-header-image");
    postHeader.appendChild(profileImage);

    // Create post-header-text
    let postHeaderText = create("div");
    postHeaderText.classList.add("post-header-text");
    postHeader.appendChild(postHeaderText);

    let user = create("p");
    user.classList.add("user");
    user.textContent = newSuscriber.fullname;
    postHeaderText.appendChild(user);

    let date = create("p");
    date.classList.add("date");
    // Options for date formatting
    let options = {
        month: "short",
        day: "numeric",
        year: "numeric",
    };
    date.textContent = new Date().toLocaleDateString("en-CA", options).toString();
    postHeaderText.appendChild(date);

    // Create post body
    let text = create("p");
    text.textContent = textArea.value;
    post.appendChild(text);

    if (validFileUploaded) {
        let imageContainer = create("div");
        let image = create("img");

        imageContainer.classList.add("post-body-image");
        image.src = URL.createObjectURL(nameFile);

        post.appendChild(imageContainer);
        imageContainer.appendChild(image);
    }

    postsContainer.insertBefore(post, postsContainer.firstChild);

    textArea.value = "";
}

/*--------------------------------------------------------------------------------* /
/* Function: Show Informacion                                                         */
/*--------------------------------------------------------------------------------*/

const getInfoArray = newSuscriber.getInfoSuscriber().split(", ");
const fullName = `${newSuscriber.fullname}`;
const username = newSuscriber.getInfo().split(", ")[3];
const email = newSuscriber.getInfo().split(", ")[4];
const pages = newSuscriber.pages.join(", ");
const groups = newSuscriber.groups.join(", ");
const canMonetize = newSuscriber.getInfo().split(", ")[7];

const info1 = create("p");
info1.textContent = `Full name: ${fullName}`;
modalContent.appendChild(info1);

const info2 = create("p");
info2.textContent = `Username: ${newSuscriber.user}`;
modalContent.appendChild(info2);

const infor3 = create("p");
infor3.textContent = `Email: ${newSuscriber.email}`;
modalContent.appendChild(infor3);

const info4 = create("p");
info4.textContent = `Pages: ${pages}`;
modalContent.appendChild(info4);

const info5 = create("p");
info5.textContent = `Groups: ${groups}`;
modalContent.appendChild(info5);

const info6 = create("p");

if (canMonetize === "false") {
    info6.textContent = `Ups! You can't monetize your content yet`;
    modalContent.appendChild(info6);
} else {
    info6.textContent = `Congratulation! you can monetize your content now!`;
    modalContent.appendChild(info6);
}

/*--------------------------------------------------------------------------------*/
/* Function: Show Modal                                                          */
/*--------------------------------------------------------------------------------*/
btn.onclick = function () {
    modal.style.display = 'block';
};

span.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};









