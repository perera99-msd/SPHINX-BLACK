const mongoose = require('mongoose');
// Simple store for global settings (Admin/Settings.jsx)
const settingSchema = mongoose.Schema({
  siteName: String,
  supportEmail: String,
  currency: String,
  maintenanceMode: Boolean,
  orderNotifications: Boolean,
  marketingEmails: Boolean
});
module.exports = mongoose.model('Setting', settingSchema);