/**
 * Filename:    filters.js
 * Description: Filters are used to modify text and perform
 *              utility functions like capitalization.
 */
import Vue from "vue";

/**
 * capitalize
 * 
 * This filter will capitalize the first letter of the
 * string v that gets passed to it.
 */
Vue.filter("capitalize", v => {
  if (!v) {
    return "";
  }
  v = v.toString();
  return v.charAt(0).toUpperCase() + v.slice(1);
});

/**
 * format_phone
 * 
 * This filter will take a ten-digit string, presumably a number
 * like 8005551212, and format it as a phone number in a standard
 * format: (800) 555-1212
 */
Vue.filter(
  "format_phone",
  v => (!v ? "" : `(${v.slice(0, 3)}) ${v.slice(3, 6)}-${v.slice(6)}`)
);
