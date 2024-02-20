import React from 'react';
import { RecipeStepGroup } from '../../module';
import { Steps } from 'antd';

const InstructionGroupSection = (stepGroup: RecipeStepGroup) => {
    return(
        <div key={stepGroup.name + stepGroup.order}>
            <h2>{stepGroup.name}</h2>
            {/* <h3> Ingredients</h3> */}
            {/* {instructionGroupData.steps.sort((a, b) => a.order - b.order).map(x => InstructionStepSection(x))} */}
            <Steps 
            direction="vertical"
            items={stepGroup.steps.sort((a, b) => a.order - b.order).map(x => ({ "title": x.title, "description": x.instructions}))}/>
        </div>
    );
};

export default InstructionGroupSection;