import React from "react";
import TextInput from "../TextInput/textInput";
import classes from "./checkoutTextInput.module.css";

export default function CheckoutTextInput(props) {
  return <TextInput {...props} classes={classes} />
}
