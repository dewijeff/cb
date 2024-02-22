import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
    cookbookName: string;
};

const CookbookHeader = ({cookbookName} : Props) => {

    return(
        <Header>
            <div 
                style={{
                    margin: "auto"
                }}
            >
                <h1 className="cookbookTitle">{cookbookName} Cookbook <Link to="/AddRecipe">Add A Recipe</Link></h1>
                
            </div>
        </Header>
    );
}

export default CookbookHeader;