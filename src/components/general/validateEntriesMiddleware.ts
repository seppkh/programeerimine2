import moment from 'moment';

const validateEntries = {
  isOnlyLetters: (word: string) => {
    if (!(/^[a-zA-ZõäöüÕÄÖÜ ]*$/.test(word))) return false;
    return true;
  },
  isOnlyLettersAndNumber: (word: string) => {
    if (!(/^[a-zA-ZõäöüÕÄÖÜ0-9\-_ ]*$/.test(word))) return false;
    return true;
  },
  isEmptyString: (word: string) => {
    console.log(word);
    let trimmedWord;
    if (typeof word === 'string') {
      trimmedWord = word.trim();
    }
    console.log(trimmedWord);
    if (!(trimmedWord === '')) return false;
    return true;
  },
  isEmail: (email: string) => String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
  isAtLeastFourDigits: (word: string) => {
    if (word.length < 4) return false;
    return true;
  },
  isPositiveNumber(value: any) {
    return Number.isInteger(value)
            && value > 0
            && !Number.isNaN(value);
  },
  isDate(value: string) {
    console.log(value);
    console.log(moment(value, moment.ISO_8601, true).isValid());
    return moment(value, moment.ISO_8601, true).isValid();
  },
  convertToIsoDate(value: string) {
    console.log(value);
    const newDate = (new Date(value));
    const result = (new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000));
    console.log(result);
    return result;
  },
};

const validateDateTime = /^((((19|[2-9]d)d{2})[/.-](0[13578]|1[02])[/.-](0[1-9]|[12]d|3[01])s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]d)d{2})[/.-](0[13456789]|1[012])[/.-](0[1-9]|[12]d|30)s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((19|[2-9]d)d{2})[/.-](02)[/.-](0[1-9]|1d|2[0-8])s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]))|(((1[6-9]|[2-9]d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))[/.-](02)[/.-](29)s(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])))$/g;

export { validateEntries, validateDateTime };
