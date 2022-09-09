import { Component } from 'react';
import { getGallery } from 'services/api';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Spinner } from './Loader';
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

// status: {
//   idle - спокойный,
//   resolved - +результат,
//   rejected - ошибка,
//   pending - поиск(загрузка);}

export class ImageGallery extends Component {
  state = {
    gallery: [],
    status: 'idle',
    totalPage: 0,
  };

  async componentDidUpdate(prevProps, _) {
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
        this.setState({
          status: 'resolved',
          totalPage: Math.ceil(newGallery.totalHits / 12),
        });
        return;
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    }
  }

  render() {
    const { gallery, status, totalPage } = this.state;
    const { loadMore, page } = this.props;
    console.log(page, totalPage);

    return (
      <div className="GalleryContainer">
        {status === 'idle'}
        {status === 'rejected' &&
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          )}
        {gallery.length > 0 && (
          <ul key={this.props.search} className="ImageGallery">
            {gallery.map(item => {
              return (
                <li className="ImageGalleryItem" key={item.id}>
                  <ImageGalleryItem option={item} />
                </li>
              );
            })}
          </ul>
        )}
        {(status === 'pending' && <Spinner />) ||
          (gallery.length > 1 && page < totalPage && (
            <button className="Button" type="button" onClick={loadMore}>
              Load more
            </button>
          ))}
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  search: PropTypes.string,
  page: PropTypes.number,
  loadMore: PropTypes.func,
};
