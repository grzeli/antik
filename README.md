antik code challenge - react package

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

## Installation:
```bash
npm i antik-code-challenge
```

or

```bash
yarn add antik-code-challenge
```

## Usage :

Add 'AntikCodeChallenge' to your component:
```js
import { AntikCodeChallenge } from 'antik-code-challenge';

<>
  <AntikCodeChallenge
    productId={'123456'}
    price={45.99}
    currency={'€'}
    title={'Example title'}
    description={'Example description'}
    image={'https://placebear.com/g/200/200'}
    imageAlt='Example image alt'
  />
</>
```

## Models :

```js
interface AntikCodeChallengeProps {
    productId: string;
    price: number;
    currency: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    defaultButtonProps?: ButtonProps;
    modalProps?: ModalProps;
    customButton?: ReactNode;
}
```

Rich variety of possible customization:
property "defaultButtonProps" gives possibility to customize button which initializes AntikCodeChallenge modal,
if someone would like to use own initializing button, then "defaultButtonProps" property should persist undefined and "customButton" should be provided with desired button

```js
interface ButtonProps {
    label: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fontSize?: string;
    margin?: string;
    padding?: string;
    backgroundColor?: string;
    borderRadius?: string;
    lineHeight?: string;
    textColor?: string;
    fontFamily?: string;
    fontWeight?: string;
    boxShadow?: string;
    border?: string;
    backgroundOnHover?: string;
    display?: string;
    position?: string;
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
    justifyContent?: string;
    width?: string;
}
```

There is also possibility to customize AntikCodeChallenge modal, by providing desired styles to "modalProps" property

```js
interface ModalProps {
  position?: string;
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  display?: string;
  width?: string;
  minHeight?: string;
  backgroundColor?: string;
  animation?: string | boolean;
  padding?: string;
  withCloseIcon?: boolean;
  justifyContent?: string;
  flexDirection?: string;
  alignItems?: string;
  textAlign?: string;
}
```


[npm-url]: https://www.npmjs.com/package/antik-code-challenge
[npm-image]: https://img.shields.io/npm/v/antik-code-challenge
[github-license]: https://img.shields.io/github/license/grzeli/antik-code-challenge
[github-license-url]: https://github.com/grzeli/antik-code-challenge/blob/master/LICENSE
[github-build]: https://github.com/grzeli/antik-code-challenge/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/grzeli/antik-code-challenge/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/antik-code-challenge
