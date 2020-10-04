import React from "react"
import { Checkbox, FormControlLabel } from "@material-ui/core"

const ShowColumnCheckbox = (props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.chosenColumns.indexOf(props.name) >= 0}
          onChange={props.handleChange}
          name={props.name}
        />
      }
      label={props.label}
    />
  )
}

export default ShowColumnCheckbox