waitForElement('img', processPage);

async function processPage(element){
	console.log('Image loaded:', element);
	await downloadImage(element.src);
	window.close();
}

async function downloadImage(
  imageSrc,
  nameOfDownload = 'my-image.png',
) {
  const response = await fetch(imageSrc);

  const blobImage = await response.blob();

  const href = URL.createObjectURL(blobImage);

  const anchorElement = document.createElement('a');
  anchorElement.href = href;
  anchorElement.download = nameOfDownload;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
  await new Promise(r => setTimeout(r, 1000));
}


function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100); // Check every 100ms
}