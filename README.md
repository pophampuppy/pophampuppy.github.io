# Letsinnovate Marketing Website

This repository contains the source code for the Letsinnovate marketing website, built with native HTML, CSS, and JavaScript. The project is designed to be lightweight, fast, and easy to modify without requiring any complex build tools or package managers.

## ✨ Features

-   **Fully Responsive:** The layout adapts seamlessly to all screen sizes, from mobile phones to desktop monitors.
-   **Component-Based Layout:** Reusable components like the navbar and footer are loaded dynamically with JavaScript's `fetch` API to keep the code DRY.
-   **Modern & Animated UI:** The design features an orange-based theme, subtle hover effects, and on-scroll animations to create an engaging user experience.
-   **Dynamic Content:** Includes an animated stats counter and a flying paper airplane animation on the homepage.
-   **Integration Ready:** The contact form is hooked up to placeholder functions for Supabase, Zoho, Airtable, and Notion, making it easy to add real backend logic.

## 🛠️ Tech Stack

-   **HTML5:** For the core structure and content.
-   **CSS3:** For all styling, utilizing CSS Variables for easy theming.
-   **JavaScript (ES6+):** For interactivity, dynamic content loading, and form handling.
-   **Google Fonts:** Using the "Poppins" font for a clean, modern look.

## 🚀 Getting Started

Because the website uses the `fetch()` API in JavaScript to load the navbar and footer from separate files, you cannot run it by simply opening the `.html` files in your browser from the local filesystem (i.e., using the `file://` protocol). This will be blocked by the browser's security policies (CORS).

To view the website correctly, you need to serve the files from a simple local web server.

### Instructions:

1.  **Open a terminal or command prompt.**
2.  **Navigate into the `src` directory** of this project:
    ```sh
    cd src
    ```
3.  **Start a local web server.** If you have Python 3 installed, you can easily do this by running:
    ```sh
    python -m http.server
    ```
    If you have Python 2, use `python -m SimpleHTTPServer`.
    Alternatively, you can use a tool like the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for Visual Studio Code.

4.  **Open your web browser** and go to the following address:
    [http://localhost:8000](http://localhost:8000)

You should now see the Letsinnovate homepage!

## 📂 Project Structure

```
.
└── src/
    ├── assets/         // Placeholder for images, icons, etc.
    ├── blog/           // Contains individual blog post pages.
    ├── css/
    │   └── style.css   // Main stylesheet.
    ├── js/
    │   └── main.js     // Main JavaScript file for interactivity.
    ├── layout/
    │   ├── footer.html // Reusable footer component.
    │   └── navbar.html // Reusable navbar component.
    ├── lib/            // For third-party integrations (Supabase, Zoho, etc.).
    ├── index.html      // Home page.
    ├── corporates.html // Corporates page.
    ├── startups.html   // Startups page.
    ├── blog.html       // Blog list page.
    └── contact.html    // Contact page.
```

## 🎨 Customization

### Theming
All core theme values (colors, fonts, etc.) are defined as **CSS Variables** at the top of the `src/css/style.css` file. You can easily change the entire site's look and feel by modifying these variables.

### Integrations
The contact form submission logic is handled in `src/js/main.js`. It calls mock functions from the files inside the `src/lib/` directory. To connect to your real backend services, replace the placeholder logic in these files (`supabase.js`, `zoho.js`, etc.) with your actual API calls. 