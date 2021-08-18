/**
 *
 * @Author: Parsa Rajabi, ParsaRajabiPR [at] gmail.com
 * @Date: August 2021
 * @Description: Re-usable Value Component
 *
 * */


import React from "react";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import {isArrayInArray} from "./Survey";

function Value(props) {
    const {item, def, handleOnClick, selectedItems} = props;

    let isSelected = false;
    if(isArrayInArray(selectedItems, [item, def])){
        isSelected = true
    }
    return <span className={"block"}>
        <button onClick={handleOnClick} value={def} id={item} className={`${isSelected && "shadow-lg transform -translate-y-1 border-orange-500 bg-yellow-500 border-yellow-500 text-white font-bold"} value-btn`}>
            {item}
        </button>
        <Tooltip text={def} toolTipID={item}/>
    </span>
}

Value.propTypes = {
    item: PropTypes.string.isRequired,
    def: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func,
    selectedItems: PropTypes.array
};


export default Value;