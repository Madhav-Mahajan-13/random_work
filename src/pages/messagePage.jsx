import React from "react";
import BasicButtonGroup from "../components/button";
import BasicSelect from "../components/select";
import NavTabs from "../components/navTab";

const MessagePage=()=>{
    const buttonlabels=["one" ,"two"];
    const selectlabels=[
        {value:"pca" ,label:"PCA"},
        {value:"cma" ,label:"CMA"},
        {value:"rtm" ,label:"RTM"},
        {value:"ctm" ,label:"CTM"}

    ]
    return(
        <div>
            <div> <BasicButtonGroup buttons={buttonlabels} /> </div>
            <div>
                <BasicSelect options={selectlabels}/>
            </div>
            <div>
                <NavTabs/>
                
            </div>
        </div>
    )
}

export default MessagePage;