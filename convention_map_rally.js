const rallyList = document.getElementById("rallyList")

fetch("/data/rallies.json")
.then(response => response.json())
.then(data => {
    for (const rally of data) {
        //  create a new container for each rally in the db
        console.log(rally.rally_name);
        const container = document.createElement("div");
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
                <button class="icon">
                        <img src="/icons/heart-icon.png"/>
                </button>
            </div>
        `;
        rallyList.appendChild(container);

        const toggleBtn = container.querySelector(".visibility-toggle");

        toggleBtn.addEventListener("click", () => {
            toggleBtn.classList.toggle("hidden-state");
        });
    }
});
