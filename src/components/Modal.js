import { Component } from 'react';
import { createPortal } from 'react-dom';
import { PropTypes } from 'prop-types';

const modalRoot = document.querySelector('#root');

export class Modal extends Component {
  componentDidMount() {
    const backdrop = document.querySelector('.Overlay');
    window.addEventListener('keydown', this.closeModal);
    backdrop.addEventListener('click', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { modalOption } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.closeModal}>
        <div className="Modal">
          <img src={modalOption.largeImageURL} alt={modalOption.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalOption: PropTypes.object.isRequired,
};
