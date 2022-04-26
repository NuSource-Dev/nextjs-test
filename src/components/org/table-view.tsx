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
import {timeFormatter} from "@src/utils/helpers";

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
                        <TableCell align="center">Forks count</TableCell>
                        <TableCell align="center">Language</TableCell>
                        <TableCell align="center">Pushed At</TableCell>
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
                                <TableCell colSpan={7} align="center">No Repositories</TableCell>
                            </TableRow>
                            : repositories.map((row) => (
                                <TableRow
                                    key={row.slug}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>{row.full_name}</TableCell>
                                    <TableCell align="center">{row.slug}</TableCell>
                                    <TableCell align="center">{row.private ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{row.status ? 'Disabled' : 'Enabled'}</TableCell>
                                    <TableCell align="center">{row.forks_count}</TableCell>
                                    <TableCell align="center">{row.language}</TableCell>
                                    <TableCell align="center">{timeFormatter(row.pushed_at)}</TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableView;