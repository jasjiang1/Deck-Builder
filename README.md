# Deck-Builder
Made using Mongo, Express, React and Node in Javascript, CSS, and HTML

# To Run
Set up a MongoDB database and replace the connection link in server -> src -> index.js with your own. Then create two terminals, and change their directories: one to "server" and another to "client". Run "npm start" on both. This will launch the application in "localhost:3000".

# To Use
Make an account with a username and password, then login with the account with the "Login/Register" option. This will take you to the "Home" page, where all decks are displayed. This is initially empty.

# Create a Deck
First, click "Create Card". Create a card by providing its name, and an image url. All cards are displayed on a list to the right, and hovering over a card displays its name on the bottom. After creating cards, click "Create Deck". Input a deck name and any notes to go along with the deck. To add cards into the deck, click on a card on a list on the right. To remove a card, click on the card while in the list on the left.

# Saving a Deck
After creating a deck, it will show you to the "Home" page, which will display your deck's name, the creator's name, the list of cards in the deck, and any notes provided. There is also a "Save" button on each deck. Pressing it saves it to the user. These decks can be seen in the "Saved Decks" tab. All users can see and save decks from any other users while on the "Home" page.
