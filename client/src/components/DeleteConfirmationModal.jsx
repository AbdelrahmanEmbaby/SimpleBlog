export default function DeleteConfirmationModal({
  modalRef,
  onCancel,
  onConfirm,
  itemType = "post",
}) {
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Delete {itemType}</h3>
        <form method="dialog" className="flex flex-col gap-5">
          <p className="text-xl">
            Are you sure you want to delete this {itemType}?
          </p>
          <div className="flex flex-row-reverse gap-2">
            <button
              className="btn btn-neutral btn-soft shadow-none text-base border-none font-medium"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-error btn-soft text-base border-none shadow-none hover:text-white font-medium"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onCancel}>close</button>
      </form>
    </dialog>
  );
}
