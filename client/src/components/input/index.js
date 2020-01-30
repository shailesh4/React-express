import React from "react";
import styled from "styled-components";

const Text = styled.input`
  display: flex;
  width: ${props => props.width || "200px"};
  height: 30px;
  &:focus {
    outline: none;
  }
`;
export class Input extends React.Component {
  render() {
    return (
      <Text
        width={this.props.width}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
export default Input;
