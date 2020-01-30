import React from "react";
import styled from "styled-components";

const Primary = styled.button`
  display: flex;
  min-width: 80px;
  height: 30px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  margin: 0px 15px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  font-size: 18px;
  line-height: 150%;
`;
export class Button extends React.Component {
  render() {
    return (
      <Primary onClick={this.props.onClick}>{this.props.children}</Primary>
    );
  }
}
export default Button;
