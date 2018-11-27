import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';
import Identicons from './identicons';

/**
 * IdenticonsIcon :  This component is meant for rendering IdenticonsIcon list in create account screen of wallet setup.
 */

export default class IdenticonsIcon extends Component {
  /**
   * getRadioIconData() : Function to handle selected Identicon, from list of icons.
   * @param {string} identiconsId
   */
  getRadioIconData(identiconsId) {
    const SELF = this;
    const { getRadioIconData } = SELF.props;
    if (getRadioIconData) {
      getRadioIconData(identiconsId);
    }
  }

  render() {
    const SELF = this;
    const { index, date } = SELF.props;
    const iconIndex = index.toString();
    const currentDate = date.toString();
    const identiconsId = iconIndex + currentDate;
    const { accountIcon } = SELF.props;
    let checked = false;
    if (accountIcon && accountIcon === identiconsId) {
      checked = true;
    }
    return (
      <li>
        <FormGroup className="form-radio-label">
          <input
            name="name"
            className="form-radio-field"
            type="radio"
            value={checked}
            defaultChecked={checked}
            onClick={() => this.getRadioIconData(identiconsId)}
          />
          <i className="form-radio-button" />
          <div className="d-inline-block theme-blue-shadow identicon-boxes-container">
            <Identicons id={identiconsId} width={40} size={3} />
          </div>
        </FormGroup>
      </li>
    );
  }
}

/**
 * Custom setting props to be passed for Header display changes:
 *
 * accountIcon: Selected account icon for wallet account.
 * index: Index of selected icon from list.
 * date:  Constant string for creating a Identicons.
 *
 */

IdenticonsIcon.defaultProps = {
  date: '00000',
};