# Address Submission Web App

This is a responsive Vue 3 web application built for collecting user address information, with real-time validation and an interactive map for selecting coordinates.  

## 🚀 Features
- ✅ Step-based address form (info entry → map location → confirmation)
- ✅ Leaflet map integration for precise coordinate selection
- ✅ Field validation with helpful error messages
- ✅ Real-time input validation using `computed()`
- ✅ "Locate Me" button for automatic geolocation
- ✅ Axios integration to submit data to API
- ✅ Responsive, mobile-friendly layout
- ✅ Arabic/Persian (RTL) UI layout

  ----------

  ## 📦 Tech Stack

| Tech           | Description                          |
|----------------|--------------------------------------|
| Vue 3          | Composition API                      |
| Leaflet.js     | Map rendering + geolocation          |
| Vite           | Fast dev server & bundling           |
| Axios          | HTTP requests                        |
| CSS Variables  | Theming and responsiveness           |

---------------

## 📂 Project Structure

├── assets/ # Icons and SVGs

├── components/

│ ├── SubmitAddressSuccess.vue # Success message

│ ├── BaseInput.vue # Reusable input with error support

│ ├── Heaser.vue # Project heaser style

│ ├── LoadingDots.vue # Dots animation for loading time

│ ├── LocationPicker.vue # Pick location 

│ ├── MapPage.vue # Leaflet map with marker support

│ ├── SavedDataCard.vue # Reusable data card for saved-addresses page

│ ├── SubmitButton.vue # Reusable button


├── views/

│ ├── SubmitAddress.vue # Step form controller
│ ├── SavedAddresses.vue # Load and show saved addresses


├── utils/


│ └── validation.js #  Validators for form fields

----------------------

##  Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/alisajadian1/achareh-test.git

# 2. Navigate
cd achareh-test

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev

````
---------------------

 ## ✅ TODO / Suggestions
Here are some ideas for improving the project:

 * Save step form data to localStorage for persistence

 * Add a city selector using reverse geolocation API

 * Add form skeleton loaders for better UX

 * PWA Support for offline access and mobile install

---------------

🧠 Credits

Built by AliSajadian

Design and logic inspired by Achareh technical challenge

Submitted for Ubaar technical test
