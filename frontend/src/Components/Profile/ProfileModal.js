import React from 'react';

const Modal = ({revele, cache}) => revele ?(


    <React.Fragment>
        
            <div className="overlay">
                <div className="wrapper">
                <div className="modal">
                    <button>
                        <span>&times;</span>
                    </button>
                </div>    
                </div>              
            </div>
    </React.Fragment>
):null;

export default Modal;