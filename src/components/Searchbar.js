import { Field, Form, Formik } from 'formik';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

const initialValues = { searchParam: '' };

export class Searchbar extends Component {
  state = {
    searchParam: '',
  };

  handleSubmit = (value, { resetForm }) => {
    console.log(value);

    if (value.searchParam.trim() === '') {
      toast.error('Please specify your search query.');
      resetForm();
      return;
    }
    this.props.onSubmit(value.searchParam);
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

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  searchParam: PropTypes.string,
};
