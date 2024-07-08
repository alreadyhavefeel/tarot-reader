import React from "react";


function ButtonSelect(props) {

    return (
        <button 
            className={`w-36 h-12 m-2 bg-cover bg-center text-slate-200 justify-center rounded hover:font-bold hover:text-slate-50`} 
            style={{ backgroundImage: 'url(/img/bg-readingType.png)' }}
            onClick={(props.onClick)}
            >
                {props.readingType}
        </button>
    )
}

export default ButtonSelect;