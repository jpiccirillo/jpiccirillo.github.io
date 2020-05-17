// Defines valid min, max, error msg, and precision for each entry paramater.
// Used in validate().

const validValues = {
  mu0: {
    min: -10000,
    max: 10000,
    precision: 0,
  },
  mu1: {
    min: -10000,
    max: 10000,
    precision: 0,
  },
  std: {
    min: 1,
    max: 10000,
    msg: "Standard Deviation must be greater than 1.",
    precision: 0,
  },
  delta: {
    min: -10000,
    max: 10000,
    precision: 2,
  },
  alpha: {
    min: 0.001,
    max: 0.999,
    msg: "Type I Error must be between 0.001 and 1",
    precision: 3,
  },
  n: {
    min: 1,
    max: 100,
    msg: "Sample size must be between 1 and 100.",
    precision: 0,
    domID: "#slider-vertical1",
  },
  power: {
    min: 0.001,
    max: 0.999,
    msg: "Power must be between 0.001 and 0.999.",
    precision: 3,
    domID: "#slider-vertical2",
  },
};

/**
 * 
 * 
    "power",
    0.001,
    0.999,
    "Power must be between 0.001 and 0.999.",
    3,
    "#slider-vertical2",
 */
