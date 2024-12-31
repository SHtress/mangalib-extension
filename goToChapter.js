console.log('test1');

function main() {	
	var div_list = document.querySelectorAll('[data-chapter-id]');
	// returns NodeList
	var div_array = [...div_list]; // converts NodeList to Array
	div_array.forEach(div => {
		const button = document.createElement('span');
		button.classList.add('volume-anchor__trigger', 'btn', 'is-plain', 'is-outline', 'size-sm');
		button.innerText = 'Скачать главу';
		button.style.marginLeft = '12px';
		button.pageLink = div.querySelector('[href]');
		button.addEventListener('click', goToChapter);
		div.append(button);
		});
}
	
function goToChapter() {
	console.log(this.pageLink);
	window.location.href = this.pageLink
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

// Usage
waitForElement('.vue-recycle-scroller__item-wrapper', (element) => {
    console.log('Chapter exists:', element);
	main();
});
