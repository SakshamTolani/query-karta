# 🚀 Query Karta - Modern SQL Query Editor

![Landing Page](assets/landing.png)

> A high-performance SQL query editor built with React and TypeScript, featuring real-time query execution and result visualization.

## 💡 Overview

SQL Query Editor provides a modern, fast, and intuitive interface for data analysts to write, execute, and visualize SQL queries. Built with performance in mind, it offers features like syntax highlighting, intelligent autocompletion, and efficient rendering of large datasets, making it an ideal tool for data exploration and analysis.

## ✨ Key Features

- Professional Code Editor with Monaco
- Intelligent SQL Autocompletion
- Multiple Query Templates
- High-Performance Data Grid
- Keyboard Shortcuts
- Clean, Modern UI
- Search Functionality
- Responsive Design
- Query History
- Export Functionality

## 📊 Query Templates Library

Our query editor comes with a rich set of pre-built templates:

### 🛍️ Product Analytics
- View all products in catalog
- Products categorized view
- Top 10 most expensive products

### 👥 Customer Intelligence
- Complete customer listing
- Customer distribution by country
- Top 10 customers by sales volume

### 📦 Order Management
- Complete order history
- Orders per employee analysis
- Latest 20 orders tracking

### 👨‍💼 Employee Dashboard
- Employee directory
- Territory-wise employee distribution

## 🔄 System Architecture

### Frontend Flow

![Frontend Flow Diagram](assets/flowchart.png)

### Component Architecture

![Component Architecture](assets/architecture.png)

## ER Diagram

![System Design](assets/erd.png)


## 🛠️ Technical Stack

Here’s your list formatted for the README:

## ⚙️ NPM Modules Used

- `"@chakra-ui/icons": "^2.1.1"` - Provides a set of accessible and customizable icons for Chakra UI components.  
- `"@chakra-ui/react": "^2.10.7"` - A modular and accessible UI library to build modern web applications.  
- `"@emotion/styled": "^11.11.0"` - A library for writing CSS-in-JS styles with a styled-components-like syntax.  
- `"@monaco-editor/react": "^4.7.0"` - Integrates the Monaco editor (VS Code’s editor) into React applications.  
- `"@types/react-window": "^1.8.8"` - Provides TypeScript support for `react-window`, a library for rendering large lists efficiently.  
- `"framer-motion": "^10.16.5"` - Enables smooth animations and transitions in React components.  
- `"react": "^18.2.0"` - The core React library for building UI components.  
- `"react-dom": "^18.2.0"` - Allows React to interact with the DOM.  
- `"react-router-dom": "^7.4.0"` - Enables client-side routing in React applications.  
- `"zustand": "^4.4.6"` - A lightweight state management library for managing application state efficiently.  


## ✅ Pros and Cons of Proposed Solution

### Pros
- Streamlined and user-friendly interface
- Clean architecture with a fallback mechanism
- Clear separation of concerns between data and UI layers
- Full TypeScript integration reduces runtime errors

### Cons
- Monolithic structure; could benefit from microservices along with backend
- Large datasets handling requires virtual scrolling
- Potential for improvements with caching and additional fallback mechanisms


## 📊 Performance Metrics

![Performance Metrics](assets/performance-metrics.png)

### Page Load Time
- Initial Load: ~0.9s
- Subsequent Loads: ~0.8s (leveraging browser caching)
- First Contentful Paint (FCP): ~0.5s
- Largest Contentful Paint (LCP): ~1.52s

### Performance Optimizations
1. **Code Splitting**
   - Lazy loading of Monaco Editor
   - Route-based code splitting

2. **Asset Optimization**
   - Gzip compression enabled
   - Image optimization using Vite plugins

3. **State Management**
   - Efficient state updates using Zustand
   - Memoized selectors for preventing unnecessary rerenders

4. **Large Dataset Handling**
   - Virtualized scrolling for large result sets
   - Chunked data loading
   - Debounced search operations

### Load Time Breakdown

![Performance Metrics](assets/load-time.png)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/SakshamTolani/query-karta

# Install dependencies
cd query-karta
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🎯 Usage

1. Select a query template from the dropdown or write your own SQL
2. Use Ctrl/Cmd + Enter to execute the query
3. View results in the data grid below
4. Export results as CSV if needed

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl + Enter | ▶️ Execute Query |
| Ctrl + S | 💾 Save Query |
| Ctrl + / | 💬 Toggle Comment |
| Ctrl + Space | ✨ Trigger Autocomplete |

## 📝 Demo Queries

Try these sample queries to explore different aspects of the database:

### 🛍️ Products Queries
```sql
-- View all products
SELECT * FROM products;

-- Products with categories
SELECT p.ProductName, c.CategoryName
FROM products p
JOIN categories c ON p.CategoryID = c.CategoryID;

-- Top expensive products
SELECT ProductName, UnitPrice
FROM products
ORDER BY UnitPrice DESC
LIMIT 10;
```

### 👥 Customer Analysis
```sql
-- Customer distribution by country
SELECT Country, COUNT(*) as CustomerCount
FROM customers
GROUP BY Country
ORDER BY CustomerCount DESC;

-- Top performing customers
SELECT 
  c.CustomerID, 
  c.CompanyName, 
  SUM(od.Quantity * od.UnitPrice) as TotalPurchases
FROM customers c
JOIN orders o ON c.CustomerID = o.CustomerID
JOIN order_details od ON o.OrderID = od.OrderID
GROUP BY c.CustomerID
ORDER BY TotalPurchases DESC
LIMIT 10;
```

### 📦 Order Insights
```sql
-- Recent orders tracking
SELECT * FROM orders
ORDER BY OrderDate DESC
LIMIT 20;

-- Employee order performance
SELECT 
  e.FirstName, 
  e.LastName, 
  COUNT(o.OrderID) as OrderCount
FROM employees e
JOIN orders o ON e.EmployeeID = o.EmployeeID
GROUP BY e.EmployeeID
ORDER BY OrderCount DESC;
```

## ⚙️ Configuration

Configure your environment variables in `.env`:

```env
VITE_API_ENDPOINT=your_api_endpoint
VITE_MAX_ROWS=10000
VITE_COMPRESSION_ENABLED=true
```

## 🌟 Future Enhancements

- Query history with undo/redo
- Real-time collaboration
- Query plan visualization
- Schema browser
- Custom theme support

## 📫 Contact

Saksham Tolani Name - [@linkedin](https://linkedin.com/in/saksham-tolani)

Project Link: [https://github.com/SakshamTolani/query-karta](https://github.com/SakshamTolani/query-karta)

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Chakra UI](https://chakra-ui.com/)
- [Atlan Team](https://atlan.com/) for the opportunity


## 🌍Contact

For any inquiries or support, please email us at sakshamtolani@gmail.com or open an issue in this repository.

Happy querying with Query Karta! 🏨

---

Built with ❤️ for Atlan Frontend Internship 2025
