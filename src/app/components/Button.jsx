import React from "react"

function Button(props) {

    function handleClick()  {
        console.log("Button has click");
        console.log("Index is " + props.index + " Type is " + props.type);
        props.clickReader(props.index, props.type);
    }

    return (
        <button
            className={`w-36 h-12 m-2 bg-cover bg-center text-white justify-center rounded`} 
            style={{ 
                backgroundImage: 'url(/img/bg-readingType.png)', 
            }}
            onClick={() => handleClick()}
            >
                {props.buttonText}
            
        </button>
    )
}

export default Button;