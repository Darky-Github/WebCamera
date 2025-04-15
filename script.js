const captureButton = document.getElementById('captureButton');
const downloadButton = document.getElementById('downloadButton');
const camera = document.getElementById('camera');
const photoDisplay = document.getElementById('capturedPhoto');
const canvas = document.getElementById('photo');
const context = canvas.getContext('2d');

// Initialize the camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    camera.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing camera: ', error);
  });

// Capture image on button click
captureButton.addEventListener('click', () => {
  // Set canvas size to match video
  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  // Draw current frame on the canvas
  context.drawImage(camera, 0, 0, canvas.width, canvas.height);

  // Convert canvas to image and display it
  const imageUrl = canvas.toDataURL('image/png');
  photoDisplay.src = imageUrl;
  photoDisplay.style.display = 'block';

  // Show the download button
  downloadButton.style.display = 'inline-block';
});

// Allow the user to download the captured photo
downloadButton.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'captured-photo.png';
  link.click();
});
