const conSubmitButton = document.getElementById("conSubmitButton");

conSubmitButton.addEventListener("click", function() {
    window.location.href = "convention_map.html";
})

function redirectToPage() {
    const convention = document.getElementById("conventions").value;
    window.location.replace("convention_map.html");
    if (convention) {
        window.location.href = "convention_map.html";
    }
}