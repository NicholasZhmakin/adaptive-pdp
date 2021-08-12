import React, {useState, useEffect, useRef} from 'react';
import { arrayDnd } from "./mockData";
import './AddCreatePreview.scss';
import cloneDeep from 'lodash/cloneDeep';
import MoveableComponent from "../MoveableComponent";
import MoveableSettings from "../MoveableSettings";


const AddCreatePreview = () => {

    const previewRef = useRef(null);

    const [bannerItems,  setBannerItems] = useState([...arrayDnd]);
    const [selectedBannerItemId,  setSelectedBannerItemId] = useState(null);

    const handleSelectBannerItem = (id) => {
        console.log(id);
        setSelectedBannerItemId(id);
    }

    const changeBannerItemStyles = (fieldName, fieldValue) => {
        const cloneBannerItems = cloneDeep(bannerItems);
        const neededBannerItem = cloneBannerItems.find((item) => item.id === selectedBannerItemId);
        neededBannerItem.styles[fieldName] = fieldValue + 'px';


        console.log(neededBannerItem, fieldValue + 'px');
        setBannerItems(cloneBannerItems);
    }


    return (
        <div
            className='addCreatePreview'
            ref={previewRef}
        >

            {selectedBannerItemId &&
                <MoveableSettings
                    item={bannerItems.find((item) => item.id === selectedBannerItemId)}
                    changeBannerItemStyles={changeBannerItemStyles}
                />
            }

            {bannerItems.map((item, index) =>
                <MoveableComponent
                    key={item.id + index}
                    previewRef={previewRef}
                    item={item}
                    handleSelectBannerItem={handleSelectBannerItem}
                />
            )}
        </div>
    );
}

export default AddCreatePreview;