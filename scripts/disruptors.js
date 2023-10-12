/* eslint-disable import/no-cycle */
import { getTimestamp } from './scripts.js';

const disruptorsURL = '/disruptors.json';

let disruptors;

async function fetchDisruptors() {
  try {
    // Fetch the JSON data
    const response = await fetch(disruptorsURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    disruptors = data;
  } catch (error) {
    disruptors = []; // so we don't try to fetch again
  }
}

function convertToDate(input) {
  if (!input || Number.isNaN(+input)) {
    return null;
  }

  // From https://github.com/adobe/helix-sidekick-extension/blob/main/src/extension/view/json.js#L31
  const date = +input > 99999
    ? new Date(+input * 1000)
    : new Date(Math.round((+input - (1 + 25567 + 1)) * 86400 * 1000));

  return date.toString() !== 'Invalid Date' ? date : null;
}

async function getActiveDisruptors(category, currentPage) {
  // Fetch disruptors once, otherwise use cached version
  if (!disruptors) {
    await fetchDisruptors();
  }

  const date = new Date(getTimestamp());
  return disruptors
    .filter((item) => {
      // Check category
      if (item.Category !== category) {
        return false;
      }

      // Check page
      if (item.Pages?.toLowerCase() === 'first' && currentPage !== 1) {
        return false;
      }

      // Check dates
      const dateFrom = convertToDate(item['Date from']);
      const dateTo = convertToDate(item['Date to']);
      return (!dateFrom || dateFrom <= date) && (!dateTo || dateTo >= date);
    }).map((item) => {
      // Only allow sizes between 1 and 4
      item.Size = Math.min(Math.max(parseInt(item.Size, 10), 1), 4);
      if (Number.isNaN(item.Size)) {
        item.Size = 1;
      }
      return item;
    });
}

export default getActiveDisruptors;
