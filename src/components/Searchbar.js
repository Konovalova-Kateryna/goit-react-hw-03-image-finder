import { Field, Form, Formik, validateYupSchema } from 'formik';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';

const initialValues = { searchParam: '' };

export class Searchbar extends Component {
  state = {
    searchParam: '',
  };

  handleSubmit = (value, { resetForm }) => {
    console.log(value);

    if (value.searchParam.trim() === '') {
      alert('Введите имя покемона');
      resetForm();
      return;
    }
    this.props.onSubmit(value.searchParam);
    // this.props.onSubmit(this.state.searchParam);
    this.setState({ searchParam: '' });
    resetForm();
  };

  render() {
    return (
      <header className="Searchbar">
        <Formik initialValues={initialValues} onSubmit={this.handleSubmit}>
          <Form className="SearchForm">
            <button type="submit" className="SearchForm-button">
              <ImSearch className="SearchForm-button-label" />
            </button>
            <Field
              className="SearchForm-input"
              type="text"
              name="searchParam"
              autoComplete="off"
              placeholder="Search images and photos"
            />
          </Form>
        </Formik>
      </header>
    );
  }
}

export default Searchbar;

{
  /* <header className="Searchbar">
      <form className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <ImSearch className="SearchForm-button-label" />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header> */
}
