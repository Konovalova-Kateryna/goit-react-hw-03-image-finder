import { Component } from 'react';
import { Modal } from './Modal';
import { PropTypes } from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };
  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { option } = this.props;
    return (
      <>
        <img
          onClick={this.openModal}
          className="ImageGalleryItem-image"
          src={option.webformatURL}
          alt={option.tags}
        />
        {this.state.isModalOpen && (
          <Modal modalOption={option} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
ImageGalleryItem.propTypes = {
  option: PropTypes.object.isRequired,
};
