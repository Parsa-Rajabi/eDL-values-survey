/**
 *
 * @Author: Parsa Rajabi, ParsaRajabiPR [at] gmail.com
 * @Date: August 2021
 * @Description: Re-usable Value Component
 *
 * */


import React from "react";
import PropTypes from "prop-types";
import includes from "lodash/includes";
import Tooltip from "./Tooltip";

function Value(props) {
    const {item, def, handleOnClick, selectedItems} = props;

    let isSelected = false;
    if(includes(selectedItems, item)){
        isSelected = true
        console.log("isSelected" + isSelected)
    }
    return <span className={"block"}>
        <button onClick={handleOnClick} value={item} className={`${isSelected && "bg-green-500"} ml-5 mr-1 p-2 my-2 rounded-xl border-2 border-gray-300 hover:bg-yellow-500 cursor-pointer"`}>
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