import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    search: '',
    page: 1,
  };

  createGallery = PictureName => {
    this.setState({
      search: PictureName,
      page: 1,
      gallery: [],
    });
  };
  onLoadMore = e => {
    e.preventDefault();
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  render() {
    const { page, search } = this.state;
  
    return (
      <div className="App">
        <Searchbar onSubmit={this.createGallery} />
        <ImageGallery search={search} page={page} loadMore={this.onLoadMore} />
        <ToastContainer />
      </div>
    );
  }
}
