# Flagsmith + Google Analytics Demo: Telehealth Booking Optimization


A complete demonstration of feature flag analytics integration using Flagsmith and Google Analytics 4. This project shows how to build data-driven A/B testing systems that automatically track user behavior and measure feature impact.


## 🎯 What This Demo Shows


### Feature Flag A/B Testing
- **Streamlined Flow**: Quick 4-field booking form optimized for speed and conversion
- **Detailed Flow**: Comprehensive 10-field medical intake optimized for data quality
- **Instant switching** between variants without code deployments


### Automatic Analytics Tracking
- **Variant exposure** - Which flow users see
- **User interactions** - Doctor selections and form engagement
- **Conversion events** - Completed bookings with variant attribution
- **Real-time reporting** in Google Analytics dashboard


### Business Impact Measurement
- Compare conversion rates between variants
- Measure completion times and form abandonment
- Make data-driven decisions about which features to keep
- Demonstrate ROI of feature flag implementation


## 🚀 Quick Start (5 minutes)


### Prerequisites
- Node.js 16+ installed
- Free Flagsmith account
- Free Google Analytics account


### 1. Clone and Install
```bash
git clone <your-repo-url>
cd demo
npm install
```


### 2. Setup Flagsmith
1. Go to [app.flagsmith.com](https://app.flagsmith.com/signup)
2. Create project: "Telehealth Booking Demo"
3. Create feature flag:
  - Name: `booking_flow_config`
  - Type: String
  - Value: `streamlined` or `detailed`
4. Copy client environment key
5. Update `src/App.js` line 45 with your key


### 3. Setup Google Analytics
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create GA4 property: "Flagsmith Demo"
3. Website URL: `http://localhost.com` or `https://your-domain.com`
4. Copy measurement ID (starts with `G-`)
5. Update `public/index.html` lines 11 & 15 with your ID


### 4. Run Demo
```bash
npm start
```
Opens at `http://localhost:3000`


## 🧪 Testing the Integration


### Test Feature Flags
1. **Change variant** in Flagsmith dashboard
2. **Refresh browser** - see different booking flows
3. **Notice differences:**
  - Streamlined: Orange animated buttons, 4 fields
  - Detailed: Blue professional buttons, 10+ fields


### Test Analytics
1. **Open GA4 Real-time** reports in another tab
2. **Interact with demo** - click doctors, fill forms
3. **See live events:**
  - `variant_exposure`
  - `doctor_selected`
  - `booking_form_submitted`
  - `appointment_booked`


### Compare Performance
Run both variants and compare:
- **Conversion rates** (bookings completed)
- **Completion times** (how fast users finish)
- **Form abandonment** (where users drop off)
- **User engagement** (clicks and interactions)


## 📊 Expected Results


Based on typical A/B testing results:


| Metric | Streamlined Flow | Detailed Flow |
|--------|------------------|---------------|
| Conversion Rate | ~65% | ~42% |
| Completion Time | ~45 seconds | ~2.5 minutes |
| Form Abandonment | ~15% | ~35% |
| Data Quality | Lower | Higher |


## 🏗️ Project Structure


```
demo/
├── public/
│   └── index.html          # GA4 integration
├── src/
│   ├── App.js              # Main app with feature flags
│   ├── App.css             # Styling for both variants
│   └── index.js            # React entry point
├── package.json            # Dependencies
├── FINAL_ARTICLE.md        # Complete tutorial article
└── README.md               # This file
```


## 🔧 Key Features


### Feature Flag Integration
- **Flagsmith SDK** for real-time flag management
- **Automatic variant detection** and user assignment
- **Error handling** with fallback values
- **Production-ready** configuration


### Analytics Integration
- **Google Analytics 4** for event tracking
- **Custom event schema** for feature flag data
- **Flexible domain configuration** works anywhere
- **Real-time reporting** and conversion tracking


### User Experience
- **Two distinct booking flows** for comparison
- **Responsive design** works on all devices
- **Professional healthcare UI** with modern styling
- **Smooth animations** and visual feedback


## 📈 Business Value


This demo demonstrates:


### Risk Reduction
- **Instant rollbacks** without code deployments
- **Gradual rollouts** to minimize impact
- **Safe experimentation** in production


### Data-Driven Decisions
- **Real user behavior** data instead of assumptions
- **Statistical significance** for confident decisions
- **Conversion optimization** through testing


### Development Velocity
- **Faster iteration** cycles with immediate feedback
- **Reduced deployment** complexity and risk
- **Better team collaboration** around feature development


## 🛠️ Customization


### Adding New Variants
1. **Create new flag value** in Flagsmith
2. **Add variant logic** in `App.js`
3. **Style the variant** in `App.css`
4. **Test and measure** results


### Adding New Events
1. **Define event schema** in GA4
2. **Add tracking calls** in React components
3. **Verify events** in GA4 Real-time reports
4. **Create dashboards** for analysis


### Deployment Options
- **Netlify**: Drag & drop `build` folder
- **Vercel**: `npx vercel --prod`
- **GitHub Pages**: `npm run build && gh-pages -d build`
- **AWS S3**: Upload `build` folder to S3 bucket


## 🔍 Troubleshooting


### Flagsmith Issues
- **Check environment key** in `src/App.js`
- **Verify flag name** matches exactly: `booking_flow_variant`
- **Check browser console** for connection errors


### Analytics Issues
- **Verify measurement ID** in `public/index.html`
- **Check GA4 property** is configured correctly
- **Disable ad blockers** that might block tracking
- **Wait 1-2 minutes** for real-time data to appear


### Demo Issues
- **Clear browser cache** and hard refresh
- **Check Node.js version** (16+ required)
- **Reinstall dependencies**: `rm -rf node_modules && npm install`


**Ready to implement feature flags in your own application?** Start with this demo, adapt it to your use case, and begin your journey toward data-driven feature development.


*Questions? Issues? Improvements? Open an issue or start a discussion!*

