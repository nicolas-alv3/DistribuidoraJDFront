import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/InfoTwoTone';
import Fade from '@material-ui/core/Fade';

export default function TransitionsTooltips(props) {
  return (
    <div>
      <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={props.text}>
        <Button><InfoIcon style={{'font-size':"30pt"}} /></Button>
      </Tooltip>
    </div>
  );
}
