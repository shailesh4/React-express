import React from "react";
import styled from "styled-components";
import Date from "../../components/date";
import Button from "../../components/button";
import DropDown from "../../components/dropdown";
import ModifyBook from "../ModifyBook";
import AddBook from "../AddBook";
import moment from "moment";

const MonsterWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ModalWrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: white;
`;

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
  height: 718px;
  border: 1px solid grey;
  background: #ffffff;
  padding: 10px;
`;

const FilterWrapper = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  height: 80px;
  justify-content: space-around;
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  width: 80%;
  min-height: 35px;
  background: ${props =>
    props.backgroundColor ? props.backgroundColor : "#E6E6FA"};
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;

const Lane = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width: 80%;
  justify-content: space-around;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid grey;
  width: 150px;
  height: 100%;
  padding: 0px 15px;
  flex-wrap: wrap;
`;

const CatCol = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid grey;
  width: 150px;
  padding: 0px 15px;
  flex-wrap: wrap;
`;

const ListCat = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const ColH = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid grey;
  color: purple;
  height: 100%;
  width: 150px;
  padding: 0px 15px;
`;

const Text = styled.div`
  display: flex;
  min-width: 30px;
  padding-left: 15px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 150%;
  margin-right: 20px;
  color: #000;
`;

const PositionWrapper = styled.div`
  display: flex;
  margin-top: ${props => props.marginTop || "0px;"};
`;

const uniqueArray = array => {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      books: [],
      categories: [],
      currentPage: 0,
      totalPage: 17,
      selected: 0,
      pagination: 5,
      editBook: false,
      addBook: false,
      start_date: "",
      end_date: "",
      selectedCategory: ""
    };
  }

  handleAdd = async e => {
    /*e.preventDefault();
  fetch('/api/add',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({post: this.state.post }),
  }).then(results => {
    return results.json();
  }).then(books => {
    this.setState({books});
  });*/
    this.setState({ modal: true, addBook: true });
    //this.setState({ books: body });
  };

  handleSelect = selected => {
    this.setState({ selected });
  };

  handleEdit = () => {
    console.log("This was clicked!!");
    this.setState({ modal: true, editBook: true });
  };

  handleDelete = () => {
    let newList = this.state.books;
    newList.splice(this.state.selected, 1);
    this.setState({ books: newList });
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    fetch("api/books/")
      .then(results => {
        return results.json();
      })
      .then(
        books => {
          this.setState({
            books,
            totalPage: Math.ceil(books.length / this.state.pagination)
          }); /**when you do filter have a look here again!!! */
        },
        () => {
          this.getCategoriesList();
        }
      );
  }

  getCategoriesList = () => {
    let list = [];
    this.state.books.map(book => (list = list.push(book.categories)));
    console.log("List is : ", list);
  };

  handlePrevPage = () => {
    if (this.state.currentPage !== 0) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };

  handleNextPage = () => {
    if (this.state.currentPage !== this.state.totalPage - 1) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };

  handleCancel = () => {
    this.setState({ modal: false, editBook: false, addBook: false });
  };
  handleDateChangeStart = e => {
    this.setState(
      {
        start_date: e.target.value
      },
      () =>
        console.log(
          "start date adn cur",
          this.state.start_date,
          new Date(this.state.start_date)
        )
    );
  };
  handleDateChangeEnd = e => {
    this.setState({
      end_date: e.target.value
    });
  };

  handleSelectedCategory = e => {
    this.setState({ selectedCategory: e.target.value }, () =>
      console.log("category", this.state.selectedCategory)
    );
  };

  handleClearFilter = () => {
    this.setState({
      start_date: "",
      end_date: "",
      selectedCategory: ""
    });
  };

  handleFilterClick = e => {
    this.setState({
      totalPage: Math.ceil(e / this.state.pagination)
    });
  };

  render() {
    const filteredRange = this.state.books
      .filter(book =>
        this.state.start_date
          ? moment(new Date(book.date)).isSameOrAfter(this.state.start_date)
          : true
      )
      .filter(book =>
        this.state.end_date
          ? moment(new Date(book.date)).isSameOrBefore(this.state.end_date)
          : true
      )
      .filter(book =>
        this.state.selectedCategory
          ? book.categories.includes(this.state.selectedCategory)
          : true
      );

    let categoryValues = [];
    this.state.books.forEach(
      book =>
        (categoryValues = uniqueArray([...categoryValues, ...book.categories]))
    );

    return (
      <MonsterWrapper>
        {this.state.modal && (
          <ModalWrap>
            {this.state.editBook && (
              <ModifyBook
                book={this.state.books[this.state.selected]}
                onCancel={this.handleCancel}
              />
            )}
            {this.state.addBook && <AddBook onCancel={this.handleCancel} />}
          </ModalWrap>
        )}
        <View>
          <Wrapper>
            <h1>Note List</h1>
            <PositionWrapper marginTop="35px" />
            <FilterWrapper>
              <ButtonWrap>
                <Date
                  label={"From : "}
                  value={this.state.start_date}
                  onChange={this.handleDateChangeStart}
                />
                <Date
                  label={"To : "}
                  value={this.state.end_date}
                  onChange={this.handleDateChangeEnd}
                />
              </ButtonWrap>
              <ButtonWrap>
                <DropDown
                  value={this.state.selectedCategory}
                  onChange={this.handleSelectedCategory}
                  categories={categoryValues}
                ></DropDown>
                <Button
                  onClick={() => this.handleFilterClick(filteredRange.length)}
                >
                  Clear{" "}
                </Button>
                <Button onClick={this.handleClearFilter}>Clear </Button>
              </ButtonWrap>
            </FilterWrapper>
            <PositionWrapper marginTop="35px" />
            <Row>
              <ColH>No</ColH>
              <ColH>Title</ColH>
              <ColH>Categories</ColH>
              <ColH>Year</ColH>
              <ColH>Markdown</ColH>
            </Row>
            {/*<Row key={book.id} onClick={() => {this.handleShowEdit(); this.bookEdit(book)} }>*/}
            {filteredRange
              .slice(
                this.state.currentPage * this.state.pagination,
                this.state.pagination * this.state.currentPage +
                  this.state.pagination
              )
              .map((book, index) => (
                <Row
                  backgroundColor={
                    this.state.selected ===
                      index +
                        (this.state.currentPage - 1) * this.state.pagination &&
                    "#D8BFD8"
                  }
                  key={book.id}
                  onDoubleClick={() => this.handleEdit()}
                  onClick={() => this.handleSelect(index)}
                >
                  <Col>{book.id}</Col>
                  <Col>{book.title}</Col>
                  <CatCol>
                    {book.categories.map(category => (
                      <ListCat>{category}, &nbsp;</ListCat>
                    ))}
                  </CatCol>
                  <Col>{book.date}</Col>
                  <Col>{book.markdown ? "True" : "False"}</Col>
                </Row>
              ))}

            <Lane>
              <ButtonWrap>
                <Button onClick={this.handleAdd}>Add</Button>
                <Button onClick={this.handleEdit}>Edit </Button>
                <Button onClick={this.handleDelete}>Delete </Button>
              </ButtonWrap>
              <ButtonWrap>
                <Button onClick={this.handlePrevPage}>Prev</Button>
                <Text>
                  Page {this.state.currentPage + 1}/{this.state.totalPage}
                </Text>
                <Button onClick={this.handleNextPage}>Next </Button>
              </ButtonWrap>
            </Lane>
          </Wrapper>
        </View>
      </MonsterWrapper>
    );
  }
}

export default Home;
