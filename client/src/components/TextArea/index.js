import React from "react";
import styled from "styled-components";

const Area = styled.textarea`
  display: flex;
  height: 400px;
  width: 800px;
  margin-right: 8px;
  &:focus {
    outline: none;
  }
`;

export class TextArea extends React.Component {
  render() {
    return <Area onChange={this.props.onChange} value={this.props.value} />;
  }
}
export default TextArea;
