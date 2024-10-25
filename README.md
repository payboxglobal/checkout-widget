[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)

# Table of Contents
1. [Introduction](#paybox-widgets)
2. [Set Up](#before-using-the-widgets)
3. [Using The Widgets](#using-the-widgets)
4. [For Development](#for-development)
5. [Widget Properties](#widget-properties)
6. [PayBox REST API](#rest-api)


## PayBox Widgets

This project contains the PayBox checkout and donation widgets. Support

## Before using the widgets
1. Sign up on [paybox.com.co](https://paybox.com.co/register)
2. After verifying your account via email, head to your [dashboard](https://paybox.com.co/widget) then click on 'API/Widget' on the sidebar
3. You should see your **COLLECTION_KEY** (Not to be mistaken with the 'transfer_key') in the 'Bearer Tokens' section. You will need these tokens when using the PayBox widgets and API.

## Using The Widgets

The recommended way to use the widgets:

### HTML script tag (recommended)

- Add the script tag to your HTML head like so `<script type='module' src='https://unpkg.com/paybox-widgets@x.x.x/dist/checkout-widget/checkout-widget.esm.js'></script>`. Replace x.x.x with the current package version found [here](https://www.npmjs.com/package/paybox-widgets).
- Then you can use the element anywhere in your template like in the examples below. The description of the widget properties can be found [here](#widget-properties)

#### Donation Widget Example

```HTML
<!-- Donation Widget Example -->
<paybox-donation-widget merchant_key="<merchant_collection_key>" payer_name="John Doe" payer_phone="+233xxxxxxxxx" email="john.doe@gmail.com"></paybox-donation-widget>
```

#### Checkout Widget Example
```HTML
<!-- Checkout Widget Example -->
<paybox-checkout-widget merchant_key="<merchant_collection_key>" payer_name="John Doe" payer_phone="+233xxxxxxxxx" email="john.doe@gmail.com" amount="1" currency="GHS" reload></paybox-checkout-widget>
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


## Widget Properties
Some of these properties are needed to initiate a payment on the widgets, others will be sent as additional data to the callback URL set on your PayBox [dashboard](https://paybox.com.co/widget).

| Property                    | Data type | Description                                                                                                                  | Included in payload |
|-----------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------|---------------------|
| merchant key                | string    | Your **PayBox** merchant collection key                                                                                                                    | No                  |
| amount                      | number    | Amount of money being with drawn                                                                                             | Yes                 |
| phone_number (optional)     | string    | Phone number to send payment status to (Not payer Mobile Money number)                                                       | No                  |
| payer_name (optional)       | string    | Name of the payer                                                                                                            | No                  |
| currency                    | string    | The currency in which the payment is made (e.g., USD, EUR)                                                                   | No                  |
| payload (optional)          | string    | Additional data sent along with the payment request.                                                                         | Yes                 |
| reload (optional)           | boolean   | Indicates if the payment process should trigger a reload (false by default)                                                  | No                  |
| redirect_url (optional)     | string    | URL to redirect to after the payment is completed                                                                            | No                  |
| order_id (optional)         | string    | Unique identifier for the order associated with the payment.                                                                 | Yes                 |
| customer_id (optional)      | string    | Unique identifier for the customer making the payment.                                                                       | Yes                 |
| email (optional)            | string    | Email of the payer                                                                                                           | Yes                 |
| payer_phone                 | string    | The phone number from which Mobile Money payments will be initiated if the Mobile Money payment option is selected in the UI | Yes                 |


## REST API
If you prefer to use the API's directly for collections and transfers, here is a link to the [Postman collection](https://documenter.getpostman.com/view/24064276/2s8YsnYwRA#2b183506-79e0-48ba-bde0-63cd60e4d370).


<div style="border: 2px solid #007BFF; padding: 10px; max-width: 400px; margin: auto;">
    Need more assistance? Contact us at: 
    <a href="mailto:philip@paybox.com.co" style="font-weight: bold; color: #007BFF;">philip@paybox.com.co</a>
</div>