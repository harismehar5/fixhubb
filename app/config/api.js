import axios from "axios";
import {
  SIGN_IN,
  SIGN_UP,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
  GET_HOME_DATA,
  GET_CITIES_LIST,
  GET_SECTOR_BY_CITIES,
  GET_SUB_SERVICE_BY_SERVICE_ID,
  ADD_TO_CART,
  GET_CART_BY_CUSTOMER_ID,
} from "./config";

export async function SignUp(data) {
  try {
    const response = await axios.post(SIGN_UP, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling SignUp:", error);
    throw error;
  }
}

export async function Login(data) {
  // try {
  //   const response = await axios.get(SIGN_IN, { data: data });
  //   console.log("Response", response);
  //   return response.data;
  // } catch (error) {
  //   console.error("Error occurred while calling Login:", error);
  //   throw error;
  // }

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: "GET",
    body: raw,
  };

  fetch("http://fixhublogic.codchip.com/api/customer/login", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

export async function GetCitiesList() {
  try {
    const response = await axios.get(GET_CITIES_LIST);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Get Cities List:", error);
    throw error;
  }
}

export async function GetSectorsByCityID(id) {
  try {
    const response = await axios.get(GET_SECTOR_BY_CITIES + id);
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while calling Get Sectors By City ID:",
      error
    );
    throw error;
  }
}

export async function GetHomeData(id) {
  try {
    const response = await axios.get(GET_HOME_DATA + id);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Get Home Data:", error);
    throw error;
  }
}

async function updateProfile(data) {
  try {
    const response = await axios.post(UPDATE_PROFILE, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Update Profile:", error);
    throw error;
  }
}

async function ChangePassword(data) {
  try {
    const response = await axios.post(CHANGE_PASSWORD, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Change Password:", error);
    throw error;
  }
}

async function DeleteAccount(data) {
  try {
    const response = await axios.post(DELETE_ACCOUNT, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Delete Account:", error);
    throw error;
  }
}

async function AddNewQuickBook(data) {
  try {
    const response = await axios.post("undefined", data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Add_New_Quick_Book:", error);
    throw error;
  }
}

async function GetServicesToSelectForNewQuickBook() {
  try {
    const response = await axios.get(
      "{{baseURL}}mobilebookings/getquickservices?id=3"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while calling getServices_to_select_for_new_quick_book:",
      error
    );
    throw error;
  }
}

async function Get_Quick_Books_for_Specific_Customer() {
  try {
    const response = await axios.get(
      "{{baseURL}}mobilebookings/getcustomerquickbooks?id=1"
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while calling Get_Quick_Books_for_Specific_Customer:",
      error
    );
    throw error;
  }
}

export async function Get_SubServices_by_Service_ID(id) {
  try {
    const response = await axios.get(GET_SUB_SERVICE_BY_SERVICE_ID + id);
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while calling Get_SubServices_by_Service_ID:",
      error
    );
    throw error;
  }
}

export async function AddToCart(data) {
  try {
    const response = await axios.post(ADD_TO_CART, data);
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Add To Cart:", error);
    throw error;
  }
}

export async function GetCartByCustomerId(id) {
  try {
    const response = await axios.get(GET_CART_BY_CUSTOMER_ID + id);
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while calling Get Cart By Customer Id:",
      error
    );
    throw error;
  }
}

async function Get_Active_Customers() {
  try {
    const response = await axios.get("undefined");
    return response.data;
  } catch (error) {
    console.error("Error occurred while calling Get_Active_Customers:", error);
    throw error;
  }
}

async function Get_In_Active_Customers() {
  try {
    const response = await axios.get("undefined");
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while calling Get_In_Active_Customers:",
      error
    );
    throw error;
  }
}
