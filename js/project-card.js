class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["title", "image", "description", "link"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 300px;
                    height: 400px;
                    border-radius: var(--border-radius, 8px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: transform var(--transition-speed, 0.3s);
                    background: var(--background-color, white);
                    color: var(--text-color, black);
                }
                :host(:hover) {
                    transform: scale(1.05);
                }
                .card {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    padding: 16px;
                    text-align: center;
                }
                img {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-bottom: 2px solid var(--primary-color, #3498db);
                    loading: lazy;
                }
                h2 {
                    font-size: 1.5rem;
                    margin: 10px 0;
                }
                p {
                    font-size: 1rem;
                    flex-grow: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                a {
                    text-decoration: none;
                    color: var(--primary-color, #3498db);
                    font-weight: bold;
                }
            </style>
            <div class="card">
                <picture>
                    <source srcset="${this.getAttribute("image")}" type="image/jpg">
                    <img src="${this.getAttribute("image")}" alt="${this.getAttribute("alt-text")}">
                </picture>
                <h2>${this.getAttribute("title")}</h2>
                <p>${this.getAttribute("description")}</p>
                <a href="${this.getAttribute("link")}" target="_blank">Learn More</a>
            </div>
        `;
    }
}

customElements.define("project-card", ProjectCard);

// Function to create and add project cards to the page
function addProjectCards(projects) {
    const container = document.querySelector("#projects-container");
    container.innerHTML = "";
    Object.values(projects).forEach(project => {
        const projectData = Object.assign({}, ...project);
        const card = document.createElement("project-card");
        card.setAttribute("title", projectData.title);
        card.setAttribute("image", projectData.image);
        card.setAttribute("description", projectData.description);
        card.setAttribute("link", projectData.link);
        container.appendChild(card);
    });
}

// Load projects from localStorage first
const savedProjects = localStorage.getItem("projects");
if (savedProjects) {
    addProjectCards(JSON.parse(savedProjects));
}

// Fetch additional projects from JSON file
fetch("db.json")
    .then(response => response.json())
    .then(data => {
        addProjectCards(data);

        // Save fetched projects to localStorage for future use
        localStorage.setItem("projects", JSON.stringify(data));
    })
    .catch(error => console.error("Error fetching projects:", error));


function loadLocalProjects() {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
        addProjectCards(JSON.parse(savedProjects));
        console.log("Local projects loaded successfully.");
    } else {
        console.warn("No local projects found.");
    }
}


function loadRemoteProjects() {
    fetch("https://my-json-server.typicode.com/StrawberryAkai/hw5/db")
        .then(response => response.json())
        .then(data => {
            addProjectCards(data);
            console.log("Remote projects loaded successfully.");
        })
        .catch(error => console.error("Error fetching remote projects:", error));
}

const text = "Andy! A Computer Science major with substantial software engineering experience, including an internship at Guardant Health, the Triple C project, and various course projects. I'm always eager to embrace new technologies within the software field to enrich my software engineering career.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typing-text").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 50);
    }
}

document.addEventListener("DOMContentLoaded", typeEffect);

document.addEventListener("DOMContentLoaded", function () {
    const resumeBtn = document.querySelector(".download-btn");

    resumeBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const link = document.createElement("a");
        link.href = "files/resume.pdf";
        link.download = "Andy_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});

