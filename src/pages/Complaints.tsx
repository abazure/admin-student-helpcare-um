import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchComplaints, updateComment } from '../api/ApiCollection';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';
import EditIcon from '@mui/icons-material/Edit';

const Complaints = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [editingId, setEditingId] = React.useState<string | null>(null);
    const [newComment, setNewComment] = React.useState('');

    const queryClient = useQueryClient();

    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['allcomplaints'],
        queryFn: fetchComplaints,
    });

    const mutation = useMutation({
        mutationFn: ({ id, comment }: { id: string; comment: string }) => updateComment(id, comment),
        onSuccess: () => {
            toast.success('Comment updated successfully!');
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            queryClient.invalidateQueries(['allcomplaints']);
        },
        onError: () => {
            toast.error('Error updating comment');
        },
    });

    const handleEdit = (id: string, currentComment: string) => {
        setEditingId(id);
        setNewComment(currentComment);
    };

    const handleUpdateComment = () => {
        if (editingId && newComment.trim()) {
            mutation.mutate({ id: editingId, comment: newComment });
            setEditingId(null);
            setNewComment('');
        }
    };

    React.useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', { id: 'promiseComplaints' });
        }
        if (isError) {
            toast.error('Error while getting the data!', { id: 'promiseComplaints' });
        }
        if (isSuccess) {
            toast.success('Got the data successfully!', { id: 'promiseComplaints' });
        }
    }, [isError, isLoading, isSuccess]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'is_responded',
            headerName: 'Responded',
            width: 100,
            type: 'boolean',
        },
        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <div className="flex justify-center items-center">
                    <EditIcon
                        onClick={() => handleEdit(params.row.id, params.row.comment || '')}
                        className="cursor-pointer"
                        color="primary"
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="w-full p-2 m-0">
            <div className="w-full flex flex-col gap-2">
                <div className="w-full flex justify-between mb-4">
                    <div className="flex flex-col items-start">
                        <h2 className="text-xl font-bold text-base-content dark:text-neutral-200">
                            Complaints
                        </h2>
                        {data && data.length > 0 && (
                            <span className="text-neutral dark:text-neutral-content">
                                {data.length} Complaints Found
                            </span>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <DataTable
                        slug="complaints"
                        columns={columns}
                        rows={[]}
                    />
                ) : isSuccess ? (
                    <DataTable
                        slug="complaints"
                        columns={columns}
                        rows={data?.data || []}
                    />
                ) : (
                    <>
                        <DataTable
                            slug="complaints"
                            columns={columns}
                            rows={[]}
                        />
                        <div className="text-center text-red-500">
                            Error while getting the data!
                        </div>
                    </>
                )}

                {editingId !== null && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h2 className="text-lg font-bold">Edit Comment</h2>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="textarea textarea-bordered w-full"
                                rows={4}
                            />
                            <div className="modal-action">
                                <button
                                    onClick={handleUpdateComment}
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewComment('');
                                    }}
                                    className="btn"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {isOpen && (
                    <AddData
                        slug={'complaint'}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                )}
            </div>
        </div>
    );
};

export default Complaints;
