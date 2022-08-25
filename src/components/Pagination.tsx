import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


type propstype = {
    count: number
    pageNumber: number
    handlePagination: (event: React.ChangeEvent<unknown>, value: number) => void
}


export default function PaginationCharacters({count, pageNumber,handlePagination}:propstype) {
    const [page, setPage] = React.useState(1);


    return (
        <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={Math.ceil(count)} page={pageNumber} onChange={handlePagination} />
        </Stack>
    );
}