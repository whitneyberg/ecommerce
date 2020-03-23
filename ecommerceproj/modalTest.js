import React, {Component} from 'react';
import './modalTest.css';
import Modal from 'react-modal';

class ModalTest extends Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ showModal: true });
      }

    closeModal() {
        this.setState({ showModal: false });
    }

    render() {
        let modalStyle = "display:flex; justify-content:center;";
        return (
            <div className='billing-type-wrap'>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Modal"
                    modalStyle={modalStyle}
                    className="modal"
                    overlayClassName="modal-overlay"
                    ariaHideApp={false}
                >
                    <div className='modal-wrap'>
                        <h2>This is a Modal!</h2>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default ModalTest;