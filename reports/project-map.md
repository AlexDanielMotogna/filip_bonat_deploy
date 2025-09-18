# Filip Bonat Web Application - Project Map

## Project Structure Overview

### Root Configuration
- `.gitignore`: Version control ignore file
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `vite.config.ts`: Vite build configuration

### Source Directory (`src/`)

#### Core Application
- `App.tsx`: Main application component
- `main.tsx`: Entry point for React application
- `vite-env.d.ts`: TypeScript environment declarations

#### Components (`src/components/`)
1. Page Components
   - `About.tsx`
   - `Blog.tsx`
   - `Contact.tsx`
   - `Main.tsx`
   - `Portfolio.tsx`
   - `Service.tsx`
   - `Skills.tsx`
   - `Testimonials.tsx`

2. Utility Components
   - `ContactModal.tsx`: Modal for contact options
   - `GoogleMapLocation.tsx`
   - `IconVertical.tsx`
   - `Loader.tsx`
   - `Sidebar.tsx`
   - `ThemeToggle.tsx`
   - `TopNav.tsx`

3. Wrapper Components
   - `AppProviders.tsx`: Likely manages global providers

#### Pages (`src/pages/`)
- `blog-single/`: Blog detail page
- `HomePage/`: Main landing page
- `preview/`: Preview page

#### Routing (`src/routes/`)
- `index.tsx`: Route definitions
- `router.tsx`: Router configuration

#### Context (`src/context/`)
- `useLayoutContext.tsx`: Layout-related context management

#### Helper (`src/helper/`)
- `constants.ts`: Global constants

#### Types (`src/types/`)
- `layouts.ts`
- `other.ts`: Type definitions

### Assets (`src/assets/`)

#### Styles (`src/assets/scss/`)
1. Components Styles
   - `_about.scss`
   - `_contact-modal.scss`
   - `_hero.scss`
   - `_main.scss`
   - `_mobile-menu.scss`
   - `_service.scss`

2. Layout Styles
   - `layout/blog/`
   - `layout/footer/`
   - `layout/header/`
   - `layout/menu/`
   - `layout/pages/`

3. Theme Styles
   - `theme/_comon.scss`
   - `theme/_spacing.scss`
   - `theme/_theme.scss`

4. Utility Styles
   - `utils/_breakpoints.scss`
   - `utils/_colors.scss`
   - `utils/_typography.scss`

#### Images
- Organized in subdirectories:
  - `all-images/`
  - `elements/`
  - `icons/`
  - `logo/`
  - `video/`

#### Fonts
- Web fonts in `fonts/` directory

## Technology Stack
- React
- TypeScript
- Vite
- SCSS
- React Router
- AOS (Animate on Scroll)

## Key Features
- Responsive Design
- Theme Toggle
- Contact Modal
- Multiple Page Components
- Modular SCSS Architecture

## Performance Considerations
- Vite for fast builds
- Code splitting
- Modular component structure

## Potential Improvements
- Implement proper routing
- Add more robust state management
- Enhance accessibility
- Optimize asset loading
