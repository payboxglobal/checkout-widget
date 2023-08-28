/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface PayboxCheckoutWidget {
        "amount": number;
        "btntext": string;
        "colour": string;
        "curreny": string;
        "merchant_key": string;
        "phone_number": string;
    }
}
export interface PayboxCheckoutWidgetCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLPayboxCheckoutWidgetElement;
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLPayboxCheckoutWidgetElement extends Components.PayboxCheckoutWidget, HTMLStencilElement {
    }
    var HTMLPayboxCheckoutWidgetElement: {
        prototype: HTMLPayboxCheckoutWidgetElement;
        new (): HTMLPayboxCheckoutWidgetElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "paybox-checkout-widget": HTMLPayboxCheckoutWidgetElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface PayboxCheckoutWidget {
        "amount"?: number;
        "btntext"?: string;
        "colour"?: string;
        "curreny"?: string;
        "merchant_key"?: string;
        "onDidReset"?: (event: PayboxCheckoutWidgetCustomEvent<any>) => void;
        "phone_number"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "paybox-checkout-widget": PayboxCheckoutWidget;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "paybox-checkout-widget": LocalJSX.PayboxCheckoutWidget & JSXBase.HTMLAttributes<HTMLPayboxCheckoutWidgetElement>;
        }
    }
}
