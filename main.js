window.onload = () => {
    const toggleButton = document.createElement("button");
    toggleButton.id = "toggle-tt";
    toggleButton.textContent = "Open token taker";

    const ttContainer = document.createElement("div");
    ttContainer.id = "tokentaker";
    ttContainer.style.display = "none";

    toggleButton.onclick = () => {
        if (ttContainer.style.display === "none") {
            ttContainer.style.display = "flex";
            toggleButton.textContent = "Close token taker";
        } else {
            ttContainer.style.display = "none";
            toggleButton.textContent = "Open token taker";
        }
    };

    document.body.appendChild(toggleButton);

    const rechten = JSON.parse(localStorage.getItem("rechten") || "{}");
    const key = rechten?.accounts?.[0]?.localAuthenticationContext;

    // Get tokens from localStorage
    const storageKey = `CapacitorStorage.${key}`;
    const storedData = key ? JSON.parse(localStorage.getItem(storageKey) || "{}") : {};

    const access_token = storedData.access_token || "No token";
    const refresh_token = storedData.refresh_token || "No refresh token";

    // Helper to create token blocks
    function createTokenBlock(title, token) {
        const container = document.createElement("div");
        container.className = "tota-cont";

        const h2 = document.createElement("h2");
        h2.textContent = title;
        container.appendChild(h2);

        const tokenCont = document.createElement("div");
        tokenCont.className = "tota-token-cont";

        const tokenDiv = document.createElement("div");
        tokenDiv.className = "tota-token";
        tokenDiv.textContent = token;
        tokenCont.appendChild(tokenDiv);

        const copyBtn = document.createElement("button");
        copyBtn.className = "tota-copy-token";
        copyBtn.textContent = "Copy";
        copyBtn.onclick = () => {
            navigator.clipboard.writeText(token).catch((err) => {
                console.error("Failed to copy text: ", err);
            });
        };

        tokenCont.appendChild(copyBtn);
        container.appendChild(tokenCont);

        return container;
    }

    ttContainer.appendChild(createTokenBlock("access_token", access_token));
    ttContainer.appendChild(createTokenBlock("refresh_token", refresh_token));

    document.body.appendChild(ttContainer);
};
