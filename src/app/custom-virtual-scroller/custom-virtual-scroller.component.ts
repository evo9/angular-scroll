import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  SimpleChanges,
  AfterViewChecked,
  Renderer2,
  NgZone, OnDestroy, ContentChild, DoCheck,
} from '@angular/core';

@Component({
  selector: 'app-custom-virtual-scroller',
  templateUrl: './custom-virtual-scroller.component.html',
  styleUrls: ['./custom-virtual-scroller.component.scss'],
})
export class CustomVirtualScrollerComponent implements OnChanges, OnInit, OnDestroy {

  @ViewChild('spacer', { static: false }) spacer: ElementRef<HTMLDivElement>;
  @ViewChild('scrollContainer', { static: false }) scrollContainerElementRef: ElementRef<HTMLDivElement>;
  @ContentChild('container', {static: false}) containerElementRef: ElementRef<HTMLDivElement>;

  @Input() initialItems: Array<any>;
  @Input() set prepend(items) {
    items.forEach(item => {
      this.items.unshift(item);
    });
  }

  public items: Array<any>;
  private _scrollHandler: any;

  constructor(
    private _element: ElementRef,
    private _renderer: Renderer2,
    private _zone: NgZone
  ) { }

  ngOnInit(): void {
    this._addScrollEventListeners();
    // const timer = setInterval(() => {
    //   if (this.scrollContainerElementRef) {
    //     clearInterval(timer);
    //
    //     this._renderer.setStyle(this.spacer.nativeElement, 'transform', `scaleY(10000)`)
    //     this._renderer.setStyle(this.scrollContainerElementRef.nativeElement, 'transform', `translateY(0px)`)
    //
    //     // const children = this.content.nativeElement.children;
    //     // for (let i = 0; i < children.length; i++) {
    //     //   const rect = children[i].getBoundingClientRect();
    //     // }
    //   }
    // }, 50);
  }

  ngOnDestroy() {
    this._removeScrollEventListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialItems']) {
      this.items = [...this.initialItems];
      console.log('changes')

      if (this.items.length) {
        const element = this._getScrollElement();
        console.log(element.clientHeight);

        setTimeout(() => {
          const scrollHeight = element.scrollHeight;
          element.scrollTop = scrollHeight;
        }, 100);
        this._calculateViewport();
      }
    }
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _addScrollEventListeners(): void {
    this._zone.runOutsideAngular(() => {
      this._scrollHandler = this._renderer.listen(this._getScrollElement(), 'scroll', this._onScroll)
    });
  }

  private _removeScrollEventListeners(): void {
    this._scrollHandler = undefined;
  }

  private _onScroll(): void {
    // this.initialItems
  }

  private _getScrollElement(): any {
    return this._element.nativeElement;
  }

  private _calculateViewport(): void {
    if (this.scrollContainerElementRef) {
      const children = this.scrollContainerElementRef.nativeElement.children;
      console.log(children);
      // console.log(children.length);
      // for (let i = 0; i < children.length; i++) {
      //   console.log(children[i].getBoundingClientRect())
      // }
    }
  }
}
