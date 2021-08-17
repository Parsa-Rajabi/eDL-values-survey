/**
 *
 * @Author: Parsa Rajabi, ParsaRajabiPR [at] gmail.com
 * @Date: August 2021
 * @Description: Re-usable Survey Component
 *
 * */


import React, {useEffect, useState} from "react";
import logo from "./eDL-logo.jpeg";
import {VALUES, VALUES_DEF} from "./ValuesText"
import Value from './Value';
import {includes} from "lodash";

function Survey() {

    const [selectedValue, setSelectedValue] = useState([]);
    const [displayResult, setDisplayResult] = useState(false);
    const [isSubmitDisabled, SetIsSubmitDisabled] = useState(true);

    useEffect(() => {
        if (selectedValue.length > 4) {
            SetIsSubmitDisabled(false)
        } else {
            SetIsSubmitDisabled(true)
        }

    }, [selectedValue])

    const VALUES_SET = []
    for (var i = 0; i < VALUES.length; i++) {
        VALUES_SET[i] = [VALUES[i], VALUES_DEF[i]];
    }

    const values = VALUES_SET.map(
        ([value, def]) => {
            return <Value key={value} item={value} def={def} handleOnClick={handleOnClick}
                          selectedItems={selectedValue}/>
        }
    );

    const finalResults = selectedValue.map(
        (item) =>
            <ol key={item}>
                <li>{item}</li>
            </ol>
    )


    function handleOnClick(e) {
        const list = [...selectedValue]
        const value = e.target.value
        // check if the value select already exists in the list
        if (list.length < 5) {
            if (!includes(list, value)) {
                // if not, add the value
                console.log("added " + value)
                list.push(value);
            } else {
                // if it does, remove it from the array
                console.log("removed " + value)
                list.splice(list.indexOf(value), 1);
            }
        } else if (includes(list, value)) {
            list.splice(list.indexOf(value), 1);
        }

        setSelectedValue(list)
    }


    var split = Math.ceil(values.length / 3);

    var first_block = values.splice(0, split);
    var second_block = values.splice(split, split * 2);

    function handleSubmit(e) {
        setDisplayResult(true);
        // console.table(selectedValue)
    }

    return <div className={"overflow-hidden"}>
        <img src={logo} alt={"eDL Logo"} width={500} className={"mx-10 "}/>
        <h1 className={"text-3xl font-semibold mx-10"}>Survey Inventory</h1>
        {!displayResult && <span>
            <span className={"text-lg"}>
        <p className={"mt-5 mx-10"}>What do you value in life and work? The list below will help you to identify your values.</p>
        <p className={"mt-2 mx-10"}>Knowing this information can help you to make decisions about a career that will support the person you want
            to be and the life you want to lead.</p>
        <p className={"mt-5 mx-10 font-semibold"}>Instructions:</p>
        <p className={"mt-2 mb-10 mx-10"}>Select <b>5 words</b> that are the most important to you in work and in life. Hover over the question mark to view
            the definition. If your definition is different, use your own. </p>
            </span>

        <div className="flex flex-wrap -mx-4 overflow-hidden">
            <div className="my-4 px-2 mx-auto w-1/4 overflow-hidden">
                {first_block}
            </div>
            <div className="my-4 px-2 mx-auto w-1/4 overflow-hidden">
                {second_block}
            </div>
            <div className="my-4 px-2 mx-auto w-1/4 overflow-hidden">
                {values}
            </div>
        </div>
            <button disabled={isSubmitDisabled}
                    className={`${isSubmitDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500"} block mx-auto px-7 py-3 rounded-2xl my-10 `}
                    onClick={(e) => handleSubmit(e)}
                    type={"submit"}>
            Submit
        </button>

            {selectedValue}
            </span>
        }

        {displayResult && <span>
            {finalResults}
            <button className={"bg-yellow-500 block mx-auto px-7 py-3 rounded-2xl my-10"}
                    onClick={() => setDisplayResult(false)}
                    type={"button"}>
            Try Again
        </button>
        </span>
        }

    </div>
}

export default Survey;