now = (function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
      return performance.now();
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
      return (getNanoSeconds() - loadTime) / 1e6;
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
      return Date.now() - loadTime;
    loadTime = Date.now();
  } else {
      return new Date().getTime() - loadTime;
    loadTime = new Date().getTime();
  }

}).call(this);

/*
//@ sourceMappingURL=performance-now.map
*/
