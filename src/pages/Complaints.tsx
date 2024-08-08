import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../components/DataTable';
import { fetchComplaints } from '../api/ApiCollection'; // Assuming this is the function to fetch complaints
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import AddData from '../components/AddData';

const Complaints = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { isLoading, isError, isSuccess, data } = useQuery({
        queryKey: ['allcomplaints'],
        queryFn: fetchComplaints,
    });

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
    ];

    React.useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', { id: 'promiseComplaints' });
        }
        if (isError) {
            toast.error('Error while getting the data!', {
                id: 'promiseComplaints',
            });
        }
        if (isSuccess) {
            toast.success('Got the data successfully!', {
                id: 'promiseComplaints',
            });
        }
    }, [isError, isLoading, isSuccess]);

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
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
                    >
                        Add New Complaint +
                    </button>
                </div>

                {isLoading ? (
                    <DataTable
                        slug="complaints"
                        columns={columns}
                        rows={[]}
                        includeActionColumn={true}
                    />
                ) : isSuccess ? (
                    <DataTable
                        slug="complaints"
                        columns={columns}
                        rows={data?.data || []} // Adjusting based on the API response structure
                        includeActionColumn={true}
                    />
                ) : (
                    <>
                        <DataTable
                            slug="complaints"
                            columns={columns}
                            rows={[]}
                            includeActionColumn={true}
                        />
                        <div className="text-center text-red-500">
                            Error while getting the data!
                        </div>
                    </>
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
