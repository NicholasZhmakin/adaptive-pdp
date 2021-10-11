import cloneDeep from 'lodash/cloneDeep';
import {v4 as uuidv4} from 'uuid';


export const useDuplicateFunctions = (bannerItems, setBannerItems, setSelectedBannerItem) => {

  const duplicateBannerItem = (bannerItem) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const cloneBannerItem = cloneDeep(bannerItem);
    const lastIndexZ = cloneBannerItems.reduce((max, current) => (current.styles['z-index'] > max ? current.styles['z-index'] : max), 0);

    setBannerItems([
      ...cloneBannerItems,
      {
        ...cloneBannerItem,
        id: uuidv4(),
        styles: {
          ...cloneBannerItem.styles,
          top: `${parseInt(cloneBannerItem.styles.top) + 10}px`,
          left: cloneBannerItem.styles.left,
          'z-index': Number(lastIndexZ) + 1,
        }
      }
    ]);

    setSelectedBannerItem(null);
  };

  const duplicateContainerBannerItem = (bannerItem) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const cloneBannerItem = cloneDeep(bannerItem);
    const lastIndexZ = cloneBannerItems.reduce((max, current) => (current.styles['z-index'] > max ? current.styles['z-index'] : max), 0);
    const newContainerId = uuidv4();

    setBannerItems([
      ...cloneBannerItems,
      {
        ...cloneBannerItem,
        id: newContainerId,
        nestedBannerItems: cloneBannerItem.nestedBannerItems.map((nestedBannerItem) => ({
          ...nestedBannerItem,
          id: uuidv4(),
          containerId: newContainerId,
        })),
        styles: {
          ...cloneBannerItem.styles,
          'top': `${parseInt(cloneBannerItem.styles.top) + 10}px`,
          'z-index': Number(lastIndexZ) + 1,
        }
      }
    ]);

    setSelectedBannerItem(null);
  };


  const duplicateNestedBannerItem = (bannerItem) => {
    const cloneBannerItems = cloneDeep(bannerItems);
    const cloneBannerItem = cloneDeep(bannerItem);
    const lastIndexZ = cloneBannerItems.reduce((max, current) => (current.styles['z-index'] > max ? current.styles['z-index'] : max), 0);
    const neededContainer = cloneBannerItems.find((item) => item.id === cloneBannerItem.containerId);
    const positionTop = `${parseInt(cloneBannerItem.styles.top) + parseInt(neededContainer.styles.top) + 10}px`;
    const positionLeft = `${parseInt(cloneBannerItem.styles.left) + parseInt(neededContainer.styles.left)}px`;

    delete cloneBannerItem.containerId;

    setBannerItems([
      ...cloneBannerItems,
      {
        ...cloneBannerItem,
        id: uuidv4(),
        styles: {
          ...cloneBannerItem.styles,
          top: positionTop,
          left: positionLeft,
          'z-index': Number(lastIndexZ) + 1,
        }
      }
    ]);

    setSelectedBannerItem(null);
  };


  // const duplicateNestedBannerItem = (bannerItem) => {
  //   const cloneBannerItems = cloneDeep(bannerItems);
  //   const cloneBannerItem = cloneDeep(bannerItem);
  //   const neededContainer = cloneBannerItems.find((item) => item.id === cloneBannerItem.containerId);
  //   // const positionTop = `${parseInt(cloneBannerItem.styles.top) + parseInt(neededContainer.styles.top) + 10}px`;
  //   // const positionLeft = `${parseInt(cloneBannerItem.styles.left) + parseInt(neededContainer.styles.left)}px`;
  //   console.log('nested');
  //   delete cloneBannerItem.containerId;
  //
  //
  //   setBannerItems([
  //     ...cloneBannerItems.filter((bannerItem) => bannerItem.id !== neededContainer.id),
  //     {
  //       ...cloneBannerItem,
  //       id: uuidv4(),
  //       styles: {
  //         ...cloneBannerItem.styles,
  //         top: `${parseInt(cloneBannerItem.styles.top) + parseInt(neededContainer.styles.top) + 10}px`,
  //         left: `${parseInt(cloneBannerItem.styles.left) + parseInt(neededContainer.styles.left)}px`,
  //         'z-index': neededContainer.styles['z-index'],
  //       }
  //     }
  //   ]);
  //
  //
  //   setSelectedBannerItem(null);
  // }

  return [duplicateBannerItem, duplicateContainerBannerItem, duplicateNestedBannerItem];
};
