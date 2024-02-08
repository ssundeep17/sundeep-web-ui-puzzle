
TASK 1:

Default installation of all packages results in import failure, even with absolute path for @tmo/shared/models.
Fixed: Exception handling was missing in the getReadingList API.
Fixed: Exception handling was missing in the addToReadingList API.
Fixed: Exception handling was missing in the removeFromReadingList API.
There are several instances of missing types.
Avoid using symbols in folder names (example: _+_state).
Ensure the use of descriptive variable names (refer to book-search.component.html, reading-list.component.html).
Lighthouse Issues:

Fixed: Buttons lacked an accessible name.
Fixed: Insufficient contrast ratio between background and foreground colors.
Manually Fixed Accessibility Issues:

Improved accessibility for the book card in book-search.component.html.
Enhanced accessibility for the "Want to Read" button.
Improved accessibility for the close button in the My Reading List Drawer.