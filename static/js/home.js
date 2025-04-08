document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('reviewForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!validateURL()) {
            return; // Show toast and stop submit
        }

        const form = e.target;
        const formData = new FormData(form);

        document.getElementById('progressBarContainer').style.display = 'block';
        updateProgressBar(10);

        fetch(".", {
            method: "POST",
            body: formData
        })
        .then(async response => {
            if (!response.ok) {
                const data = await response.json();
                showToast(data.message || "Something went wrong!");
                document.getElementById('progressBarContainer').style.display = 'none';
                return Promise.reject();
            }
            updateProgressBar(90);
            return response.text();
        })
        .then(html => {
            updateProgressBar(100);
            setTimeout(() => {
                document.open();
                document.write(html);
                document.close();
            }, 300);
        })
        .catch(() => { /* already handled */ });

        // Fake progress
        let fakeProgress = 10;
        const interval = setInterval(() => {
            fakeProgress += 5;
            if (fakeProgress >= 85) clearInterval(interval);
            updateProgressBar(fakeProgress);
        }, 300);

        function updateProgressBar(percent) {
            document.getElementById('progressBar').style.width = percent + '%';
        }
    });

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }

    function validateURL() {
    const url = document.getElementById("urlInput").value.trim();

    try {
        const parsed = new URL(url);

        // Check domain
        if (!parsed.hostname.includes("flipkart.com")) {
            showToast("Only Flipkart links are accepted!");
            return false;
        }

        // Check if it's a product *review* link
        if (!parsed.pathname.includes("/product-reviews/")) {
            showToast("Please enter a Flipkart *review* link (not just product page).");
            return false;
        }

        return true; // Valid
    } catch (err) {
        showToast("Please enter a valid URL starting with https://");
        return false;
    }
}
});
