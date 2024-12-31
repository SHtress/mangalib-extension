console.log('test2');

waitForElement('main', processChapter);
    
async function processChapter(element){
	console.log('Chapter exists:', element);
	var div_list = document.querySelectorAll('[data-page]');
	var div_array = [...div_list]; // converts NodeList to Array
	image_urls = []
	for (const div of div_array) {
		const contents = await processPage(div);
	  } 
	}

async function processPage(div){
	image = div.querySelector('img');
	if (image !== null) {
		console.log(image.src);
		window.open(image.src);
		await new Promise(r => setTimeout(r, 2000));
	}
	else {
		console.log('No image for page', div.getAttribute('data-page'));
		return;
	}
	window.focus();
	div.click();
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


// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}