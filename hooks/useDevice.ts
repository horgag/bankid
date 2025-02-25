import isMobileLib from "is-mobile";

export interface DeviceInfo {
  isMobileOrTablet: boolean;
  isChromeOnAppleDevice: boolean;
  isFirefoxOnAppleDevice: boolean;
  isOperaTouchOnAppleDevice: boolean;
  isFirefox: boolean;
  isSamsungBrowser: boolean;
  isChrome: boolean;
  isSafari: boolean;
}

const useDevice = (): DeviceInfo => {
  const isMobileOrTablet = isMobileLib({ tablet: true, featureDetect: true });
  let isChromeOnAppleDevice = false;
  let isFirefoxOnAppleDevice = false;
  let isOperaTouchOnAppleDevice = false;
  let isFirefox = false;
  let isSamsungBrowser = false;
  let isChrome = false;
  let isSafari = false;

  if (typeof navigator !== "undefined") {
    isSamsungBrowser = Boolean(navigator.userAgent.match(/SamsungBrowser/));
    isSafari = Boolean(navigator.userAgent.match(/Safari/));
    isChrome = Boolean(navigator.userAgent.match(/Chrome/));
    isChromeOnAppleDevice = Boolean(navigator.userAgent.match(/CriOS/));
    isFirefoxOnAppleDevice = Boolean(navigator.userAgent.match(/FxiOS/));
    isOperaTouchOnAppleDevice = Boolean(navigator.userAgent.match(/OPT/));
    isFirefox = Boolean(navigator.userAgent.match(/Firefox/));
  }
  return {
    isChrome,
    isMobileOrTablet,
    isChromeOnAppleDevice,
    isFirefoxOnAppleDevice,
    isOperaTouchOnAppleDevice,
    isFirefox,
    isSamsungBrowser,
    isSafari,
  };
};

export default useDevice;

