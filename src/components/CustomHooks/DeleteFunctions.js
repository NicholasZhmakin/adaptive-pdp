import cloneDeep from 'lodash/cloneDeep';
import {v4 as uuidv4} from 'uuid';


export const useDeleteFunctions = (bannerItems, setBannerItems, setSelectedBannerItem) => {

  const deleteBannerItem = (bannerItemId, bannerItemIndexZ) => {
    const cloneBannerItems = cloneDeep(bannerItems);

    cloneBannerItems.forEach((bannerItem) => {
      if (Number(bannerItem.styles['z-index']) > bannerItemIndexZ) {
        bannerItem.styles['z-index'] = Number(bannerItem.styles['z-index']) - 1;
      }
    })

    setBannerItems(cloneBannerItems.filter((bannerItem) => bannerItem.id !== bannerItemId));
    setSelectedBannerItem(null);
  };

  const deleteNestedBannerItem = (bannerItemId, bannerItemIndexZ, containerId) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const neededContainer = cloneBannerItems.find((item) => item.id === containerId);
    neededContainer.nestedBannerItems = neededContainer.nestedBannerItems.filter((bannerItem) => bannerItem.id !== bannerItemId);

    if (neededContainer.nestedBannerItems.length <= 1) {
      const cloneBannerItem = cloneDeep(neededContainer.nestedBannerItems[0]);
      delete cloneBannerItem.containerId;

      setBannerItems([
        ...cloneBannerItems.filter((bannerItem) => bannerItem.id !== neededContainer.id),
        {
          ...cloneBannerItem,
          id: uuidv4(),
          styles: {
            ...cloneBannerItem.styles,
            top: `${parseInt(cloneBannerItem.styles.top) + parseInt(neededContainer.styles.top)}px`,
            left: `${parseInt(cloneBannerItem.styles.left) + parseInt(neededContainer.styles.left)}px`,
            'z-index': neededContainer.styles['z-index'],
          }
        }
      ]);
    } else {
      setBannerItems(cloneBannerItems);
    }

    setSelectedBannerItem(null);
  }

  return [deleteBannerItem, deleteNestedBannerItem];
};
