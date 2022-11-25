import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[Gallery]'
})

export class GalleryDirective{

  constructor(private e: ElementRef){
  }

  @HostListener("click")
    imageChange(){
      var src:any = this.e.nativeElement.src
      var prev:any = document.getElementById("preview")
      prev.src = src
      var imageSlide = document.getElementsByClassName("sideimg")
      for(let i = 0 ; i < imageSlide.length ; i++){
        imageSlide[i].classList.remove("active")
      }
      this.e.nativeElement.classList.add("active")
    }
}
