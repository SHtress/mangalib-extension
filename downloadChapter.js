waitForElement('main', processChapter);

function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100); // Check every 100 ms
}


async function processChapter(element){
	// TODO: Add regular patterns to find names
	title_name = Array.from(document.querySelectorAll('[data-media-up]')).find(el => el.textContent).textContent;
	chapter_name = Array.from(document.querySelectorAll('[data-media-down]')).find(el => el.textContent).textContent;
	file_name = title_name + chapter_name;

	var div_list = document.querySelectorAll('[data-page]');
	var div_array = [...div_list];
	image_urls = []

	for (const div of div_array) {
		image = div.querySelector('img');
		if (image !== null) {
			image_urls.push(image.src + '\n');
		}
		else {
			console.log('No image for page', div.getAttribute('data-page'));
		}

		window.focus();
		div.click();
		await new Promise(r => setTimeout(r, 100));  // 100 ms optimal time to load image
	  }

	download(file_name, image_urls);
	}

// Function to download data to a file
function download(file_name, image_urls) {
    var a = document.createElement("a");
	var file = new Blob(image_urls, {type: 'text/plain'});
	a.href = URL.createObjectURL(file);
	a.download = file_name;
	document.body.appendChild(a);
	a.click();
}