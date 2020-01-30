import React from "react";
import styled from "styled-components";

const Box = styled.input`
  display: flex;
  height: 30px;
  margin-left: 8px;
  &:focus {
    outline: none;
  }
`;

const Label = styled.div`
  display: flex;
  margin-left: 15px;
  font-size: 18px;
  line-height: 150%;
`;
export class Date extends React.Component {
  render() {
    return (
      <Label>
        {this.props.label}
        <Box
          type="date"
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </Label>
    );
  }
}
export default Date;
