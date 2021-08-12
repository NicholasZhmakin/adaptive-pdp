import React, {useState, useEffect, useRef} from 'react';
import { arrayDnd } from "./mockData";
import './AddCreatePreview.scss';
import MoveableComponent from "../MoveableComponent";


const AddCreatePreview = () => {

    const previewRef = useRef(null);

    return (
        <div
            className='addCreatePreview'
            ref={previewRef}
        >
            {arrayDnd.map((item, index) =>
                <MoveableComponent
                    key={item.id + index}
                    previewRef={previewRef}
                    item={item}
                />
            )}
        </div>
    );
}

export default AddCreatePreview;