'use strict';

module.exports = {
  app: {
    title: 'Trimauxil',
    description: 'Weight loss program for overweight dogs',
    keywords: 'MongoDB, Express, AngularJS, Node.js',
    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  logo: 'modules/core/img/brand/logo.png',
  favicon: 'modules/core/img/brand/favicon.ico'
};
