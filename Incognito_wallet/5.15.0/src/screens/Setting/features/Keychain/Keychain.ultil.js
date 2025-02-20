export const isNodeAccount = (name, devices) => {
  return devices.find(
    (device) => device.IsPNode && device.AccountName === name,
  );
};
