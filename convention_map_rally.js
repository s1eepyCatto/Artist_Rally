const rallyList = document.getElementById("rallyList")

fetch("/data/rallies.json")
.then(response => response.json())
.then(data => {
    for (const rally of data) {
        //  create a new container for each rally in the db
        const container = document.createElement("div");
        container.dataset.rallyId = rally.rally_id;
        container.className = "rally-container center-vertically";
        container.innerHTML = `
            <div class="rally-summary">
                <p>${rally.rally_name}</p>
                <p class="subtitle">${rally.fandom} | hosted by ${rally.host}</p>
            </div>
            <div>
                <button class="icon visibility-toggle">
                        <img src="/icons/eye-close.png"/>
                </button>
                <button class="icon heart-toggle">
                        <img src="/icons/heart-icon.png"/>
                </button>
            </div>
        `;
        rallyList.appendChild(container);

        const visibilityToggle = container.querySelector(".visibility-toggle");

        visibilityToggle.addEventListener("click", () => {
            visibilityToggle.classList.toggle("hidden-state");
        });

        const heartToggle = container.querySelector(".heart-toggle");

        heartToggle.addEventListener("click", () => {
            if (getCookie("signedin") === "true") {
                heartToggle.classList.toggle("hidden-state");
                // TODO: add to server
            } else {
                signInModal.style.display = 'inline'
            }
        });
    }
});