import { app } from "/scripts/app.js";
import { $el, ComfyDialog } from "/scripts/ui.js";
import { ComfyApp } from "../../scripts/app.js";

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

.comfy-carousel-box .prev:before,
.comfy-carousel-box .next:before {
    color: #fff;
    font-size: 100px;
    position: absolute;
    top: 35%;
    cursor: pointer;
}

.comfy-carousel-box .prev:before {
    content: '❮';
    left: 0;
}

.comfy-carousel-box .next:before {
    content: '❯';
    right: 0;
}

.comfy-carousel-box .close:before {
	color: #fff;
    font-size: 100px;
	position: absolute;
    content: '×';
	top: 0;
    right: 0;
    cursor: pointer;
}

.comfy-carousel-box .copy:before {
	color: #fff;
    font-size: 65px;
	position: absolute;
    content: '📇';
	bottom: 6%;
    right: 6%;
    cursor: pointer;
}

.comfy-carousel-box .maskedit:before {
	color: #fff;
    font-size: 65px;
	position: absolute;
    content: '🖌️';
	bottom: 6%;
    right: 6%;
    cursor: pointer;
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

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

class ComfyCarousel extends ComfyDialog {
  constructor() {
    super();
    this.element.classList.remove("comfy-modal");
    this.element.classList.add("comfy-carousel");
    //this.element.addEventListener('click', (e) => {  });
	this.element.addEventListener('wheel', (e) => this.zoomInOut(e));
	//this.element.addEventListener('pointermove', (e) => this.pointMoveEvent(e));
	this.element.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
	this.element.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    this.onKeydown = this.onKeydown.bind(this);
  }
  createButtons() {
    return [];
  }
  getActive() {
    return this.element.querySelector('.slides > .shown');
  }
  selectImage(slide) {
    let active = this.getActive();
	this.initializePanZoom(slide);
    if (active) {	  
      active.classList.remove('shown');
      active._dot.classList.remove('active');
    }

    slide.classList.add('shown');
    slide._dot.classList.toggle('active');
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
	if(event.deltaY < 0) {
		this.zoom_ratio = Math.min(10.0, this.zoom_ratio+0.2);
		//console.log("this.zoom_ratio:" + this.zoom_ratio);
	}
	else {
		this.zoom_ratio = Math.max(0.2, this.zoom_ratio-0.2);
		//console.log("this.zoom_ratio:" + this.zoom_ratio);
	}
  this.invalidatePanZoom();
  } 
  
  pointMoveEvent(event) {
	event.preventDefault();
	if(event.buttons == 1) {
		if(this.mousedown_x) {
			let deltaX = (this.mousedown_x - event.clientX) / this.zoom_ratio;
			let deltaY = (this.mousedown_y - event.clientY) / this.zoom_ratio;
			this.pan_x = this.mousedown_pan_x - deltaX;
			this.pan_y = this.mousedown_pan_y - deltaY;			
			// console.log("this.pan_x:" + this.pan_x);
			// console.log("this.pan_y:" + this.pan_y);			
			this.invalidatePanZoom();
		}
	}
  }  
  handlePointerDown(event) {
	if (event.buttons == 1) {
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
  
  initializePanZoom(active){
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
	//console.log("ED_log image_index:" + imageIndex);
	image_gallery_node.imageIndex = imageIndex;
    ComfyApp.copyToClipspace(image_gallery_node);
	ComfyApp.clipspace_return_node = null;
	image_gallery_node.setDirtyCanvas(true);
	let load_image_ed = app.graph._nodes.find((n) => n.type === "Load Image 💬ED");
	if (load_image_ed) ComfyApp.pasteFromClipspace(load_image_ed);
	
	this.close();
    e.stopPropagation();
  }

  openMaskEditor(e) {
    let active = this.getActive();
	const slidess = [...active.parentNode.children];
    const imageIndex = slidess.indexOf(active);	
	//console.log("ED_log image_index:" + imageIndex);
	image_gallery_node.imageIndex = imageIndex;
    ComfyApp.copyToClipspace(image_gallery_node);
	ComfyApp.clipspace_return_node = image_gallery_node;
	image_gallery_node.setDirtyCanvas(true);
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
	else if (e.key == "ArrowUp"){
      this.zoom_ratio = Math.min(10.0, this.zoom_ratio+0.2);
	  this.invalidatePanZoom();
	}
    else if (e.key == "ArrowDown"){
      this.zoom_ratio = Math.max(0.2, this.zoom_ratio-0.2);
      this.invalidatePanZoom();
	}
	else if (e.key == "a"|| e.key == "A"){
		this.pan_x = this.pan_x - 20;
	  this.invalidatePanZoom();
	}
    else if (e.key == "d"|| e.key == "D"){
		this.pan_x = this.pan_x + 20;
	  this.invalidatePanZoom();
	}
	else if (e.key == "w"|| e.key == "W"){
		this.pan_y = this.pan_y - 20;
	  this.invalidatePanZoom();
	}
    else if (e.key == "s"|| e.key == "S"){
      this.pan_y = this.pan_y + 20;
      this.invalidatePanZoom();
	}
    else if (!is_load_image_node && (e.key == " " || e.key == "Spacebar" || e.key == 32 || e.key == "C" || e.key == "c"))
      this.copyToClip(e);
    else if (is_load_image_node && (e.key == "M" || e.key == "m"))
      this.openMaskEditor(e);
  }
  
  show(images, activeIndex) {
    let slides = [];
    let dots = [];
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

      if (slides.length - 1 == activeIndex)
        this.selectImage(slide);
    }
	
	let carousel;
	if (is_load_image_node) {
		carousel = $el("div.comfy-carousel-box", {  }, [
		$el("div.slides", { $: (el) => el.addEventListener('pointermove', (e) => this.pointMoveEvent(e)), }, slides),
		//$el("div.slides", {  }, slides),
		$el("div.dots", {  }, dots),
		$el("a.prev", { $: (el) => el.addEventListener('click', (e) => this.prevSlide(e)), }),
		$el("a.next", { $: (el) => el.addEventListener('click', (e) => this.nextSlide(e)), }),
		$el("a.close", { $: (el) => el.addEventListener('click', (e) => this.close()), }),
		//$el("a.copy", { $: (el) => el.addEventListener('click', (e) => this.copyToClip(e)), }),
		$el("a.maskedit", { $: (el) => el.addEventListener('click', (e) => this.openMaskEditor(e)), }),
		]);
	}
	else{
		carousel = $el("div.comfy-carousel-box", {  }, [
		$el("div.slides", { $: (el) => el.addEventListener('pointermove', (e) => this.pointMoveEvent(e)), }, slides),
		$el("div.dots", {  }, dots),
		$el("a.prev", { $: (el) => el.addEventListener('click', (e) => this.prevSlide(e)), }),
		$el("a.next", { $: (el) => el.addEventListener('click', (e) => this.nextSlide(e)), }),
		$el("a.close", { $: (el) => el.addEventListener('click', (e) => this.close()), }),
		$el("a.copy", { $: (el) => el.addEventListener('click', (e) => this.copyToClip(e)), }),
		]);
	}
	
    super.show(carousel);

    document.addEventListener("keydown", this.onKeydown);
    document.activeElement?.blur();
  }
  close() {
    document.removeEventListener("keydown", this.onKeydown);
    super.close();
  }
}

let image_gallery_node;
let is_load_image_node;

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
    nodeType.prototype.onDblClick = function (e, pos, ...args) {
      if (this.imgs && this.imgs.length && isImageClick(this, pos)) {
        let imageIndex = 0;
        if (this.imageIndex !== null)
          imageIndex = this.imageIndex;
        else if (this.overIndex !== null)
          imageIndex = this.overIndex;
        image_gallery_node = this;
		is_load_image_node = (image_gallery_node.type.indexOf("Load Image") != -1);
		app.ui.carousel.show(this.imgs, imageIndex);
      }

      if (origOnDblClick)
        origOnDblClick.call(this, e, pos, ...args);
    }
  },
});
