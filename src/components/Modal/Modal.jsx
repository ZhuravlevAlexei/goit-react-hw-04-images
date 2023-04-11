import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', onCloseModal);
    return () => {
      document.removeEventListener('keydown', onCloseModal);
    };
  });

  const onCloseModal = evt => {
    const { code, target, currentTarget } = evt;
    if (code === 'Escape' || target === currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={onCloseModal}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default Modal;
