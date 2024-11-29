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
    content: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' class='p-icon p-galleria-prev-icon' aria-hidden='true' data-pc-section='previcon'%3E%3Cpath d='M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z' fill='white'%3E%3C/path%3E%3C/svg%3E");
    left: 18px;
}

.comfy-carousel-box .next:before {
    content: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' class='p-icon p-galleria-next-icon' aria-hidden='true' data-pc-section='nexticon'%3E%3Cpath d='M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z' fill='white'%3E%3C/path%3E%3C/svg%3E");
    right: 18px;
}

.comfy-carousel-box .close:before {
	color: #fff;
	position: absolute;
    content: url("data:image/svg+xml,%3Csvg width='25' height='25' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg' class='p-icon p-galleria-close-icon' aria-hidden='true' data-pc-section='closeicon'%3E%3Cpath d='M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z' fill='white'%3E%3C/path%3E%3C/svg%3E");
	top: 18px;
    right: 18px;
    cursor: pointer;
}

.comfy-carousel-box .copy:before {
	color: #fff;
    font-size: 50px;
	position: absolute;
    content: '📇';
	bottom: 6%;
    right: 6%;
    cursor: pointer;
}

.comfy-carousel-box .maskedit:before {
	color: #fff;
    font-size: 50px;
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
	if(event.buttons == 1 || event.buttons == 4) {
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
