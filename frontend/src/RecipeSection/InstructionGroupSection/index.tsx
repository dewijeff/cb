import React from 'react';
import { RecipeStepGroup } from '../../module';
import { Steps } from 'antd';

const InstructionGroupSection = (instructionGroupData: RecipeStepGroup) => {
    return(
        <div>
            <h2>{instructionGroupData.name}</h2>
            {/* <h3> Ingredients</h3> */}
            {/* {instructionGroupData.steps.sort((a, b) => a.order - b.order).map(x => InstructionStepSection(x))} */}
            <Steps 
            direction="vertical"
            items={instructionGroupData.steps.sort((a, b) => a.order - b.order).map(x => ({ "title": x.title, "description": x.instructions}))}/>
        </div>
    );
};

export default InstructionGroupSection;