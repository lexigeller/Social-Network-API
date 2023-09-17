function dateFormat(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  }
  
  module.exports = dateFormat;
  