import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

const srollArea = document.getElementById('scrollArea');

export default class App extends Component {
  state = {
    search: '',
    page: 1,
    gallery: [],
    visible: false,
  };

  createGallery = PictureName => {
    console.log(PictureName);
    this.setState({
      search: PictureName,
      page: 1,
      gallery: [],
    });
  };

  // scrollTo = () =>
  //   srollArea.scrollIntoView({ block: 'center', behavior: 'smooth' });

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
    const { gallery } = this.state;
    console.log(this.state);
    console.log(gallery);

    return (
      <div className="App">
        <Searchbar onSubmit={this.createGallery} />
        <ImageGallery search={this.state.search} page={this.state.page} />

        <button type="button" onClick={this.onLoadMore}>
          Load more
        </button>

        <div id="scrollArea"></div>
      </div>
    );
  }
}
