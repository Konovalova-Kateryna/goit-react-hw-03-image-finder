import { Component } from 'react';
import { Modal } from './Modal';

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
          <Modal modalOption={option} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
