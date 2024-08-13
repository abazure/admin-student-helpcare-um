import React from 'react';
import {DataGrid, GridColDef, GridToolbar} from '@mui/x-data-grid';

interface DataTableProps {
    columns: GridColDef[];
    rows: object[];
    slug: string;
}

interface DataTableProps {
    includeActionColumn?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DataTable: React.FC<DataTableProps> = ({columns, rows}) => {
    return (
        <div className="w-full bg-base-100 text-base-content">
            <DataGrid
                className="dataGrid p-0 xl:p-3 w-full bg-base-100 text-white"
                rows={rows}
                columns={columns}
                getRowHeight={() => 'auto'}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{toolbar: GridToolbar}}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: {debounceMs: 500},
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
};

export default DataTable;
