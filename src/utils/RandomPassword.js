import { KEYS } from './constants';

const getKey = [
  function uppercase() {
    return KEYS.uppercase[Math.floor(Math.random() * KEYS.uppercase.length)];
  },
  function lowercase() {
    return KEYS.lowercase[Math.floor(Math.random() * KEYS.lowercase.length)];
  },
  function numeric() {
    return KEYS.numeric[Math.floor(Math.random() * KEYS.numeric.length)];
  },
  function symbol() {
    return KEYS.symbol[Math.floor(Math.random() * KEYS.symbol.length)];
  },
];
const type = ['uppercase', 'lowercase', 'numeric', 'symbol'];
export default function GeneratePassword(customLength, customPassword) {
  let password = '';
  while (customLength > password.length) {
    const randomNum = Math.floor(Math.random() * getKey.length);
    const funcName = type[randomNum];
    const keyToAdd = getKey[randomNum];
    const isChecked = customPassword[`${funcName}`];
    if (isChecked) {
      password += keyToAdd();
    }
  }
  return password;
}
