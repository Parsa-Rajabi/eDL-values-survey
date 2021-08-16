/**
 *
 * @Author: Parsa Rajabi, ParsaRajabiPR [at] gmail.com
 * @Date: August 2021
 * @Description: Re-usable Survey Component
 *
 * */


import React, {useState} from "react";
import logo from "./eDL-logo.jpeg";
import {VALUES, VALUES_DEF} from "./ValuesText"
import Value from './Value';

function Survey() {

    const VALUES_SET = []
    for (var i = 0; i < VALUES.length; i++) {
        VALUES_SET[i] = [VALUES[i], VALUES_DEF[i]];
    }

    const values = VALUES_SET.map(
        ([value,def]) =>
            <span>
                <Value key={value} item={value} def={def}/>
            </span>
        )
    ;

    return <div>
        <img src={logo} alt={"eDL Logo"}/>
        <h1>Survey Inventory</h1>
        <h1>What do you value in life and work? The list below will help you to identify your values.</h1>
        <h1>Knowing this information can help you to make decisions about a career that will support the person you want
            to be and the life you want to lead.</h1>
        <h1>Instructions</h1>
        <h1>Select 5 words that are the most important to you in work and in life. Hover over the question mark to view
            the definition. If your definition is different, use your own. </h1>
        {values}
    </div>
}

export default Survey;