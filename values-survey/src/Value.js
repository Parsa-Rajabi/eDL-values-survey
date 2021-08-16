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

function Value(props) {
    const {item, def} = props;
    return <div className={"hover:bg-yellow-400"}>
        {item} <Tooltip text={def} toolTipID={item}/>
    </div>
}

Value.propTypes = {
    item: PropTypes.string.isRequired,
    def: PropTypes.string.isRequired
}


export default Value;