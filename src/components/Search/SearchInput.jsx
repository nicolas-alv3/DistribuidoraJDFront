// eslint-disable-next-line
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-duplicates */
import React from 'react';
import { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

function SearchInput(props) {
  const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: '5% !important ',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '35ch',
        },
      },
    },
  }));
  const classes = useStyles();
  const [search, setSearch] = React.useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleEnter = () => {
    if (document.activeElement.id === 'searchInputID') {
    // Chequea que el elemento activo sea el input para handlear el enter
      props.history.push({
        pathname: '/search',
        state: {
          searchInput: search,
          previousPath: (props.location.pathname === '/search') ? props.location.state.previousPath : props.location.pathname,
        },
      });
    }
  };

  const handleKeyPress = useCallback((event) => {
    if (event.keyCode === 13) {
      handleEnter(search);
    }
  }, [search]); // Necesita la dependecia search porque pierde el estado

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, [search]);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Código o descripcón..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search', id: 'searchInputID' }}
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default withRouter(SearchInput);
