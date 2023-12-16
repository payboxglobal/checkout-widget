[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# PayBox Widgets

This is a project containing the PayBox checkout and donation widgets

## Using The Widgets

There are three strategies we recommend for using the widgets.

### HTML Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/paybox-widgets@x.x.x/dist/checkout-widget/checkout-widget.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc like in the examples below

#### Donation Widget Example

```HTML
<!-- Donation Widget Example -->
<paybox-donation-widget merchant_key="<merchant_collection_key>" payer_name="John Doe" payer_phone="+233xxxxxxxxx" email="john.doe@gmail.com"></paybox-donation-widget>
```

#### Checkout Widget Example
```HTML
<!-- Checkout Widget Example -->
<paybox-checkout-widget merchant_key="<merchant_collection_key>" payer_name="John Doe" payer_phone="+233xxxxxxxxx" email="john.doe@gmail.com" amount="1" currency="GHS"></paybox-checkout-widget>
```

### Node Modules
- Run `npm install my-component --save`
- Put a script tag similar to this `<script type='module' src='https://unpkg.com/paybox-widgets@x.x.x/dist/checkout-widget/checkout-widget.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc

## For Development

To make changes to this project, clone this repo to a new directory:

```bash
git clone https://github.com/payboxglobal/checkout-widget.git checkout-widget
cd checkout-widget
git remote rm origin
```

and run:

```bash
npm install
```

You can then make code changes.

To start the project run:
```bash
npm start
```

To build the project for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```
