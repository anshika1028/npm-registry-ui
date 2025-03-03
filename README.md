# NpmRegistryUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

# Fullstack Engineer - Frontend Focused Assessment - NPM Search UI

This project implements a simple search UI for the NPM registry using Angular and TypeScript.

## Requirements

- Search an NPM package by text.
- List the results in a paginated grid layout.
- Display the package name, author, and last updated date in the grid.
- Click on a package to view detailed information (name, author, updated date, description, license, readme, version, etc.).
- Implement relevant and useful UI elements to improve UX.

## API

The project uses the NPM registry API, specifically the search and package details endpoints.

- Search: `https://registry.npmjs.org/-/v1/search?text=<search_term>&size=<page_size>&from=<offset>`
- Package details: `https://registry.npmjs.org/<package_name>`

## Assumptions and Choices

### System Design

1.  **Angular Framework:** Angular was chosen for its robust architecture, strong typing with TypeScript, and rich ecosystem of libraries.
2.  **Component-Based Architecture:** The UI is structured into reusable components for search, package list, and package details.
3.  **RxJS for Asynchronous Operations:** RxJS is used to handle API requests and data streams, providing a reactive and efficient way to manage asynchronous operations.
4.  **HTTP Client:** Angular's `HttpClient` module is used to make API requests to the NPM registry.
5.  **Pagination:** CDS Paginator is used for handling pagination and providing a user-friendly experience.
6.  **Data Modeling:** Interfaces are defined to model the data received from the API, ensuring type safety and code clarity.
7.  **Service Layer:** A dedicated service (`NpmRegistryService`) is created to encapsulate API calls and data processing logic, promoting separation of concerns.
8.  **State Management (Simple):** For this assessment, a simple component state is used. For a more complex application, a state management library like NgRx or Akita would be beneficial.
9.  **Loading Indicators:** Loading indicators are implemented to provide visual feedback during API requests.
10. **Error Handling:** Basic error handling is implemented to display error messages in case of API failures.
11. **ReadMe Display:** For Readme, I'm displaying the raw text. For a production system, a markdown parser should be used to display the readme properly.
12. **Material UI:** carbon design system is used to implement a clean and user-friendly UI.

### UX Choices

1.  **Clear Search Input:** A prominent search input field is provided with a clear label and placeholder.
2.  **Pagination Control:** `CDS Paginator` is used to provide intuitive pagination controls.
3.  **Loading Indicators:** Loading indicators provide feedback during API requests.
4.  **Error Messages:** Error messages are displayed to inform the user of any issues.
5.  **Detailed Package View:** A dedicated component is used to display detailed package information when a package is selected.
6.  **Clear Data Presentation:** Data is presented in a clear and organized manner, with appropriate labels and formatting.
7.  **Responsive Design:** Angular CDS components provide responsive design out of the box.

## Installation and Running

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

    or

    unzip the file

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the application:**

    ```bash
    ng serve
    ```

4.  **Open the application in your browser:**

    ```
    http://localhost:4200/
    ```

## Testing

1.  **Run unit tests:**
    To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

    ```bash
    ng test
    ```

2.  **Run end-to-end tests:**

    ```bash
    ng e2e
    ```

## Project Structure

src/
├── app/
│ ├── components/
│ │ ├── package-detail/
│ │ │ ├── package-detail.component.html
│ │ │ ├── package-detail.component.ts
│ │ │ ├── package-detail.component.spec.ts
│ │ ├── package-list/
│ │ │ ├── package-list.component.html
│ │ │ ├── package-list.component.ts
│ │ │ ├── package-list.component.spec.ts
│ │ ├── search/
│ │ │ ├── search.component.html
│ │ │ ├── search.component.ts
│ │ │ ├── search.component.spec.ts
│ ├── services/
│ │ ├── npm-registry.service.ts
│ │ ├── npm-registry.service.spec.ts
│ ├── models/
│ │ ├── package.model.ts
│ ├── app.component.html
│ ├── app.component.ts
│ ├── app.module.ts
├── environments/
│ ├── environment.prod.ts
│ ├── environment.ts
├── assets/
├── styles.css
├── ...

## Bonus Points

- **Clear Commits:** The commit history is organized and descriptive.
- **User-Friendly README:** This README provides detailed instructions and explanations.
- **UX Choices:** The UI is designed with a focus on usability and clarity.

## Future Improvements

- **State Management:** Implement a state management library for better data flow and maintainability.
- **Advanced Search Filters:** Add filters for author, keywords, and other criteria.
- **Sorting:** Allow users to sort search results by different criteria.
- **Error Handling:** Implement more robust error handling and user feedback.
- **Markdown Parsing:** Use a markdown parser to display the README content correctly.
- **Unit and E2E Testing:** Add more comprehensive tests to cover all aspects of the application.
- **Accessibility:** Improve accessibility by following ARIA guidelines.
- **Deployment:** Add configurations for deploying the application to a production environment.
- **More detailed package information**: Display the package's dependencies, dependents, and other relevant information.
- **Caching**: Implement caching for the search results and package details to improve performance and reduce API requests.
