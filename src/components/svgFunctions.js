import {SVG} from '@svgdotjs/svg.js';
import {splitGradientString} from './helpers';

const drawSVGOverlay = (element) => {
  const styles = element.styles;
  const svg = SVG().addTo('.adCreatePreview__svgs').size(parseInt(styles.width) + 10, parseInt(styles.height) + 10);
  const rotate = parseInt(styles.transform.substring(styles.transform.indexOf('(') + 1));

  svg
    .image(element.image.url)
    .size(styles.width, styles.height)
    .move(5, 5)
    .transform({
      rotate: rotate,
    })
}

const drawSVGButton = (element) => {
  const styles = element.styles;
  const svg = SVG().addTo('.adCreatePreview__svgs').size(parseInt(styles.width) + 10, parseInt(styles.height) + 10);

  const elementBackground = getElementBackground(svg, styles['background'], parseInt(styles.width), parseInt(styles.height));

  svg.rect('#myRect')
    .size(styles.width, styles.height)
    .radius(styles['border-radius'])
    .move(5, 5)
    .fill({ color: elementBackground, opacity: 1 })
    .stroke({ color: styles['border-color'], opacity: styles['border-opacity'], width: styles['border-width']})
    .attr({
      id:'#myRect'
    })

  svg.style().font('Mathechester', `url(${process.env.PUBLIC_URL + '/Mathechester.ttf'})`)

  const text = svg.text(element.text)
    .size(styles.width, styles.height)
    .fill(styles.color)
    .leading(0.9)
    .font({
      family: styles['font-family'],
      size: styles['font-size'],
      weight: styles['font-weight'],
      anchor: 'middle',
    })

  const textHeight = text.node.getBBox().height;
  const textWidth = text.node.getBBox().width;

  text.move(parseInt(styles.width) / 2 - textWidth / 2, parseInt(styles.height) / 2 - textHeight / 2)
}

const getElementBackground = (svg, background, width, height) => {
  if (background.includes('gradient')) {
    const [gradientType, gradientAnglePoint, gradientPalettes] = splitGradientString(background);

    const anglePI = parseInt(gradientAnglePoint) * (Math.PI / 180);
    const angleCoords = {
      x1: (Math.round(50 + Math.sin(anglePI) * 50) * width) / 100,
      y1: (Math.round(50 + Math.cos(anglePI) * 50) * height) / 100,
      x2: (Math.round(50 + Math.sin(anglePI + Math.PI) * 50) * width) / 100,
      y2: (Math.round(50 + Math.cos(anglePI + Math.PI) * 50) * height) / 100,
    }

    const gradient = svg
      .gradient(gradientType, (add) => {
        gradientPalettes.forEach((palette) => {
          add.stop((palette.position / 100), palette.color);
        });
      })
      .attr({
        gradientTransform: `rotate(${parseInt(gradientAnglePoint)})`,
        gradientUnits: 'userSpaceOnUse',
      })
      .from(angleCoords.x1, angleCoords.y1)
      .to(angleCoords.x2, angleCoords.y2)

    return gradient;
  } else {
    return background;
  }
}