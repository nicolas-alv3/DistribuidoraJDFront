import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Pages(props) {
  const classes = useStyles();
  const handleChange = (event, value) => {
    props.onChange(value);
  };
  const pagination = () => {
    if (props.visible) {
      return <Pagination className="pagination" page={props.page} onChange={handleChange} count={props.count} color="primary" />;
    }
    return <div />;
  };
  return (
    <div className={`pagination ${classes.root}`}>
      {pagination}
    </div>
  );
}
