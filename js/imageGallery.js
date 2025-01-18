import { app } from "/scripts/app.js";
import { $el, ComfyDialog } from "/scripts/ui.js";
import { ComfyApp } from "../../scripts/app.js";
import { bo as useToastStore } from "../../assets/index-DIU5yZe9.js";

var styles = `
.comfy-carousel {
    display: none; /* Hidden by default */
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0%;
    left: 0%;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,0.8);
    z-index: 9999;
	
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-o-user-select: none;
	-ms-user-select: none;
	user-select: none;

	-webkit-user-drag: none;
	-khtml-user-drag: none;
	-moz-user-drag: none;
	-o-user-drag: none;
	-ms-user-drag: none;
	user-drag: none;
	animation: fadeInCarousel 0.4s;
}

@keyframes fadeInCarousel {
    0% {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOutCarousel {
    0% {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.comfy-carousel-box {
    margin: 0 auto 20px;
    text-align: center;
}

.comfy-carousel-box .slides {
    position: relative;
    cursor: grab;
}

.comfy-carousel-box .slides img {
    display: none;
    max-height: 90vh;
    max-width: 90vw;
    margin: auto;
}

.comfy-carousel-box .slides img.shown {
    display: block;
}

@keyframes fadeInLeft {
    0% {
        transform: translate3d(-100%, 0, 0);
    }
    to {
        transform: translateZ(0);
    }
}

.comfy-carousel-box .slides img.enter {
	animation: fadeInLeft 0.4s;
}

@keyframes fadeOutRight {
    0% {
    }
    to {
        transform: translate3d(100%, 0, 0);
    }
}

.comfy-carousel-box .slides img.exit {
	animation: fadeOutRight 0.4s;
}

.comfy-carousel-box .ig-ed-status {
    font-size: 12px;
	line-height: 170%;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    padding: 10px 10px;
    border: none;
    user-select: none;
    outline-color: transparent;
    transition: background 0.2s;
    border-radius: 5px;
    top: 5%;
    left: 0;

    overflow: visible;
	text-align: left;
}

.comfy-carousel-box .ig-ed-prev,
.comfy-carousel-box .ig-ed-next,
.comfy-carousel-box .ig-ed-close,
.comfy-carousel-box .ig-ed-copy,
.comfy-carousel-box .ig-ed-maskedit,
.comfy-carousel-box .ig-ed-multi_paste {
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	margin: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    color:  var(--p-surface-50);
	padding: 0;
	border: none;
	user-select: none;
	cursor: pointer;
    outline-color: transparent;
	transition: background 0.2s;
}

.comfy-carousel-box .ig-ed-prev,
.comfy-carousel-box .ig-ed-next,
.comfy-carousel-box .ig-ed-close {
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
}

.comfy-carousel-box .ig-ed-prev {
	top: 45%;
    left: 0;
}

.comfy-carousel-box .ig-ed-next {
	top: 45%;
    right: 0;
}

.comfy-carousel-box .ig-ed-close {
	top: 0;
    right: 0;
}

.comfy-carousel-box .ig-ed-copy,
.comfy-carousel-box .ig-ed-maskedit {
	width: 3.2rem;
	height: 3.2rem;
	bottom: 6%;
    right: 6%;
	border-radius: 10%;	
}

.comfy-carousel-box .ig-ed-multi_paste {
	width: 3.2rem;
	height: 3.2rem;
	bottom: 6%;
    right: 2%;
	border-radius: 10%;	
}

.comfy-carousel-box .ig-ed-prev:hover,
.comfy-carousel-box .ig-ed-next:hover,
.comfy-carousel-box .ig-ed-close:hover,
.comfy-carousel-box .ig-ed-copy-icon:hover,
.comfy-carousel-box .ig-ed-maskedit-icon:hover,
.comfy-carousel-box .ig-ed-multi_paste-icon:hover {
    background:  rgba(255, 255, 255, 0.2);
    color: var(--p-surface-0);
}

.comfy-carousel-box .ig-ed-prev:focus-visible,
.comfy-carousel-box .ig-ed-next:focus-visible,
.comfy-carousel-box .ig-ed-close:focus-visible,
.comfy-carousel-box .ig-ed-copy-icon:focus-visible,
.comfy-carousel-box .ig-ed-maskedit-icon:focus-visible,
.comfy-carousel-box .ig-ed-multi_paste-icon:focus-visible {
    box-shadow:  var(--p-focus-ring-shadow);
	outline:  var(--p-focus-ring-width) var(--p-focus-ring-style) var(--p-focus-ring-color);
    outline-offset:  var(--p-focus-ring-offset);
}

.comfy-carousel-box .ig-ed-prev-icon,
.comfy-carousel-box .ig-ed-next-icon,
.comfy-carousel-box .ig-ed-close-icon {
	font-size: 1.5rem;
    width: 1.5rem;
	height: 1.5rem;
}

.comfy-carousel-box .ig-ed-copy-icon,
.comfy-carousel-box .ig-ed-maskedit-icon,
.comfy-carousel-box .ig-ed-multi_paste-icon {
    font-size: 1.5rem;
	width: 3.2rem;
	height: 3.2rem;
}

.comfy-carousel-box .ig-ed-prev-icon {
    content: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' class='ig-ed-prev-icon-svg' aria-hidden='true' data-pc-section='previcon'%3E%3Cpath d='M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z' fill='white'%3E%3C/path%3E%3C/svg%3E");
}

.comfy-carousel-box .ig-ed-next-icon {
    content: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' class='ig-ed-next-icon-svg' aria-hidden='true' data-pc-section='nexticon'%3E%3Cpath d='M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z' fill='white'%3E%3C/path%3E%3C/svg%3E");
}

.comfy-carousel-box .ig-ed-close-icon {
    content: url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' class='ig-ed-close-icon-svg' aria-hidden='true' data-pc-section='closeicon'%3E%3Cpath d='M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z' fill='white'%3E%3C/path%3E%3C/svg%3E");
}

.comfy-carousel-box .ig-ed-copy-icon {
    content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg fill='white' width='36px' height='36px' viewBox='0 0 36 36' version='1.1' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Ecopy-to-clipboard-line%3C/title%3E%3Cpath d='M22.6,4H21.55a3.89,3.89,0,0,0-7.31,0H13.4A2.41,2.41,0,0,0,11,6.4V10H25V6.4A2.41,2.41,0,0,0,22.6,4ZM23,8H13V6.25A.25.25,0,0,1,13.25,6h2.69l.12-1.11A1.24,1.24,0,0,1,16.61,4a2,2,0,0,1,3.15,1.18l.09.84h2.9a.25.25,0,0,1,.25.25Z' class='clr-i-outline clr-i-outline-path-1'%3E%3C/path%3E%3Cpath d='M33.25,18.06H21.33l2.84-2.83a1,1,0,1,0-1.42-1.42L17.5,19.06l5.25,5.25a1,1,0,0,0,.71.29,1,1,0,0,0,.71-1.7l-2.84-2.84H33.25a1,1,0,0,0,0-2Z' class='clr-i-outline clr-i-outline-path-2'%3E%3C/path%3E%3Cpath d='M29,16h2V6.68A1.66,1.66,0,0,0,29.35,5H27.08V7H29Z' class='clr-i-outline clr-i-outline-path-3'%3E%3C/path%3E%3Cpath d='M29,31H7V7H9V5H6.64A1.66,1.66,0,0,0,5,6.67V31.32A1.66,1.66,0,0,0,6.65,33H29.36A1.66,1.66,0,0,0,31,31.33V22.06H29Z' class='clr-i-outline clr-i-outline-path-4'%3E%3C/path%3E%3Crect x='0' y='0' width='36' height='36' fill-opacity='0'/%3E%3C/svg%3E");
	padding: 0.4rem;
}

.comfy-carousel-box .ig-ed-maskedit-icon {
    content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Svg Vector Icons : http://www.onlinewebfonts.com/icon --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 256 256' enable-background='new 0 0 256 256' xml:space='preserve'%3E%3Cmetadata%3E Svg Vector Icons : http://www.onlinewebfonts.com/icon %3C/metadata%3E%3Cg%3E%3Cg%3E%3Cpath fill='white' d='M238.6,245.9H17.4c-4.1,0-7.4-3.3-7.4-7.4l0,0c0-4.1,3.3-7.4,7.4-7.4h221.3c4.1,0,7.4,3.3,7.4,7.4l0,0C246,242.6,242.7,245.9,238.6,245.9z'/%3E%3Cpath fill='white' d='M227,37.2l-22.4-22.4c-3.1-3.1-7.2-4.7-11.3-4.7s-8.2,1.6-11.3,4.7L71.3,125.5l-30.5,64.9c-2.6,5.6,1.8,11.4,7.2,11.4c1.1,0,2.3-0.3,3.5-0.8l64.9-30.5L227.1,59.9C233.3,53.6,233.3,43.5,227,37.2z M216.6,49.4l-18.3,18.3l9.8,9.8L197.7,88l-9.8-9.8l-80.1,80.1l-45.7,21.5l21.5-45.7l80.2-80.2l-10-10l10.5-10.5l10,10l18.3-18.3c0.1-0.1,0.4-0.4,0.9-0.4c0.5,0,0.8,0.3,0.9,0.4l22.4,22.4c0.1,0.1,0.4,0.4,0.4,0.9C217,49.1,216.7,49.3,216.6,49.4z'/%3E%3Cpath fill='white' d='M164.1,33.5l-10.5,10.5l10,10l24.2,24.2l9.8,9.8l10.4-10.4l-9.8-9.8l-24.2-24.2L164.1,33.5z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
	padding: 0.5rem;
}

.comfy-carousel-box .ig-ed-multi_paste-icon {
    content: url("data:image/svg+xml,%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 122.88 98.27' fill='white'%3E%3Ctitle%3Ephotos%3C/title%3E%3Cpath d='M4.84,27.31H90.76a4.77,4.77,0,0,1,3.4,1.41,4.84,4.84,0,0,1,1.41,3.4V93.47a4.75,4.75,0,0,1-1.41,3.39,1.36,1.36,0,0,1-.25.22,4.67,4.67,0,0,1-3.18,1.19H4.81A4.81,4.81,0,0,1,0,93.47V32.12a4.77,4.77,0,0,1,1.41-3.4,4.83,4.83,0,0,1,3.4-1.41ZM32.15,0h85.92a4.77,4.77,0,0,1,3.4,1.41,4.84,4.84,0,0,1,1.41,3.4V66.16a4.75,4.75,0,0,1-1.41,3.39,1.09,1.09,0,0,1-.25.22A4.67,4.67,0,0,1,118,71h-5.38V65.22h4.51V5.71H33.06v4.2H27.31V4.81a4.77,4.77,0,0,1,1.41-3.4A4.84,4.84,0,0,1,32.12,0ZM18.5,13.66h85.92a4.75,4.75,0,0,1,3.39,1.41,4.8,4.8,0,0,1,1.41,3.39V79.81a4.77,4.77,0,0,1-1.41,3.4,1.4,1.4,0,0,1-.25.22,4.67,4.67,0,0,1-3.18,1.19H99V78.88h4.51V19.37H19.4v4.2H13.65V18.46a4.81,4.81,0,0,1,4.81-4.8ZM24.68,44a6.9,6.9,0,1,1-6.89,6.89A6.89,6.89,0,0,1,24.68,44Zm29,29.59L67.49,49.71,82.14,86.77H13.77V82.18l5.74-.29,5.75-14.08,2.87,10.06h8.62l7.47-19.25L53.7,73.56ZM89.86,33H5.75V92.53H89.86V33Z'/%3E%3C/svg%3E");
	padding: 0.5rem;
}

.comfy-carousel-box .dots img {
    height: 32px;
    margin: 8px 0 0 8px;
    opacity: 0.6;
    cursor: pointer;
}

.comfy-carousel-box .dots img:hover {
    opacity: 0.8;
}

.comfy-carousel-box .dots img.active {
    opacity: 1;
	border: 1px solid white;
}
`

function show_message(short_msg, detail_msg) {
	useToastStore().add({
        severity: short_msg.toLowerCase(),
        summary: short_msg,
        detail: detail_msg,
        life: 3e3
      });
}

function getNodeFromLink(node, linkId) {
    const linkInfo = app.graph.links[linkId];
    return node.graph.getNodeById(linkInfo.origin_id);
}

function isMatchingNode(node, nodeType) {
    return node.type && node.type.includes(nodeType);
}

 function findPreviousNode(node, nodeType) {	
	if (!node) return null;		
    const linkId = node.inputs[2]?.link;
    if (!linkId) return null;
    const targetNode = getNodeFromLink(node, linkId);
    if (isMatchingNode(targetNode, nodeType)) {
        return targetNode;
    }
    return null;
}

const findWidgetByName = (node, name) => {
    return node.widgets ? node.widgets.find((w) => w.name === name) : null;
};

function find_script_load_image(width, height, reg_script="Regional Script 💬ED", load_image="LoadImage") {
	const script_nodes = app.graph._nodes.filter( (n) => n.type.includes(reg_script));
	let find_node_list = []
	if (script_nodes.length) {
		script_nodes.forEach( (n) => {
			find_node_list.push(findPreviousNode(n, load_image));
		});
	}
	if (find_node_list.length) {
		find_node_list.forEach( (n) => {
			if (n) ComfyApp.pasteFromClipspace(n);
		});	
		show_message("Info", 'Copy image to Regional Script 💬ED');
	}
	
	function set_nodeWidthHeight (node_name, width_name, height_name, width, height) {
		const node = app.graph._nodes.find((n) => n.type.includes(node_name));
		if (node) {
			let widget_width = findWidgetByName (node, width_name);
			let widget_height = findWidgetByName (node, height_name);
			widget_width.value = width;
			widget_height.value = height;
		}
	}
	
	set_nodeWidthHeight("Efficient Loader 💬ED", "image_width", "image_height", width, height);
	set_nodeWidthHeight("Regional Stacker 💬ED", "width", "height", width, height);
	set_nodeWidthHeight("Regional Processor 💬ED", "width", "height", width, height);
}

function slideToImage(slide){
	const src = slide.getAttribute('src');
	if (!src) {
		console.error("No src attribute found.");
		return;
	}
	const urlParams = new URLSearchParams(src.split('?')[1]);
	const filename = urlParams.get('filename');
	const image = new Image();
	image.src = src;
	return [filename, image];
}

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

class ComfyCarousel extends ComfyDialog {
	constructor() {
		super();
		this.element.classList.remove("comfy-modal");
		this.element.classList.add("comfy-carousel");
		//this.element.addEventListener('click', (e) => this.clickExit(e));
		this.element.addEventListener('wheel', (e) => this.zoomInOut(e));
		this.element.addEventListener("animationend", (e) => {
			if (this.is_closed) {
				this.element.style.animation = `fadeInCarousel 0.4s`;
				super.close();
			}
		});
		this.onKeydown = this.onKeydown.bind(this);
	}
	close() {
		document.removeEventListener("keydown", this.onKeydown);
		let active = this.getActive();
		active.classList.add('exit');
		this.element.style.animation = `fadeOutCarousel 0.4s`;
		this.is_closed = true;
	}
	createButtons() {
		return [];
	}

	getActive() {
		return this.element.querySelector('.slides > .shown');
	}
	buttonloaded() {
		const els = document.getElementsByClassName("ig-ed-status");
		if (els.length > 0) {
			this.btn_img_status = els[0];
			this.btn_img_status.innerHTML = this.btn_img_text;
		}
	}
	
	show_image_status(slide) {
		const [filename, image] = slideToImage(slide);
		this.btn_img_text = "name : " + filename + "<br>width : " + image.width + "px<br>height : " + image.height + "px";
		if (this.btn_img_status) this.btn_img_status.innerHTML = this.btn_img_text;
	}

	selectImage(slide) {
		let active = this.getActive();
		this.initializePanZoom(slide);

		if (this.is_enter) {
			slide.classList.add('enter');
			setTimeout(() => {
				slide.classList.remove('enter');
				this.is_enter = false;
				this.show_image_status(slide);
				this.buttonloaded();
			}, 410);
		}

		if (active) {
			active.classList.remove('shown');
			active._dot.classList.remove('active');
		}

		this.show_image_status(slide);
		slide.classList.add('shown');
		slide._dot.classList.toggle('active');
	}

	clickExit(e) {
		if (e.target.className == "comfy-carousel") {
			this.close();
		}
	}
	prevSlide(e) {
		e.preventDefault();
		let active = this.getActive();
		this.selectImage(active.previousElementSibling || active.parentNode.lastElementChild);
		e.stopPropagation();
	}
	nextSlide(e) {
		e.preventDefault();
		let active = this.getActive();
		this.selectImage(active.nextElementSibling || active.parentNode.firstElementChild);
		e.stopPropagation();
	}

	zoomInOut(e) {
		e.preventDefault();
		if (event.deltaY < 0) {
			this.zoom_ratio = Math.min(10.0, this.zoom_ratio + 0.2);
		} else {
			this.zoom_ratio = Math.max(0.2, this.zoom_ratio - 0.2);
		}
		this.invalidatePanZoom();
	}

	pointMoveEvent(event) {
		event.preventDefault();
		if (event.buttons == 1 || event.buttons == 4) {
			if (this.mousedown_x) {
				let deltaX = (this.mousedown_x - event.clientX) / this.zoom_ratio;
				let deltaY = (this.mousedown_y - event.clientY) / this.zoom_ratio;
				this.pan_x = this.mousedown_pan_x - deltaX;
				this.pan_y = this.mousedown_pan_y - deltaY;		
				this.invalidatePanZoom();
			}
		}
	}
	handlePointerDown(event) {
		if (event.buttons == 1 || event.buttons == 4) {
			this.mousedown_x = event.clientX;
			this.mousedown_y = event.clientY;
			this.mousedown_pan_x = this.pan_x;
			this.mousedown_pan_y = this.pan_y;
		}
	}
	handlePointerUp(event) {
		event.preventDefault();
		this.mousedown_x = null;
		this.mousedown_y = null;
	}

	initializePanZoom(active) {
		this.mousedown_x = null;
		this.mousedown_y = null;
		active.style.transform = `scale(${this.zoom_ratio}) translate(${this.pan_x}px, ${this.pan_y}px)`;
	}

	invalidatePanZoom() {
		let active = this.getActive();
		active.style.transform = `scale(${this.zoom_ratio}) translate(${this.pan_x}px, ${this.pan_y}px)`;
	}

	copyToClip(e) {
		let active = this.getActive();
		const slidess = [...active.parentNode.children];
		const imageIndex = slidess.indexOf(active);
		this.image_gallery_node.imageIndex = imageIndex;
		ComfyApp.copyToClipspace(this.image_gallery_node);
		ComfyApp.clipspace_return_node = null;
		this.image_gallery_node.setDirtyCanvas(true);
		let load_image_ed = app.graph._nodes.find((n) => n.type === "Load Image 💬ED");
		if (load_image_ed) {
			ComfyApp.pasteFromClipspace(load_image_ed);
			show_message("Info", 'Copy image to Load Image 💬ED');
		}else{
			show_message("Info", 'Copy image to clip space');
		}
		this.close();
		e.stopPropagation();
	}

	copyToRegScript(e) {
		let active = this.getActive();
		const slidess = [...active.parentNode.children];
		const imageIndex = slidess.indexOf(active);
		this.image_gallery_node.imageIndex = imageIndex;
		ComfyApp.copyToClipspace(this.image_gallery_node);
		ComfyApp.clipspace_return_node = null;
		this.image_gallery_node.setDirtyCanvas(true);
		const [filename, image] = slideToImage(active);
		find_script_load_image(image.width, image.height);
		this.close();
		e.stopPropagation();
	}


	openMaskEditor(e) {
		let active = this.getActive();
		const slidess = [...active.parentNode.children];
		const imageIndex = slidess.indexOf(active);
		this.image_gallery_node.imageIndex = imageIndex;
		ComfyApp.copyToClipspace(this.image_gallery_node);
		ComfyApp.clipspace_return_node = this.image_gallery_node;
		this.image_gallery_node.setDirtyCanvas(true);
		this.close();
		ComfyApp.open_maskeditor();
		e.stopPropagation();
	}

	onKeydown(e) {
		if (e.key == "Escape")
			this.close();
		else if (e.key == "ArrowLeft" || e.key == "q" || e.key == "Q")
			this.prevSlide(e);
		else if (e.key == "ArrowRight" || e.key == "e" || e.key == "E")
			this.nextSlide(e);
		else if (e.key == "ArrowUp") {
			this.zoom_ratio = Math.min(10.0, this.zoom_ratio + 0.2);
			this.invalidatePanZoom();
		} else if (e.key == "ArrowDown") {
			this.zoom_ratio = Math.max(0.2, this.zoom_ratio - 0.2);
			this.invalidatePanZoom();
		} else if (e.key == "a" || e.key == "A") {
			this.pan_x = this.pan_x - 20;
			this.invalidatePanZoom();
		} else if (e.key == "d" || e.key == "D") {
			this.pan_x = this.pan_x + 20;
			this.invalidatePanZoom();
		} else if (e.key == "w" || e.key == "W") {
			this.pan_y = this.pan_y - 20;
			this.invalidatePanZoom();
		} else if (e.key == "s" || e.key == "S") {
			this.pan_y = this.pan_y + 20;
			this.invalidatePanZoom();
		} else if (!this.is_load_image_node && (e.key == " " || e.key == "Spacebar" || e.key == 32 || e.key == "C" || e.key == "c"))
			this.copyToClip(e);
		else if (this.is_load_image_node && (e.key == "M" || e.key == "m"))
			this.openMaskEditor(e);
	}

	show(images, activeIndex, node) {
		let slides = [];
		let dots = [];

		this.is_enter = true;
		this.is_closed = false;
		this.btn_img_status = null;
		this.btn_img_text = "";
		this.image_gallery_node = node;
		this.is_load_image_node = node.type.includes("Load Image") || node.type.includes("LoadImage");
		this.regional_script = app.graph._nodes.find((n) => n.type.includes("Regional Script 💬ED"));
		this.zoom_ratio = 1.0;
		this.pan_x = 0;
		this.pan_y = 0;

		for (let image of images) {
			let slide = image.cloneNode(true);
			slide.draggable = false;
			slides.push(slide);

			let dot = image.cloneNode(true);
			dot.addEventListener('click', (e) => {
				this.selectImage(slide);
				e.stopPropagation();
			}, true);
			slide._dot = dot;
			dots.push(dot);

			if (slides.length - 1 === activeIndex) {
				this.selectImage(slide);
			}
		}

		const createButton = (className, iconClassName, eventHandler) => 
			$el(`button.${className}`, {
				$: (el) => el.addEventListener('click', eventHandler)
			}, iconClassName ? [$el(`icon.${iconClassName}`, {})] : []);

		const carouselContent = [
			$el("div.slides", {
				$: (el) => {
					el.addEventListener('pointermove', (e) => this.pointMoveEvent(e));
					el.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
					el.addEventListener('pointerup', (e) => this.handlePointerUp(e));
				},
			}, slides),
			$el("div.dots", {}, dots),
			createButton("ig-ed-status", null, () => {}),
			createButton("ig-ed-prev", "ig-ed-prev-icon", (e) => this.prevSlide(e)),
			createButton("ig-ed-next", "ig-ed-next-icon", (e) => this.nextSlide(e)),
			createButton("ig-ed-close", "ig-ed-close-icon", (e) => this.close()),
		];

		if (this.is_load_image_node) {
			carouselContent.push(createButton("ig-ed-maskedit", "ig-ed-maskedit-icon", (e) => this.openMaskEditor(e)));
		} else {
			carouselContent.push(createButton("ig-ed-copy", "ig-ed-copy-icon", (e) => this.copyToClip(e)));
		}
		if (this.regional_script){
			carouselContent.push(createButton("ig-ed-multi_paste", "ig-ed-multi_paste-icon", (e) => this.copyToRegScript(e)));
		}

		const carousel = $el("div.comfy-carousel-box", {}, carouselContent);
		super.show(carousel);

		document.addEventListener("keydown", this.onKeydown);
		document.activeElement?.blur();
	}
}

app.registerExtension({
	name: "Comfy.ImageGallery",
	init() {
		app.ui.carousel = new ComfyCarousel();
	},
	beforeRegisterNodeDef(nodeType, nodeData) {
		function isImageClick(node, pos) {
			// This follows the logic of getImageTop() in ComfyUI
			let imageY;
			if (node.imageOffset)
				imageY = node.imageOffset;
			else if (node.widgets?.length) {
				const widget = node.widgets[node.widgets.length - 1];
				imageY = widget.last_y;
				if (widget.computeSize)
					imageY += widget.computeSize()[1] + 4;
				else if (widget.computedHeight)
					imageY += widget.computedHeight;
				else
					imageY += LiteGraph.NODE_WIDGET_HEIGHT + 4;
			} else
				imageY = node.computeSize()[1];

			return pos[1] >= imageY;
		}

		const origOnDblClick = nodeType.prototype.onDblClick;
		nodeType.prototype.onDblClick = function(e, pos, ...args) {
			if (this.imgs && this.imgs.length && isImageClick(this, pos)) {
				let imageIndex = 0;
				if (this.imageIndex !== null)
					imageIndex = this.imageIndex;
				else if (this.overIndex !== null)
					imageIndex = this.overIndex;
				app.ui.carousel.show(this.imgs, imageIndex, this);
			}

			if (origOnDblClick)
				origOnDblClick.call(this, e, pos, ...args);
		}
	},
});