import React from "react";
import styled from "styled-components";
import Input from "../../components/input";
import Checkbox from "../../components/checkbox";
import TextArea from "../../components/TextArea";
import Button from "../../components/button";

const View = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1140px;
  min-height: 718px;
  border: 1px solid grey;
  padding: 25px;
  box-sizing: border-box;
  margin: 50px 79px 0px;
`;

const Lane = styled.div`
  display: flex;
  min-height: 30px;
  margin-bottom: 35px;
`;

const Text = styled.div`
  display: flex;
  min-width: 50px;
  padding-left: 15px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 150%;
  margin-right: 20px;
  color: #000;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 150px;
  overflow: scroll;
  border: 1px solid black;
`;

const SingleCat = styled.div`
  display: flex;
  width: 100%;
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : "lightgray"};
`;

const Work = styled.a`
  display: flex;
  height: 15px;
  width: 15px;
  background: red;
`;

export class ModifyBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.book,
      categoryIndex: null,
      newCategory: null,
      title: null
    };
  }

  handleSelect = categoryIndex => {
    //console.log("Clicked ", categoryIndex);
    this.setState({ categoryIndex });
  };
  //for categories
  handleRemove = () => {
    let newBook = this.state.book;
    newBook.categories.splice(this.state.categoryIndex, 1);
    this.setState({ book: newBook });
  };
  handleAdd = () => {
    let newBook = this.state.book;
    newBook.categories.push(this.state.newCategory);

    this.setState({ book: newBook, newCategory: null });
  };
  handleChange = e => {
    //console.log("vbalue of e", e.target.value);
    this.setState({ newCategory: e.target.value });
  };
  handleMarkdown = () => {
    let newmarkdown = !this.state.book.markdown;
    let newbook = this.state.book;
    newbook.markdown = newmarkdown;
    this.setState({ book: newbook });
  };
  handleTitleChange = e => {
    let newBook = this.state.book;
    newBook.title = e.target.value;
    this.setState({ book: newBook });
    //console.log(this.state.book.title);
  };
  handleDescriptionChange = e => {
    let newBook = this.state.book;
    newBook.description = e.target.value;
    this.setState({ book: newBook });
  };

  handleCancel = () => {
    this.props.onCancel();
  };
  handleOK = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    let newDate = mm + "-" + dd + "-" + yyyy;
    let newBook = this.state.book;
    newBook.date = newDate;
    this.setState(
      {
        book: newBook
      },
      () =>
        fetch("/api/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ post: this.state.book })
        }).then(results => {
          return results.json();
        })
    );
    this.handleCancel();
  };
  render() {
    return (
      <View>
        <Wrapper>
          <Lane>
            <Text>Title of the Note :</Text>
            <Input
              width={"500px"}
              value={this.state.book.title}
              onChange={this.handleTitleChange}
            />
            <Checkbox
              checked={this.state.book.markdown}
              onClick={this.handleMarkdown}
            />
          </Lane>
          <Lane>
            <Text>Content of the Note :</Text>
            <TextArea
              value={this.state.book.description}
              onChange={this.handleDescriptionChange}
            />
          </Lane>
          <Lane>
            <Text>In categories :</Text>
            <Categories>
              {this.state.book.categories.map((category, index) => (
                <SingleCat
                  onClick={() => this.handleSelect(index)}
                  backgroundColor={
                    this.state.categoryIndex === index && "#F5F5F5"
                  }
                >
                  {category}
                </SingleCat>
              ))}
            </Categories>
            <Lane>
              <Text>Category Name :</Text>
              <Input
                width={"120px"}
                value={this.state.newCategory}
                onChange={this.handleChange}
              />
              <Button onClick={this.handleAdd}>Add</Button>
              <Button onClick={this.handleRemove}>Remove</Button>
            </Lane>
          </Lane>
          <Lane style={{ alignSelf: "flex-end" }}>
            <Button onClick={this.handleOK}>OK</Button>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </Lane>
        </Wrapper>
      </View>
    );
  }
}
export default ModifyBook;
