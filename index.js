document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const captureButton = document.getElementById("capture-button");
    const context = canvas.getContext("2d");

    // Constraints to use the back camera
    const constraints = {
        video: {
            facingMode: { exact: "environment" }
        }
    };
    
    // Check if getUserMedia is supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Access the web camera
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                console.error("Error accessing the web camera: ", error);
            });

        // Capture the image when click on the capture button
        captureButton.addEventListener("click", () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the current frame on the canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageUrl = canvas.toDataURL("image/png");
            console.log("Image URL: ", imageUrl);
            window.open(imageUrl);
        });
    } else {
        console.error("getUserMedia is not supported in this browser.");
    }
});
