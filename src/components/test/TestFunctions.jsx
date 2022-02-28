export const StandardScaling = (value, mean, stdev) => {
  const scaled_value = (value - mean) / stdev;
  return scaled_value;
};

export const InverseStandardScaling = (scaled_value, mean, stdev) => {
  const value = scaled_value * stdev + mean;
  return value;
};
