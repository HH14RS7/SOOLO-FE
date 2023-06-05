import { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
  :root {
    /* color */
    --color-primary-25: #FFF5F6;
    --color-primary-50: #FFF1F3;
    --color-primary-100: #FFE4E8;
    --color-primary-200: #FECDD6;
    --color-primary-300: #FEA3B4;
    --color-primary-400: #FD6F8E;
    --color-primary-500: #F63D68;
    --color-primary-600: #E31B54;
    --color-primary-700: #C01048;
    --color-primary-800: #A11043;
    --color-primary-900: #89123E;
    
    --color-gray-25 : #FFFFFF;
    --color-gray-50 : #F9FAFB;
    --color-gray-100 : #F2F4F7;
    --color-gray-200 : #E4E7EC;
    --color-gray-300 : #D0D5DD;
    --color-gray-400 : #98A2B3;
    --color-gray-500 : #667085;
    --color-gray-600 : #475467;
    --color-gray-700 : #344054;
    --color-gray-800 : #1D2939;

    --color-success-500: #12B76A;
    --color-error-500 : #F04438;

    --color-tabbar: #F8F9FE;

    --color-black: #000000;
    --color-white : #FFFFFF;

    /* font size */
    --font-large: 1.5rem;
    --font-medium: 1.25rem;
    --font-regular: 1rem;
    --font-small: 0.875rem;
    --font-micro: 0.75rem;
    --font-nano: 0.625rem;

    /* font weight */
    --font-wegith-700 : 700;
    --font-wegith-600 : 600;
    --font-wegith-500 : 500;
    --font-wegith-400 : 400;
  }

  /* font-style */
  body {
    font-family: "Pretendard Variable", Pretendard
  }

  /* Typography */

  html { 
    font-size :16px;
  }

  /* Title 24 */
  h1 {
    font-style: normal;
    font-weight: var(--font-wegith-700);
    font-size: var(--font-large);
    line-height: 100%;
    letter-spacing: -0.015em;
  }

  /* Title 20 */ 
  h2 { 
    font-style: normal;
    font-weight: var(--font-wegith-700);
    font-size: var(--font-medium);
    line-height: 100%;
    letter-spacing: -0.015em;
  }
  
  /* Title 16 */
  h3 {
    font-style: normal;
    font-weight: var(--font-wegith-600);
    font-size: var(--font-regular);
    line-height: 100%;
    letter-spacing: -0.015em;
  }
  
  /* body 16 */
  h4 { 
    font-style: normal;
    font-weight: var(--font-wegith-400);
    font-size: var(--font-regular);
    line-height: 100%;
    letter-spacing: -0.015em;
  }

  / * body 14 */
  h5 {
    font-style: normal;
    font-weight: var(--font-micro-400);
    font-size: var(--font-small);
    line-height: 100%;
    letter-spacing: -0.015em;
  }

  / * caption 12-bold */
  h6 {
    font-family: 'Inter';
    font-style: normal;
    font-weight: var(--font-wegith-700);
    font-size: var(--font-micro);
    line-height: 100%;
    letter-spacing: -0.015em;
  }

  /* caption 10 */
  p {
    font-family: 'Inter';
    font-style: normal;
    font-weight: var(--font-weight-400);
    font-size: var(--font-nano);
    line-height: 14px;
    letter-spacing: -0.015em;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input:focus {
    outline: none;
  }

  button {
    border: 0 none;
    background: none;
    cursor: pointer;
  }
  
  li {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: none;
  }


`;

export default GlobalStyle;
