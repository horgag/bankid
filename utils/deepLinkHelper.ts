// utils/deepLinkHelper.ts
import { UAParser } from "ua-parser-js";
import { DeviceInfo } from "../hooks/useDevice";
import { HashParams } from "../hooks/useHash";
import { NextApiRequest, NextApiResponse } from "next";

export const PageOpenedByUserAction = (userClicked: boolean, hashParams: HashParams) => {
  return userClicked || hashParams?.initiated === "true";
};

export function createLink(userAgent: string, token: string, location: string) {
  const uap = new UAParser(userAgent);  
  const ua = uap.getResult();
  switch (getType(ua)) {
    case "iphone-phone":
      if (ua.browser.name === "Mobile Safari" || ua.browser.name === "Safari") {
        return getMobileRedirect(token, location);
      }
      if (ua.browser.name === "Chrome") {
        return getIphoneRedirect(token, location, ua.browser.name);
      }
      // Unsupported browser on iphone
      return getDefaultRedirect(token);
    case "android-phone":
      return getDefaultAndroidRedirect(token, location, ua);
  }
  return getDefaultRedirect(token);
}

function getDefaultRedirect(token: string) {
  return `checkbroswerbehaviour:///?autostarttoken=${token}&redirect=null`;
}

function getDefaultAndroidRedirect(token: string, location: string, res: UAParser.IResult) {
  if (res.browser.name === "SamsungBrowser") {
    console.log("Seems to be samsung--");
    return encodeURIComponent("samsunginternet://");
  } else if (res.browser.name === "Chrome") {
    return encodeURIComponent("googlechrome://");
  } else {
    return `https://app.checkbroswerbehaviour.com/?autostarttoken=${token}&redirect=${location}#anchor`;
  }
}

function getMobileRedirect(token: string, location: string) {
  return `https://app.checkbroswerbehaviour.com/?autostarttoken=${token}&redirect=${location}#anchor`;
}

export function shallSelectDeviceAutomatically(userAgent: string) {
  const uap = new UAParser(userAgent);
  const ua = uap.getResult();
  switch (getType(ua)) {
    case "desktop":
      return false;
    case "iphone-phone":
    case "android-phone":
      return true;
  }
  return false;
}

export function getType(ua: UAParser.IResult) {
  if (ua.device.type === undefined) {
    return "desktop";
  }
  if (ua.device.type === "mobile") {
    if (ua.os.name === "Android") {
      return "android-phone";
    }
    if (ua.os.name === "iOS") {
      return "iphone-phone";
    }
  }
  return "unknown";
}

function getIphoneRedirect(token: string, location: string, browser: string) {
  const appLink = getIphoneAppLink(browser);
  if (appLink !== "missing") {
    return getMobileRedirect(token, appLink).replace("#anchor", "");
  }
  // Fallback to let the user switch app
  return getDefaultRedirect(token);
}

function getIphoneAppLink(browser: string) {
  if (browser === "Chrome") {
    return "googlechromes://";
  }
  return "missing";
}

export const CreateReturnUrl = (device: DeviceInfo, isNull: boolean) => {
  if (device.isSamsungBrowser) {
    return encodeURIComponent("samsunginternet://");
  } else if (device.isChrome || device.isChromeOnAppleDevice) {
    return encodeURIComponent("googlechrome://");
  } else if (device.isFirefoxOnAppleDevice || device.isFirefox) {
    return encodeURIComponent("firefox://");
  } else if (device.isOperaTouchOnAppleDevice) {
    return encodeURIComponent(
      `${window.location.href.replace("http", "touch-http")}#initiated=true`
    );
  }
  if (isNull) {
    return `null`;
  }
  // we let users with other conditions than those above return themselves from bankid
  return encodeURIComponent(`${window.location.href}#initiated=true`);
};

