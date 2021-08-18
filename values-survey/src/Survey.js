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

export function isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);

    return arr.some(function (ele) {
        return JSON.stringify(ele) === item_as_string;
    });
}

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
        ([item, def], index) =>
            <ol key={item}>
                <li>{index + 1}. <span className={"font-bold"}>{item}</span>: {def}</li>
            </ol>
    )

    function handleOnClick(e) {
        const list = [...selectedValue]
        const value_def = e.target.value
        const value = e.target.id
        const item = [value, value_def]
        const itemIndex = getIndexOfK(list, value)
        // check if the value select already exists in the list
        if (list.length < 5) {
            if (!isArrayInArray(list, item)) {
                // if not, add the value
                list.push(item);
            } else {
                // if it does, remove it from the array
                list.splice(itemIndex[0], 1)
            }
        } else if (isArrayInArray(list, item)) {
            list.splice(itemIndex[0], 1)
        }
        setSelectedValue(list)
    }

    function getIndexOfK(arr, k) {
        for (var i = 0; i < arr.length; i++) {
            var index = arr[i].indexOf(k);
            if (index > -1) {
                return [i, index];
            }
        }
    }

    var split = Math.ceil(values.length / 3);
    var first_block = values.splice(0, split);
    var second_block = values.splice(split, split * 2);

    function handleSubmit(e) {
        setDisplayResult(true);
    }

    function resetSurvey() {
        setDisplayResult(false);
        setSelectedValue([]);
    }

    function handleExit(){
        window.close();
    }

    return <div className={"overflow-hidden"}>
        <img src={logo} alt={"eDL Logo"} width={500} className={"mx-10 "}/>
        <h1 className={"text-3xl font-semibold mx-10 text-gray-700"}>Values Inventory</h1>
        {!displayResult && <span>
            <span className={"text-lg"}>
        <p className={"mt-5 mx-10 text-gray-700"}>What do you value in life and work? The list below will help you to identify your values.</p>
        <p className={"mt-2 mx-10 text-gray-700"}>Knowing this information can help you to make decisions about a career that will support the person you want
            to be and the life you want to lead.</p>
        <p className={"mt-5 mx-10 font-semibold text-gray-700"}>Instructions:</p>
        <p className={"mt-2 mb-10 mx-10 text-gray-700"}>Select <b>5 words</b> that are the most important to you in work and in life. Hover over the question mark to view
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
                    className={`${isSubmitDisabled ? "bg-purple-400 opacity-40 cursor-not-allowed" : "bg-purple-500 btn-lift"} block mx-auto px-7 py-3 rounded-2xl my-10 text-white font-bold text-lg  `}
                    onClick={(e) => handleSubmit(e)}
                    title={isSubmitDisabled ? "Please select 5 words to continue" : "Submit"}
                    type={"submit"}>
            Submit
        </button>
            </span>
        }

        <div className={"mx-auto w-1/2 text-gray-700"}>
            {displayResult && <span>
            <div className={"w-1/2 mx-auto my-5"}>
                <p className={"mt-2 mb-5 text-lg font-medium"}>Your 5 most important values are: </p>
            </div>
            <div className={"my-5 mx-7 w-full "}>
                {finalResults}
            </div>
            <div className={"w-1/2 mx-auto my-10"}>
                <button className={"btn bg-yellow-500 mt-2"}
                        onClick={(e) => resetSurvey()}
                        type={"button"}>
                Try Again
                </button>
                <button className={"btn bg-red-500 my-2 ml-5"}
                        onClick={(e) => handleExit()}
                        type={"button"}>
               Exit
                </button>
            </div>
        </span>
            }
        </div>

    </div>
}

export default Survey;