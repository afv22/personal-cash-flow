var USDFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatUSD = (value) => {
  return USDFormatter.format(value);
};

export { formatUSD };
