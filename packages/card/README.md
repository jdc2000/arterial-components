# Arterial Card

[Another React Material Card](https://arterialjs.org/cards)

## Installation

```zsh
npm install @arterial/card
```

## Usage

### Styles

#### Sass

```scss
@use '@material/card/index.scss' as card;
@include card.core-styles;
```

#### CSS

```jsx
import '@material/card/dist/mdc.card.css';
```

### JSX

```jsx
import { Card, CardPrimaryAction, CardActions, ... } from '@arterial/card';
```

## Elevated Card

A shadow helps indicate a card.

```jsx
<Card>
  <div className="primary-title">
    <div className="title">Card title</div>
    <div className="subtitle">Secondary text</div>
  </div>
</Card>
```

## Outlined Card

An outline helps indicate a card.

```jsx
<Card outlined>
  <div className="primary-title">
    <div className="title">Card title</div>
    <div className="subtitle">Secondary text</div>
  </div>
</Card>
```

## Other Variants

### Primary Action

The primary action area of a card is typically the card itself. Often cards are one large touch target to a detail screen on a subject.

```jsx
<Card>
  <CardPrimaryAction>
    <div className="primary-title">
      <div className="title">Card title</div>
      <div className="subtitle">Secondary text</div>
    </div>
  </CardPrimaryAction>
</Card>
```

### Supplemental Actions

Supplemental actions are represented by icons, text, and UI controls on cards. They are typically placed at the bottom of the card.

```jsx
<Card>
  <CardPrimaryAction>
    <div className="primary-title">
      <div className="title">Card title</div>
      <div className="subtitle">Secondary text</div>
    </div>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardActionButton label="Action 1" />
      <CardActionButton label="Action 2" />
    </CardActionButtons>
    <CardActionIcons>
      <CardActionIcon icon="favorite" />
      <CardActionIcon icon="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

### Rich Media

This area is used for showing rich media in cards, and optionally as a container.

```jsx
<Card>
  <CardPrimaryAction>
    <CardMedia className="rich-media" sixteenByNine />
    <div className="primary-title">
      <div className="title">Card title</div>
      <div className="subtitle">Secondary text</div>
    </div>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardActionButton label="Action 1" />
      <CardActionButton label="Action 2" />
    </CardActionButtons>
    <CardActionIcons>
      <CardActionIcon icon="favorite" />
      <CardActionIcon icon="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

### Rich Media Content

```jsx
<Card>
  <CardPrimaryAction>
    <CardMedia className="rich-media" sixteenByNine>
      <CardMediaContent className="rich-media__content">
        <div className="primary-title">
          <div className="title">Card title</div>
          <div className="subtitle">Secondary text</div>
        </div>
      </CardMediaContent>
    </CardMedia>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardActionButton label="Action 1" />
      <CardActionButton label="Action 2" />
    </CardActionButtons>
    <CardActionIcons>
      <CardActionIcon icon="favorite" />
      <CardActionIcon icon="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

### Header

```jsx
<Card>
  <CardPrimaryAction>
    <CardMedia className="rich-media" sixteenByNine />
    <div className="header">
      <div className="thumbnail" />
      <div className="primary-title">
        <div className="title">Card title</div>
        <div className="subtitle">Secondary text</div>
      </div>
    </div>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardActionButton label="Action 1" />
      <CardActionButton label="Action 2" />
    </CardActionButtons>
    <CardActionIcons>
      <CardActionIcon icon="favorite" />
      <CardActionIcon icon="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

### Supporting Text

```jsx
<Card>
  <CardPrimaryAction>
    <CardMedia className="rich-media" sixteenByNine />
    <div className="primary-title">
      <div className="title">Card title</div>
      <div className="subtitle">Secondary text</div>
    </div>
    <div className="supporting-text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
  </CardPrimaryAction>
  <CardActions>
    <CardActionButtons>
      <CardActionButton label="Action 1" />
      <CardActionButton label="Action 2" />
    </CardActionButtons>
    <CardActionIcons>
      <CardActionIcon icon="favorite" />
      <CardActionIcon icon="share" />
    </CardActionIcons>
  </CardActions>
</Card>
```

## Props

### Card

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| outlined  | boolean          | Enables an outlined variant.                                 |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardPrimaryAction

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardMedia

| Name            | Type             | Description                                                           |
| --------------- | ---------------- | --------------------------------------------------------------------- |
| backgroundImage | string           | Path to the image of the root element.                                |
| children        | node             | Elements to be displayed within root element.                         |
| className       | string           | Classes to be applied to the root element.                            |
| sixteenByNine   | boolean          | Scales the height of the image maintaining a 16:9 aspect ratio.       |
| square          | boolean          | Scales the height of the image to be equal to the width of the image. |
| tag             | string \| object | HTML tag to be applied to the root element. Defaults to div.          |

### CardMediaContent

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardActions

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| fullBleed | boolean          | Enables full bleed card actions row by removing all padding. |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardActionButtons

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardActionButton

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardActionIcons

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |

### CardActionIcon

| Name      | Type             | Description                                                  |
| --------- | ---------------- | ------------------------------------------------------------ |
| children  | node             | Elements to be displayed within root element.                |
| className | string           | Classes to be applied to the root element.                   |
| tag       | string \| object | HTML tag to be applied to the root element. Defaults to div. |
