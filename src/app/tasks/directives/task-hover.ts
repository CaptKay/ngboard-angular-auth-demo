import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appTaskHover]'
})
export class TaskHover {
  @HostBinding('class.task-list__item--hover')
  isHovered = false

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.isHovered = true
  }
  
  @HostListener('mouseleave')
  handleMouseLeave() {
    this.isHovered = false
  }

  constructor() { }

}
