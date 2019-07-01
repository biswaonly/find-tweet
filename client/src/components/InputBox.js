import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { submit } from "../actions/main";

import socketIOClient from "socket.io-client";
import sailsIOClient from "sails.io.js";
import { loadData } from "../actions/main";

const io = sailsIOClient(socketIOClient);
io.sails.url = "http://localhost:1337";

/**
 * SubscribeToTweets
 * sails socket not allow to send the data without subscribing.
 * So, this needs to run first
 */
io.socket.get("/subscribeToTweet", function(res) {
  console.log(res);
});

const InputBox = ({ submit, loadData }) => {
  const [ipText, setIpText] = useState("");

  const onChange = e => {
    setIpText(e.target.value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    console.log("BTN CLICKED");

    submit(ipText);
  };
  // On newTweet event broadcast
  useEffect(() => {
    console.log("came to use effect");
    io.socket.on("newTweet", e => {
      loadData(e);
    });
  }, []);
  return (
    <div className="input_box">
      <h2>Search Tweets Here</h2>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type="text"
          placeholder="Enter Something"
          name="ipText"
          value={ipText}
          onChange={e => onChange(e)}
          required
          autoFocus
        />
        <input type="submit" value="SUBMIT" />
      </form>
    </div>
  );
};
InputBox.propTypes = {
  loadData: PropTypes.func.isRequired,

  submit: PropTypes.func.isRequired
};

export default connect(
  null,
  { submit, loadData }
)(InputBox);
