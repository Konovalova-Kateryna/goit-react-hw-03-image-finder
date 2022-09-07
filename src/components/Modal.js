// import { MutatingDots } from 'react-loader-spinner';

import { Component } from 'react';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }
  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCLose();
    }
  };
  onBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalOption } = this.props;
    return (
      <div className="Overlay" onClick={this.onBackDropClick}>
        <div className="Modal">
          <img src={modalOption.largeImageURL} alt={modalOption.tags} />
        </div>
      </div>
    );
  }
}

// const PopupWindow = () => {
//   return ReactDOM.createPortal(
//     <div>PopupWindow with portal</div>,
//     document.querySelector('#popup-root')
//   );
// };
