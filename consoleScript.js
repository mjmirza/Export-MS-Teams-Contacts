// ****************************************************************************************************************************
// Abstract:
// This script is just a quick hack to export the owners and members of a team as a CSV file without administrator permissions.
//
// Usage:
// 1. Open your team
// 2. Select "Manage team" from its menu
// 3. Select the "Members" tab
// 4. Expand the "Owners" and "Members and guests" sections
// 5. Make sure to scroll down to the end of the owners and members lists to include all of them in your export (As the members are loaded on demand)
// 6. Open your browser console
// 7. Copy and paste all the content of this script to the console and type "Enter"
// 8. The CSV file download should start automatically
//
// ToDo:
// - Parse tags to include them in the export
// ****************************************************************************************************************************

$(function() {
  
  // **************
  // Initialization
  // **************
  const csvFileName = 'MSteam-channel-userlist-export.csv'
  const csvDelimiter = ','
  const csvHeader = 'Display Name' + csvDelimiter + 'Title' + csvDelimiter + 'Location' + csvDelimiter + 'Role' + csvDelimiter + 'UPN' + '\r\n' // CSV header row
  let csvContent = csvHeader // Initialize CSV content
  const rosterLength = $('.td-member-display-name').length // Number of visible members
  
  // Check if we're an owner of the team
  let roleSelector = '.td-member-role' // Consider we're not an owner by default
  if ($('.td-member-editable-role').length > 0) {
    roleSelector = '.td-member-editable-role' // Override if we're an owner
  }
  
  // ************************
  // Iterate over each member
  // ************************
  for (let index = 0; index < rosterLength; index++) {
    // Extract the display name, title, location and role
    const displayName = $('.td-member-display-name').eq(index).text()
    const title = $('.td-member-title').eq(index).text()
    const location = $('.td-member-location').eq(index).text()
    const role = $(roleSelector).eq(index).text()
    const upn = $('.td-member-photo img').eq(index).attr('upn')
    // Append to the CSV content
    const csvRow = displayName + csvDelimiter + title + csvDelimiter + location + csvDelimiter + role + csvDelimiter + upn + '\r\n'
    csvContent += csvRow
  }

  // Debug the export to console
  console.info(rosterLength + ' members exported:')
  console.info(csvContent)

  // **********************************************************
  // Dynamically generates a CSV file and triggers its download
  // **********************************************************

  // Create a dynamic "a" tag
  var element = document.createElement('a')
  // Set href link with content
  element.setAttribute(
    'href',
    'data:application/json;charset=utf-8,' + encodeURIComponent(csvContent)
  )
  // Set downloaded file name
  element.setAttribute('download', csvFileName)
  // Hide the elemement and add it to the page
  element.style.display = 'none'
  document.body.appendChild(element)
  // Launch download
  element.click()
  // Remove element
  document.body.removeChild(element)
})
