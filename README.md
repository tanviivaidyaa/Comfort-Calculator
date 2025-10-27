# Comfort Calculator 💼

A modern React application that calculates the income needed to live comfortably as a working professional in different US states and cities. The app uses real-time cost of living data inspired by Numbeo's methodology to provide accurate income estimates.

## Features

- 🏙️ **50 US States Coverage** - Select from all 50 states and their major cities
- 💰 **Real-time Calculations** - Get accurate income estimates based on current cost of living data
- 📊 **Detailed Breakdown** - See itemized monthly costs for housing, food, transportation, and more
- 📈 **Cost of Living Indices** - Compare your selected city to New York City (baseline)
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd comfort-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit `http://localhost:3000`

## How It Works

The Comfort Calculator uses a sophisticated algorithm that:

1. **Collects Cost Data** - Gathers cost of living indices for major US cities
2. **Calculates Base Costs** - Determines monthly expenses for:
   - Housing (1-bedroom apartment in city center)
   - Groceries and dining
   - Transportation
   - Utilities
   - Healthcare
   - Entertainment
   - Savings
3. **Adjusts for Location** - Applies city-specific cost indices
4. **Adds Tax Buffer** - Includes 30% buffer for taxes and unexpected expenses
5. **Presents Results** - Shows both monthly and annual income recommendations

## Cost Assumptions

The calculator assumes a comfortable lifestyle for a single working professional:
- 1-bedroom apartment in city center
- Regular grocery shopping and dining out
- Public transportation or car ownership
- Health insurance and medical care
- Entertainment and leisure activities
- Emergency fund and retirement savings

## API Integration

The current implementation uses simulated data based on Numbeo's cost of living indices. For production use with real-time data:

1. Sign up for a Numbeo API key at [https://www.numbeo.com/common/api.jsp](https://www.numbeo.com/common/api.jsp)
2. Update the `numbeoApi.js` file with your API key
3. Uncomment the actual API call implementation

## Technologies Used

- **React 18** - Modern React with hooks
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations and gradients
- **Google Fonts (Inter)** - Professional typography

## Project Structure

```
comfort-calculator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── StateSelector.js
│   │   ├── StateSelector.css
│   │   ├── ResultsDisplay.js
│   │   ├── ResultsDisplay.css
│   │   ├── LoadingSpinner.js
│   │   └── LoadingSpinner.css
│   ├── data/
│   │   └── statesData.js
│   ├── services/
│   │   └── numbeoApi.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Future Enhancements

- [ ] Integration with live Numbeo API
- [ ] Comparison between multiple cities
- [ ] Adjustable lifestyle parameters (luxury, moderate, frugal)
- [ ] Family size considerations
- [ ] Historical cost trends
- [ ] Export results as PDF
- [ ] Share results via social media

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Disclaimer

The income estimates provided by this calculator are based on average costs and general assumptions. Actual costs may vary based on individual lifestyle choices, personal circumstances, and market conditions. This tool is for informational purposes only and should not be considered financial advice.

## Contact

For questions or feedback, please open an issue on the project repository.

---

Built with ❤️ for working professionals seeking their next opportunity
