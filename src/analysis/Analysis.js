import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  });
  
  class SimpleTabs extends React.Component {
    state = {
      value: 0,
    };
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    render() {
      const { classes } = this.props;
      const { value } = this.state;
  
      return (
        <div className={classes.root}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="Notebook" />
              <Tab label="PiFlow" />
            </Tabs>
          {value === 0 && <TabContainer><iframe src="http://10.0.88.41:8080" width="100%" height="1080px" /></TabContainer>}
          {value === 1 && <TabContainer><iframe src="http://10.0.88.41:8080" width="100%" height="1080px" /></TabContainer>}
        </div>
      );
    }
  }
  
  SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SimpleTabs);