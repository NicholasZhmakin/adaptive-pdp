import cloneDeep from 'lodash/cloneDeep';


export const useLayerFunctions = (bannerItems, changeBannerItemStylesField, setBannerItems) => {

  const changeBannerItemLayerOrder = (bannerItem, value) => {
    const bannerIndexZ = Number(bannerItem.styles['z-index']);
    const cloneBannerItems = cloneDeep(bannerItems);

    switch (value) {
      case -1:
      case 1:
        const indexZOfAdjacentBannerItem = bannerIndexZ + value;
        const adjacentBannerItem = cloneBannerItems.find((item) => Number(item.styles['z-index']) === indexZOfAdjacentBannerItem);

        if (adjacentBannerItem) {
          changeBannerItemStylesField('z-index', indexZOfAdjacentBannerItem);
          adjacentBannerItem.styles['z-index'] = Number(adjacentBannerItem.styles['z-index']) - value;
        }
        break;
      case 'down':
        cloneBannerItems.forEach((bannerItem) => {
          if (Number(bannerItem.styles['z-index']) < bannerIndexZ) {
            bannerItem.styles['z-index'] = Number(bannerItem.styles['z-index']) + 1;
          }
        })

        changeBannerItemStylesField('z-index', 1);
        break;
      case 'up':
        cloneBannerItems.forEach((bannerItem) => {
          if (Number(bannerItem.styles['z-index']) > bannerIndexZ) {
            bannerItem.styles['z-index'] = Number(bannerItem.styles['z-index']) - 1;
          }
        })

        changeBannerItemStylesField('z-index', cloneBannerItems.length);
        break;
      default:
        return;
    }

    setBannerItems(cloneBannerItems);
  };

  const changeNestedBannerItemLayerOrder = (bannerItem, value) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const containerBannerItem = cloneBannerItems.find((cloneBannerItem) => cloneBannerItem.id === bannerItem.containerId);
    const bannerIndexZ = Number(containerBannerItem.styles['z-index']);

    switch (value) {
      case -1:
      case 1:
        const indexZOfAdjacentBannerItem = bannerIndexZ + value;
        const adjacentBannerItem = cloneBannerItems.find((item) => Number(item.styles['z-index']) === indexZOfAdjacentBannerItem);

        if (adjacentBannerItem) {
          containerBannerItem.styles['z-index'] = bannerIndexZ + value;
          adjacentBannerItem.styles['z-index'] = Number(adjacentBannerItem.styles['z-index']) - value;
        }
        break;
      case 'down':
        cloneBannerItems.forEach((bannerItem) => {
          if (Number(bannerItem.styles['z-index']) < bannerIndexZ) {
            bannerItem.styles['z-index'] = Number(bannerItem.styles['z-index']) + 1;
          }
        })

        containerBannerItem.styles['z-index'] = 1;
        break;
      case 'up':
        cloneBannerItems.forEach((bannerItem) => {
          if (Number(bannerItem.styles['z-index']) > bannerIndexZ) {
            bannerItem.styles['z-index'] = Number(bannerItem.styles['z-index']) - 1;
          }
        })

        containerBannerItem.styles['z-index'] = cloneBannerItems.length;
        break;
      default:
        return;
    }

    setBannerItems(cloneBannerItems);
  };

  return [changeBannerItemLayerOrder, changeNestedBannerItemLayerOrder];
};
