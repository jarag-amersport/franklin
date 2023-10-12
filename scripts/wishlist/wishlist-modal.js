import { decorateIcons, loadCSS } from '../lib-franklin.js';

export default function showWishlistModal(wishlists, callback) {
  loadCSS('../../styles/wishlist-modal.css', () => {
    document.body.append(document.createRange().createContextualFragment(`
      <div class="wishlist-modal">
        <div class="wishlist-modal-content">
          <div class="wishlist-modal-header">
            <h2>Select which wishlist to add to</h2>
            <button name="close">
              <span class="icon icon-close-gray"></span>
            </button>
          </div>
          <ul>
            ${wishlists.map((wishlist) => `
              <li>
                <button aria-label="Add product to wishlist ${wishlist.name}" data-wishlist-id="${wishlist.id}">
                  ${wishlist.name}
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `));
    document.querySelectorAll('.wishlist-modal button:not([name="close"])').forEach((element) => {
      element.addEventListener('click', (event) => {
        callback(event.target.getAttribute('data-wishlist-id'));
        document.querySelector('.wishlist-modal').remove();
      });
    });
    document.querySelector('.wishlist-modal').addEventListener('click', (event) => {
      const clickedButton = event.target.closest('.wishlist-modal-header button[name="close"]') !== null;
      const clickedBackground = event.target === document.querySelector('.wishlist-modal');

      if (clickedButton || clickedBackground) {
        document.querySelector('.wishlist-modal').remove();
      }
    });
    decorateIcons(document.querySelector('.wishlist-modal-header'));
  });
}
