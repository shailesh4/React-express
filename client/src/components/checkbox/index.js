import React from 'react';
import styled from 'styled-components';

const Box = styled.input`
    display: flex;
    height: 30px;
    margin-right: 8px;
    &:focus{
        outline: none;
    }
`;

const Label = styled.div`
    display: flex;
    margin-left: 15px;
    font-size: 18px;
    line-height: 150%;
`;
export class Checkbox extends React.Component{
    render(){
        return(
           
                <Label>
                <Box checked type="checkbox" onClick={this.props.onClick} checked={this.props.checked} />
                Markdown
                </Label>
           
        )
    }
}
export default Checkbox;