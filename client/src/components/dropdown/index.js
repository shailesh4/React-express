import React from "react";
import styled from "styled-components";

const Wrapper = styled.select`
  display: flex;
  width: 100px;
  min-height: 30px;
  height: auto;
  background: white;
  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  display: flex;
  width: 100px;
`;

export class DropDown extends React.Component {
  render() {
    return (
      <Wrapper value={this.props.value} onChange={this.props.onChange}>
        <Option value="">Select</Option>
        {this.props.categories.map(category => (
          <Option value={category}>{category}</Option>
        ))}
      </Wrapper>
    );
  }
}

export default DropDown;
