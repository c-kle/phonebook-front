import React from 'react';
import useSearchAddress from './useSearchAddresses';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50%',
  },
}));

const AddressList = () => {
  const classes = useStyles();
  const { inputText, setInputText, order, orderBy, handleSort, search } = useSearchAddress();

  return (
    <Container>
      <Paper>
        <TextField
          id="search"
          className={classes.textField}
          label="Filter"
          value={inputText}
          onChange={ e => setInputText(e.target.value)}
          margin="normal"
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell size={'small'}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={handleSort('name')}>Name</TableSortLabel>
              </TableCell>
              <TableCell size={'small'}>
                <TableSortLabel
                  active={orderBy === 'phone_number'}
                  direction={order}
                  onClick={handleSort('phone_number')}>Phone number</TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'address'}
                  direction={order}
                  onClick={handleSort('address')}>Address</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          {search.result && (
            <TableBody>
              {search.result.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {search.loading && <LinearProgress />}
      </Paper>
    </Container>
  );
}

export default AddressList;