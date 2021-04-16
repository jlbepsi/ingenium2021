import {ComponentFactoryResolver, Inject, Injectable, Injector, NgZone, Renderer2, RendererFactory2} from '@angular/core';
import {Overlay, OverlayKeyboardDispatcher, OverlayPositionBuilder, OverlayRef, ScrollStrategyOptions} from '@angular/cdk/overlay';
import {DOCUMENT, Location} from '@angular/common';
import {Directionality} from '@angular/cdk/bidi';
import {DynamicOverlayContainer} from './DynamicOverlayContainer';
import {OverlayOutsideClickDispatcher} from '@angular/cdk/overlay/dispatchers/overlay-outside-click-dispatcher';


@Injectable({
    providedIn: 'root'
})
export class DynamicOverlay extends Overlay {
    private readonly dynamicOverlayContainer: DynamicOverlayContainer;
    private renderer: Renderer2;

    constructor(
        scrollStrategies: ScrollStrategyOptions,
        overlayContainer: DynamicOverlayContainer,
        componentFactoryResolver: ComponentFactoryResolver,
        positionBuilder: OverlayPositionBuilder,
        keyboardDispatcher: OverlayKeyboardDispatcher,
        injector: Injector,
        ngZone: NgZone,
        @Inject(DOCUMENT) document: any,
        directionality: Directionality,
        location: Location,
        outsideClickDispatcher: OverlayOutsideClickDispatcher,
        rendererFactory: RendererFactory2
    ) {
      super(
          scrollStrategies,
          overlayContainer,
          componentFactoryResolver,
          positionBuilder,
          keyboardDispatcher,
          injector,
          ngZone,
          document,
          directionality,
          location,
          outsideClickDispatcher
      );
  /**
   * Creates an overlay.
   * @param config Configuration applied to the overlay.
   * @returns Reference to the created overlay.
   */
      this.renderer = rendererFactory.createRenderer(null, null);
      this.dynamicOverlayContainer = overlayContainer;
    }

    private setContainerElement(containerElement: HTMLElement): void {
        this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
        this.dynamicOverlayContainer.setContainerElement(containerElement);
    }

    public createWithDefaultConfig(containerElement: HTMLElement): OverlayRef {
        this.setContainerElement(containerElement);
        return super.create({
            positionStrategy: this.position()
                .global()
                .centerHorizontally()
                .centerVertically(),
            hasBackdrop: true
        });
    }
}
