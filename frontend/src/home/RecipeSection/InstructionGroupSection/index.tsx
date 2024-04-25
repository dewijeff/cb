import React from 'react';
import { RecipeStepGroup } from '../../../Shared/models';
import { Steps } from 'antd';

const InstructionGroupSection = (stepGroup: RecipeStepGroup) => {
    return(
        <div key={stepGroup.name + stepGroup.order}>
            <h3>{stepGroup.name}</h3>
            <Steps 
                direction="vertical"
                items={stepGroup.steps.sort((a, b) => a.order - b.order).map(x => ({ "title": x.title, "description": x.instructions}))}/>
        </div>
    );
};

export default InstructionGroupSection;