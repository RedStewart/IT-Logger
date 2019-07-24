import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteLog,
  setCurrentLog,
  clearSearch
} from '../../actions/logActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const LogItem = ({ filtered, log, deleteLog, setCurrentLog, clearSearch }) => {
  const onDelete = () => {
    deleteLog(log._id);

    if (filtered !== null) clearSearch();

    M.toast({ html: 'Log Deleted' });
  };

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${
            log.attention ? 'red-text' : 'blue-text'
          }`}
          onClick={() => setCurrentLog(log)}
        >
          {log.message}
        </a>
        <br />
        <span className='grey-text'>
          <span className='black-text'>ID #{log._id}</span> last updated by{' '}
          <span className='black-text'>{log.tech}</span> on{' '}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment>
        </span>
        <a href='#!' className='secondary-content' onClick={onDelete}>
          <i className='material-icons grey-text icon-delete'>delete</i>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrentLog: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  filtered: state.log.filtered
});

export default connect(
  mapStateToProps,
  { deleteLog, setCurrentLog, clearSearch }
)(LogItem);
