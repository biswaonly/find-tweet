import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Card from "./Card";

const Content = ({ data }) => {
  const [state, setState] = useState(9);

  const onClick = () => {
    setState(state + 10);
  };

  return (
    <Fragment>
      <div>
        <button className="btn_load_more" onClick={onClick}>
          LOAD MORE
        </button>
      </div>
      <div className="content">
        {data.map((item, index) => {
          if (index > data.length - state) {
            return <Card id={index} item={item} />;
          } else {
            return null;
          }
        })}
      </div>
    </Fragment>
  );
};

Content.propTypes = {
  data: PropTypes.array
};

const mapStateToProps = state => ({
  data: state.main.data
});

export default connect(mapStateToProps)(Content);
