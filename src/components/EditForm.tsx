import React, { useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateComment } from '../api/ApiCollection';

interface Complaint {
    id: string;
    comment: string;
}

interface EditFormProps {
    complaint: Complaint;
    onClose: () => void;
    onSave: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ complaint, onClose, onSave }) => {
    const [comment, setComment] = useState(complaint.comment);

    // Correct typing and property access
    const mutation: UseMutationResult<void, Error, void> = useMutation({
        mutationFn: () => updateComment(complaint.id, comment),
        onSuccess: () => {
            toast.success('Comment updated successfully!');
            onSave(); // Refresh data or update state
            onClose();
        },
        onError: () => {
            toast.error('Error updating comment');
        },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        mutation.mutate();
    };

    // Use `mutation.status` to handle loading state

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const isLoading = mutation.status === 'loading';

    return (
        <div className="modal">
            <div className="modal-content">
                <h3 className="text-xl font-semibold">Edit Comment</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter new comment"
                        className="textarea textarea-bordered"
                        rows={4}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Update Comment'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
