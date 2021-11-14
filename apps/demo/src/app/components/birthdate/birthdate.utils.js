/* eslint-disable no-useless-escape */
import _ from 'lodash';
import moment from 'moment';

const config = {
  moment: {
    formats: { shortDate: 'DD/MM/YYYY', shortDateDisplay: 'DD/MM/YYYY' }
  }
};

export const shortDate = _.get(config, 'moment.formats.shortDate');
export const shortDateDisplay = _.get(
  config,
  'moment.formats.shortDateDisplay'
);

export const getUserAge = (birthdate) =>
  moment().diff(moment(birthdate, shortDate), 'years');

export const isDateValid = (date) => moment(date, shortDate, true).isValid();

export const getBirthdateSeparator = (birthdateFormat) =>
  birthdateFormat.replace(/[a-zÀ-ž]/gi, '')[0];

// Get the indexes where we should put a separator just after
const getBirthdateSeparatorIndexes = () => {
  const separator = getBirthdateSeparator(shortDateDisplay);

  return Array.from(shortDateDisplay).reduce(
    (separatorsIndexes, char, index) =>
      char === separator
        ? separatorsIndexes.concat(index - 1 - separatorsIndexes.length)
        : separatorsIndexes,
    []
  );
};

export const formatBirthdate = (birthdate) => {
  const separator = getBirthdateSeparator(shortDateDisplay);
  const sliceCases = getBirthdateSeparatorIndexes();

  if (sliceCases.length !== 2) {
    throw new Error(
      `Birthdate should have two separators, found: ${sliceCases.length}`
    );
  }

  return (
    Array.from(birthdate)
      // Filter out anything that is not a number
      .filter((char) => !!parseInt(char, 10) || parseInt(char, 10) === 0)
      .splice(0, 8)
      .reduce(
        (birthdateString, char, index) =>
          sliceCases.includes(index)
            ? birthdateString.concat(char.toString()).concat(separator)
            : birthdateString.concat(char.toString()),
        ''
      )
  );
};
