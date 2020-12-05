import {useState} from 'react';
import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardMediaContent,
  CardActions,
  CardActionButtons,
  CardActionButton,
  CardActionIcons,
  CardActionIcon,
} from '..';

export const Meta = {title: 'Card'};
export default Meta;

function MyCardPrimary({mediaContent}) {
  return (
    <div style={{padding: '1rem'}}>
      <h2
        style={{
          color: mediaContent ? 'white' : undefined,
          fontFamily: 'Roboto,sans-serif',
          fontWeight: '500',
          fontSize: '1.25rem',
          letterSpacing: '.0125em',
          lineHeight: '2rem',
          margin: 0,
          textDecoration: 'inherit',
          textTransform: 'inherit',
        }}
      >
        Our Changing Planet
      </h2>
      <h3
        style={{
          color: mediaContent
            ? 'white'
            : 'var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54))',
          fontFamily: 'Roboto,sans-serif',
          fontSize: '.875rem',
          fontWeight: '500',
          letterSpacing: '.0071428571em',
          lineHeight: '1.375rem',
          margin: 0,
          textDecoration: 'inherit',
          textTransform: 'inherit',
        }}
      >
        by Kurt Wagner
      </h3>
    </div>
  );
}
function MyCardSecondary({header}) {
  const paddingTop = header ? '1rem' : 0;
  return (
    <div
      style={{
        color: 'var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54))',
        fontFamily: 'Roboto,sans-serif',
        fontSize: '.875rem',
        fontWeight: '400',
        letterSpacing: '.0178571429em',
        lineHeight: '1.25rem',
        margin: 0,
        padding: '0 1rem 8px',
        textDecoration: 'inherit',
        textTransform: 'inherit',
        paddingTop,
      }}
    >
      Visit ten places on our planet that are undergoing the biggest changes
      today.
    </div>
  );
}
function MyCard({
  buttonsOnly,
  header,
  iconsOnly,
  mediaContent,
  noActions,
  noMedia,
  square,
}) {
  const [on, setOn] = useState(false);
  let width = '350px';
  return (
    <div>
      <Card style={{width}}>
        {header && !mediaContent && <MyCardPrimary />}
        <CardPrimaryAction>
          {!noMedia && (
            <CardMedia
              sixteenByNine={!square}
              square={square}
              backgroundImage="https://material-components.github.io/material-components-web-catalog/static/media/photos/3x2/2.jpg"
            >
              {mediaContent && (
                <CardMediaContent style={{top: mediaContent ? 'initial' : 0}}>
                  <MyCardPrimary mediaContent />
                </CardMediaContent>
              )}
            </CardMedia>
          )}
          {!header && !mediaContent && <MyCardPrimary />}
          <MyCardSecondary header={header || mediaContent} />
        </CardPrimaryAction>
        {!noActions && (
          <CardActions>
            {!iconsOnly && (
              <CardActionButtons>
                <CardActionButton label="Read" />
                <CardActionButton label="Bookmark" />
              </CardActionButtons>
            )}
            {!buttonsOnly && (
              <CardActionIcons>
                <CardActionIcon
                  icon="favorite_border"
                  onIcon="favorite"
                  on={on}
                  onClick={() => setOn(!on)}
                />
                <CardActionIcon icon="share" />
                <CardActionIcon icon="more_vert" />
              </CardActionIcons>
            )}
          </CardActions>
        )}
      </Card>
    </div>
  );
}

export const Basic = () => <MyCard />;
export const WithHeader = () => <MyCard header />;
export const WithMediaText = () => <MyCard mediaContent />;
export const WithButtonsOnly = () => <MyCard buttonsOnly />;
export const WithIconsOnly = () => <MyCard iconsOnly />;
export const WithoutActions = () => <MyCard noActions />;
export const WithoutMedia = () => <MyCard noMedia />;
export const WithSquareMedia = () => <MyCard square />;
