import { Component } from 'react';
import { getGallery } from 'services/api';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Spinner } from './Loader';
import Modal from './Modal';

// status: {
//   idle - спокойный,
//   resolved - +результат,
//   rejected - ошибка,
//   pending - поиск(загрузка);}

export class ImageGallery extends Component {
  state = {
    gallery: [],
    status: 'idle',
    visible: false,
  };
  showModal = () => {
    console.log('click on Modal');
  };
  toggleModal = () => {
    this.setState(prevState => ({
      visible: !prevState.visible,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.props;

    try {
      if (prevProps.search !== search || prevProps.page !== page) {
        if (prevProps.search !== search) {
          this.setState({ gallery: [] });
        }
        this.setState({ status: 'pending' });
        const newGallery = await getGallery(search, page);
        console.log(newGallery);
        if (newGallery.total === 0 || newGallery.hits.length === 0) {
          this.setState({ status: 'rejected', gallery: [] });
          return;
        }
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newGallery.hits],
        }));
        this.setState({ status: 'resolved' });
        return;
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    }
  }

  render() {
    const { gallery, status, visible } = this.state;

    return (
      <div>
        {status === 'idle' && <h2>Введите имя покемона</h2>}
        {status === 'pending' && <Spinner />}
        {status === 'rejected' && <alarm>Ooppss, I did it again</alarm>}
        {status === 'resolved' && (
          <ul className="ImageGallery">
            {gallery.map(item => {
              return (
                <li
                  className="ImageGalleryItem"
                  key={item.id}
                  onClick={this.toggleModal}
                >
                  <ImageGalleryItem option={item} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default ImageGallery;
