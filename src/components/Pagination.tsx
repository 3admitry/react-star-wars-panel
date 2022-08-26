import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material';

type propstype = {
    count: number
    pageNumber: number
    handlePagination: (event: React.ChangeEvent<unknown>, value: number) => void
}

export default function PaginationCharacters({count, pageNumber, handlePagination}: propstype) {

    const CustomizedPagination = styled(Pagination)`
      & .MuiPagination-ul {
        justify-content: center;
      }
    `;

    return (
        <Stack spacing={2} sx={{margin: 2,}}>
            <CustomizedPagination count={Math.ceil(count)} page={pageNumber} onChange={handlePagination}/>
        </Stack>
    );
}