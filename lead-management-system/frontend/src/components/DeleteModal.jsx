function DeleteModal({
    lead,
    onCancel,
    onConfirm,
    deleting,
    error,
}) {
    if (!lead) {
        return null;
    }

    return (
        <div className="delete-modal-overlay">
            <div
                className="delete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-modal-title"
            >
                <p className="delete-modal-eyebrow">
                    DELETE LEAD
                </p>

                <h2 id="delete-modal-title">
                    Delete this lead?
                </h2>

                <p className="delete-modal-message">
                    Are you sure you want to delete{" "}
                    <strong>{lead.name}</strong> from{" "}
                    <strong>{lead.company}</strong>?
                    <br />
                    This action cannot be undone.
                </p>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                        disabled={deleting}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="delete-confirm-button"
                        onClick={onConfirm}
                        disabled={deleting}
                    >
                        {deleting
                            ? "Deleting..."
                            : "Delete Lead"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;