'use client';

import { DataGridPro, DataGridProProps } from '@mui/x-data-grid-pro';

export interface DataTableProps extends DataGridProProps {
   tableHeight?: number | string;
   hideFooter?: boolean;
   page?: number;
   perPage?: number;
   totalItems?: number;
   showToolbar?: boolean;
   entity?: string;
   onChangePage?(page: number): void;
   onChangePerPage?(perPage: number): void;
   dataFilter?: any;
   currency?: string;
   onCellClick?: () => void;
   getRowId?: (params: any) => any;
}
export function addGridRowId(rowData, getRowId) {
   return getRowId == null ? rowData : { ...rowData, id: getRowId(rowData) };
}

const AppDataTable: React.FC<any> = (props) => {
   const {
      tableHeight,
      hideFooter,
      entity,
      page,
      showToolbar,
      perPage,
      totalItems,
      selectionModel,
      autoHeight,
      onChangePage,
      onChangePerPage,
      currency,
      dataFilter,
      onCellClick,
      getRowId,
      rows,
      ...rest
   } = props;
   const rowsWithId = rows.map((row) => addGridRowId(row, getRowId));

   return (
      <DataGridPro
         hideFooter
         disableColumnMenu
         sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
               whiteSpace: 'break-spaces',
               lineHeight: 1,
            },
            '& .MuiDataGrid-cell': {
               '&:focus': {
                  backgroundColor: 'transparent !important', // Xóa nền khi cell được focus
                  outline: 'none', // Xóa outline
               },
            },
         }}
         columnHeaderHeight={60}
         rowHeight={60}
         rowBufferPx={35}
         rows={rowsWithId}
         onCellClick={onCellClick}
         {...rest}
      />
   );
};

export default AppDataTable;
