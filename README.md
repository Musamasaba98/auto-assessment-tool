# Project Auto Assessment Tool

Automated tool for assessing student projects created using HTML and CSS. This tool utilizes Puppeteer for fetching project URLs and Cheerio for analyzing project structure based on predefined criteria.

## Features

- **Automated Assessment**: Fetches student project URLs using Puppeteer and analyzes HTML/CSS structure using Cheerio.
- **Scoring Criteria**: Evaluates projects based on predefined criteria such as presence of sections, use of CSS techniques, and responsiveness.
- **Headless Operation**: Runs in headless mode for seamless integration in server-side applications.

## Installation

Clone the repository:

```bash
git clone https://github.com/username/project-portfolio-assessment.git
cd project-portfolio-assessment


```

Install dependencies

```bash
yarn

```

### Usage

1. Add Student Project URLs: Edit `students.js` to include URLs of student projects.
2. Run the Assessment Tool:
   ```bash
   yarn start
   ```

### Requiremets

- Node.js
- Puppeteer
- Cheerio
- Express
- nodemon

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests

## License

This project is licensed under the MIT License - see the LICENSE file for details.
