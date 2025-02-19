import PropTypes from "prop-types";

function ModalPopup({ handleDelete }) {
    return (
        <>
            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this product?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete} data-bs-dismiss="modal">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Prop Validation
ModalPopup.propTypes = {
    handleDelete: PropTypes.func.isRequired
};

export default ModalPopup;
