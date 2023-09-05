export const BASE_URL = "http://fixhublogic.codchip.com/api/"

export const CUSTOMER_BASE_URL = BASE_URL+"customer/"
export const SIGN_IN = CUSTOMER_BASE_URL + "login"
export const SIGN_UP = CUSTOMER_BASE_URL + "signup"
export const UPDATE_PROFILE = CUSTOMER_BASE_URL + "updateprofile"
export const CHANGE_PASSWORD = CUSTOMER_BASE_URL + "changepassword"
export const DELETE_ACCOUNT = CUSTOMER_BASE_URL + "deleteaccount"


export const USER_ADDRESS_BASE_URL = BASE_URL+"useraddress/"
export const GET_CITIES_LIST = USER_ADDRESS_BASE_URL + "getcities"
export const GET_SECTOR_BY_CITIES = USER_ADDRESS_BASE_URL + "getsectorsbycity?id="

export const HOME_BASE_URL = BASE_URL + "home/"
export const GET_HOME_DATA = HOME_BASE_URL + "gethome?id="

export const SERVICE_DETAILS_BASE_URL = BASE_URL + "servicedetails/"
export const GET_SUB_SERVICE_BY_SERVICE_ID = SERVICE_DETAILS_BASE_URL + "getservicedetails?id="

export const ORDERS_BASE_URL = BASE_URL + "orders/"
export const ADD_TO_CART = ORDERS_BASE_URL + "addtocart"
export const GET_CART_BY_CUSTOMER_ID = ORDERS_BASE_URL + "viewcart?id="
