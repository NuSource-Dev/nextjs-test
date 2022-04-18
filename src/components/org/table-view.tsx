import React, {FC} from "react";
import {
    Paper, Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {Repository} from "@src/models";

interface Props {
    loading: boolean
    repositories: Repository[]
}

const TableView: FC<Props> = ({repositories, loading = false}) => {
    return (
        <TableContainer component={Paper} sx={{mt: 2}}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Full name</TableCell>
                        <TableCell align="center">Slug</TableCell>
                        <TableCell align="center">Is private</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Stale</TableCell>
                        <TableCell align="center">Update count</TableCell>
                        <TableCell align="center">PR count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        loading ?
                            <TableRow>
                                {
                                    [1, 1, 1, 1, 1, 1, 1].map((value, index) => (
                                        <TableCell align="center" key={index}>
                                            <Skeleton variant="text"/>
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                            : repositories.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={7} align="center">No Result</TableCell>
                            </TableRow>
                            : repositories.map((row) => (
                                <TableRow
                                    key={row.slug}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>{row.full_name}</TableCell>
                                    <TableCell align="center">{row.slug}</TableCell>
                                    <TableCell align="center">{row.private ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{row.status}</TableCell>
                                    <TableCell align="center">{row.stale ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{row.update_count}</TableCell>
                                    <TableCell align="center">{row.pr_count || '-'}</TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;